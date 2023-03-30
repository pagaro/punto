// src/components/Game.js

import React, {useEffect, useState} from 'react';
import Board from './Board';
import {generatePlayers} from '../utils/gameLogic';
import CardContext from '../context/CardContext';

const Game = ({numPlayers}) => {
        const [players, setPlayers] = useState([]);
        const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
        const [board, setBoard] = useState(Array(11).fill(Array(11).fill(null)));
        const [draggedCard, setDraggedCard] = useState(null);

        useEffect(() => {

            setPlayers(generatePlayers(numPlayers));
        }, [numPlayers]);

        const handleCardDrop = (event, x, y) => {
            event.preventDefault();


            const card = JSON.parse(event.dataTransfer.getData('card'));

            // if (!card || (card && droppedCard.value > card.props.value)) {
            //     alert("Vous ne pouvez pas placer cette carte ici. La valeur doit être strictement supérieure à celle de la carte présente.");
            // }

            setBoard(() => {
                return board.map((row, rowIndex) => {
                    if (rowIndex === y) {
                        return row.map((square, colIndex) => (colIndex === x ? card : square));
                    } else {
                        return row;
                    }
                });
            });

            // Enlever la carte de la main du joueur
            setPlayers((prevPlayers) =>
                prevPlayers.map((player, index) => {
                    if (index === currentPlayerIndex) {
                        return {
                            ...player,
                            cards: player.cards.filter((c) => c.id !== card.id),
                        };
                    }
                    return player;
                })
            );

            // Passer au joueur suivant
            setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
        };

        const currentPlayer = players[currentPlayerIndex];

        return (
            <CardContext.Provider value={{ draggedCard, setDraggedCard }}>
            <div className="game">
                {players.length > 0 && (
                    <Board
                        board={board}
                        handleCardDrop={handleCardDrop}
                        currentPlayer={currentPlayer}
                    />
                )}
            </div>
            </CardContext.Provider>
        );
    }
;

export default Game;
