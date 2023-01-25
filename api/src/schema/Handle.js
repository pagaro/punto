const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const HandleSchema = new mongoose.Schema({
    id_game: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    id_rounds: {
        type: [Schema.Types.ObjectId],
        default: undefined
    },
});

const Handle = mongoose.model('Game', HandleSchema);

module.exports = Handle;
