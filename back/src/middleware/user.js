import pool from '../config/database_scrimbox_ean.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const { identifiant, mot_de_passe } = req.body;

    // Vérification des paramètres obligatoires
    if(!identifiant || !mot_de_passe) {
        return res.status(400).json({ message: "Identifiant et mot de passe requis" })
    }

    // Vérification de la longueur de l'identifiant et du mot de passe
    const MAX_LENGTH = 30;
    const MIN_LENGTH = 6;
    if(identifiant.length > MAX_LENGTH || identifiant.length < MIN_LENGTH || 
       mot_de_passe.length > MAX_LENGTH || mot_de_passe.length < MIN_LENGTH) {
        return res.status(400).json({ message: "L'identifiant et le mot de passe doivent comporter entre 6 et 30 caractères." })
    }

    try {
        // Hachage du mot de passe
        const hashMDP = await bcrypt.hash(mot_de_passe, 10);

        // Insertion du nouvel utilisateur dans la base de données
        const create = await pool.query
        (`
            INSERT INTO table_utilisateur
            (identifiant, mot_de_passe)
            VALUES (?, ?)
        `, [identifiant, hashMDP]);

        res.status(201).json({ message: "Utilisateur créé avec succès!" });
    } catch (error) {
        console.error('Erreur lors de la création d\'un nouvel utilisateur :', error);
        res.status(500).json({ message: "Une erreur est survenue lors de la création d'un nouvel utilisateur." });
    }
}

// Fonction pour gérer la connexion des utilisateurs
export const login = async (req, res) => {
    // Récupération de l'identifiant et du mot de passe à partir du corps de la requête
    const { identifiant, mot_de_passe } = req.body;

    // Validation des données d'entrée
    if(!identifiant || !mot_de_passe) {
        return res.status(400).json({ message: "Identifiant et mot de passe requis" })
    }

    try {
        // Recherche de l'utilisateur dans la base de données
        const [user] = await pool.query
        (`
            SELECT * 
            FROM table_utilisateur 
            WHERE identifiant = ?
        `, [identifiant]);

        // Vérification de l'existence de l'utilisateur
        if (!user || !user[0]) {
            return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
        }

        // Comparaison du mot de passe entré avec le mot de passe stocké
        const match = await bcrypt.compare(mot_de_passe, user[0].mot_de_passe);

        // Si les mots de passe ne correspondent pas
        if(!match) {
            return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
        }
        
        // Création du token JWT
        const token = jwt.sign(
            { id: user[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );
        
        // Réponse en cas de succès
        res.status(200).json({ message: "Authentification réussie!", token: token });
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de l\'authentification de l\'utilisateur :', error);
        res.status(500).json({ message: "Une erreur est survenue lors de l'authentification de l'utilisateur." });
    }
}