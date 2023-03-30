// src/components/Card.js

import React from 'react';
import './Card.css';

const Card = ({ card, onDragStart, onDragEnd }) => {
    return (
        <div
            className="card"
            draggable
            onDragStart={(event) => onDragStart(event, card)}
            onDragEnd={onDragEnd}
        >
            <img src={card.image} alt={`${card.value} ${card.color}`} />
        </div>
    );
};

export default Card;
