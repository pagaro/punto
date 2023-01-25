const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const RoundSchema = new mongoose.Schema({
    id_handle: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    id_card: {
        type: Schema.Types.ObjectId,
        required: true
    },
    id_users: {
        type: Schema.Types.ObjectId,
        required: true
    },
    coordinate: {
        type: {
            x: {type: Number, min: -5, max: 5, required: true},
            y: {type: Number, min: -5, max: 5, required: true}
        },
        required: true
    }
});

const Round = mongoose.model('Game', RoundSchema);

module.exports = Round;
