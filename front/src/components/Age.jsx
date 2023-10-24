// Importation du composant Age
export function Age({ register, table, defaultValue }) {
    // "register" est utilisé pour enregistrer ce champ dans le formulaire
    // "table" sert à connaître le contexte dans lequel le composant est utilisé (jeux vidéo ou audiovisuel)
    // "defaultValue" est la valeur par défaut du champ si elle existe

    return (
        <div className="age">
            {/* Définition d'une étiquette pour le champ (vide ici, mais pourrait être renseignée pour l'accessibilité) */}
            <label htmlFor="age"></label>

            {/* Création d'un élément "select" pour la sélection de l'âge ou de la classification */}
            <select id="age"
            {...register('age')} // Enregistre ce champ dans le formulaire
            defaultValue={defaultValue} // Utilise la valeur par défaut si elle existe
            >
                {/* Si le contexte est "jeux vidéo", alors proposer les options suivantes pour la classification PEGI */}
                {table === "jeuxVideo" && (
                    <>
                        <option value="">PEGI</option>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="16">16</option>
                    </>
                )}

                {/* Si le contexte est "audiovisuel", alors proposer les options suivantes pour la classification des âges */}
                {table === "audiovisuel" && (
                    <>
                        <option value="">classification des âges</option>
                        <option value="Tous publics">Tous publics</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    </>
                )}
            </select>
        </div>
    )
}
