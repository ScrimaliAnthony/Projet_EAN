// Import des hooks et librairies nécessaires
import { useEffect, useState } from "react";  // Import des hooks useEffect et useState depuis React
import { BoutonSupprimer } from "../components/BoutonSupprimer";  // Import du composant BoutonSupprimer, responsable de la suppression d'un produit
import { BoutonModifier } from "../components/BoutonModifier";  // Import du composant BoutonModifier, responsable de la modification d'un produit
import ky from "ky";  // Import de la librairie ky pour les requêtes HTTP

// Déclaration de la fonction Produit, qui est un composant React
export function Produit({ produit, setProduit, setListe, setBouton }) {
    // Déclaration des états locaux du composant
    const [ valide, setValide ] = useState(false);  // État pour savoir si le formulaire est valide ou non
    const [ active, setActive ] = useState(true);  // État pour activer ou désactiver les boutons Supprimer et Modifier

    // Fonction asynchrone pour récupérer les nouveaux détails du produit depuis l'API
    const newProduit = async () => {
        // Requête HTTP GET pour récupérer les détails du produit
        const data = await ky.get(`${import.meta.env.VITE_API_URL}${produit.type_de_produits}/${produit.code_barre}`).json();
        // Mettre à jour l'état produit avec les nouvelles données récupérées
        setProduit(data[0]);
    }

    // Utilisation de useEffect pour exécuter la fonction newProduit lors du montage du composant
    useEffect(() => {
        newProduit();  // Récupération des dernières données du produit lors du montage du composant
    }, []);


    return (
        <div className="produit">
            {/* Condition pour afficher le bloc seulement si le produit est un livre et le formulaire n'est pas valide */}
            {!valide && produit.type_de_produits === "livre" && (
                <div className="produit_bloc">

                    {/* Bloc-1 : Informations générales du livre */}
                    <div className="produit_bloc-1">
                        <div className="titre">
                            <p>Titre</p>
                            <p>{produit.titre}</p>
                        </div>
                        <div className="type_de_produits">
                            <p>Catégorie</p>
                            <p>{produit.type_de_produits}</p>
                        </div>
                        <div className="genre">
                            <p>Genre</p>
                            <p>{produit.genre}</p>
                        </div>
                        <div className="code_barre">
                            <p>Code Barre</p>
                            <p>{produit.code_barre}</p>
                        </div>
                    </div>

                    {/* Bloc-2 : Description du livre */}
                    <div className="produit_bloc-2">
                        <p>description:</p>
                        <div className="description">
                            <p>{produit.description}</p>
                            <div className="produit_bloc-2-5">
                                <div className="editeur">
                                    <p>Éditeur:</p>
                                    <p>{produit.editeur}</p>
                                </div>
                                <div className="auteur">
                                    <p>Auteur:</p>
                                    <p>{produit.auteur}</p>
                                </div>
                                <div className="date_de_publicaton">
                                    <p>Date de publication:</p>
                                    <p>{produit.date_de_sortie}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bloc-3 : Autres informations spécifiques au livre */}
                    <div className="produit_bloc-3">
                        <div className="produit_bloc-4">
                            <p>Format:</p>
                            <p>Zone de commercialisation:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.format}</p>
                            <p>{produit.zone_de_commercialisation}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Age de lecture:</p>
                            <p>Nombre de pages:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.age_de_lecture}</p>
                            <p>{produit.nombre_de_pages}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Langue:</p>
                            <p>Poids de l'article en g:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.langue}</p>
                            <p>{produit.poid_article}</p>
                        </div>
                    </div>
                    
                    {/* Bloc pour afficher les photos du produit */}
                    <div>
                        {produit.photo && 
                            JSON.parse(produit.photo).map((item, index) => (
                                <img 
                                    src={`${item}`}
                                    key={index}
                                />
                            ))
                        }
                    </div>

                </div>
            )}

            {!valide && produit.type_de_produits === "musique" && (
                <div className="produit_bloc">

                    <div className="produit_bloc-1">
                        <div className="titre">
                            <p>Titre</p>
                            <p>{produit.titre}</p>
                        </div>
                        <div className="type_de_produits">
                            <p>Catégorie</p>
                            <p>{produit.type_de_produits}</p>
                        </div>
                        <div className="genre">
                            <p>Genre</p>
                            <p>{produit.genre}</p>
                        </div>
                        <div className="code_barre">
                            <p>Code Barre</p>
                            <p>{produit.code_barre}</p>
                        </div>
                    </div>


                    <div className="produit_bloc-2">
                        <p>description:</p>
                        <div className="description">
                            <p>{produit.description}</p>
                            <div className="produit_bloc-2-5">
                                <div className="editeur">
                                    <p>Artiste:</p>
                                    <p>{produit.artiste}</p>
                                </div>
                                <div className="auteur">
                                    <p>Compostiteur:</p>
                                    <p>{produit.compositeur}</p>
                                </div>
                                <div className="date_de_publicaton">
                                    <p>Éditeur:</p>
                                    <p>{produit.editeur}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="liste_de_titres">{produit.liste_des_titres}</p>

                    <div className="produit_bloc-3">
                        <div className="produit_bloc-4">
                            <p>Format:</p>
                            <p>Edition:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.format}</p>
                            <p>{produit.edition}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Nombre de disque:</p>
                            <p>Pays d'origine:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.nombre_de_disques}</p>
                            <p>{produit.pays_origine}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Zone de commercialisation:</p>
                            <p>Poids de l'article en g:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.zone_de_comercialisation}</p>
                            <p>{produit.poid_article}</p>
                        </div>
                    </div>

                    <div>
                        {produit.photo && 
                            JSON.parse(produit.photo).map((item, index) => (
                                <img 
                                    src={`${item}`}
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </div>
            )}

            {!valide && produit.type_de_produits === "jeuxVideo" && (
                <div className="produit_bloc">
                    <div className="produit_bloc-1">
                        <div className="titre">
                            <p>Titre</p>
                            <p>{produit.titre}</p>
                        </div>
                        <div className="type_de_produits">
                            <p>Catégorie</p>
                            <p>{produit.type_de_produits}</p>
                        </div>
                        <div className="genre">
                            <p>Genre</p>
                            <p>{produit.genre}</p>
                        </div>
                        <div className="code_barre">
                            <p>Code Barre</p>
                            <p>{produit.code_barre}</p>
                        </div>
                    </div>

                    <div className="produit_bloc-2">
                        <p>description:</p>
                        <div className="description">
                            <p>{produit.description}</p>
                            <div className="produit_bloc-2-5">
                                <div className="editeur">
                                    <p>Console:</p>
                                    <p>{produit.console}</p>
                                </div>
                                <div className="auteur">
                                    <p>Développeur:</p>
                                    <p>{produit.developpeur}</p>
                                </div>
                                <div className="date_de_publicaton">
                                    <p>Date de sortie:</p>
                                    <p>{produit.date_de_sortie}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="produit_bloc-3">
                        <div className="produit_bloc-4">
                            <p>Éditeur:</p>
                            <p>Pays d'origine:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.editeur}</p>
                            <p>{produit.pays}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>PEGI:</p>
                            <p>Code région:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.PEGI}</p>
                            <p>{produit.code_region}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Langue:</p>
                            <p>Poids de l'article en g:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.langue}</p>
                            <p>{produit.poid_article}</p>
                        </div>
                    </div>

                    <div>
                        {produit.photo && 
                            JSON.parse(produit.photo).map((item, index) => (
                                <img 
                                    src={`${item}`}
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </div>
            )}

            {!valide && produit.type_de_produits === "audiovisuel" && (
                <div className="produit_bloc">
                    <div className="produit_bloc-1">
                        <div className="titre">
                            <p>Titre</p>
                            <p>{produit.titre}</p>
                        </div>
                        <div className="type_de_produits">
                            <p>Catégorie</p>
                            <p>{produit.type_de_produits}</p>
                        </div>
                        <div className="genre">
                            <p>Genre</p>
                            <p>{produit.genre}</p>
                        </div>
                        <div className="code_barre">
                            <p>Code Barre</p>
                            <p>{produit.code_barre}</p>
                        </div>
                    </div>

                    <div className="produit_bloc-2">
                        <p>description:</p>
                        <div className="description">
                            <p>{produit.description}</p>
                            <div className="produit_bloc-2-5">
                                <div className="editeur">
                                    <p>Réalisateur:</p>
                                    <p>{produit.realisateur}</p>
                                </div>
                                <div className="auteur">
                                    <p>Acteur:</p>
                                    <p>{produit.acteur}</p>
                                </div>
                                <div className="date_de_publicaton">
                                    <p>Date de sortie:</p>
                                    <p>{produit.date_de_sortie}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="produit_bloc-3">
                        <div className="produit_bloc-4">
                            <p>Format:</p>
                            <p>Type:</p>
                            <p>Édition:</p>
                            <p>Format son:</p>
                            <p>studio:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.format}</p>
                            <p>{produit.type}</p>
                            <p>{produit.edition}</p>
                            <p>{produit.Format_son}</p>
                            <p>{produit.studio}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Classification des âges:</p>
                            <p>Durée:</p>
                            <p>Décénie de sortie:</p>
                            <p>Format image:</p>
                            <p>Nombre de disques</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.classification_des_ages}</p>
                            <p>{produit.duree}</p>
                            <p>{produit.decenie_de_sortie}</p>
                            <p>{produit.Format_image}</p>
                            <p>{produit.nombre_de_disques}</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>Pays d'origine:</p>
                            <p>Zone de commercialisation:</p>
                            <p>Langue Originale:</p>
                            <p>Sous titre:</p>
                            <p>poids de l'article en g:</p>
                        </div>
                        <div className="produit_bloc-4">
                            <p>{produit.pays_origine}</p>
                            <p>{produit.commercialisation}</p>
                            <p>{produit.langue_originale}</p>
                            <p>{produit.sous_titre}</p>
                            <p>{produit.poid_article}</p>
                        </div>
                    </div>
                    <div>
                        {produit.photo && 
                            JSON.parse(produit.photo).map((item, index) => (
                                <img 
                                    src={`${item}`}
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </div>
            )}

            <div className="boutons">
                {/* Composant BoutonSupprimer */}
                <BoutonSupprimer
                    id={produit.code_barre}  // L'identifiant du produit, qui est son code-barres
                    table={produit.type_de_produits}  // Le type du produit (par exemple, "jeuxVideo" ou "audiovisuel")
                    setListe={setListe}  // La fonction pour mettre à jour la liste des produits après une suppression
                    active={active}  // État contrôlant si le bouton est activé ou désactivé
                />
                
                {/* Composant BoutonModifier */}
                <BoutonModifier 
                    id={produit.code_barre}  // L'identifiant du produit, qui est son code-barres
                    table={produit.type_de_produits}  // Le type du produit (par exemple, "livre", "musique", "jeuxVideo" ou "audiovisuel"). Utilisé pour déterminer quel formulaire afficher.
                    produit={produit}  // L'objet produit contenant tous ses détails, qui sera passé aux formulaires de modification comme valeur par défaut
                    valide={valide}  // État indiquant si le formulaire de modification est visible ou non
                    setValide={setValide}  // Fonction pour inverser la visibilité du formulaire de modification
                    setListe={setListe}  // Fonction pour mettre à jour la liste des produits, généralement après une modification réussie
                    setBouton={setBouton}  // Fonction pour changer l'état du bouton entre "Rechercher" et "Modifier"
                    active={active}  // État contrôlant si le bouton "Modifier" est activé ou désactivé
                    setActive={setActive}  // Fonction pour activer ou désactiver le bouton "Modifier"
                />
            </div>

        </div>
    )
}