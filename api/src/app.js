const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const http = require('http');
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.io = io;

app.use(bodyParser.json());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://punto-user:punto@db:27017/punto");


const loginRoutes = require('./route/login');
const signupRoutes = require('./route/signup');
const checktokenRoutes = require('./route/checktoken');
const creategameRoutes = require('./game/createGame');
const statusgameRoutes = require('./game/statusGame');
const startgameRoutes = require('./game/startGame');
const listsgamesRoutes = require('./game/listsGames');
const joingameRoutes = require('./game/joinGame');
const setcardRoutes = require('./game/setCard');


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
app.use('/startgame', startgameRoutes);
app.use('/listsgames', listsgamesRoutes);
app.use('/joingame', joingameRoutes);
app.use('/setcard', setcardRoutes);
io.on('connection', (socket) => {
    socket.on('gameadded', (game) => {
        io.emit('gameadded', game);
    });
    socket.on('useradded', (game) => {
        io.emit('useradded', game);
    });
    socket.on('gameremoved', (game) => {
        io.emit('gameremoved', game);
    });
    socket.on('userremoved', (game) => {
        io.emit('userremoved', game);
    });
    socket.on('cardadd', (game) => {
        io.emit('cardadd', game);
    });
});

server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
// app.listen(3000, () => {
//     console.log('Serveur démarré sur le port 3000');
// });
