const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.connect("mongodb://punto-user:punto@db:27017/punto");

const User = mongoose.model('User', {
    email: String,
    password: String
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log(process.env.JWT_KEY)

    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!user) {
            return res.status(400).send({message: 'Utilisateur non trouvé'});
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!match) {
                return res.status(401).send({message: 'Mot de passe incorrect'});
            }

            const token = jwt.sign({ id: user._id, email:user.email }, process.env.JWT_KEY,{
                expiresIn: '1h'
            });
            const message = 'Connexion réussie';

            res.send({message: message, token: token});
        });
    });
});

app.post('/register', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (err, existingUser) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (existingUser) {
            return res.status(400).send({message: 'Adresse email déjà utilisée'});
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).send(err);
            }
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).send(err);
                }
                const user = new User({email, password: hashedPassword});
                user.save((err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.send({message: 'Inscription réussie'});
                });
            });
        });
    });
});

app.get('/check-token', (req, res) => {
    // Récupération du token depuis l'en-tête d'autorisation
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Vérification de la validité du token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        return res.status(200).json({ message: 'Token is valid' });
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'Invalid token' });
    }
});


function validateToken(req, res, next) {
    // Récupération du token depuis l'en-tête d'autorisation
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Vérification de la validité du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

app.use('/protected', validateToken, (req, res, next) => {
    const message = 'Connexion réussie';

    console.log(message);
    res.send({message: message});
});


app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});