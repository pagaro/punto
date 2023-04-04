// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer le modèle Game depuis le fichier ../schema/Game.js
const Game = require("../schema/Game");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui renvoie toutes les parties de jeu en attente
router.post('/', validateToken, async (req, res) => {
    try {
// Trouver toutes les parties de jeu avec un statut "WAIT"
        const games = await Game.find({ status: "WAIT" }).exec();
        if (!games) {
            // Si aucune partie de jeu n'est en attente, renvoyer une erreur
            throw new Error('Pas de Game en cours');
        }

        // Si des parties de jeu sont en attente, renvoyer une réponse JSON avec la liste des parties de jeu
        return res.status(200).json({ games: games });
    } catch (error) {
        // Si une erreur se produit pendant la récupération des parties de jeu en attente, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Exporter l'objet router pour être utilisé dans d'autres fichiers
module.exports = router;;