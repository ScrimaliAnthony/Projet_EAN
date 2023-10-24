// Importation du composant Edition
export function Edition({ register, table, defaultValue }) {
    // "register" est utilisé pour enregistrer ce champ dans le formulaire
    // "table" est utilisé pour déterminer le type de produit (musique, audiovisuel, etc.)
    // "defaultValue" est la valeur par défaut du champ si elle existe

    return (
        <div>
            <label htmlFor="edition"></label>
            <select id="edition"
            {...register("edition")}  // Enregistre ce champ dans le formulaire
            defaultValue={defaultValue}  // Utilise la valeur par défaut si elle existe
            >
                {/* Option vide pour forcer une sélection */}
                <option value="">Edition</option> 

                {/* Si le type de produit est "musique", affiche ces options d'édition */}
                {table === "musique" && (
                    <>
                        <option value="Album live">Album live</option>
                        <option value="Best of">Best of</option>
                        <option value="Coffret">Coffret</option>
                        <option value="Compilation">Compilation</option>
                        <option value="Edition limitee">Edition limitée</option>
                        <option value="Single">Single</option>
                    </>
                )}

                {/* Si le type de produit est "audiovisuel", affiche ces options d'édition */}
                {table === "audiovisuel" && (
                    <>
                        <option value="Edition simple">Édition simple</option>
                        <option value="Coffret">Coffret</option>
                        <option value="Edition collector">Édition collector</option>
                        <option value="Edition limitee">Édition limitée</option>
                        <option value="Boîtier Metal">Boîtier Métal</option>
                        <option value="Edition speciale">Édition spéciale</option>
                        <option value="Mediabook">Mediabook</option>
                        <option value="Version realisateur">Version realisateur</option>
                        <option value="Version longue">Version longue</option>
                    </>
                )}

            </select>
        </div>
    )
}
