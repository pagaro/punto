// src/components/Board.js

import React from 'react';
import GridSquare from './GridSquare';
import Card from './Card';
import './Board.css'
import {validateDropSquare} from "../../utils/valideSquare";

const Board = ({board, handleCardDrop, currentPlayer}) => {
    // Fonction appelée lors du début du glissement d'une carte

    const handleCardDragStart = (event, card) => {
        event.dataTransfer.setData('card', JSON.stringify(card));
    };

// Fonction appelée à la fin du glissement d'une carte
    const handleCardDragEnd = (event) => {
        highlightValidSquare();
    };

// Fonction qui met en évidence les cases valides pour le déplacement de la carte
    const highlightValidSquare = () => {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (validateDropSquare(x, y, board)) {
                    console.log(board[x][y])
                    // board[x][y].style.backgroundColor = "000"
                }
            }
        }
    };

// Fonction qui retourne la grille du plateau de jeu
    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < 11; y++) {
            const cols = [];
            for (let x = 0; x < 11; x++) {
                cols.push(
                    <GridSquare
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        board={board}
                        handleCardDrop={handleCardDrop}
                    />
                );
            }
            rows.push(
                <div key={y} className="row">
                    {cols}
                </div>
            );
        }
        return rows;
    };

// Composant qui affiche le plateau de jeu et les cartes du joueur courant
    return <div className="board">
        <div className="grid-container">{renderGrid()}</div>
        <div className="player">
            <h3>Player {currentPlayer.id}-{currentPlayer.color}</h3>
            {currentPlayer.cards.map((card, index) => (
                <Card
                    index={index}
                    card={card}
                    onDragStart={handleCardDragStart}
                    onDragEnd={handleCardDragEnd}
                />
            ))}
        </div>
    </div>;
};

export default Board;