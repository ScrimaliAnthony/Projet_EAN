// Import des modules nécessaires
import pool from '../config/database_scrimbox_ean.js';  // Import de la configuration de la base de données
import dotenv from 'dotenv';  // Import du module pour la gestion des variables d'environnement
import { Storage } from '@google-cloud/storage';  // Import de la bibliothèque Google Cloud Storage

// Chargement des variables d'environnement
dotenv.config();

// Configuration de Google Cloud Storage
const storage = new Storage({
    projectId: process.env.GC_ID,  // Identifiant du projet Google Cloud
    keyFilename: process.env.KEYFILE  // Emplacement du fichier clé pour l'authentification
});

// Nom du bucket pour stocker les images
const bucketName = process.env.GC_BUCKETImages;

// Fonction asynchrone pour obtenir tous les éléments de la table 'table_musiques'
export const getAllMusique = async (req, res) => {
    try {
        // Requête SQL pour récupérer tous les enregistrements de la table 'table_musiques'
        const [musique] = await pool.query(`
            SELECT *
            FROM table_musiques
        `);
        // Vérifie si 'musique' est indéfini ou nul
        if(!musique) {
            console.error("musique renvoie undefined ou null");
            res.status(500).json({ message: "musique renvoie undefined ou null" });
            return;
        };
        // Vérifie si aucun enregistrement n'a été trouvé
        if(musique.length === 0) {
            console.error("La liste de musique est introuvable.");
            res.status(404).json({ message: "La liste de musique est introuvable." });
            return;
        };
        
        // Envoie la réponse avec un statut HTTP 200 et les données de la table 'table_musiques'
        res.status(200).json(musique);
    } catch (error) {
        // Gestion des erreurs : affiche le message d'erreur et envoie une réponse avec un statut HTTP 400
        console.error('Erreur lors de la récupération des données de la table musique :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données de la table musique" });
    };
};


// Fonction asynchrone pour obtenir des éléments de la table 'table_musiques' en fonction d'une recherche
export const getMusiqueSearch = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de l'URL
        const id = req.params.id;
        // Vérification si l'ID est présent
        if(!id) {
            console.error("L'id du livre n'a pas été récupéré");
            res.status(404).json({ message: "L'id du livre n'a pas été récupéré" });
            return;
        };

        // Requête SQL pour récupérer les enregistrements correspondant à la recherche
        // La recherche se fait soit par code_barre, soit par titre
        const [musique] = await pool.query(`
            SELECT *
            FROM table_musiques
            WHERE code_barre LIKE ? OR titre LIKE ?
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `, [`${id}%`, `%${id}%`]);

        // Vérifie si 'musique' est indéfini ou nul
        if(!musique) {
            console.error("musique renvoie undefined ou null");
            res.status(500).json({ message: "musique renvoie undefined ou null" });
            return;
        };
        // Vérifie si aucun enregistrement n'a été trouvé
        if(musique.length === 0) {
            console.error("La musique que vous cherchez n'existe pas dans la base de donnée");
            res.status(404).json({ message: "La musique que vous cherchez n'existe pas dans la base de donnée" });
            return;
        };

        // Envoie la réponse avec un statut HTTP 200 et les données correspondant à la recherche
        res.status(200).json(musique);
    } catch (error) {
        // Gestion des erreurs : affiche le message d'erreur et envoie une réponse avec un statut HTTP 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    };
};


// Fonction asynchrone pour créer un nouvel enregistrement dans la table 'table_musiques'
export const createMusique = async (req, res) => {
    let photo; // Variable pour stocker les URLs des photos
    try {
        // Destructuration pour obtenir les différentes propriétés de req.body
        const {
            code_barre, type_de_produits, format, genre, titre, description, liste_des_titres, edition, nombre_de_disques,
            artiste, compositeur, editeur, pays_origine, zone_de_comercialisation, poid_article
        } = req.body;

        // Si des fichiers photo sont inclus dans la requête
        if(req.files) {
            photo = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
        }

        // Requête SQL pour insérer les données dans la table 'table_musiques'
        const create = await pool.query(`
            INSERT INTO table_musiques
            (
                code_barre, type_de_produits, format, genre, titre, description, liste_des_titres, edition, nombre_de_disques,
                artiste, compositeur, editeur, pays_origine, zone_de_comercialisation, photo, poid_article 
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [ code_barre, type_de_produits, format, genre, titre, description, liste_des_titres, edition, nombre_de_disques,
             artiste, compositeur, editeur, pays_origine, zone_de_comercialisation, JSON.stringify(photo), poid_article ]);

        // Envoie la réponse avec un statut HTTP 201 et les données créées
        res.status(201).send(create);
    } catch (error) {
        // En cas d'erreur, supprime les fichiers photo téléchargés
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketName).file(filename).delete();
            };
        }
        // Gestion des erreurs : affiche le message d'erreur et envoie une réponse avec un statut HTTP 400
        console.error('Erreur lors de la création des données de la table musique :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la création des données de la table musique" });
    };
};

// Fonction asynchrone pour mettre à jour un enregistrement existant dans la table 'table_musiques'
export const updateMusique = async (req, res) => {
    let photo; // Variable pour stocker les URLs des photos

    try {
        const id = req.params.id; // Récupère l'ID du produit à partir des paramètres de l'URL
        if(!id) { // Vérifie si l'ID est présent
            console.error("L'id du livre n'a pas été récupéré"); // Log l'erreur
            res.status(404).json({ message: "L'id du livre n'a pas été récupéré" }); // Renvoie un statut 404
            return;
        };

        // Requête SQL pour obtenir les détails de la musique correspondante à l'ID
        const [musique] = await pool.query(`
            SELECT *
            FROM table_musiques
            WHERE code_barre = ?
        `, [id]);

        // Supprime les photos en cas d'erreur
        if(musique.length === 0) {
            if(req.files) {
                const errPhoto = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
                for(let path of errPhoto) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketName).file(filename).delete();
                };
            }
        };

        // Requête SQL pour obtenir les anciennes photos associées à la musique
        const [rows] = await pool.query(`
            SELECT photo
            FROM table_musiques
            WHERE code_barre = ?
        `, [id]);

        // Supprime les anciennes photos
        if(rows.length > 0) {
            const oldphoto = JSON.parse(rows[0].photo);
            for(let path of oldphoto) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketName).file(filename).delete();
            };
        };
        
        // Destructuration pour obtenir les nouvelles propriétés à partir de req.body
        const {
            code_barre, type_de_produits, format, genre, titre, description, liste_des_titres, edition, nombre_de_disques,
            artiste, compositeur, editeur, pays_origine, zone_de_comercialisation, poid_article
        } = req.body;

        // Si des fichiers photo sont inclus dans la requête
        if(req.files) {
            photo = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
        }

        // Requête SQL pour mettre à jour les données
        const update = await pool.query(`
            UPDATE table_musiques
            SET code_barre = ?, type_de_produits = ?, format = ?, genre = ?, titre = ?, description = ?, liste_des_titres = ?,
            edition = ?, nombre_de_disques = ?, artiste = ?, compositeur = ?, editeur = ?, pays_origine = ?,
            zone_de_comercialisation = ?, photo = ?, poid_article = ?
            WHERE code_barre = ?
        `, [ code_barre, type_de_produits, format, genre, titre, description, liste_des_titres, edition, nombre_de_disques,
             artiste, compositeur, editeur, pays_origine, zone_de_comercialisation, JSON.stringify(photo), poid_article, id ]);

        // Envoie la réponse avec un statut HTTP 200 et les données mises à jour
        res.status(200).send(update);
    } catch (error) {
        // Supprime les photos en cas d'erreur
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketName).file(filename).delete();
            };
        }
        
        // Gestion des erreurs : log et envoie un message d'erreur avec un statut HTTP 400
        console.error('Erreur lors de la mise à jour des données de la table musique :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la mise à jour des données de la table musique" });
    };
};


// Fonction asynchrone pour supprimer un enregistrement existant dans la table 'table_musiques'
export const deleteMusique = async (req, res) => {
    try {
        const id = req.params.id; // Récupère l'ID du produit à partir des paramètres de l'URL
        if(!id) { // Vérifie si l'ID est présent
            console.error("L'id de la musique n'a pas été récupéré"); // Log l'erreur
            res.status(404).json({ message: "L'id de la musique n'a pas été récupéré" }); // Renvoie un statut 404
            return;
        };

        // Requête SQL pour obtenir les anciennes photos associées à la musique
        const [rows] = await pool.query(`
            SELECT photo
            FROM table_musiques
            WHERE code_barre = ?
        `, [id]);

        // Supprime les anciennes photos
        if(rows.length > 0) {
            const photo = JSON.parse(rows[0].photo);
            if(photo) {
                for(let path of photo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketName).file(filename).delete();
                };
            }
        };

        // Requête SQL pour supprimer l'enregistrement
        const del = await pool.query(`
            DELETE FROM table_musiques
            WHERE code_barre = ?
        `, [id]);

        // Envoie la réponse avec un statut HTTP 200 et les données supprimées
        res.status(200).send(del);
    } catch (error) {
        // Gestion des erreurs : log et envoie un message d'erreur avec un statut HTTP 400
        console.error('Erreur lors de la suppression des données de la table musique :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la suppression des données de la table musique" });
    };
};
