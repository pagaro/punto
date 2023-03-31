// src/components/GridSquare.js

import React, {useContext} from 'react';
import './GridSquare.css'
import Card from "./Card";
import CardContext from '../context/CardContext';

const GridSquare = ({x, y, handleCardDrop, board}) => {
    const {draggedCard} = useContext(CardContext);
    const handleDragOver = (event) => {
        event.preventDefault()
        const isValidDrop = validateDrop(event, x, y, board, draggedCard);
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";
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

        const isCardPlacementValid = (x, y, board) => {
            let minX = board[0].length, maxX = 0, minY = board.length, maxY = 0;

            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[0].length; col++) {
                    if (board[row][col] || (row === y && col === x)) {
                        minX = Math.min(minX, col);
                        maxX = Math.max(maxX, col);
                        minY = Math.min(minY, row);
                        maxY = Math.max(maxY, row);
                    }
                }
            }

            const width = maxX - minX + 1;
            const height = maxY - minY + 1;

            return width <= 6 && height <= 6;
        };

        return (!board[y][x] || (board[y][x] && draggedCard.value > board[y][x].value)) &&
            ((isGridEmpty && isMiddleSquare) || (!isGridEmpty && isAdjacentSquare)) && isCardPlacementValid(x,y,board)
    };


    const handleDropWithCoordinates = (event) => {
        const isValidDrop = validateDrop(event, x, y, board, draggedCard);
        if (isValidDrop) {
            handleCardDrop(event, x, y);
        } else {
            alert("Vous ne pouvez pas placer cette carte ici.");
        }
        event.currentTarget.style.backgroundColor = ""
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        const isValidDrop = validateDrop(event, x, y, board, draggedCard);
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";
        //todo
        // if (event.currentTarget.firstChild) {
        //     event.currentTarget.firstChild.style.display = "none"
        // }
    };

    const handleDragLeave = (event) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = ""
        //todo
        // if (event.currentTarget.firstChild) {
        //     event.currentTarget.firstChild.style.display = ""
        // }
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
