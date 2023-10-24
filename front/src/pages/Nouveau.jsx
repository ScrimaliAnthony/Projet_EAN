// Import des hooks et des composants nécessaires
import { useState } from "react";
import { useForm } from 'react-hook-form';

import { CodeBarre } from "../components/CodeBarre";
import { TypeDeProduit } from "../components/TypeDeProduit";
import { FormLivre } from "../components/FormLivre";
import { FormMusique } from "../components/FormMusique";
import { FormJeuVideo } from "../components/FormJeuVideo";
import { FormAudiovisuel } from "../components/FormAudiovisuel";

// Composant Nouveau pour ajouter un nouveau produit
export function Nouveau({ bouton, setBouton }) {
    // Initialisation des hooks
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [ code_barre, setCode_barre ] = useState();  // Stocke le code-barres du produit
    const [ valideCodeBarre, setValideCodeBarre ] =  useState();  // État pour savoir si le code-barres est valide
    const [ table, setTable ] = useState();  // Type de produit (livre, musique, jeuxVideo, audiovisuel)
    const [ type_de_produits, setType_de_produits] = useState();  // Sous-type du produit (pour des usages futurs)

    // Rendu du composant
    return (
        <div >
            {/* Si le bouton indique "Rechercher", afficher le formulaire pour un nouveau produit */}
            {bouton === "Rechercher" && (
                <form className="nouveau">
                    <div className="nouveau_block-1">
                        {/* Composant pour saisir le code-barres */}
                        <CodeBarre
                            setCode_barre={setCode_barre}
                            setValideCodeBarre={setValideCodeBarre} valideCodeBarre={valideCodeBarre}
                            register={register} handleSubmit={handleSubmit} watch={watch} errors={errors}
                        />

                        {/* Si le code-barres est valide, afficher le composant pour sélectionner le type de produit */}
                        {valideCodeBarre && 
                            <TypeDeProduit
                                setTable={setTable}
                                setType_de_produits={setType_de_produits}
                            />
                        }
                    </div>

                    {/* Afficher le formulaire spécifique en fonction du type de produit sélectionné */}

                    {table === "livre" &&
                        <FormLivre
                            code_barre={code_barre} type_de_produits={type_de_produits}
                            table={table} setTable={setTable}
                            register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                            setBouton={setBouton}
                        />
                    }

                    {table === "musique" &&
                        <FormMusique 
                            code_barre={code_barre} type_de_produits={type_de_produits}
                            table={table} setTable={setTable}
                            register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                            setBouton={setBouton}
                        />
                    }
                    
                    {table === "jeuxVideo" &&
                        <FormJeuVideo
                            code_barre={code_barre} type_de_produits={type_de_produits}
                            table={table} setTable={setTable}
                            register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                            setBouton={setBouton}
                        />
                    }

                    {table === "audiovisuel" &&
                        <FormAudiovisuel
                            code_barre={code_barre} type_de_produits={type_de_produits}
                            table={table} setTable={setTable}
                            register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}
                            setBouton={setBouton}
                        />
                    }
                </form>
            )}
        </div>
    )
};