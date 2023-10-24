// Import des librairies et hooks nécessaires
import ky from "ky";  // Import de la librairie ky pour les requêtes HTTP
import { useNavigate } from "react-router-dom";  // Import du hook useNavigate pour la navigation

// Déclaration du composant BoutonSupprimer
export function BoutonSupprimer({ id, table, setListe, active }) {
    const navigate = useNavigate();  // Utilisation du hook useNavigate pour contrôler la navigation
    const token = localStorage.getItem('authToken');  // Récupération du token d'authentification depuis le localStorage

    // Fonction asynchrone pour supprimer un produit
    const supprimer = async () => {
        try {
            // Requête HTTP DELETE pour supprimer le produit depuis la table spécifique
            await ky.delete(`${import.meta.env.VITE_API_URL}${table}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Ajout du token d'authentification dans les headers
                },
            });
            
            // Requête HTTP DELETE pour supprimer le code-barres unique du produit
            await ky.delete(`${import.meta.env.VITE_API_URL}uniqueCodeBarre/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Ajout du token d'authentification dans les headers
                },
            });
            
            // Requête HTTP GET pour récupérer la liste à jour des produits
            const data = await ky.get(`${import.meta.env.VITE_API_URL}${table}`).json();
            
            setListe(data);  // Mise à jour de la liste des produits
            console.log("suppression réussie");  // Message de succès dans la console
            navigate("/");  // Navigation vers la page d'accueil
        } catch (error) {
            console.error("Erreur de suppression:", error);  // Affichage de l'erreur dans la console si la suppression échoue
        }
    }

    return (
        // Rendu du bouton "Supprimer" si le bouton est activé
        <>
            {active && <button className="btnSupprimer" onClick={supprimer}>Supprimer</button>}
        </>
    )
}