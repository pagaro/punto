// src/components/Board.js

import React from 'react';
import GridSquare from './GridSquare';
import Card from './Card';
import './Board.css'
import {validateDropSquare} from "../../utils/valideSquare";

const Board = ({board, handleCardDrop, currentPlayer}) => {

    const handleCardDragStart = (event, card) => {
        event.dataTransfer.setData('card', JSON.stringify(card));
    };

    const handleCardDragEnd = (event) => {
        highlightValidSquare();
    };

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
