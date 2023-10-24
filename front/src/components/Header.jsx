// Importation des modules nécessaires
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from 'react-icons/bi';
import { BoutonCategorie } from "./BoutonCategorie";
import ky from "ky";
import { useNavigate, NavLink } from "react-router-dom";

// Composant Header, qui gère la navigation, la recherche et la catégorisation des produits.
export function Header({ table, setTable, setListe, bouton, setBouton }) {
    // Utilisation du hook useForm de react-hook-form pour gérer le formulaire de recherche
    const { register, handleSubmit, watch } = useForm();
    
    // État local pour gérer la page actuelle dans l'application
    const [ page, setPage ] = useState('');
    
    // Utilisation du hook watch pour suivre la valeur du champ de recherche en temps réel
    const id = watch('rechercher');
    
    // Utilisation du hook useNavigate pour la navigation programmatique
    const navigate = useNavigate();
    
    // Fonction pour récupérer la liste initiale des produits ou autres éléments en fonction de 'table'
    const accueil = async () => {
        try {
            const data = await ky.get(`${import.meta.env.VITE_API_URL}produit`).json();
            setListe(data)
        } catch (error) {
            console.log('La liste est vide')
        }
    }
    
    // Effet pour charger la liste initiale au montage du composant
    useEffect(() => {
        accueil();
    }, [])
    
    // Effet pour mettre à jour l'état 'page' en fonction de la valeur de 'bouton'
    useEffect(() => {
        setPage(bouton === "Rechercher" ? '' : 'nouveau');
    }, [bouton]);
    
    // Fonction pour basculer entre les deux modes: "Rechercher" et "Nouveau"
    const choix = () => {
        setBouton(bouton === "Rechercher" ? "Nouveau" : "Rechercher");
        navigate(`/${page}`);
    }
    
    // Fonction pour effectuer une recherche en fonction de la catégorie actuelle et de l'ID
    const rechercher = async () => {
        try {
            const data = await ky.get(`${import.meta.env.VITE_API_URL}${table}/${id}`).json();
            setListe(data);
        } catch (error) {
            console.log('La liste est vide')
        }
    }
    
    // Rendu du composant Header
    return (
        <div className="header">
            {/* Affichage du logo */}
            <img 
                className="logo"
                src='/images/logo.jpg' 
            />
            
            {/* Bouton de navigation vers la page de connexion */}
            <NavLink to={"/connexion"} className="navlink">
                <button>Connexion</button>
            </NavLink>
            
            {/* Section contenant les éléments de recherche */}
            <div className="rechercher">
                <div className="rechercher_block">
                    {/* Formulaire de recherche qui apparaît lorsque le bouton n'est pas sur "Rechercher" */}
                    {bouton !== "Rechercher" && (
                        <form className="rechercher_formulaire" onSubmit={handleSubmit(rechercher)}>
                            <input 
                                id="rechercher"
                                placeholder="Rechercher"
                                {...register("rechercher")}
                            />
                            <button><BiSearch /></button>
                        </form>
                    )}
                    
                    {/* Bouton pour basculer entre les options "Rechercher" et "Nouveau" */}
                    <button onClick={choix} className="rechercher_choix">{bouton}</button>
                </div>
                
                {/* Boutons de catégorie pour filtrer les résultats de la recherche */}
                {bouton !== "Rechercher" && (
                    <div className="rechercher_boutonCategorie">
                        <BoutonCategorie categorie={"produit"} setTable={setTable} setListe={setListe} table={table} />
                        <BoutonCategorie categorie={"livre"} setTable={setTable} setListe={setListe} table={table} />
                        <BoutonCategorie categorie={"musique"} setTable={setTable} setListe={setListe} table={table} />
                        <BoutonCategorie categorie={"jeuxVideo"} setTable={setTable} setListe={setListe} table={table} />
                        <BoutonCategorie categorie={"audiovisuel"} setTable={setTable} setListe={setListe} table={table} />
                    </div>
                )}
            </div>
        </div>
    )
}