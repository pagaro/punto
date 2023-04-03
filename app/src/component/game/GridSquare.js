// src/components/GridSquare.js

import React, {useContext} from 'react';
import './GridSquare.css'
import Card from "./Card";
import CardContext from '../../context/CardContext';
import {validateDropCard} from "../../utils/valideSquare";

const GridSquare = ({x, y, handleCardDrop, board}) => {
    const {draggedCard} = useContext(CardContext);
    const handleDragOver = (event) => {
        event.preventDefault()
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";
    };


    const handleDropWithCoordinates = (event) => {
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
        if (isValidDrop) {
            handleCardDrop(event, x, y);
        } else {
            alert("Vous ne pouvez pas placer cette carte ici.");
        }
        event.currentTarget.style.backgroundColor = ""
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
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
