const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

app.use(bodyParser.json());
mongoose.connect("mongodb://punto-user:punto@db:27017/punto");

const loginRoutes = require('./route/login');
const signupRoutes = require('./route/signup');
const checktokenRoutes = require('./route/checktoken');
const creategameRoutes = require('./game/createGame');
const statusgameRoutes = require('./game/statusGame');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/checktoken', checktokenRoutes);
app.use('/creategame', creategameRoutes);
app.use('/statusgame', statusgameRoutes);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
