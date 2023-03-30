// src/components/GridSquare.js

import React, {useContext} from 'react';
import './GridSquare.css'
import Card from "./Card";
import CardContext from '../context/CardContext';

const GridSquare = ({x, y, handleCardDrop, board}) => {
    const {draggedCard} = useContext(CardContext);
    const handleDragOver = (event) => {
        event.preventDefault()
    };

    const validateDrop = (event, x, y, board, draggedCard) => {
        const isGridEmpty = board.every(row => row.every(cell => !cell));

        const isMiddleSquare = x === Math.floor(board.length / 2) && y === Math.floor(board[0].length / 2);

        const isAdjacentSquare = (
            (x > 0 && board[y][x - 1]) ||
            (y > 0 && board[y - 1][x]) ||
            (x < board.length - 1 && board[y][x + 1]) ||
            (y < board[0].length - 1 && board[y + 1][x]) ||
            (x > 0 && y > 0 && board[y - 1][x - 1]) ||
            (x < board.length - 1 && y < board[0].length - 1 && board[y + 1][x + 1]) ||
            (x < board.length - 1 && y > 0 && board[y - 1][x + 1]) ||
            (x > 0 && y < board[0].length - 1 && board[y + 1][x - 1])
        );

        return (!board[y][x] || (board[y][x] && draggedCard.value > board[y][x].value)) &&
            ((isGridEmpty && isMiddleSquare) || (!isGridEmpty && isAdjacentSquare))
    };


    const handleDropWithCoordinates = (event) => {
        const isValidDrop = validateDrop(event, x, y, board, draggedCard);
        if (isValidDrop) {
            handleCardDrop(event, x, y);
        } else {
            alert("Vous ne pouvez pas placer cette carte ici.");
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        const isValidDrop = validateDrop(event, x, y, board, draggedCard);
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";

        if (event.currentTarget.firstChild) {
            event.currentTarget.firstChild.style.display = "none"
        }
    };

    const handleDragLeave = (event) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = ""
        if (event.currentTarget.firstChild) {
            event.currentTarget.firstChild.style.display = ""
        }
    };

    return (
        <div
            className="grid-square"
            onDragOver={handleDragOver}
            onDrop={handleDropWithCoordinates}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {board[y][x] && <Card card={board[y][x]}/>}
        </div>
    );
};

export default GridSquare;
