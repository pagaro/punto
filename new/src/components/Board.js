// src/components/Board.js
import React, { useEffect, useState } from 'react';
import { distributeCards } from '../utils/gameLogic';
import Player from './Player';

const Board = ({ numPlayers }) => {
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    useEffect(() => {
        const newPlayers = distributeCards(numPlayers);
        setPlayers(newPlayers);
    }, [numPlayers]);

    // Ajoutez ici la logique pour gérer le déroulement du jeu, les actions des joueurs, etc.

    return (
        <div className="board">
            {players.map((player, index) => (
                <Player key={index} player={player} isActive={currentPlayer === index} />
            ))}
        </div>
    );
};

export default Board;
