// src/components/GridSquare.js

import React, {useState} from 'react';
import './GridSquare.css'
import Card from "./Card";
const GridSquare = ({ x, y, handleCardDrop,card }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropWithCoordinates = (event) => {
        handleCardDrop(event, x, y);
    };

    const handleDragEnter = () => {
        setIsHovered(true);
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`grid-square ${isHovered ? "hovered" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDropWithCoordinates}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {card && <Card card={card} />}
        </div>
    );
};

export default GridSquare;
