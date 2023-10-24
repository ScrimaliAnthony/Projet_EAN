// Ce composant est conçu pour gérer le téléchargement de fichiers dans un formulaire.
export function Fichier({ register, usage }) {
    return(
        <div className="fichier">
            {/* L'étiquette (label) pour le champ de téléchargement de fichier */}
            <label htmlFor={usage}>{usage}</label>

            {/* Le champ de saisie pour le téléchargement de fichier. Le type est défini comme "file" */}
            <input 
                type="file" // Spécifie que le type d'entrée est un fichier
                id={usage}  // Identifiant unique pour le champ, correspondant à l'usage du fichier
                {...register(usage)} // Enregistre le champ dans le formulaire
                multiple // Permet de sélectionner plusieurs fichiers
            />
        </div>
    )
}