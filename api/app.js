const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.connect("mongodb://punto-user:punto@punto-db:27017/punto");

const User = mongoose.model('User', {
    email: String,
    password: String
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log(res)

    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!user) {
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!match) {
                return res.status(401).send({message: 'Mot de passe incorrect'});
            }

            res.send({message: 'Connexion réussie'});
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


app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});