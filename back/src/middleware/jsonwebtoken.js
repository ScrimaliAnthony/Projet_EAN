// Importer le package jsonwebtoken
import jwt from 'jsonwebtoken';

// Middleware pour vérifier le JWT (JSON Web Token)
export const jsonwebtoken = (req, res, next) => {
    // Récupérer le champ "Authorization" dans les headers de la requête
    const authHeader = req.headers.authorization;

    // Extraire le token du champ "Authorization"
    const token = authHeader && authHeader.split(' ')[1];

    // Si un token est fourni
    if (token) {
        // Vérifier la validité du token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // Si la vérification échoue
            if (err) {
                console.error("non autorisé", err)
                return res.status(403).json({ message: "non autorisé" })
            }

            // Si la vérification réussit, ajouter l'utilisateur au contexte de la requête
            req.user = user;

            // Passer au prochain middleware ou routeur
            next();
        });
    } else {
        // Si aucun token n'est fourni, renvoyer une réponse "Unauthorized"
        return res.sendStatus(401);
    }
};