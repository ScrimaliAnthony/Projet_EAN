import express from 'express';  // Importe le module Express
import { produitRoutes, uniqueCodeBarreRoutes, jvRoutes, audioVisuelRoutes, livreRoutes, musiqueRoutes, userRoutes } from './routes/index.js';  // Importe les routes depuis index.js
import path from 'path';  // Module Node.js pour gérer les chemins de fichiers
import cors from 'cors';  // Middleware CORS pour permettre les requêtes cross-origin

const app = express();  // Crée une nouvelle application Express

// Utilise divers middlewares
app.use(cors());  // Active CORS
app.use(express.json());  // Parse les requêtes JSON

// Configure les routes
app.use('/produit', produitRoutes);
app.use('/uniqueCodeBarre', uniqueCodeBarreRoutes);
app.use('/livre', livreRoutes);
app.use('/musique', musiqueRoutes);
app.use('/jeuxVideo', jvRoutes);
app.use('/audiovisuel', audioVisuelRoutes);
app.use('/user', userRoutes);

// Sert les fichiers statiques (photos et vidéos)
app.use('/uploads/photos', express.static(path.resolve('uploads', 'photos')));
app.use('/uploads/videos', express.static(path.resolve('uploads', 'videos')));


export default app;  // Exporte l'application pour utilisation dans d'autres fichiers