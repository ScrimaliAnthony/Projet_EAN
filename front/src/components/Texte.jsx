// Le composant Texte sert à créer un élément <textarea> pour le formulaire
export function Texte({ usage, cols, rows, register, errors, defaultValue, require }) {

    // Transforme le texte en remplaçant les caractères d'union par des espaces
    // Par exemple, "mon_texte" devient "mon texte"
    let placeholder = usage.replace(/_/g, " ");

    return (
        <div className="texte">
            {/* Label pour le champ <textarea> */}
            <label htmlFor={usage}></label>

            {/* Élément <textarea> */}
            <textarea
                id={usage}  // Identifiant pour associer le label à l'élément <textarea>
                cols={cols}  // Nombre de colonnes pour le <textarea>
                rows={rows}  // Nombre de lignes pour le <textarea>
                placeholder={placeholder}  // Texte indicatif qui apparaîtra dans le <textarea>

                // Enregistrement du champ dans le formulaire via react-hook-form
                {...register(usage, {
                    required: require ? `${usage} est requise` : null  // Message d'erreur si le champ est requis
                })}

                defaultValue={defaultValue}  // Valeur par défaut du champ
            />

            {/* Affichage du message d'erreur si les règles de validation ne sont pas respectées */}
            {errors[usage] && <p>{errors[usage].message}</p>}
        </div>
    )
}