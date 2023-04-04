// Importer le module express pour créer des routes
const express = require("express");

// Importer la fonction validateToken depuis le fichier validateToken.js
const { validateToken } = require("../validateToken");

// Créer un nouvel objet router en utilisant express.Router()
const router = express.Router();

// Définir une route GET pour l'URL '/' qui vérifie si le token est valide en utilisant la fonction validateToken
router.get('/', validateToken, (req, res) => {
// Si le token est valide, renvoyer une réponse JSON avec un message
    return res.status(200).json({ message: 'Token is valid' });
});

// Exporter le router pour être utilisé dans d'autres fichiers
module.exports = router;