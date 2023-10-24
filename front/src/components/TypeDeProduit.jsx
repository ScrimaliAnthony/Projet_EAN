import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Composant pour choisir le type de produit
export function TypeDeProduit({ setTable, setType_de_produits }) {
    // Initialisation du hook de formulaire
    const { register, watch, formState: { errors } } = useForm();

    // Observe le champ 'type_de_produits' pour tout changement
    const type_de_produits = watch('type_de_produits');

    // Met à jour l'état parent `setType_de_produits` à chaque changement de `type_de_produits`
    useEffect(() => {
        setType_de_produits(type_de_produits);
    }, [type_de_produits])

    // Définir le type de formulaire à afficher en fonction du type de produit choisi
    const formChoice = () => {
        setTable(type_de_produits);
    }

    return (
        <div className='typeDeProduit'>
            {/* Élément de formulaire pour sélectionner le type de produit */}
            <label htmlFor="type_de_produits"></label>
            <select 
                // Met à jour l'état `table` lorsqu'un type de produit est sélectionné
                onClick={formChoice}
                id="type_de_produits" 
                {...register('type_de_produits', {
                    required: "Le choix du type de produit est requis"
                })}
            >
                <option value="">type de produit</option>
                <option value="livre">Livre, BD, Revues</option>
                <option value="musique">Musique</option>
                <option value="jeuxVideo">Jeux vidéo</option>
                <option value="audiovisuel">Audiovisuel</option>
            </select>
        
            {/* Affichage des erreurs de validation */}
            {errors.type_de_produits && <p>{errors.type_de_produits.message}</p> }
        </div>
    )
};
