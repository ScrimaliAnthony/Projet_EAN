// Importation du hook useNavigate pour effectuer des navigations programmées entre les routes
import { useNavigate } from "react-router-dom";

// Composant Rechercher qui affiche une liste de produits et permet de naviguer vers les détails de chaque produit
export function Rechercher({ liste, setProduit }) {
    // Utilisation de useNavigate pour naviguer programmétiquement vers la page de détails d'un produit
    const navigate = useNavigate();

    // Fonction exécutée lors du clic sur un élément de la liste de produits
    const click = (item) => {
        // Met à jour l'état 'produit' avec les informations de l'objet 'item' (produit sélectionné)
        setProduit(item);

        // Navigation vers la page de détails du produit en utilisant le code-barres comme identifiant dans l'URL
        navigate(`/produit/${item.code_barre}`);
    }

    // Rendu du composant
    return (
        <div className="liste">
            {/* Vérifie si la liste est non nulle puis mappe chaque produit (représenté par 'item') */}
            {liste && liste.map(item => (
                <div className="liste_block" key={item.code_barre} onClick={() => click(item)}>
                    <div className="liste_block_titre">
                        {/* Affiche le titre et le type du produit contenu dans 'item' */}
                        <h1>{item.titre}</h1>
                        <h2>{item.type_de_produits}</h2>
                    </div>
                    <div className="liste_block_img">
                        {/* Affiche le code-barres et, si une photo est disponible, l'image du produit */}
                        <p>{item.code_barre}</p>
                        {item.photo && <img src={JSON.parse(item.photo)[0]} alt="Image du produit" />}
                    </div>
                </div>
            ))}
        </div>
    );
}