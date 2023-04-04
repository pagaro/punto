// Importation du module Mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Définition du schéma du tour
const RoundSchema = new mongoose.Schema({
    id_handle: {
        type: Schema.Types.ObjectId, // L'attribut "id_handle" est un ObjectId
        required: true, // L'attribut "id_handle" est obligatoire
    },
    id_card: {
        type: Schema.Types.ObjectId, // L'attribut "id_card" est un ObjectId
        required: true // L'attribut "id_card" est obligatoire
    },
    id_user: {
        type: Schema.Types.ObjectId, // L'attribut "id_user" est un ObjectId
        required: true // L'attribut "id_user" est obligatoire
    },
    coordinate: {
        type: { // L'attribut "coordinate" est un objet avec 2 attributs x et y
            x: {type: Number, min: -5, max: 5, required: true}, // L'attribut "x" est un nombre entre -5 et 5 et est obligatoire
            y: {type: Number, min: -5, max: 5, required: true} // L'attribut "y" est un nombre entre -5 et 5 et est obligatoire
        },
        required: true // L'attribut "coordinate" est obligatoire
    }
});

// Création d'un modèle "Round" à partir du schéma défini
const Round = mongoose.model('Round', RoundSchema);

// Exportation du modèle "Round" pour l'utiliser ailleurs dans l'application
module.exports = Round;