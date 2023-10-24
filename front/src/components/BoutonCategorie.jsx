// Importation des dépendances nécessaires
import ky from "ky";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

// Définition du composant BoutonCategorie
export function BoutonCategorie({ categorie, setTable, setListe, table }) {
    // Utilisation du hook useNavigate pour la navigation programmatique
    const navigate = useNavigate();
    
    // État local pour déterminer si le bouton est actif ou non
    const [ isActive, setIsActive ] = useState(false);

    // Fonction déclenchée lors du clic sur le bouton
    const click = async () => {
        // Appel à l'API pour récupérer les données de la catégorie sélectionnée
        try {
            const data = await ky.get(`${import.meta.env.VITE_API_URL}${categorie}`).json();
            
            // Mise à jour des états `table` et `liste` avec les nouvelles données
            setTable(categorie);
            setListe(data);
            
            // Redirection vers la page d'accueil
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    // Effet pour mettre à jour l'état `isActive` selon la catégorie/table sélectionnée
    useEffect(() => {
        setIsActive(table === categorie);
    }, [table])
    
    // Rendu du composant
    return (
        <>
            {/* Utilisation de la librairie classNames pour ajouter la classe 'active' si le bouton est actif */}
            <button className={classNames("boutonCategorie", {"active": isActive})} onClick={click}>
                {categorie}
            </button>
        </>
    )
}