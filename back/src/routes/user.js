import express from "express";
// Importer les middlewares nécessaires pour la gestion des utilisateurs
import { createUser, login } from "../middleware/user.js";

const router = express.Router();

router.post('/create', createUser); // Route pour créer un nouvel utilisateur
router.post('/login', login); // Route pour authentifier un utilisateur
export default router;