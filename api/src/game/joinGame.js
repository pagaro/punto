const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const User = require("../schema/User");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const id_game = req.body.id
    const id = req.id;
    try {
        const game = await Game.findOne({_id: id_game });

        if (!game) {
            throw new Error('Game non trouvé');
        }

        if (game.id_users.includes(id)) {
            throw new Error('User deja dedans trouvé');
        }

        const user = await User.findById(id);

        if (!user) {
            throw new Error('User non trouvé');
        }

        game.id_users.push(id);
        game.save();

        req.app.io.emit('useradded', user);
        return res.status(200).json(game);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports= router;