import app from './app.js';  // Importe l'application Express depuis app.js

// Définit le port sur lequel le serveur écoutera
const PORT = process.env.PORT || 8080;

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Affiche un message dans la console lorsque le serveur démarre
});