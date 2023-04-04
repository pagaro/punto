const {validateToken} = require("../validateToken");
// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer les modèles Card, Handle, User et Game depuis les fichiers correspondants
const Card = require("../schema/Card");
const Handle = require("../schema/Handle");
const User = require("../schema/User");
const Game = require("../schema/Game");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui récupère les informations d'une partie de jeu
router.post('/', validateToken, async (req, res) => {
// Récupérer l'ID de la partie de jeu à partir de la requête POST
    const id_game = req.body.id
// Récupérer l'ID utilisateur à partir de la requête POST
    const id = req.id;

    try {
        // Trouver la partie de jeu correspondant à l'ID fourni
        const game = await Game.findById(id_game);

        if (!game) {
            // Si la partie de jeu n'existe pas, renvoyer une erreur
            throw new Error('Game non trouvé');
        }

        // Récupérer les utilisateurs associés à la partie de jeu
        let users = []
        for (const id1 of game.id_users) {
            users.push(await User.findById(id1))
        }

        // Vérifier si l'utilisateur correspondant à l'ID utilisateur fourni est dans la partie de jeu
        const is_in = game.id_users.includes(id)

        var id_handle;

        if (game.id_handles.length === 0) {
            // Si aucun jeu de cartes n'a été créé pour cette partie de jeu, en créer un nouveau
            id_handle = await newHandle(id_game, game.id_users);
            game.id_handles.push(id_handle)
            await game.save()
        } else {
            // TODO: Gérer le cas où il y a plusieurs jeux de cartes associés à une partie de jeu
            id_handle = game.id_handles[0]
        }

        // Trouver le jeu de cartes associé à la partie de jeu
        const handle = await Handle.findById(id_handle);

        // Si la récupération est réussie, renvoyer une réponse JSON avec les informations de la partie de jeu, l'indicateur "is_in", les utilisateurs associés, et le jeu de cartes associé
        return res.status(200).json({ game, is_in: is_in, users, handle });
    } catch (error) {
        // Si une erreur se produit pendant la lecture ou l'écriture dans la base de données MongoDB, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

async function newHandle(id_game,id_users) {
    let hands = {}
    for  (const id_user of id_users){
        hands[id_user] = new Card({color : "RED",number : 5,url: "toto"})
    }

    const handle = new Handle({id_game,hands});
    await handle.save();
    return handle._id
}

module.exports = router;