// Importation des dépendances nécessaires
import pool from '../config/database_scrimbox_ean.js';
import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';

// Chargement des variables d'environnement
dotenv.config();

// Configuration du stockage Google Cloud
const storage = new Storage({
    projectId: process.env.GC_ID,
    keyFilename: process.env.KEYFILE
});

// Configuration des buckets pour les images et vidéos
const bucketImages = process.env.GC_BUCKETImages;
const bucketVideos = process.env.GC_BUCKETVideo;

// Fonction asynchrone pour récupérer tous les jeux vidéo de la base de données
export const getAllGames = async (req, res) => {
    try {
        // Exécution de la requête SQL pour récupérer toutes les lignes de la table table_jeux_video_jv
        const [games] = await pool.query(`
            SELECT *
            FROM table_jeux_video_jv
        `);
        
        // Vérification si le résultat de la requête est undefined ou null
        if(!games) {
            console.error("games renvoie undefined ou null");
            res.status(500).json({ message: "games renvoie undefined ou null" });
            return;
        }

        // Vérification si la liste des jeux est vide
        if(games.length === 0) {
            console.error("La liste de jeux est introuvable.");
            res.status(404).json({ message: "La liste de jeux est introuvable." });
            return;
        }
        
        // Envoi de la liste des jeux avec un statut HTTP 200
        res.status(200).json(games);
    } catch (error) {
        // En cas d'erreur, affiche un message d'erreur et retourne un statut HTTP 500
        console.error("Une erreur est survenu lors de la récupération des données de la table table_jeux_video_jv :", error);
        res.status(500).json({ message: "Une erreur est survenu lors de la récupération des données de la table table_jeux_video_jv." });
    }
};

// Fonction asynchrone pour rechercher un jeu vidéo spécifique dans la base de données
export const getGameSearch = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        
        // Vérification si l'ID est null ou undefined
        if(!id) {
            console.error("L'id du jeu vidéo n'a pas été récupéré");
            res.status(404).json({ message: "L'id du jeu vidéo n'a pas été récupéré" });
            return;
        }

        // Exécution de la requête SQL pour rechercher le jeu vidéo
        // On utilise LIKE pour une recherche partielle sur le code-barres et le titre
        const [game] = await pool.query(`
            SELECT *
            FROM table_jeux_video_jv
            WHERE code_barre LIKE ? OR titre LIKE ?
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `, [`${id}%`, `%${id}%`]);
        
        // Vérification si le résultat de la requête est undefined ou null
        if(!game) {
            console.error("game renvoie undefined ou null");
            res.status(500).json({ message: "game renvoie undefined ou null" });
            return;
        }
        
        // Vérification si aucun jeu ne correspond à la recherche
        if(game.length === 0) {
            console.error("Le jeu vidéo que vous cherchez n'existe pas dans la base de donnée");
            res.status(404).json({ message: "Le jeu vidéo que vous cherchez n'existe pas dans la base de donnée" });
            return;
        }

        // Envoi du résultat de la recherche avec un statut HTTP 200
        res.status(200).json(game);
    } catch (error) {
        // En cas d'erreur, affiche un message d'erreur et retourne un statut HTTP 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    }
};


// Fonction asynchrone pour créer un nouveau jeu vidéo dans la base de données
export const createGame = async (req, res) => {
    // Initialisation des variables pour stocker les chemins des fichiers photo et vidéo
    let photo;
    let video;

    try {
        // Décomposition de l'objet req.body pour extraire les informations du jeu vidéo
        const {
            code_barre, type_de_produits, categorie, console, titre, description, PEGI, genre, editeur, developpeur,
            date_de_sortie, langue, pays, code_region, poid_article
        } = req.body;

        // Si des fichiers photo sont présents, on récupère leurs chemins
        if(req.files.photo) {
            photo = req.files.photo.map(file => process.env.URL_BUCKETImages + file.filename);
        }
        
        // Si des fichiers vidéo sont présents, on récupère leurs chemins
        if(req.files.video) {
            video = req.files.video.map(file => process.env.URL_BUCKETVideo + file.filename);
        }

        // Exécution de la requête SQL pour insérer le nouveau jeu vidéo dans la base de données
        const create = await pool.query(`
            INSERT INTO table_jeux_video_jv 
            (
                code_barre, type_de_produits, categorie, console, titre, description, PEGI, genre, editeur, developpeur,
                date_de_sortie, langue, pays, code_region, photo, video, poid_article
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [code_barre, type_de_produits, categorie, console, titre, description, PEGI, genre, editeur, developpeur,
            date_de_sortie, langue, pays, code_region, JSON.stringify(photo), JSON.stringify(video), poid_article]);

        // Retourne un statut HTTP 201 en cas de réussite
        res.status(201).send(create);
    } catch (error) {
        // En cas d'erreur, supprimer les fichiers photo et vidéo téléchargés
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            }
        }
        if(video) {
            for(let path of video) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketVideos).file(filename).delete();
            }
        }

        // Affiche le message d'erreur et retourne un statut HTTP 500
        console.error('Erreur lors la création des données dans la table table_jeux_video_jv :', error);
        res.status(500).json({ message: "Une erreur est survenue lors de la création des données dans la table table_jeux_video_jv." });
    }
};

// Fonction asynchrone pour mettre à jour un jeu vidéo existant dans la base de données
export const updateGame = async (req, res) => {
    // Initialisation des variables pour stocker les chemins des fichiers photo et vidéo
    let photo;
    let video;
    try {
        // Récupération de l'ID du jeu vidéo à partir des paramètres de la requête
        const id = req.params.id;
        if(!id) {
            console.error("L'id du jeu n'a pas été récupéré");
            res.status(404).json({ message: "L'id du jeu n'a pas été récupéré" });
            return;
        };

        // Vérification de l'existence du jeu vidéo dans la base de données
        const [game] = await pool.query
        (`
            SELECT *
            FROM table_jeux_video_jv
            WHERE code_barre = ?
        `, [id]);

        // Si le jeu vidéo n'existe pas, supprimer les fichiers uploadés et retourner une erreur
        if(game.length === 0) {
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
            FROM table_jeux_video_jv
            WHERE code_barre = ?
        `, [id]);

        // Logique pour supprimer les anciennes photos
        if(rowsPhoto.length > 0) {
            const oldPhoto = JSON.parse(rowsPhoto[0].photo);
            if(oldPhoto) {
                for(let path of oldPhoto) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                };
            };
        };

        // Récupère les anciennes vidéos pour les supprimer
        const [rowsVideo] = await pool.query
        (`
            SELECT video
            FROM table_jeux_video_jv
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
            };
        };

        // Récupération des données depuis le corps de la requête
        const {
            code_barre, type_de_produits, categorie, console, titre, description, PEGI, genre, editeur, developpeur, date_de_sortie,
            langue, pays, code_region, poid_article
        } = req.body;

        // Stockage des nouvelles photos et vidéos dans des variables, si fournies
        if(req.files.photo) {
            photo = req.files.photo.map(file => process.env.URL_BUCKETImages + file.filename);
        };
        if(req.files.video) {
            video = req.files.video.map(file => process.env.URL_BUCKETVideo + file.filename);
        };

        // Exécution de la requête SQL pour mettre à jour le jeu vidéo
        const update = await pool.query
        (`
            UPDATE table_jeux_video_jv
            SET code_barre = ?, type_de_produits = ?, categorie = ?, console = ?, titre = ?, description = ?, PEGI = ?, genre = ?,
            editeur = ?, developpeur = ?, date_de_sortie = ?, langue = ?, pays = ?, code_region = ?, photo = ?, video = ?,
            poid_article = ?
            WHERE code_barre = ?
        `, [ code_barre, type_de_produits, categorie, console, titre, description, PEGI, genre, editeur, developpeur, date_de_sortie,
             langue, pays, code_region, JSON.stringify(photo), JSON.stringify(video), poid_article, id ]);

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
        console.error('Erreur lors la mise à jour des données de la table table_jeux_video_jv :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la mise à jour des données de la table table_jeux_video_jv." });
    };
};

// Fonction asynchrone pour supprimer un jeu vidéo existant dans la base de données
export const deleteGame = async (req, res) => {
    try {
        // Récupération de l'ID du jeu vidéo à partir des paramètres de la requête
        const id = req.params.id;
        if (!id) {
            console.error("L'id du jeu n'a pas été récupéré");
            res.status(404).json({ message: "L'id du jeu n'a pas été récupéré" });
            return;
        }

        // Récupération des photos associées au jeu à partir de la base de données
        let [rowsPhoto] = await pool.query(`
            SELECT photo
            FROM table_jeux_video_jv
            WHERE code_barre = ?
        `, [id]);

        // Suppression des photos stockées si elles existent
        if (rowsPhoto.length > 0) {
            const photo = JSON.parse(rowsPhoto[0].photo);
            if (photo) {
                for (let path of photo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                }
            }
        }

        // Récupération des vidéos associées au jeu à partir de la base de données
        let [rowsVideo] = await pool.query(`
            SELECT video
            FROM table_jeux_video_jv
            WHERE code_barre = ?
        `, [id]);

        // Suppression des vidéos stockées si elles existent
        if (rowsVideo.length > 0) {
            const video = JSON.parse(rowsVideo[0].video);
            if (video) {
                for (let path of video) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketVideos).file(filename).delete();
                }
            }
        }

        // Suppression de l'entrée du jeu dans la base de données
        const del = await pool.query(`
            DELETE FROM table_jeux_video_jv
            WHERE code_barre = ?
        `, [id]);

        // Envoi de la réponse avec un statut HTTP 200 en cas de suppression réussie
        res.status(200).send(del);
    } catch (error) {
        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 400
        console.error('Erreur lors la suppression des données de la table table_jeux_video_jv :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la suppression des données de la table table_jeux_video_jv." });
    }
};
