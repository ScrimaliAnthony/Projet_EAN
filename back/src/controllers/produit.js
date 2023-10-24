import pool from '../config/database_scrimbox_ean.js';

// Fonction asynchrone pour récupérer tous les produits de la table 'vue_produits'
export const getAllProduit = async (req, res) => {
    try {
        // Exécute la requête SQL pour récupérer toutes les entrées de la table 'vue_produits'
        const [produit] = await pool.query(`
            SELECT *
            FROM vue_produits
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `);
        if(!produit) {
            // Log si la requête ne retourne pas de données
            console.error("produit renvoie undefined ou null");
            res.status(500).json({ message: "produit renvoie undefined ou null" });
            return;
        };

        // Envoie la réponse avec un statut HTTP 200 et les produits récupérés
        res.status(200).json(produit);
    } catch (error) {
        // Gestion des erreurs : log et envoie un message d'erreur avec un statut HTTP 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    };
};

// Fonction asynchrone pour effectuer une recherche dans la table 'vue_produits'
export const getProduitSearch = async (req, res) => {
    try {
        const id = req.params.id; // Récupère l'ID du produit à partir des paramètres de l'URL
        if(!id) { // Vérifie si l'ID est présent
            console.error("L'id du produit n'a pas été récupéré"); // Log l'erreur
            res.status(404).json({ message: "L'id du produit n'a pas été récupéré" }); // Renvoie un statut 404
            return;
        };

        // Exécute la requête SQL pour effectuer une recherche sur 'code_barre' et 'titre'
        const [produit] = await pool.query(`
            SELECT *
            FROM vue_produits
            WHERE code_barre LIKE ? OR titre LIKE ?
            ORDER BY titre ASC, type_de_produits ASC, titre ASC
        `, [`${id}%`, `%${id}%`]);
        if(!produit) { // Vérifie si la requête renvoie des données
            console.error("produit renvoie undefined ou null"); // Log l'erreur
            res.status(500).json({ message: "produit renvoie undefined ou null" }); // Renvoie un statut 500
            return;
        };
        if(produit.length === 0) { // Vérifie si des produits ont été trouvés
            console.error("Le produit que vous cherchez n'existe pas dans la base de donnée"); // Log l'erreur
            res.status(404).json({ message: "Le produit que vous cherchez n'existe pas dans la base de donnée" }); // Renvoie un statut 404
            return;
        };

        // Envoie la réponse avec un statut HTTP 200 et les produits trouvés
        res.status(200).json(produit);
    } catch (error) {
        // Gestion des erreurs : log et envoie un message d'erreur avec un statut HTTP 400
        console.error('Erreur lors de la récupération des données :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la récupération des données" });
    };
};
