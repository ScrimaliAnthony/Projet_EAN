import { useForm } from 'react-hook-form';  // Importation du hook useForm pour gérer les formulaires
import { VarChar } from '../components/VarChar';  // Importation du composant VarChar pour les champs du formulaire
import ky from 'ky';  // Importation de la bibliothèque ky pour les requêtes HTTP
import { useNavigate } from 'react-router-dom';  // Importation du hook useNavigate pour la navigation

export function Connexion() {
    // Initialisation des hooks et des états
    const { register, handleSubmit, formState: { errors } } = useForm();  // useForm pour la gestion du formulaire
    const navigate = useNavigate();  // useNavigate pour la navigation

    // Fonction pour gérer la soumission du formulaire
    const click = async (data) => {
        try {
            // Tentative de connexion avec une requête POST
            const login = await ky.post(`${import.meta.env.VITE_API_URL}user/login`, { json: data }).json();
            
            // Si la connexion réussit, stockage du token et redirection vers la page d'accueil
            localStorage.setItem('authToken', login.token);
            navigate("/");
            console.log("connexion réussie", login);
        } catch (error) {
            // Gestion des erreurs
            console.error(error.response);
        }
    }

    // Rendu du composant
    return (
        <div className='connexion'>
            {/* Champs pour l'identifiant et le mot de passe */}
            <VarChar usage={"identifiant"} max={150} register={register} errors={errors}/>
            <VarChar usage={"mot_de_passe"} max={150} register={register} errors={errors}/>
            
            {/* Bouton pour la soumission du formulaire */}
            <button className='bouton' onClick={handleSubmit(click)}>Valider</button>
        </div>
    )
}