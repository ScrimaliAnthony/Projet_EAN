import { useState } from "react";
import ky from 'ky';
import { useNavigate } from "react-router-dom";

import { Fichier } from "./Fichier";
import { Format } from "./Format";
import { Texte } from "./Texte";
import { VarChar } from "./VarChar";

// Le composant FormLivre pour ajouter ou modifier un livre
export function FormLivre({ produit, id, code_barre, type_de_produits, table, register, handleSubmit, errors, reset, setTable, setListe }) {
    // État pour afficher un message de validation en cas de succès
    const [ valide, setValide ] = useState('');
    // Pour la navigation entre les pages
    const navigate = useNavigate();
    // Récupération du jeton d'authentification depuis le stockage local
    const token = localStorage.getItem('authToken');

    // Vérification si l'objet produit existe, sinon l'initialiser à une chaîne vide
    if(!produit) {
        produit = ""
    }

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (data) => {
        try {
            // Créer un nouveau FormData pour stocker les données du produit
            const nouveauProduit = new FormData();
            nouveauProduit.append('code_barre', code_barre);
            nouveauProduit.append('type_de_produits', type_de_produits);
            nouveauProduit.append('format', data.format);
            nouveauProduit.append('genre', data.genre);
            nouveauProduit.append('titre', data.titre);
            nouveauProduit.append('description', data.description);
            nouveauProduit.append('age_de_lecture', data.age_de_lecture);
            nouveauProduit.append('langue', data.langue);
            nouveauProduit.append('zone_de_commercialisation', data.zone_de_commercialisation);
            nouveauProduit.append('nombre_de_pages', data.nombre_de_pages);
            nouveauProduit.append('editeur', data.editeur);
            nouveauProduit.append('auteur', data.auteur);
            nouveauProduit.append('date_de_sortie', data.date_de_sortie);
            for(let i = 0; i < data.photo.length; i++) {
                nouveauProduit.append('photo', data.photo[i]);
            };
            nouveauProduit.append('poid_article', data.poid_article_en_gramme);

            // Vérification de l'existence du produit pour choisir entre une création et une mise à jour
            let response
            if(!produit) {
                // Si non, ajouter un nouveau produit via une requête POST
                response = await ky.post(`${import.meta.env.VITE_API_URL}${table}`, { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: nouveauProduit 
                });
                
                if(response && response.status === 201) {
                    console.log("nouveau livre ajouté dans la table table_livre");
                    setValide('Le livre ' + data.titre + ' a été ajouté à la table table_livre');
                    const code_barreValide = {
                        code_barre: code_barre
                    }
                    console.log(code_barreValide);
                    await ky.post(`${import.meta.env.VITE_API_URL}uniqueCodeBarre`, { 
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        json: code_barreValide 
                    });
                    setTable("");
                }
            } else {
                // Si oui, mettre à jour le produit existant via une requête PUT
                response = await ky.put(`${import.meta.env.VITE_API_URL}${table}/${id}`, { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: nouveauProduit 
                });
                
                if(response && response.status === 200) {
                    console.log("livre modifié dans la table table_livre");
                    setValide('Le livre ' + data.titre + ' a été modifié à la table table_livre');
                    const data2 = await ky.get(`${import.meta.env.VITE_API_URL}${table}`).json();
                    setListe(data2);
                    navigate("/");
                }
            }
                // Réinitialiser le formulaire
                reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
        }
    }

    // Structure du formulaire
    return (
        <div className="formLivre">
            {/* Bloc pour les champs de type VarChar et Format */}
            <div className="formLivre_block">
                <VarChar usage={"titre"} max={150} register={register} errors={errors} defaultValue={produit.titre} require={true}/>
                <VarChar usage={"auteur"} max={100} register={register} errors={errors} defaultValue={produit.auteur} />
                <VarChar usage={"genre"} max={50} register={register} errors={errors} defaultValue={produit.genre} require={true}/>
                <Format register={register} errors={errors} table={table} defaultValue={produit.format} require={true}/> 
            </div>
            {/* Texte est pour des champs textuels multi-lignes comme la description */}
            <Texte usage={"description"} cols={100} rows={20} register={register} errors={errors} defaultValue={produit.description} require={true}/>
            <div className="formLivre_block">
                <VarChar usage={"langue"} max={25} register={register} errors={errors} defaultValue={produit.langue} require={true}/>
                <VarChar usage={"editeur"} max={100} register={register} errors={errors} defaultValue={produit.editeur} />
                <VarChar usage={"nombre_de_pages"} max={10} register={register} errors={errors} defaultValue={produit.nombre_de_pages} require={true}/>
            </div>
            <div className="formLivre_block">
                <VarChar usage={"date_de_sortie"} max={20} register={register} errors={errors} defaultValue={produit.date_de_sortie} />
                <VarChar usage={"age_de_lecture"} max={5} register={register} errors={errors} defaultValue={produit.age_de_lecture} />
                <VarChar usage={"zone_de_commercialisation"} max={50} register={register} errors={errors} defaultValue={produit.zone_de_commercialisation} />
            </div>
            {/* Utilisation du composant Fichier pour le téléchargement de fichiers */}
            <div className="formLivre_block">
                <Fichier usage={"photo"} register={register} />
                <VarChar usage={"poid_article_en_gramme"} max={10} register={register} errors={errors} defaultValue={produit.poid_article_en_gramme} />
                <button onClick={handleSubmit(onSubmit)}>Valider</button>
            </div>

            {valide && <p>{valide}</p> }
        </div>
    )
}