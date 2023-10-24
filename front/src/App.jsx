// Importation des modules nécessaires pour la gestion du routage et de l'état local
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Importation des composants et des pages de l'application
import { Header } from './components/Header';
import { Rechercher } from './pages/Rechercher';
import { Nouveau } from './pages/Nouveau';
import { Connexion } from './pages/Connexion';
import { Produit } from './pages/Produit';

// Composant principal de l'application qui orchestre le routage et la gestion de l'état partagé
export function App() {
  // Définition des états locaux avec leurs valeurs initiales
  // - table: contient le nom de la table/catégorie actuellement sélectionnée (par défaut "produit")
  // - liste: contient la liste des éléments récupérés depuis l'API
  // - produit: contient les détails d'un produit sélectionné pour la vue détaillée
  // - bouton: contient le texte à afficher sur le bouton pour basculer entre les vues "Nouveau" et "Rechercher"
  const [ table, setTable ] = useState("produit");
  const [ liste, setListe ] = useState();
  const [ produit, setProduit ] = useState();
  const [ bouton, setBouton ] = useState("Nouveau");

  // Rendu du composant principal
  return (
    // Utilisation de BrowserRouter pour gérer le routage de l'application
    <BrowserRouter>
      {/* Le composant Header sert à la navigation et à la recherche. Il partage plusieurs états avec d'autres composants de l'application via les props. */}
      <Header table={table} setTable={setTable} setListe={setListe} bouton={bouton} setBouton={setBouton} />
      {/* Configuration des routes de l'application pour chaque page */}
      <Routes>
        {/* Route de la page de recherche. Les états 'liste' et 'produit' sont passés en tant que props pour une gestion partagée. */}
        <Route path="/" element={<Rechercher liste={liste} setProduit={setProduit} produit={produit} setListe={setListe} />} />
        
        {/* Route de la page de détail d'un produit. L'état du produit et la fonction pour le modifier sont passés en tant que props */}
        <Route path='/produit/:id' element={<Produit produit={produit} setProduit={setProduit} setListe={setListe} setBouton={setBouton} />} />
        
        {/* Route de la page pour ajouter un nouveau produit. L'état 'bouton' est passé via les props */}
        <Route path="/nouveau" element={<Nouveau bouton={bouton} setBouton={setBouton} />} />
        
        {/* Route de la page de connexion */}
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  );
};