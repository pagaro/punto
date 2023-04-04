// Importation du module Mongoose
const mongoose = require('mongoose');

// Définition du schéma de la carte
const CardSchema = new mongoose.Schema({
    color: {
        type: String,
        enum: ['RED', 'YELLOW', 'BLUE', 'GREEN'], // L'attribut "color" doit appartenir à l'une de ces valeurs
        required: true // L'attribut "color" est obligatoire
    },
    number: {
        type: Number,
        min: -5, // L'attribut "number" ne peut pas être inférieur à -5
        max: 5, // L'attribut "number" ne peut pas être supérieur à 5
        required: true // L'attribut "number" est obligatoire
    },
    url: {
        type: String,
        required: true // L'attribut "url" est obligatoire
    },
});

// Création d'un modèle "Card" à partir du schéma défini
const Card = mongoose.model('Card', CardSchema);

// Exportation du modèle "Card" pour l'utiliser ailleurs dans l'application
module.exports = Card;