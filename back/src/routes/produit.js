import express from 'express';
// Importer les contrôleurs nécessaires
import { getAllProduit, getProduitSearch } from '../controllers/produit.js';

const router = express.Router();

router.get('/', getAllProduit); // Route pour récupérer tous les produits
router.get('/:id', getProduitSearch); // Route pour rechercher un produit par ID

export default router;