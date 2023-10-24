import { useState } from 'react';
import ky from 'ky';
import { useNavigate } from "react-router-dom";

import { Format } from './Format';
import { Genre } from './Genre';
import { VarChar } from './VarChar';
import { Texte } from './Texte';
import { Age } from './Age';
import { Fichier } from './Fichier';

// Composant FormJeuVideo pour ajouter ou modifier un jeu vidéo
export function FormJeuVideo({ produit, id, code_barre, type_de_produits, table, register, handleSubmit, errors, reset, setTable, setListe }) {
    // État pour afficher un message de validation en cas de succès
    const [ valide, setValide] = useState('');
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
            nouveauProduit.append('categorie', 'Jeux video');
            nouveauProduit.append('console', data.format);
            nouveauProduit.append('titre', data.titre);
            nouveauProduit.append('description', data.description);
            nouveauProduit.append('PEGI', data.age);
            nouveauProduit.append('genre', data.genre);
            nouveauProduit.append('editeur', data.editeur);
            nouveauProduit.append('developpeur', data.developpeur);
            nouveauProduit.append('date_de_sortie', data.date_de_sortie);
            nouveauProduit.append('langue', data.langue);
            nouveauProduit.append('pays', data.pays);
            nouveauProduit.append('code_region', data.code_region);
            for(let i = 0; i < data.photo.length; i++) {
                nouveauProduit.append('photo', data.photo[i]);
            };
            nouveauProduit.append('video', data.video[0]);
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
                    console.log("nouveau jeu vidéo ajouté dans la table table_jeux_video_jv");
                    setValide('Le jeu vidéo ' + data.titre + ' a été ajouté à la table table_jeux_video_jv');
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
                    console.log("jeu vidéo modifié dans la table table_jeux_video_jv");
                    setValide('Le jeu vidéo ' + data.titre + ' a été modifié à la table table_jeux_video_jv');
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
        <div className='formJeuVideo'>
            <div className='formJeuVideo_block'>
                <VarChar usage={"titre"} max={150} register={register} errors={errors} defaultValue={produit.titre} require={true}/>
                <Format register={register} errors={errors} table={table} defaultValue={produit.console} require={true}/>
                <Genre register={register} errors={errors} table={table} defaultValue={produit.genre} require={true}/>
            </div>
            <Texte usage={"description"} cols={100} rows={20} register={register} errors={errors} defaultValue={produit.description} require={true}/>
            <div className='formJeuVideo_block'>
                <VarChar usage={"editeur"} max={100} register={register} errors={errors} defaultValue={produit.editeur} />
                <VarChar usage={"developpeur"} max={100} register={register} errors={errors} defaultValue={produit.developpeur} />
                <VarChar usage={"date_de_sortie"} max={40} register={register} errors={errors} defaultValue={produit.date_de_sortie} />
                <Age register={register} table={table} defaultValue={produit.PEGI} />
            </div>
            <div className='formJeuVideo_block'>
                <VarChar usage={"langue"} max={25} register={register} errors={errors} defaultValue={produit.langue} />
                <VarChar usage={"pays"} max={40} register={register} errors={errors} defaultValue={produit.pays} />
                <VarChar usage={"code_region"} max={10} register={register} errors={errors} defaultValue={produit.code_region} />
                <VarChar usage={"poid_article_en_gramme"} max={10} register={register} errors={errors} defaultValue={produit.poid_article_en_gramme} />
            </div>
            <div className='formJeuVideo_block'>
                <Fichier usage={"photo"} register={register} />
                <Fichier usage={"video"} register={register} />
                <button onClick={handleSubmit(onSubmit)}>Valider</button>
            </div>
            

            {valide && <p>{valide}</p> }
        </div>
    )
}