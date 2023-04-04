// Importer le modèle User depuis le fichier ../schema/User.js
const User = require("../schema/User");

// Importer la bibliothèque bcrypt pour chiffrer les mots de passe
const bcrypt = require("bcrypt");

// Importer le framework Express pour créer des routes HTTP
const express = require("express");

// Créer un objet router en utilisant la méthode Router() d'Express
const router = express.Router();

// Définir une route HTTP POST pour l'URL '/' qui crée un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
// Récupérer l'email, la date de naissance, le mot de passe et le nom de l'utilisateur à partir de la requête POST
        const { email, dob, password, name } = req.body;
        // Vérifier si un utilisateur existe déjà avec l'adresse email fournie
        let user = await User.findOne({ email });

        if (user) {
            // Si un utilisateur existe déjà, renvoyer une erreur
            throw new Error('Adresse email déjà utilisée');
        }

        // Chiffrer le mot de passe en utilisant bcrypt avec un coût de hachage de 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel objet User avec les informations fournies et le mot de passe chiffré
        user = new User({ email, dob, password: hashedPassword, name });

        // Enregistrer l'utilisateur dans la base de données MongoDB
        await user.save();

        // Si l'enregistrement est réussi, renvoyer une réponse avec le code de statut 201 pour indiquer que la ressource a été créée
        res.status(201).send();
    } catch (error) {
        // Si une erreur se produit pendant la création de l'utilisateur, renvoyer une réponse avec le code d'erreur 400 et le message d'erreur
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Exporter l'objet router pour être utilisé dans d'autres fichiers
module.exports = router;