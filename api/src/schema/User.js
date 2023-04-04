// Importation du module Mongoose
const mongoose = require('mongoose');

// Définition du schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // L'attribut "email" est obligatoire
        unique: true // L'attribut "email" doit être unique
    },
    dob: {
        type: Date,
        required: true // L'attribut "dob" est obligatoire
    },
    password: {
        type: String,
        required: true // L'attribut "password" est obligatoire
    },
    name: {
        type: String,
        required: true // L'attribut "name" est obligatoire
    }
});

// Création d'un modèle "User" à partir du schéma défini
const User = mongoose.model('User', UserSchema);

// Exportation du modèle "User" pour l'utiliser ailleurs dans l'application
module.exports = User;