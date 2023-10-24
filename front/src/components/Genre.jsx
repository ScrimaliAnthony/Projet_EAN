// Importation du composant Genre
export function Genre({ register, errors, table, defaultValue, require }) {
    // "register" est utilisé pour enregistrer ce champ dans le formulaire
    // "errors" contient les erreurs éventuelles pour ce champ
    // "table" est utilisé pour déterminer le type de produit (musique, jeux vidéo, etc.)
    // "defaultValue" est la valeur par défaut du champ si elle existe
    // "require" indique si le champ est obligatoire ou non

    return (
        <div className="genre">
            <label htmlFor="genre"></label>
            <select id="genre"
            {...register("genre", {
                required: require ? "Le choix du genre est requis" : null
            })}
            defaultValue={defaultValue}
            >
                <option value="">Genre</option>

                {table === "musique" && (
                    <>
                        <option value="Musique classique">Musique classique</option>
                        <option value="Musique country">Musique country</option>
                        <option value="Musique electronique">Musique électronique</option>
                        <option value="Flamenco">Flamenco</option>
                        <option value="Musique folk">Musique folk</option>
                        <option value="R&B, Soul et Funk">R&B, Soul et Funk</option>
                        <option value="Musique gothique">Musique gothique</option>
                        <option value="Chanson française">Chanson française</option>
                        <option value="Rap & hip-hop">Rap & hip-hop</option>
                        <option value="Musique instrumentale">Musique instrumentale</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Musique latine">Musique latine</option>
                        <option value="Mambo">Mambo</option>
                        <option value="Musique new age">Musique new age</option>
                        <option value="Polka">Polka</option>
                        <option value="Pop">Pop</option>
                        <option value="Reggae">Reggae</option>
                        <option value="Musique regionale">Musique régionale</option>
                        <option value="Rock">Rock</option>
                        <option value="Surf music">Surf music</option>
                        <option value="Zouk">Zouk</option>
                        <option value="Musique acoustique">Musique acoustique</option>
                        <option value="Musique d'ambiance">Musique d'ambiance</option>
                        <option value="Musique de jeu video">Musique de jeu vidéo</option>
                        <option value="Poesie chantee">Poésie chantée</option>
                        <option value="Musique publicitaire">Musique publicitaire</option>
                        <option value="Musique de relaxation">Musique de relaxation</option>
                        <option value="Pop Rock">Pop Rock</option>
                        <option value="Hard Rock">Hard Rock</option>
                        <option value="Heavy Metal">Heavy Metal</option>
                        <option value="Bandes originales de films">Bandes originales de films</option>
                        <option value="Musique pour enfants">Musique pour enfants</option>
                        <option value="Musique Oriental">Musique Oriental</option>
                    </>
                )}

                {table === "jeuxVideo" && (
                    <>
                        <option value="Beat them up">Beat them up</option>
                        <option value="Hack'n' slash">Hack'n' slash</option>
                        <option value="Combat">Combat</option>
                        <option value="Plates-formes">Plates-formes</option>
                        <option value="Shoot'em up">Shoot'em up</option>
                        <option value="FPS">FPS</option>
                        <option value="GTA-like">GTA-like</option>
                        <option value="Infiltration">Infiltration</option>
                        <option value="Metroidvania">Metroidvania</option>
                        <option value="Survie">Survie</option>
                        <option value="Survival horror">Survival horror</option>
                        <option value="Aventure graphique">Aventure graphique</option>
                        <option value="Point'n click">Point'n click</option>
                        <option value="Fiction interactive">Fiction interactive</option>
                        <option value="Film interactif">Film interactif</option>
                        <option value="Visual novel">Visual novel</option>
                        <option value="Myst-like">Myst-like</option>
                        <option value="Walking simulator">Walking simulator</option>
                        <option value="RPG">RPG</option>
                        <option value="Action aventure">Action aventure</option>
                        <option value="Action RPG">Action RPG</option>
                        <option value="Dungeon RPG">Dungeon RPG</option>
                        <option value="Roguelike">Roguelike</option>
                        <option value="Tactical RPG">Tactical RPG</option>
                        <option value="Animal de compagnie virtuel">Animal de compagnie virtuel</option>
                        <option value="God game">God game</option>
                        <option value="Gestion">Gestion</option>
                        <option value="Wargame">Wargame</option>
                        <option value="Strategie tour par tour">Strategie tour par tour</option>
                        <option value="Carte à collectionner">Carte à collectionner</option>
                        <option value="Strategie temps reel">Strategie temps réel</option>
                        <option value="Tower defense">Tower defense</option>
                        <option value="4X">4X</option>
                        <option value="Grande Strategie">Grande Stratégie</option>
                        <option value="Rythme">Rythme</option>
                        <option value="Party game">Party game</option>
                        <option value="Bac à sable">Bac à sable</option>
                    </>
                )}

                {table === "audiovisuel" && (
                    <>
                        <option value="Action">Action</option>
                        <option value="Aventure">Aventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedie">Comédie</option>
                        <option value="Dram & emotion">Dram & émotion</option>
                        <option value="Enfant, jeunesse et famille">Enfant, jeunesse et famille</option>
                        <option value="Espionnage">Espionnage</option>
                        <option value="Fantastique">Fantastique</option>
                        <option value="Guerre">Guerre</option>
                        <option value="Histoire">Histoire</option>
                        <option value="Horreur et epouvante">Horreur et épouvante</option>
                        <option value="Film musical">Film musical</option>
                        <option value="Policier">Policier</option>
                        <option value="Romance">Romance</option>
                        <option value="Science fiction">Science fiction</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Western">Western</option>
                        <option value="Erotique +16 ans">Erotique +16 ans</option>
                        <option value="Film pour Adulte +18 ans">Film pour Adulte +18 ans</option>
                        <option value="Documentaire">Documentaire</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Foi et spiritualite">Foi et spiritualité</option>
                        <option value="LGBTQ+">LGBTQ+</option>
                        <option value="Loisir et passions">Loisir et passions</option>
                        <option value="Spectacle">Spectacle</option>
                        <option value="Sport">Sport</option>
                        <option value="Tele realite">Télé réalité</option>
                    </>
                )}

            </select>
            
            {errors.genre && <p>{errors.genre.message}</p>}
        </div>
    )
}