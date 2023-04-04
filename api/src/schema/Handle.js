// Importation du module Mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Définition du schéma de la manche
const HandleSchema = new mongoose.Schema({
    id_game: {
        type: Schema.Types.ObjectId, // L'attribut "id_game" est un ObjectId
        required: true, // L'attribut "id_game" est obligatoire
    },
    id_rounds: {
        type: [Schema.Types.ObjectId], // L'attribut "id_rounds" est un tableau d'ObjectIds
        default: [] // La valeur par défaut du tableau "id_rounds" est un tableau vide
    },
    hands: {
        type: Map, // L'attribut "hands" est une Map
        of: mongoose.Schema.Types.ObjectId, // Les valeurs de la Map sont des ObjectIds
        required: true, // L'attribut "hands" est obligatoire
    }
});

// Création d'un modèle "Handle" à partir du schéma défini
const Handle = mongoose.model('Handle', HandleSchema);

// Exportation du modèle "Handle" pour l'utiliser ailleurs dans l'application
module.exports = Handle;