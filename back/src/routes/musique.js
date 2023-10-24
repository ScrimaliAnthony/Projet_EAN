import express from "express";
// Importer les contrôleurs et les middlewares nécessaires
import { getAllMusique, getMusiqueSearch, createMusique, updateMusique, deleteMusique } from '../controllers/musique.js';
import { photoStorage } from '../middleware/multer.js';
import { jsonwebtoken } from "../middleware/jsonwebtoken.js";
import { uploadToGCS } from '../middleware/multer.js';

const router = express.Router();

router.get('/', getAllMusique); // Route pour récupérer toutes les musiques
router.get('/:id', getMusiqueSearch); // Route pour rechercher une musique par ID
router.post('/', jsonwebtoken, photoStorage.array('photo', 12), uploadToGCS, createMusique); // Route pour créer une nouvelle musique
router.put('/:id', jsonwebtoken, photoStorage.array('photo', 12), uploadToGCS, updateMusique); // Route pour mettre à jour une musique
router.delete('/:id', jsonwebtoken, deleteMusique); // Route pour supprimer une musique

export default router;