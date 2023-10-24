// Importation des modules nécessaires
import pool from '../config/database_scrimbox_ean.js';
import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';

// Configuration des variables d'environnement
dotenv.config();

// Configuration du service de stockage Google Cloud
const storage = new Storage({
    projectId: process.env.GC_ID,
    keyFilename: process.env.KEYFILE
});

// Configuration du buckets pour les images
const bucketImages = process.env.GC_BUCKETImages;

// Fonction asynchrone pour récupérer tous les livres stockés dans la table 'table_livres' de la base de données
export const getAllLivre = async (req, res) => {
    try {
        // Exécution de la requête SQL pour récupérer toutes les lignes de la table 'table_livres'
        const [livre] = await pool.query(`
            SELECT *
            FROM table_livres
        `);
        // Vérification si la requête SQL retourne 'undefined' ou 'null'
        if (!livre) {
            console.error("livre renvoie undefined ou null");
            res.status(500).json({ message: "livre renvoie undefined ou null" });
            return;
        }
        // Vérification si la liste des livres est vide
        if (livre.length === 0) {
            console.error("La liste de livre est introuvable.");
            res.status(404).json({ message: "La liste de livre est introuvable." });
            return;
        }
        // Envoi de la réponse avec un statut HTTP 200 et la liste des livres en cas de succès
        res.status(200).json(livre);
    } catch (error) {
        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 500
        console.error("Une erreur est survenu lors de la récupération des données de la table livres :", error);
        res.status(500).json({ message: "Une erreur est survenu lors de la récupération des données de la table livres." });
    }
};

// Fonction asynchrone pour rechercher des livres par leur code-barres ou leur titre
export const getLivreSearch = async (req, res) => {
    try {
        // Récupération de l'identifiant du livre à partir des paramètres de la requête
        const id = req.params.id;

        // Vérification de la présence de l'identifiant
        if(!id) {
            console.error("L'id du livre n'a pas été récupéré");
            res.status(404).json({ message: "L'id du livre n'a pas été récupéré" });
            return;
        }

        // Exécution de la requête SQL pour rechercher des livres par leur code-barres ou leur titre
        const [livre] = await pool.query(`
            SELECT *
            FROM  table_livres
            WHERE code_barre LIKE ? OR titre LIKE ?
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `, [`${id}%`, `%${id}%`]);

        // Vérification si la requête SQL retourne 'undefined' ou 'null'
        if(!livre) {
            console.error("Livre renvoie undefined ou null");
            res.status(500).json({ message: "Livre renvoie undefined ou null" });
            return;
        }

        // Vérification si la liste des livres correspondant aux critères est vide
        if(livre.length === 0) {
            console.error("Le livre que vous cherchez n'existe pas dans la base de donnée");
            res.status(404).json({ message: "Le livre que vous cherchez n'existe pas dans la base de donnée" });
            return;
        }

        // Envoi de la réponse avec un statut HTTP 200 et la liste des livres correspondant aux critères
        res.status(200).json(livre);

    } catch (error) {
        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    }
};


// Fonction asynchrone pour créer un nouveau livre dans la base de données
export const createLivre = async (req, res) => {
    // Variable pour stocker les URL des photos du livre
    let photo;
    try {
        // Destructuration de l'objet req.body pour extraire les informations sur le livre
        const {
            code_barre, type_de_produits, format, genre, titre, description, age_de_lecture, langue, zone_de_commercialisation,
            nombre_de_pages, editeur, auteur, date_de_sortie, poid_article
        } = req.body;

        // Vérification si des fichiers photos sont présents dans la requête
        if(req.files) {
            photo = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
        }
        
        // Exécution de la requête SQL pour insérer un nouveau livre dans la table "table_livres"
        const create = await pool.query(`
            INSERT INTO table_livres
            (
                code_barre, type_de_produits, format, genre, titre, description, age_de_lecture, langue, zone_de_commercialisation,
                nombre_de_pages, editeur, auteur, date_de_sortie, photo, poid_article
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [ code_barre, type_de_produits, format, genre, titre, description, age_de_lecture, langue, zone_de_commercialisation,
             nombre_de_pages, editeur, auteur, date_de_sortie, JSON.stringify(photo), poid_article ]);

        // Envoi de la réponse avec un statut HTTP 201 et le résultat de la requête SQL
        res.status(201).send(create);

    } catch (error) {
        // Suppression des photos du livre en cas d'erreur lors de l'insertion dans la base de données
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            }
        }
        
        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 400
        console.error('Erreur lors la création des données de la table livre :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la création des données de la table livres." });
    }
};

// Fonction asynchrone pour mettre à jour un livre existant dans la base de données
export const updateLivre = async (req, res) => {
    // Variable pour stocker les URL des nouvelles photos du livre
    let photo;
    try {
        // Récupération de l'ID du livre à partir des paramètres de la requête
        const id = req.params.id;
        if(!id) {
            console.error("L'id du livre n'a pas été récupéré");
            res.status(404).json({ message: "L'id du livre n'a pas été récupéré" });
            return;
        };

        // Vérification si le livre avec l'ID donné existe dans la base de données
        const [livre] = await pool.query(`
            SELECT *
            FROM table_livres
            WHERE code_barre = ?
        `, [id]);

        // Si le livre n'existe pas, et des fichiers photos ont été envoyés, les supprimer
        if(livre.length === 0) {
            if(req.files) {
                const errPhoto = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
                for(let path of errPhoto) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                };
            }
        };

        // Suppression des anciennes photos associées au livre
        const [rows] = await pool.query(`
            SELECT photo
            FROM table_livres
            WHERE code_barre = ?
        `, [id]);
        
        if(rows.length > 0) {
            const oldphoto = JSON.parse(rows[0].photo);
            for(let path of oldphoto) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            };
        };

        // Extraction des nouvelles données du livre à partir de l'objet req.body
        const {
            code_barre, type_de_produits, format, genre, titre, description, age_de_lecture, langue, zone_de_commercialisation,
            nombre_de_pages, editeur, auteur, date_de_sortie, poid_article
        } = req.body;

        // Si de nouvelles photos sont fournies, les ajouter
        if(req.files) {
            photo = req.files.map(file => process.env.URL_BUCKETImages + file.filename);
        }

        // Mise à jour du livre dans la base de données
        const update = await pool.query(`
            UPDATE table_livres
            SET code_barre = ?, type_de_produits = ?, format = ?, genre = ?, titre = ?, description = ?, age_de_lecture = ?, langue = ?,
            zone_de_commercialisation = ?, nombre_de_pages = ?, editeur = ?, auteur = ?, date_de_sortie = ?, photo = ?, poid_article = ?
            WHERE code_barre = ?
        `, [ code_barre, type_de_produits, format, genre, titre, description, age_de_lecture, langue, zone_de_commercialisation,
             nombre_de_pages, editeur, auteur, date_de_sortie, JSON.stringify(photo), poid_article, id ]);

        // Envoi de la réponse avec un statut HTTP 200 et le résultat de la mise à jour
        res.status(200).send(update);
    } catch (error) {
        // Suppression des nouvelles photos en cas d'erreur lors de la mise à jour
        if(photo) {
            for(let path of photo) {
                let filename = path.split('/').pop();
                await storage.bucket(bucketImages).file(filename).delete();
            };
        }

        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 400
        console.error('Erreur lors la mise à jour des données de la table livre :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la mise à jour des données de la table livres." });
    };
};


// Fonction asynchrone pour supprimer un livre de la base de données
export const deleteLivre = async (req, res) => {
    try {
        // Récupération de l'ID du livre à partir des paramètres de la requête
        const id = req.params.id;
        if(!id) {
            console.error("L'id du livre n'a pas été récupéré");
            res.status(404).json({ message: "L'id du livre n'a pas été récupéré" });
            return;
        };

        // Récupération des URLs des photos associées au livre que nous allons supprimer
        let [rows] = await pool.query(`
            SELECT photo
            FROM table_livres
            WHERE code_barre = ?
        `, [id]);

        // Suppression des photos stockées dans le bucket Google Cloud si elles existent
        if(rows.length > 0) {
            const photo = JSON.parse(rows[0].photo);
            if(photo) {
                console.log(photo);
                for(let path of photo) {
                    let filename = path.split('/').pop();
                    await storage.bucket(bucketImages).file(filename).delete();
                };
            };
        };

        // Suppression du livre de la base de données
        const del = await pool.query(`
            DELETE FROM table_livres
            WHERE code_barre = ?
        `, [id]);

        // Envoi de la réponse avec un statut HTTP 200 et le résultat de la suppression
        res.status(200).send(del);
    } catch (error) {
        // Affichage du message d'erreur et envoi d'une réponse avec un statut HTTP 400
        console.error('Erreur lors la suppression des données de la table livre :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la suppression des données de la table livres." });
    };
};