// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer le modèle Game depuis le fichier ../schema/Game.js
const Game = require("../schema/Game");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui crée une nouvelle partie de jeu
router.post('/', validateToken, async (req, res) => {
// Récupérer le nom de la partie de jeu à partir de la requête POST
    const name = req.body.name
// Récupérer l'ID utilisateur à partir de la requête POST
    const id = req.id;

    try {
        // Vérifier si le nom de la partie de jeu est vide
        if (!name) {
            // Si le nom de la partie est vide, renvoyer une erreur
            throw new Error('Nom de la partie vide');
        }

        // Créer un nouvel objet Game avec l'ID utilisateur et le nom de la partie fournis
        const game = new Game({ id_users: [id], name: name });

        // Enregistrer la partie de jeu dans la base de données MongoDB
        await game.save();

        // Émettre un événement "gameadded" avec les informations de la partie de jeu nouvellement créée
        req.app.io.emit('gameadded', game);

        // Si l'enregistrement est réussi, renvoyer une réponse JSON avec l'ID de la partie de jeu
        return res.status(200).json({ id: game._id });
    } catch (error) {
        // Si une erreur se produit pendant la création de la partie de jeu, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Exporter l'objet router pour être utilisé dans d'autres fichiers
module.exports = router;