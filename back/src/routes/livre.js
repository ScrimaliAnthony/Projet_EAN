import express from 'express';
// Importer les contrôleurs et les middlewares nécessaires
import { getAllLivre, getLivreSearch, createLivre, updateLivre, deleteLivre } from '../controllers/livre.js'
import { photoStorage } from '../middleware/multer.js';
import { jsonwebtoken } from "../middleware/jsonwebtoken.js";
import { uploadToGCS } from '../middleware/multer.js';

const router = express.Router();

router.get('/', getAllLivre); // Route pour récupérer tous les livres
router.get('/:id', getLivreSearch); // Route pour rechercher un livre par ID
router.post('/', photoStorage.array('photo', 12), uploadToGCS, createLivre); // Route pour créer un nouveau livre
router.put('/:id', jsonwebtoken, photoStorage.array('photo', 12), uploadToGCS, updateLivre); // Route pour mettre à jour un livre
router.delete('/:id', jsonwebtoken, deleteLivre); // Route pour supprimer un livre

export default router;