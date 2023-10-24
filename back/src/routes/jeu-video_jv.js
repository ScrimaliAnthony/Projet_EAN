import express from 'express';
// Importer les contrôleurs et les middlewares nécessaires
import { getAllGames, getGameSearch, createGame, updateGame, deleteGame } from '../controllers/jeu-video_jv.js';
import { photoStorage } from '../middleware/multer.js';
import { uploadToGCS } from '../middleware/multer.js';
import { jsonwebtoken } from "../middleware/jsonwebtoken.js";

const router = express.Router();

router.get('/', getAllGames); // Route pour récupérer tous les jeux vidéo
router.get('/:id', getGameSearch); // Route pour rechercher un jeu vidéo par ID
router.post('/', jsonwebtoken, photoStorage.fields([{ name: 'photo', maxCount: 12 }, { name: 'video', maxCount: 1 }]), uploadToGCS, createGame); // Route pour créer un nouveau jeu vidéo
router.put('/:id', jsonwebtoken, photoStorage.fields([{ name: 'photo', maxCount: 12 }, { name: 'video', maxCount: 1 }]), uploadToGCS, updateGame); // Route pour mettre à jour un jeu vidéo
router.delete('/:id', jsonwebtoken, deleteGame); // Route pour supprimer un jeu vidéo

export default router;