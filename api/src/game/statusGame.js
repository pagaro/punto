const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const User = require("../schema/User");
const Handle = require("../schema/Handle");
const Card = require("../schema/Card");
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
            users.push(await User.findById(id1))
        }


        const is_in = game.id_users.includes(id)
        var id_handle;

        if (game.id_handles.length === 0){
            id_handle = await newHandle(id_game,game.id_users);
            game.id_handles.push(id_handle)
            await game.save()
        }else{
            // todo
            id_handle = game.id_handles[0]
        }

        const handle = await Handle.findById(id_handle);

        return res.status(200).json({game, is_in: is_in,users,handle});
    } catch (error) {
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