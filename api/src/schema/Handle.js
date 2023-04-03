const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const HandleSchema = new mongoose.Schema({
    id_game: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    id_rounds: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    hands: {
        type: Map,
        of: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const Handle = mongoose.model('Handle', HandleSchema);

module.exports = Handle;
