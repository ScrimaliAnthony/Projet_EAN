import { useForm } from 'react-hook-form';  // Import du hook useForm de la librairie react-hook-form
import { useNavigate } from 'react-router-dom';  // Import du hook useNavigate pour la navigation entre les pages

// Import des composants de formulaires pour chaque type de produit
import { FormLivre } from "./FormLivre";
import { FormMusique } from "./FormMusique";
import { FormJeuVideo } from "./FormJeuVideo";
import { FormAudiovisuel } from "./FormAudiovisuel";

// Déclaration du composant BoutonModifier
export function BoutonModifier({ table, id, produit, setValide, valide, setListe, setBouton, setActive, active }) {
    // Initialisation des hooks et des états
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    // Extraire les détails du produit pour plus de lisibilité
    const code_barre = produit.code_barre;
    const type_de_produits = produit.type_de_produits;

    // Fonction exécutée lorsque le bouton "Modifier" est cliqué
    const click = () => {
        setValide(!valide)  // Inverser l'état 'valide'
        setBouton("Rechercher")  // Mettre à jour le texte du bouton
        setActive(false);  // Désactiver le bouton
        navigate(`/produit/${produit.code_barre}`)  // Naviguer vers la page de détails du produit
    }

    return (
        <>
            { active && <button className="btnModifier" onClick={click}>Modifier</button> }
            {/* Les composants de formulaires sont conditionnellement rendus selon le type de produit */}
            { valide && table === "livre" && (
                <FormLivre
                    produit={produit} id={id}
                    code_barre={code_barre} type_de_produits={type_de_produits}
                    table={table}
                    register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                    setListe={setListe}
                />
            )}

            {valide && table === "musique" && (
                <FormMusique
                    produit={produit} id={id}
                    code_barre={code_barre} type_de_produits={type_de_produits}
                    table={table}
                    register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                    setListe={setListe}
                />
            )}

            {valide && table === "jeuxVideo" && (
                <FormJeuVideo
                    produit={produit} id={id}
                    code_barre={code_barre} type_de_produits={type_de_produits}
                    table={table}
                    register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                    setListe={setListe}
                />
            )}

            {valide && table === "audiovisuel" && (
                <FormAudiovisuel
                    produit={produit} id={id}
                    code_barre={code_barre} type_de_produits={type_de_produits}
                    table={table}
                    register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                    setListe={setListe}
                />
            )}
        </>
    )
}