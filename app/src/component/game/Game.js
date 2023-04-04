// src/components/Game.js

import React, {useEffect, useState} from 'react';
import Board from './Board';
import {generatePlayers} from '../../utils/gameLogic';
import CardContext from '../../context/CardContext';
import {checkWinner} from "../../utils/checkWinner";

// état initial du jeu
const initialState = {
    players: [], // liste des joueurs
    currentPlayerIndex: 0, // index du joueur courant
    board: Array(11).fill(Array(11).fill(null)), // plateau de jeu
    draggedCard: null, // carte actuellement draggée
    winner: null // gagnant de la partie
};

const Game = ({numPlayers}) => {
        const [players, setPlayers] = useState(initialState.players); // état des joueurs
        const [currentPlayerIndex, setCurrentPlayerIndex] = useState(Math.floor(Math.random() * numPlayers)); // index du joueur courant
        const [board, setBoard] = useState(initialState.board); // état du plateau de jeu
        const [draggedCard, setDraggedCard] = useState(initialState.draggedCard); // carte actuellement draggée
        const [winner, setWinner] = useState(initialState.winner); // gagnant de la partie
        // créer les joueurs quand le nombre de joueurs change
        useEffect(() => {
            setPlayers(generatePlayers(numPlayers));
        }, [numPlayers]);

        // vérifie si un joueur a gagné
        useEffect(() => {
            if (checkWinner(board)) {
                setWinner(currentPlayer);
            } else {
                setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
            }
        }, [board]);

        // fonction appelée lorsque la carte est lâchée sur une case du plateau
        const handleCardDrop = (event, x, y) => {
            if (winner) {
                alert("La partie est finie");
                return;
            }

            event.preventDefault();

            const card = JSON.parse(event.dataTransfer.getData('card'));

            // mettre à jour le plateau de jeu avec la nouvelle carte
            setBoard(() => {
                return board.map((row, rowIndex) => {
                    if (rowIndex === y) {
                        return row.map((square, colIndex) => (colIndex === x ? card : square));
                    } else {
                        return row;
                    }
                });
            });

            // enlever la carte de la main du joueur
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

        // fonction appelée lorsqu'on recommence la partie
        const handleReset = () => {
            setPlayers(generatePlayers(numPlayers))
            setCurrentPlayerIndex(initialState.currentPlayerIndex)
            setBoard(initialState.board)
            setDraggedCard(initialState.draggedCard)
            setWinner(initialState.winner);
        };

        // joueur courant
        const currentPlayer = players[currentPlayerIndex];

        return (
            <CardContext.Provider value={{draggedCard, setDraggedCard}}>
                {!winner && (
                    <div className="game">
                        {players.length > 0 && (
                            <Board
                                board={board}
                                handleCardDrop={handleCardDrop}
                                currentPlayer={currentPlayer}
                            />
                        )}
                    </div>
                )}
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
