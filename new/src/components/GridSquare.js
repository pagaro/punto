// src/components/GridSquare.js

import React from 'react';
import './GridSquare.css'
import Card from "./Card";
const GridSquare = ({ x, y, handleCardDrop,card }) => {
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropWithCoordinates = (event) => {
        handleCardDrop(event, x, y);
    };

    return (
        <div
            className="grid-square"
            onDragOver={handleDragOver}
            onDrop={handleDropWithCoordinates}
        >
            {card && <Card card={card} />}
        </div>
    );
};

export default GridSquare;
