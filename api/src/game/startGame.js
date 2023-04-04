// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer le modèle Game depuis le fichier ../schema/Game.js
const Game = require("../schema/Game");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui change le statut d'une partie de jeu en "RUNNING"
router.post('/', validateToken, async (req, res) => {
// Récupérer l'ID de la partie de jeu à partir de la requête POST
    const id_game = req.body.id
    try {
        // Trouver la partie de jeu correspondant à l'ID fourni
        const game = await Game.findOne({ _id: id_game });

        if (!game) {
            // Si la partie de jeu n'existe pas, renvoyer une erreur
            throw new Error('Game non trouvé');
        }

        // Changer le statut de la partie de jeu en "RUNNING"
        game.status = 'RUNNING';

        // Enregistrer la partie de jeu mise à jour dans la base de données MongoDB
        await game.save();

        // Si la mise à jour est réussie, renvoyer une réponse JSON avec les informations de la partie de jeu mise à jour
        return res.status(200).json(game);
    } catch (error) {
        // Si une erreur se produit pendant la lecture ou l'écriture dans la base de données MongoDB, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;