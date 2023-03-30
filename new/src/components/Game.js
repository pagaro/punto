// src/components/Game.js

import React, {useEffect, useState} from 'react';
import Board from './Board';
import {generatePlayers} from '../utils/gameLogic';

const Game = ({numPlayers}) => {
        const [players, setPlayers] = useState([]);
        const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
        const [board, setBoard] = useState(Array(11).fill(Array(11).fill(null)));

        useEffect(() => {

            setPlayers(generatePlayers(numPlayers));
        }, [numPlayers]);

        const handleCardDrop = (event, x, y) => {
            event.preventDefault();
            const card = JSON.parse(event.dataTransfer.getData('card'));

            // Mettre à jour la grille avec la carte déposée
            // const newBoard = board.map((row, rowIndex) => {
            //     if (rowIndex === x) {
            //         return row.map((square, colIndex) => (colIndex === y ? card : square));
            //     } else {
            //         return row;
            //     }
            // });
            // setBoard(newBoard);

            setBoard((prevBoard) => {
                return board.map((row, rowIndex) => {
                    if (rowIndex === y) {
                        return row.map((square, colIndex) => (colIndex === x ? card : square));
                    } else {
                        return row;
                    }
                });
            });

            // Enlever la carte de la main du joueur
            const updatedPlayers = players.map((player, index) => {
                if (index === currentPlayerIndex) {
                    return {
                        ...player,
                        //todo
                        // cards: player.cards.filter((playerCard) => playerCard.id !== card.id),
                    };
                } else {
                    return player;
                }
            });
            setPlayers(updatedPlayers);

            // Passer au joueur suivant
            setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
        };

        const currentPlayer = players[currentPlayerIndex];

        return (
            <div className="game">
                {players.length > 0 && (
                    <Board
                        board={board}
                        handleCardDrop={handleCardDrop}
                        currentPlayer={currentPlayer}
                    />
                )}
            </div>
        );
    }
;

export default Game;
