import { useState } from 'react';
import ky from 'ky';
import { useNavigate } from "react-router-dom";

import { Format } from './Format';
import { Genre } from './Genre';
import { Edition } from './Edition';
import { Age } from './Age';
import { Type } from './Type';
import { VarChar } from './VarChar';
import { Texte } from './Texte';
import { Decenie } from './Decenie';
import { Fichier } from './Fichier';

// Le composant FormAudioVisuel pour ajouter ou modifier un produit audiovisuel
export function FormAudiovisuel({ produit, id, code_barre, type_de_produits, table, register, handleSubmit, errors, reset, setTable, setListe }) {
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
            nouveauProduit.append('type', data.type);
            nouveauProduit.append('genre', data.genre);
            nouveauProduit.append('titre', data.titre);
            nouveauProduit.append('description', data.description);
            nouveauProduit.append('classification_des_ages', data.age);
            nouveauProduit.append('langue_originale', data.langue_originale);
            nouveauProduit.append('duree', data.duree);
            nouveauProduit.append('Format_image', data.Format_image);
            nouveauProduit.append('Format_son', data.Format_son);
            nouveauProduit.append('acteur', data.acteur);
            nouveauProduit.append('realisateur', data.realisateur);
            nouveauProduit.append('decenie_de_sortie', data.decenie);
            nouveauProduit.append('date_de_sortie', data.date_de_sortie);
            nouveauProduit.append('sous_titre', data.sous_titre);
            nouveauProduit.append('studio', data.studio);
            nouveauProduit.append('pays_origine', data.pays_origine);
            nouveauProduit.append('nombre_de_disques', data.nombre_de_disques);
            nouveauProduit.append('commercialisation', data.commercialisation);
            nouveauProduit.append('edition', data.edition);
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
                    console.log("AudioVisuel ajouté dans la table table_audiovisuels");
                    setValide('Le livre ' + data.titre + ' a été ajouté à la table table_audiovisuels');
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
                    console.log("AudioVisuel modifié dans la table table_audiovisuels");
                    setValide('L AudioVisuel ' + data.titre + ' a été modifié à la table table_audiovisuels');
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
        <div className='formAudiovisuel'>
            <div className='formAudiovisuel_block'>
                <VarChar usage={"titre"} max={150} register={register} errors={errors} defaultValue={produit.titre} require={true}/>
                <Type register={register} errors={errors} defaultValue={produit.type} />
                <VarChar usage={"realisateur"} max={250} register={register} errors={errors} defaultValue={produit.realisateur} require={true}/>
                <VarChar usage={"acteur"} max={250} register={register} errors={errors} defaultValue={produit.acteur} require={true}/>
            </div>
                <Texte usage={"description"} cols={100} rows={20} register={register} errors={errors} defaultValue={produit.description} require={true}/>
            <div className='formAudiovisuel_block'>
                <Genre register={register} errors={errors} table={table} defaultValue={produit.genre} require={true}/>
                <Format register={register} errors={errors} table={table} defaultValue={produit.format} require={true}/>
                <VarChar usage={"date_de_sortie"} max={40} register={register} errors={errors} defaultValue={produit.date_de_sortie} />
                <Age register={register} table={table} defaultValue={produit.classification_des_ages} />
            </div>
            <div className='formAudiovisuel_block'>
                <VarChar usage={"langue_originale"} max={25} register={register} errors={errors} defaultValue={produit.langue_originale} />
                <VarChar usage={"pays_origine"} max={25} register={register} errors={errors} defaultValue={produit.pays_origine} />
                <VarChar usage={"duree"} max={20} register={register} errors={errors} defaultValue={produit.duree} require={true} />
            </div>
            <div className="formAudiovisuel_block">
                <VarChar usage={"Format_image"} max={100} register={register} errors={errors} defaultValue={produit.Format_image} />
                <VarChar usage={"Format_son"} max={100} register={register} errors={errors} defaultValue={produit.Format_son} />
                <Decenie register={register} defaultValue={produit.decenie_de_sortie} />
                <VarChar usage={"sous_titre"} max={255} register={register} errors={errors} defaultValue={produit.sous_titre} />
            </div>
            <div className="formAudiovisuel_block">
                <VarChar usage={"studio"} max={250} register={register} errors={errors} defaultValue={produit.studio} />
                <VarChar usage={"nombre_de_disques"} max={10} register={register} errors={errors} defaultValue={produit.nombre_de_disques} require={true}/>
                <VarChar usage={"commercialisation"} max={25} register={register} errors={errors} defaultValue={produit.commercialisation} />
            </div>
            <div className="formAudiovisuel_block">
                <Edition register={register} table={table} defaultValue={produit.edition} />
                <Fichier usage={"photo"} register={register} />
                <Fichier usage={"video"} register={register} />
            </div>
            <div className="formAudiovisuel_block">
                <VarChar usage={"poid_article_en_gramme"} max={10} register={register} errors={errors} defaultValue={produit.poid_article_en_gramme} />
                <button onClick={handleSubmit(onSubmit)}>Valider</button>
            </div>

            {valide && <p>{valide}</p> }
        </div>
    )
}