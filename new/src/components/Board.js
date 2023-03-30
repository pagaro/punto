// src/components/Board.js

import React from 'react';
import GridSquare from './GridSquare';
import Card from './Card';
import './Board.css'

const Board = ({ board, handleCardDrop, currentPlayer }) => {
    const handleCardDragStart = (event, card) => {
        event.dataTransfer.setData('card', JSON.stringify(card));
    };

    const handleCardDragEnd = () => {
        console.log("toto")
        // Vous pouvez gérer les actions après le glisser-déposer ici, si nécessaire.
    };

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
                        card={board[y][x]}
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

    return <div className="board">{renderGrid()}
        <div className="player-hand">
            {currentPlayer.cards.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    onDragStart={handleCardDragStart}
                    onDragEnd={handleCardDragEnd}
                />
            ))}
        </div>

    </div>;
};


export default Board;
