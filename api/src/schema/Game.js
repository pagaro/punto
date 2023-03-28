const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id_users: {
        type: [Schema.Types.ObjectId],
        required: true,
        maxItems: 4,
        minItems: 1,
    },
    status: {
        type: String,
        enum: ['WAIT', 'RUNNING', 'BREAK', 'FINISHED'],
        default: 'WAIT',
    },
    id_handles: {
        type: [Schema.Types.ObjectId],
        default: [],
        maxItems: 5,
        minItems: 0,
    },
});



const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
