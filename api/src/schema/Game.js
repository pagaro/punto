// Importation du module Mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Définition du schéma du jeu
const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Le nom du jeu est obligatoire
    },
    id_users: {
        type: [Schema.Types.ObjectId], // L'attribut "id_users" est un tableau d'ObjectIds
        required: true, // L'attribut "id_users" est obligatoire
        maxItems: 4, // Le tableau "id_users" ne peut pas contenir plus de 4 éléments
        minItems: 1, // Le tableau "id_users" doit contenir au moins 1 élément
    },
    status: {
        type: String,
        enum: ['WAIT', 'RUNNING', 'BREAK', 'FINISHED'], // L'attribut "status" doit appartenir à l'une de ces valeurs
        default: 'WAIT', // La valeur par défaut de l'attribut "status" est 'WAIT'
    },
    id_handles: {
        type: [Schema.Types.ObjectId], // L'attribut "id_handles" est un tableau d'ObjectIds
        default: [], // La valeur par défaut du tableau "id_handles" est un tableau vide
        maxItems: 5, // Le tableau "id_handles" ne peut pas contenir plus de 5 éléments
        minItems: 0, // Le tableau "id_handles" peut être vide ou contenir au moins 1 élément
    },
});

// Création d'un modèle "Game" à partir du schéma défini
const Game = mongoose.model('Game', GameSchema);

// Exportation du modèle "Game" pour l'utiliser ailleurs dans l'application
module.exports = Game;