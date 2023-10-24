import pool from '../config/database_scrimbox_ean.js';

// Fonction asynchrone pour récupérer tous les codes-barres uniques de la table 'table_unique_code_barre'
export const getAllUniqueCodeBarre = async (req, res) => {
    try {
        // Exécute la requête SQL pour récupérer toutes les entrées de la table
        const [uniqueCodeBarre] = await pool.query(`
            SELECT *
            FROM table_unique_code_barre
        `);

        // Vérifie si la requête retourne des données
        if(!uniqueCodeBarre) {
            console.error("uniqueCodeBarre renvoie undefined ou null");
            res.status(500).json({ message: "uniqueCodeBarre renvoie undefined ou null" });
            return;
        };

        // Vérifie si la table est vide
        if(uniqueCodeBarre.length === 0) {
            console.error("La liste de uniqueCodeBarre est introuvable.");
            res.status(404).json({ message: "La liste de uniqueCodeBarre est introuvable." });
            return;
        };
    
        // Envoie la réponse avec un statut HTTP 200 et les codes-barres récupérés
        res.status(200).json(uniqueCodeBarre);
    } catch (error) {
        console.error('Erreur lors de la récupération des données uniqueCodeBarre :', error);
        res.status(404).json({ message: "Une erreur est survenue lors de la récupération des données uniqueCodeBarre." });
    };
};

// Fonction asynchrone pour créer un nouveau code-barre unique
export const createUniqueCodeBarre = async (req, res) => {
    try {
        const code_barre = req.body.code_barre; // Récupère le code-barre du corps de la requête

        // Insère le nouveau code-barre dans la table
        const verifie = await pool.query(`
            INSERT INTO table_unique_code_barre
            (
                code_barre
            )
            VALUES(?)
        `, [code_barre]);
    
        console.log('Le code barre est valide');
        res.status(201).send(verifie); // Envoie une réponse de succès avec un statut HTTP 201
    } catch (error) {
        if (error.message.includes('Duplicate')) { // Vérifie si le code-barre existe déjà
            console.error('Le code barre existe déjà.', error);
            res.status(409).json({ message: "Le code barre existe déjà." });
        } else {
            console.error('Erreur inattendue.', error); // Autres erreurs
            res.status(500).json({ message: "Erreur inattendue." });
        }
    }
};

// Fonction asynchrone pour supprimer un code-barre unique
export const deleteUniqueCodeBarre = async (req, res) => {
    try {
        const id = req.params.id; // Récupère l'ID du code-barre à partir des paramètres de l'URL

        // Exécute la requête SQL pour supprimer le code-barre
        const del = await pool.query(`
            DELETE FROM table_unique_code_barre
            WHERE code_barre = ?
        `, [id]);

        // Envoie la réponse avec un statut HTTP 200
        res.status(200).send(del);
    } catch (error) {
        console.error('Erreur lors de la suppression des données de la table table_unique_code_barre :', error);
        res.status(400).json({ message: "Une erreur est survenue lors de la suppression des données de la table table_unique_code_barre" });
    };
};
