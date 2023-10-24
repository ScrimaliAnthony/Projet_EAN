// Importation des dépendances nécessaires
import pool from '../config/database_scrimbox_ean.js';
import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';

// Configuration des variables d'environnement
dotenv.config();

// Configuration de Google Cloud Storage
const storage = new Storage({
    projectId: process.env.GC_ID,
    keyFilename: process.env.KEYFILE
});

// Configuration des buckets pour les images et les vidéos
const bucketImages = process.env.GC_BUCKETImages;
const bucketVideos = process.env.GC_BUCKETVideo;

// Fonction asynchrone pour obtenir toutes les données audiovisuelles
export const getAllAudioVisuel = async (req, res) => {
    try {
        // Exécution de la requête SQL pour sélectionner toutes les données de la table_audiovisuels
        const [AudioVisuel] = await pool.query
        (`
            SELECT *
            FROM table_audiovisuels
        `);

        // Vérifie si AudioVisuel est undefined ou null
        if(!AudioVisuel) {
            console.error("AudioVisuel renvoie undefined ou null");
            res.status(500).json({ message: "AudioVisuel renvoie undefined ou null" });
            return;
        };

        // Vérifie si la liste AudioVisuel est vide
        if(AudioVisuel.length === 0) {
            console.error("La liste de AudioVisuel est introuvable.");
            res.status(404).json({ message: "La liste de AudioVisuel est introuvable." });
            return;
        };

        // Si tout va bien, renvoie les données audiovisuelles avec le statut 200
        res.status(200).json(AudioVisuel);
    } catch (error) {
        console.error('Erreur lors de la récupération des données audiovisuelles :', error);
        res.status(404).json({ message: "Une erreur est survenue lors de la récupération des données audiovisuelles." });
    };
}; 

// Fonction asynchrone pour obtenir des données audiovisuelles basées sur une recherche
export const getAudioVisuelSearch = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;

        // Vérification de l'existence de l'ID
        if(!id) {
            console.error("L'id audioVisuel n'a pas été récupéré");
            res.status(404).json({ message: "L'id audioVisuel n'a pas été récupéré" });
            return;
        };

        // Exécution de la requête SQL pour rechercher dans la table_audiovisuels en fonction du code_barre ou du titre
        const [AudioVisuel] = await pool.query
        (`
            SELECT *
            FROM table_audiovisuels
            WHERE code_barre LIKE ? OR titre LIKE ?
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `, [`${id}%`, `%${id}%`]);

        // Vérifie si AudioVisuel est undefined ou null
        if(!AudioVisuel) {
            console.error("AudioVisuel renvoie undefined ou null");
            res.status(500).json({ message: "AudioVisuel renvoie undefined ou null" });
            return;
        };

        // Vérifie si la liste AudioVisuel est vide
        if(AudioVisuel.length === 0) {
            console.error("L'audioVisuel que vous cherchez n'existe pas dans la base de donnée");
            res.status(404).json({ message: "L'audioVisuel que vous cherchez n'existe pas dans la base de donnée" });
            return;
        };

        // Si tout va bien, renvoie les données audiovisuelles trouvées avec le statut 200
        res.status(200).json(AudioVisuel);
    } catch (error) {
        // Log de l'erreur et envoi d'une réponse avec le statut 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    };
}

// Fonction asynchrone pour créer une nouvelle entrée audiovisuelle dans la base de données
export const CreateAudioVisuel = async (req, res) => {
    let photo;
    let video;
    try {
        // Destructuration de l'objet req.body pour extraire les données
        const {
            code_barre, type_de_produits, format, type, genre, titre, description, classification_des_ages, langue_originale, duree,
            Format_image, Format_son, acteur, realisateur, decenie_de_sortie, date_de_sortie, sous_titre, studio, pays_origine,
            nombre_de_disques, commercialisation, edition, poid_article
        } = req.body;

        // Si des photos sont fournies, les stocker dans une variable
        if(req.files.photo) {
            photo = req.files.photo.map(file => process.env.URL_BUCKETImages + file.filename);
        };
        // Si des vidéos sont fournies, les stocker dans une variable
        if(req.files.video) {
            video = req.files.video.map(file => process.env.URL_BUCKETVideo + file.filename);
        };
    
        // Exécution de la requête SQL pour insérer les données dans la table_audiovisuels
        const create = await pool.query
            (`
                INSERT INTO table_audiovisuels
                (
                    code_barre, type_de_produits, format, type, genre, titre, description, classification_des_ages, langue_originale,
                    duree, Format_image, Format_son, acteur, realisateur, decenie_de_sortie, date_de_sortie, sous_titre, studio,
                    pays_origine, nombre_de_disques, commercialisation, edition, photo, video, poid_article
                )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [ code_barre, type_de_produits, format, type, genre, titre, description, classification_des_ages, langue_originale,
                 duree, Format_image, Format_son, acteur, realisateur, decenie_de_sortie, date_de_sortie, sous_titre, studio,
                 pays_origine, nombre_de_disques, commercialisation, edition, JSON.stringify(photo), JSON.stringify(video), poid_article ]);

        // Si la création est réussie, renvoyer un statut 201 (Créé)
        res.status(201).send(create);
    } catch (error) {
        // Si une erreur survient, supprimer les fichiers uploadés
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            };
        };
        if(video) {
            for(let path of video) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            };
        };

        // Log de l'erreur et envoi d'une réponse avec le statut 400 (Erreur côté client)
        console.error('Erreur lors de la création des données audiovisuelles :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la création des données audiovisuelles." });
    };
};

// Fonction asynchrone pour mettre à jour une entrée audiovisuelle dans la base de données
export const updateAudioVisuel = async (req, res) => {
    let photo;
    let video;
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        if(!id) {
            console.error("L'id de l'audio-visuel n'a pas été récupéré");
            res.status(404).json({ message: "L'id de l'audio-visuel n'a pas été récupéré" });
            return;
        };

        // Vérification de l'existence de l'audio-visuel dans la base de données
        const [AudioVisuel] = await pool.query
        (`
            SELECT *
            FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);

        // Si l'audio-visuel n'existe pas, supprimer les fichiers uploadés et retourner une erreur
        if(AudioVisuel.length === 0) {
            // Supprimer les fichiers photo si présents
            if(req.files.photo) {
                const errPhoto = req.files.photo.map(file => process.env.URL_BUCKETImages + file.filename);
                for(let path of errPhoto) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                };
            };
            // Supprimer les fichiers vidéo si présents
            if(req.files.video) {
                const errVideo = req.files.video.map(file => process.env.URL_BUCKETVideo + file.filename);
                for(let path of errVideo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketVideos).file(filename).delete();
                };
            };
        };

        // Récupère les anciennes photos pour les supprimer
        const [rowsPhoto] = await pool.query
        (`
            SELECT photo
            FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);
        
        // Logique pour supprimer les anciennes photos
        if(rowsPhoto.length > 0) {
            const oldPhoto = JSON.parse(rowsPhoto[0].photo);
            if(oldPhoto) {
                for(let path of oldPhoto) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                }
            }
        };

        // Récupère les anciennes vidéos pour les supprimer
        const [rowsVideo] = await pool.query
        (`
            SELECT video
            FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);

        // Logique pour supprimer les anciennes vidéos
        if(rowsVideo.length > 0) {
            const oldVideo = JSON.parse(rowsVideo[0].video);
            if(oldVideo) {
                for(let path of oldVideo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketVideos).file(filename).delete();
                };
            }
        };

        // Récupération des données depuis le corps de la requête
        const {
            code_barre, type_de_produits, format, type, genre, titre, description, classification_des_ages, langue_originale, duree,
            Format_image, Format_son, acteur, realisateur, decenie_de_sortie, date_de_sortie, sous_titre, studio, pays_origine,
            nombre_de_disques, commercialisation, edition, poid_article
        } = req.body;

        // Stockage des nouvelles photos et vidéos dans des variables, si fournies
        if(req.files.photo) {
            photo = req.files.photo.map(file => process.env.URL_BUCKETImages + file.filename);
        };
        if(req.files.video) {
            video = req.files.video.map(file => process.env.URL_BUCKETVideo + file.filename);
        };
    
        // Exécution de la requête SQL pour mettre à jour l'audio-visuel
        const update = await pool.query
            (`
                UPDATE table_audiovisuels
                SET code_barre = ?, type_de_produits = ?, format = ?, type = ?, genre = ?, titre = ?, description = ?,
                classification_des_ages = ?, langue_originale = ?, duree = ?, Format_image = ?, Format_son = ?, acteur = ?,
                realisateur = ?, decenie_de_sortie = ?, date_de_sortie = ?, sous_titre = ?, studio = ?, pays_origine = ?,
                nombre_de_disques = ?, commercialisation = ?, edition = ?, photo = ?, video = ?, poid_article = ?
                WHERE code_barre = ?
            `, [ code_barre, type_de_produits, format, type, genre, titre, description, classification_des_ages, langue_originale, 
                 duree, Format_image, Format_son, acteur, realisateur, decenie_de_sortie, date_de_sortie, sous_titre, studio, 
                 pays_origine, nombre_de_disques, commercialisation, edition, JSON.stringify(photo), JSON.stringify(video), poid_article, id ]);

        // Si la mise à jour est réussie, retourner un statut 200 (OK)
        res.status(200).send(update);
    } catch (error) {
        // Si une erreur survient, supprimer les fichiers uploadés
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            };
        };
        if(video) {
            for(let path of video) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketVideos).file(filename).delete();
            };
        };

        // Log de l'erreur et retour d'une réponse avec statut 400 (Erreur côté client)
        console.error('Erreur lors de la modification des données audiovisuelles :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la modification des données audiovisuelles." });
    };
};

// Fonction asynchrone pour supprimer une entrée audiovisuelle dans la base de données
export const deleteAudioVisuel = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;

        // Vérifie si l'ID est présent, sinon retourne une erreur
        if(!id) {
            console.error("L'id de l'audio-visuel n'a pas été récupéré");
            res.status(404).json({ message: "L'id de l'audio-visuel n'a pas été récupéré" });
            return;
        };

        // Récupère les photos associées à l'audio-visuel pour les supprimer
        let [rowsPhoto] = await pool.query
        (`
            SELECT photo
            FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);

        // Supprime les photos associées si elles existent
        if(rowsPhoto.length > 0) {
            const photo = JSON.parse(rowsPhoto[0].photo);
            if(photo) {
                for(let path of photo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                };
            };
        };

        // Récupère les vidéos associées à l'audio-visuel pour les supprimer
        let [rowsVideo] = await pool.query
        (`
            SELECT video
            FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);

        // Supprime les vidéos associées si elles existent
        if(rowsVideo.length > 0) {
            const video = JSON.parse(rowsVideo[0].video);
            if(video) {
                for(let path of video) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketVideos).file(filename).delete();
                };
            };
        };

        // Supprime l'audio-visuel de la base de données
        const del = await pool.query
        (`
            DELETE FROM table_audiovisuels
            WHERE code_barre = ?
        `, [id]);
    
        // Retourne un statut 200 pour indiquer que la suppression a réussi
        res.status(200).send(del);
    } catch (error) {
        // Log de l'erreur et retour d'une réponse avec statut 400
        console.error('Erreur lors de la suppression des données audiovisuelles :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la suppression des données audiovisuelles." });
    };
};