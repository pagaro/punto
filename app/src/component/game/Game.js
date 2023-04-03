// src/components/Game.js

import React, {useEffect, useState} from 'react';
import Board from './Board';
import {generatePlayers} from '../../utils/gameLogic';
import CardContext from '../../context/CardContext';
import { checkWinner } from "../../utils/checkWinner";

const initialState = {
    players: [],
    currentPlayerIndex: 0,
    board: Array(11).fill(Array(11).fill(null)),
    draggedCard: null,
    winner : null
};

const Game = ({numPlayers}) => {
        const [players, setPlayers] = useState(initialState.players);
        const [currentPlayerIndex, setCurrentPlayerIndex] = useState(Math.floor(Math.random() * numPlayers));
        const [board, setBoard] = useState(initialState.board);
        const [draggedCard, setDraggedCard] = useState(initialState.draggedCard);
        const [winner, setWinner] = useState(initialState.winner);

        useEffect(() => {

            setPlayers(generatePlayers(numPlayers));
        }, [numPlayers]);

        useEffect(() => {
            // Après avoir mis à jour les états, vérifiez si un joueur a gagné.
            if (checkWinner(board)) {
                setWinner(currentPlayer);
            } else {
                // Passer au joueur suivant
                setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
            }
        }, [board]);

        const handleCardDrop = (event, x, y) => {
            if (winner) {
                alert("La partie est fini")
                return
            }

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


        };

        const handleReset = () => {
            setPlayers(generatePlayers(numPlayers))
            setCurrentPlayerIndex(initialState.currentPlayerIndex)
            setBoard(initialState.board)
            setDraggedCard(initialState.draggedCard)
            setWinner(initialState.winner);

        };

        const currentPlayer = players[currentPlayerIndex];

        return (
            <CardContext.Provider value={{draggedCard, setDraggedCard}}>
                {!winner && (<div className="game">
                    {players.length > 0 && (
                        <Board
                            board={board}
                            handleCardDrop={handleCardDrop}
                            currentPlayer={currentPlayer}
                        />
                    )}
                </div>)}
                {winner && (
                    <div className="winner-message">
                        Félicitations, le joueur {winner.id} a gagné !
                        <button onClick={handleReset}>Recommencer</button>
                    </div>

                )}
            </CardContext.Provider>
        );
    }
;

export default Game;
