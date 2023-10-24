import express from 'express';
// Importer les contrôleurs et les middlewares nécessaires
import { getAllAudioVisuel, getAudioVisuelSearch, CreateAudioVisuel, updateAudioVisuel, deleteAudioVisuel } from '../controllers/audiovisuels.js';
import { photoStorage } from '../middleware/multer.js';
import { uploadToGCS } from '../middleware/multer.js';
import { jsonwebtoken } from "../middleware/jsonwebtoken.js";

const router = express.Router();

router.get('/', getAllAudioVisuel); // Route pour récupérer tous les éléments audiovisuels
router.get('/:id', getAudioVisuelSearch); // Route pour rechercher un élément audiovisuel par ID
router.post('/', jsonwebtoken,photoStorage.fields([{ name: 'photo', maxCount: 12 }, { name: 'video', maxCount: 1 }]), uploadToGCS, CreateAudioVisuel); // Route pour créer un nouvel élément audiovisuel
router.put('/:id', jsonwebtoken, photoStorage.fields([{ name: 'photo', maxCount: 12 }, { name: 'video', maxCount: 1 }]), uploadToGCS, updateAudioVisuel); // Route pour mettre à jour un élément audiovisuel
router.delete('/:id', jsonwebtoken, deleteAudioVisuel); // Route pour supprimer un élément audiovisuel

export default router;