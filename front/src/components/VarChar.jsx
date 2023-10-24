// Le composant VarChar est utilisé pour créer des champs de texte qui acceptent des caractères variables
export function VarChar({ usage, max, register, errors, defaultValue, require }) {
    return (
        <div className="varChar">
            {/* Label pour le champ de saisie */}
            <label htmlFor={usage}></label>
            
            {/* Le champ de saisie */}
            <input 
                id={usage}  // Identifiant pour associer le label au champ de saisie
                placeholder={usage}  // Texte indicatif dans le champ de saisie
                
                // Utilisation de register pour enregistrer ce champ dans le formulaire
                // En utilisant les règles pour la validation (required et maxLength)
                {...register(usage, {
                    required: require ? `Le ${usage} est requis` : null,
                    maxLength: { value: max, message: `Le ${usage} ne peux faire plus de ${max} caractères` }
                })}
                
                // Valeur par défaut du champ de saisie
                defaultValue={defaultValue}
            />
            
            {/* Affichage d'un message d'erreur si les règles de validation ne sont pas respectées */}
            {errors[usage] && <p>{errors[usage].message}</p>}
        </div>
    )
}
