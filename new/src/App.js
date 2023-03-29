// src/App.js
import React, { useState } from 'react';
import NumberOfPlayers from './components/NumberOfPlayers';
import Board from './components/Board';
import './App.css';

const App = () => {
    const [numPlayers, setNumPlayers] = useState(null);

    const handlePlayerSelection = (selectedNumPlayers) => {
        setNumPlayers(selectedNumPlayers);
    };

    return (
        <div className="App">
            {numPlayers ? (
                <Board numPlayers={numPlayers} />
            ) : (
                <NumberOfPlayers onSelect={handlePlayerSelection} />
            )}
        </div>
    );
};

export default App;
