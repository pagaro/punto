const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    try {
        const games = await Game.find({status: "WAIT"}).exec();

        if (!games) {
            throw new Error('Pas de Game en cours');
        }

        return res.status(200).json({games: games});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;