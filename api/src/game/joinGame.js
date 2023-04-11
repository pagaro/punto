// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer le modèle Game depuis le fichier ../schema/Game.js
const Game = require("../schema/Game");

// Importer le modèle User depuis le fichier ../schema/User.js
const User = require("../schema/User");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui ajoute un utilisateur à une partie de jeu
router.post('/', validateToken, async (req, res) => {
// Récupérer l'ID de la partie de jeu à partir de la requête POST
    const id_game = req.body.id
// Récupérer l'ID utilisateur à partir de la requête POST
    const id = req.id;

    try {
        // Trouver la partie de jeu correspondant à l'ID fourni
        const game = await Game.findOne({ _id: id_game });

        if (!game) {
            // Si la partie de jeu n'existe pas, renvoyer une erreur
            throw new Error('Game non trouvé');
        }

        if (game.id_users.includes(id)) {
            // Si l'utilisateur est déjà dans la partie de jeu, renvoyer une erreur
            throw new Error('User deja dedans trouvé');
        }

        // Trouver l'utilisateur correspondant à l'ID fourni
        const user = await User.findById(id);

        if (!user) {
            // Si l'utilisateur n'existe pas, renvoyer une erreur
            throw new Error('User non trouvé');
        }

        // Ajouter l'ID utilisateur à la liste des ID utilisateurs dans la partie de jeu
        game.id_users.push(id);

        // Enregistrer la partie de jeu mise à jour dans la base de données MongoDB
        await game.save();

        // Émettre un événement "useradded" avec les informations de l'utilisateur nouvellement ajouté
        req.app.io.emit('useradded', user);

        // Si l'ajout est réussi, renvoyer une réponse JSON avec les informations de la partie de jeu mise à jour
        return res.status(200).json(game);
    } catch (error) {
        // Si une erreur se produit pendant l'ajout de l'utilisateur à la partie de jeu, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Exporter l'objet router pour être utilisé dans d'autres fichiers
module.exports = router;