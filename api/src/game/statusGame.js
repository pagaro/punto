const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const id_game = req.body.id
    console.log(id_game)
    try {
        const game = await Game.findOne({_id: id_game });
        console.log(game)

        if (!game) {
            throw new Error('Game non trouvé');
        }

        return res.status(200).json({name: game.name});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;