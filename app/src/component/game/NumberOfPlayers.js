// src/components/NumberOfPlayers.js
import React from 'react';

const NumberOfPlayers = ({ onSelect }) => {
// fonction qui gère la sélection du nombre de joueurs
    const handleSelection = (numPlayers) => {
        onSelect(numPlayers);
    };

    return (
        <div className="number-of-players">
            <h2>Choisissez le nombre de joueurs :</h2>
            <button onClick={() => handleSelection(2)}>2 joueurs</button>
            <button onClick={() => handleSelection(3)}>3 joueurs</button>
            <button onClick={() => handleSelection(4)}>4 joueurs</button>
        </div>
    );
};

export default NumberOfPlayers;
