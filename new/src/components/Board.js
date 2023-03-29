// src/components/Board.js
import React from 'react';
import GridSquare from './GridSquare';
import './Board.css';

const Board = ({ numPlayers, handleDrop, board }) => {
    const renderGrid = () => {
        return board.map((row, x) => {
            return (
                <div key={x} className="board-row">
                    {row.map((square, y) => (
                        <GridSquare
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            handleDrop={handleDrop}
                            card={square}
                        />
                    ))}
                </div>
            );
        });
    };

    return <div className="board">{renderGrid()}</div>;
};

export default Board;
