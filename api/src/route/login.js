// Importer le modèle User depuis le fichier ../schema/User.js
const User = require("../schema/User");

// Importer la bibliothèque bcrypt pour chiffrer les mots de passe
const bcrypt = require("bcrypt");

// Importer la bibliothèque jsonwebtoken pour créer et vérifier des jetons d'authentification
const jwt = require("jsonwebtoken");

// Importer le framework Express pour créer des routes HTTP
const express = require('express');

// Importer la bibliothèque dotenv pour lire les variables d'environnement à partir d'un fichier .env
require("dotenv").config();

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui vérifie l'authentification de l'utilisateur
router.post('/', async (req, res) => {
    try {
// Récupérer l'email et le mot de passe de la requête POST
        const { email, password } = req.body;
        // Trouver l'utilisateur correspondant à l'email fourni
        const user = await User.findOne({ email });

        // Si l'utilisateur n'existe pas, renvoyer une erreur
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        // Comparer le mot de passe fourni avec le mot de passe chiffré de l'utilisateur
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // Si les mots de passe ne correspondent pas, renvoyer une erreur
            throw new Error('Mot de passe incorrect');
        }

        // Si l'authentification est réussie, créer un jeton d'authentification avec l'ID utilisateur et l'email
        const token = jwt.sign({ userId: user._id, email:user.email }, process.env.JWT_KEY, {
            expiresIn: '1d' // Définir une durée d'expiration d'un jour pour le jeton
        });

        // Renvoyer le jeton d'authentification dans la réponse
        res.send({ token });

    } catch (error) {
        // Si une erreur se produit pendant l'authentification, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        res.status(400).send(error.message);
    }
});

// Exporter l'objet router pour être utilisé dans d'autres fichiers
module.exports = router;