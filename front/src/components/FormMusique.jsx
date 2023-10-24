// Importation des dépendances et des composants
import { useState } from 'react';
import ky from 'ky';
import { useNavigate } from "react-router-dom";

import { Format } from './Format';
import { Genre } from './Genre';
import { VarChar } from './VarChar';
import { Texte } from './Texte';
import { Edition } from './Edition';
import { Fichier } from './Fichier';

// Composant FormMusique pour ajouter ou modifier une musique
export function FormMusique({ produit, id, code_barre, type_de_produits, table, register, handleSubmit, errors, reset, setTable, setListe }) {
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
            nouveauProduit.append('format', data.format);
            nouveauProduit.append('genre', data.genre);
            nouveauProduit.append('titre', data.titre);
            nouveauProduit.append('description', data.description);
            nouveauProduit.append('liste_des_titres', data.liste_des_titres);
            nouveauProduit.append('edition', data.edition);
            nouveauProduit.append('nombre_de_disques', data.nombre_de_disques);
            nouveauProduit.append('artiste', data.artiste);
            nouveauProduit.append('compositeur', data.compositeur);
            nouveauProduit.append('editeur', data.editeur);
            nouveauProduit.append('pays_origine', data.pays_origine);
            nouveauProduit.append('zone_de_comercialisation', data.zone_de_comercialisation);
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
                    console.log("nouvelle musique ajouté dans la table table_musique");
                    setValide('La musique ' + data.titre + ' a été ajouté à la table table_musique');
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
                    console.log("musique modifié dans la table table_musique");
                    setValide('La musique ' + data.titre + ' a été modifié à la table table_musique');
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
        <div className='formMusique'>
            <div className='formMusique_block-1'>
                <VarChar usage={"titre"} max={150} register={register} errors={errors} defaultValue={produit.titre} require={true}/>
                <VarChar usage={"artiste"} max={150} register={register} errors={errors} defaultValue={produit.artiste} require={true}/>
                <Genre register={register} errors={errors} table={table} defaultValue={produit.genre} require={true}/>
                <VarChar usage={"compositeur"} max={150} register={register} errors={errors} defaultValue={produit.compositeur} />

            </div>
            <Texte usage={"description"} cols={100} rows={20} register={register} errors={errors} defaultValue={produit.description} require={true}/>
            
            <div className='formMusique_block-2'>
                <Texte usage={"liste_des_titres"} cols={50} rows={20} register={register} errors={errors} defaultValue={produit.liste_des_titres} require={true}/>
                <div className='formMusique_block-3'>
                    <div className='formMusique_block-4'>
                        <Format register={register} errors={errors} table={table} defaultValue={produit.format} require={true}/>
                        <Edition register={register} table={table} defaultValue={produit.edition} />
                    </div>
                    <VarChar usage={"nombre_de_disques"} max={10} register={register} errors={errors} defaultValue={produit.nombre_de_disques} require={true}/>
                    <VarChar usage={"editeur"} max={150} register={register} errors={errors} defaultValue={produit.editeur} />
                    <VarChar usage={"pays_origine"} max={25} register={register} errors={errors} defaultValue={produit.pays_origine} />
                    <VarChar usage={"zone_de_comercialisation"} max={25} register={register} errors={errors} defaultValue={produit.zone_de_comercialisation} />
                    <VarChar usage={"poid_article_en_gramme"} max={10} register={register} errors={errors} defaultValue={produit.poid_article_en_gramme} />
                    <Fichier usage={"photo"} register={register} />
                    <button onClick={handleSubmit(onSubmit)}>Valider</button>
                </div>
            </div>

            {valide && <p>{valide}</p> }
        </div>
    )
}