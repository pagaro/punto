const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    color: {
        type: String,
        enum: ['RED', 'YELLOW', 'BLUE', 'GREEN'],
        required: true
    },
    number: {
        type: Number,
        min: -5,
        max: 5,
        required: true
    },
    url: {
        type: String,
        required: true
    },
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
