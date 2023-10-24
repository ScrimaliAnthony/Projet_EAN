// Importe les modules nécessaires et charge les variables d'environnement
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crée un pool de connexions à la base de données MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // Adresse de l'hôte de la base de données
    user: process.env.DB_USER,      // Nom d'utilisateur pour la base de données
    password: process.env.DB_PASSWORD,  // Mot de passe pour la base de données
    database: process.env.DB_NAME  // Nom de la base de données
});

// Exporte le pool pour l'utiliser dans d'autres fichiers
export default pool;