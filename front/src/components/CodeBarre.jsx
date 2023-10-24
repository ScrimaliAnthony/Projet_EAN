import { useState, useEffect } from 'react';
import ky from 'ky';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// Composant pour la gestion des codes-barres
export function CodeBarre({ setCode_barre, setValideCodeBarre, valideCodeBarre, register, handleSubmit, watch, errors }) {
    const [ message, setMessage ] = useState(''); // Message à afficher à l'utilisateur
    const code_barre = watch('code_barre'); // Écoute les changements du champ 'code_barre'
    const token = localStorage.getItem('authToken'); // Token d'authentification depuis le stockage local
    const navigate = useNavigate(); // Hook pour la navigation

    // Mise à jour de code_barre dans l'état parent lorsque le champ 'code_barre' change
    useEffect(() => {
        setCode_barre(code_barre);
    }, [code_barre]);

    // Validation basique du code-barres (nombre de chiffres)
    useEffect(() => {
        if (code_barre < 10000000 || code_barre > 9999999999999) {
            setMessage('');
            setValideCodeBarre(false);
        }
    }, [code_barre]);

    // Fonction asynchrone pour la validation du code-barres via une requête API
    const click = async (data) => {
        try {
            // Requête POST pour vérifier l'unicité du code-barres
            const response = await ky.post(`${import.meta.env.VITE_API_URL}uniqueCodeBarre`, {
                headers: { 'Authorization': `Bearer ${token}` },
                json: data
            });
            
            setMessage('');
            if (response && response.status === 201) {
                setValideCodeBarre(true);
                setMessage("Le code barre est valide");
                
                // Suppression du code-barres temporaire de la base de données
                await ky.delete(`${import.meta.env.VITE_API_URL}uniqueCodeBarre/${code_barre}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
        } catch (error) {
            // Gestion des erreurs
            if (error.response && error.response.status === 409) {
                const errorData = await error.response.json();
                setMessage(errorData.message);
                setValideCodeBarre(false);
            } else if (error.response && error.response.status === 403) {
                navigate("/connexion");
                setValideCodeBarre(false);
            } else {
                setMessage("Une erreur est survenue lors de l'envoi du formulaire");
                setValideCodeBarre(false);
            }
            console.error('Erreur lors de l\'envoi du formulaire:', error);
        }
    };

    // Rendu du composant
    return (
        <div className="codeBarre" >
            <div className='codeBarre_block-1'>
                <label htmlFor="code_barre"></label>
                <input 
                    className={classNames({"codeBarreValide": message})}
                    type="number"
                    id="code_barre"
                    placeholder="code barre"
                    {...register('code_barre', {
                        required: true,
                        min: { value: 10000000, message: "le code barre doit faire minimum 8 chiffres" },
                        max: { value: 9999999999999, message: "Le code barre ne peut pas faire plus de 13 chiffres" }
                    })}
                />
                {/* Bouton pour valider le code-barres */}
                {!valideCodeBarre && <button onClick={handleSubmit(click)}>Valider</button>}
            </div>

            {/* Affichage des erreurs */}
            {errors.code_barre && <p>{errors.code_barre.message}</p>}
        </div>
    );
};