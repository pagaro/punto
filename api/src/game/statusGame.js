const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const id_game = req.body.id

    try {
        const game = await Game.findOne({_id: id_game });

        if (!game) {
            throw new Error('Game non trouvé');
        }

        return res.status(200).json(game);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;