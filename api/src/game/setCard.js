// Importer la fonction validateToken depuis le fichier ../validateToken.js
const { validateToken } = require("../validateToken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer les modèles Handle, Round, User et Game depuis les fichiers correspondants
const Handle = require("../schema/Handle");
const Round = require("../schema/Round");
const User = require("../schema/User");
const Game = require("../schema/Game");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui joue une carte dans une partie de jeu
router.post('/', validateToken, async (req, res) => {
// Récupérer l'ID du jeu de cartes à partir de la requête POST
    const id_handle = req.body.id_handle
// Récupérer l'ID de la carte à jouer à partir de la requête POST
    const id_card = req.body.id_card

// Récupérer l'ID utilisateur à partir de la requête POST
    const id_user = req.id;

// Récupérer les coordonnées de la carte jouée à partir de la requête POST
    const x = req.body.x
    const y = req.body.y

    try {
        // Trouver le jeu de cartes correspondant à l'ID fourni
        const handle = await Handle.findById(id_handle);

        if (!handle) {
            // Si le jeu de cartes n'existe pas, renvoyer une erreur
            throw new Error('Handle non trouvé');
        }

        // Vérifier si la carte à jouer est dans la main du joueur correspondant à l'ID utilisateur fourni
        var index = handle.hands[id].indexOf(id_card);
        if (index !== -1) {
            // Si la carte à jouer est dans la main du joueur, la retirer de la main
            array.splice(index, 1);
        } else {
            // Si la carte à jouer n'est pas dans la main du joueur, renvoyer une erreur
            throw new Error('Card not in your hand');
        }

        // Créer un nouvel objet Round avec les informations de la carte jouée et les coordonnées fournies
        const round = new Round({ id_user, id_card, id_handle, coordinate: { x, y } });

        // Enregistrer l'objet Round dans la base de données MongoDB
        await round.save()

        // Ajouter l'ID du nouvel objet Round à la liste des ID rounds dans le jeu de cartes
        handle.id_rounds.push(round._id)

        // Enregistrer le jeu de cartes mis à jour dans la base de données MongoDB
        await handle.save()

        // Émettre un événement "cardadd" avec les informations du jeu de cartes nouvellement mis à jour
        req.app.io.emit('cardadd', handle);

        // Si l'ajout est réussi, renvoyer une réponse JSON avec les informations du jeu de cartes mis à jour
        return res.status(200).json({ handle });
    } catch (error) {
        // Si une erreur se produit pendant la lecture ou l'écriture dans la base de données MongoDB, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;