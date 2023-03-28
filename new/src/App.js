// src/App.js
import React, { useState } from "react";
import Game from "./components/Game";
import "./App.css";
import cardBack from "./assets/images/card-back.png";

const App = () => {
    const [numPlayers, setNumPlayers] = useState(null);

    const startGame = (numPlayers) => {
        setNumPlayers(numPlayers);
    };

    const renderPlayerSelection = () => {
        return (
            <div>
                <h1>Choisissez le nombre de joueurs</h1>
                <button onClick={() => startGame(2)}>2 joueurs</button>
                <button onClick={() => startGame(3)}>3 joueurs</button>
                <button onClick={() => startGame(4)}>4 joueurs</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Punto Game</h1>
            {numPlayers === null ? renderPlayerSelection() : <Game numPlayers={numPlayers} cardBack={cardBack} />}
        </div>
    );
};

export default App;
