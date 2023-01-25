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
        validate: [arrayLimitUsers(), '{PATH} exceeds the limit of 4']
    },
    status: {
        type: String,
        enum: ['WAIT', 'RUNNING', 'BREAK', 'FINISHED'],
        default: 'WAIT',
    },
    id_handles: {
        type: [Schema.Types.ObjectId],
        default: undefined,
        validate: [arrayLimitHandles(), '{PATH} exceeds the limit of 5']
    },
});

function arrayLimitUsers(val) {
    return val.length <= 4;
}
function arrayLimitHandles(val) {
    return val.length <= 5;
}

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
