import express from "express";
// Importer les contrôleurs et les middlewares nécessaires
import { getAllUniqueCodeBarre, createUniqueCodeBarre, deleteUniqueCodeBarre } from "../controllers/unique_code_barre.js";
import { jsonwebtoken } from "../middleware/jsonwebtoken.js";

const router = express.Router();

router.get('/', getAllUniqueCodeBarre); // Route pour récupérer tous les codes-barres uniques
router.post('/', jsonwebtoken, createUniqueCodeBarre); // Route pour créer un nouveau code-barre unique
router.delete('/:id', jsonwebtoken, deleteUniqueCodeBarre); // Route pour supprimer un code-barre unique

export default router;