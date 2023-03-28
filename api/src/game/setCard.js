const {validateToken} = require("../validateToken");
const express = require('express');
const Game = require("../schema/Game");
const User = require("../schema/User");
const Handle = require("../schema/Handle");
const Round = require("../schema/Round");
const router = express.Router();
router.post('/', validateToken, async (req, res) => {
    const id_handle = req.body.id_handle
    const id_card = req.body.id_card
    const id_user = req.id;
    const x = req.body.x
    const y = req.body.y


    try {
        const handle = await Handle.findById(id_handle);

        if (!handle) {
            throw new Error('Handle non trouvé');
        }

        var index = handle.hands[id].indexOf(id_card);
        if (index !== -1) {
            array.splice(index, 1);
        }else {
            throw new Error('Card not in your hand');
        }

        const round = new Round({id_user,id_card ,id_handle,coordinate :{x,y}});
        await round.save()

        handle.id_rounds.push(round._id)
        await handle.save()


        req.app.io.emit('cardadd', handle);

        return res.status(200).json({handle});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;