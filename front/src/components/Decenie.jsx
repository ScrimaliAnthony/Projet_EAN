// Importation du composant Decenie
export function Decenie({ register, defaultValue }) {
    // "register" est utilisé pour enregistrer ce champ dans le formulaire
    // "defaultValue" est la valeur par défaut du champ si elle existe

    return (
        <div className="decenie">
            {/* Définition d'une étiquette pour le champ (vide ici, mais pourrait être renseignée pour l'accessibilité) */}
            <label htmlFor="decenie"></label>

            {/* Création d'un élément "select" pour la sélection de la décénie de sortie */}
            <select id="decenie"
            {...register("decenie")}  // Enregistre ce champ dans le formulaire
            defaultValue={defaultValue}  // Utilise la valeur par défaut si elle existe
            >
                <option value="">Décénie de sortie</option>  // Option vide pour forcer une sélection
                <option value="2020 et après">2020 et après</option>
                <option value="2010 à 1019">2010 à 1019</option>
                <option value="2000 à 2009">2000 à 2009</option>
                <option value="1990 à 1999">1990 à 1999</option>
                <option value="1980 à 1989">1980 à 1989</option>
                <option value="1970 à 1979">1970 à 1979</option>
                <option value="1960 à 1969">1960 à 1969</option>
                <option value="1950 à 1959">1950 à 1959</option>
                <option value="1940 à 1949">1940 à 1949</option>
            </select>
        </div>
    )
}
