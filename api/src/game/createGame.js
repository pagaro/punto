const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const name = req.body.name
    const id = req.id;
    try {
        if (!name) {
            throw new Error('Nom de la partie vide');
        }

        const game = new Game({id_users: [id],name:name});
        await game.save();
        return res.status(200).json({id: game._id});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;