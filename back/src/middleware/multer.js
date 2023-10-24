import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import removeAccents from 'remove-accents';
import iconv from 'iconv-lite';


// Types MIME pour les photos et les vidéos
const PHOTO_MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png'
};

const VIDEO_MIME_TYPES = {
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
};

// Configuration de Multer pour le téléchargement de fichiers
export const upload = multer({
    storage: multer.diskStorage({
        // Définit la destination du fichier en fonction du type MIME
        destination: (req, file, cb) => {
            if (PHOTO_MIME_TYPES[file.mimetype]) {
                cb(null, process.env.MULTER_PHOTO);
            } else if (VIDEO_MIME_TYPES[file.mimetype]) {
                cb(null, process.env.MULTER_VIDEO);
            } else {
                cb(new Error('Le type MIME est invalide'));
            }
        },
        // Définit le nom du fichier
        filename: (req, file, cb) => {
            let name = file.originalname;
            name = iconv.decode(Buffer.from(name, 'binary'), 'utf8');
            name = removeAccents(name).split(' ').join('_');
            name = name.replace(/\.[^/.]+$/, "");
            const extension = PHOTO_MIME_TYPES[file.mimetype] || VIDEO_MIME_TYPES[file.mimetype];
            cb(null, name + '_' + Date.now() + '.' + extension);
        }
    }),
    // Filtre les fichiers en fonction du type MIME
    fileFilter: (req, file, cb) => {
        if (PHOTO_MIME_TYPES[file.mimetype] || VIDEO_MIME_TYPES[file.mimetype]) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});


// Configuration de Google Cloud Storage
const storage = new Storage({
    projectId: process.env.GC_ID,
    keyFilename: process.env.KEYFILE
});

// Définir les buckets pour les images et les vidéos
const bucketImages = storage.bucket(process.env.GC_BUCKETImages);
const bucketVideos = storage.bucket(process.env.GC_BUCKETVideo);

// Configuration du stockage en mémoire pour multer
export const photoStorage = multer({ storage: multer.memoryStorage() });

// Middleware pour télécharger des fichiers sur Google Cloud Storage
export const uploadToGCS = async (req, res, next) => {
    // Vérification si des fichiers sont présents dans la requête
    if (!req.files) {
        return next();
    }

    try {
        // Traitement des fichiers pour les télécharger sur Google Cloud
        const uploads = Object.values(req.files).flat().map(async (file) => {
            // Traitement du nom du fichier
            let name = file.originalname;
            name = iconv.decode(Buffer.from(name, 'binary'), 'utf8');
            name = removeAccents(name).split(' ').join('_');
            name = name.replace(/\.[^/.]+$/, "");

            let extension;
            let bucket;

            // Choix du bucket en fonction du type MIME
            if (PHOTO_MIME_TYPES[file.mimetype]) {
                extension = PHOTO_MIME_TYPES[file.mimetype];
                bucket = bucketImages;
            } else if (VIDEO_MIME_TYPES[file.mimetype]) {
                extension = VIDEO_MIME_TYPES[file.mimetype];
                bucket = bucketVideos;
            } else {
                return;
            }

            const filename = name + '_' + Date.now() + '.' + extension;
            file.filename = filename;
            
            // Création du blob et envoi sur Google Cloud Storage
            const blob = bucket.file(filename);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            // Gestion des erreurs et fin du stream
            blobStream.on('error', (err) => {
                next(err);
            });

            // Générer l'URL public pour le fichier
            blobStream.on('finish', () => {
                file.cloudStorageObject = blob.name;
                file.cloudStoragePublicUrl = getPublicUrl(blob.name, bucket.name);
            });

            blobStream.end(file.buffer);
        });

        // Attente de la fin de tous les téléchargements
        await Promise.all(uploads);
        next();
    } catch (error) {
        next(error);
    }
};

// Générer une URL publique pour un fichier
function getPublicUrl (filename, bucketName) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}