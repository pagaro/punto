const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const id_game = req.body.id
    const id = req.id;

    try {
        const game = await Game.findById(id_game);

        if (!game) {
            throw new Error('Game non trouvé');
        }

        let users = []

        for (const id1 of game.id_users) {
            users.push(await Game.findById(id1))
        }


        const is_in = game.id_users.includes(id)

        return res.status(200).json({game, is_in: is_in,users});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;