// Importation du composant Type
export function Type({ register, errors, defaultValue }) {
    // "register" est utilisé pour enregistrer ce champ dans le formulaire
    // "errors" contient les erreurs éventuelles pour ce champ
    // "defaultValue" est la valeur par défaut du champ si elle existe

    return (
        <div className="type">
            <label htmlFor="type"></label>

            <select id="type"
            {...register("type", {
                required: "Le type est requis"  // Le champ est obligatoire
            })}
            defaultValue={defaultValue}  // Valeur par défaut pour le champ
            >
                <option value="">Type</option>
                <option value="Film">Film</option>
                <option value="Serie">Série</option>
                <option value="Anime Japonais">Animé Japonais</option>
                <option value="Dessin anime">Dessin animé</option>
            </select>

            {/* Affiche un message d'erreur si le champ n'est pas correctement rempli */}
            {errors.type && <p>{errors.type.message}</p>}
        </div>
    )
}
