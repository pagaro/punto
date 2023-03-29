// src/App.js
import React, { useState } from 'react';
import NumberOfPlayers from './components/NumberOfPlayers';
import './App.css';
import Game from "./components/Game";

const App = () => {
    const [numPlayers, setNumPlayers] = useState(null);

    const handlePlayerSelection = (selectedNumPlayers) => {
        setNumPlayers(selectedNumPlayers);
    };

    return (
        <div className="App">
            {numPlayers ? (
                <Game numPlayers={numPlayers} />
            ) : (
                <NumberOfPlayers onSelect={handlePlayerSelection} />
            )}
        </div>
    );
};

export default App;
