// src/components/Card.js

import React, {useContext} from 'react';
import './Card.css';
import CardContext from '../context/CardContext';

const Card = ({ card,index, onDragStart, onDragEnd }) => {
    const { setDraggedCard } = useContext(CardContext);

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', index);
        setDraggedCard(card);
        onDragStart(event,card);
    };

    return (
        <div
            className="card"
            draggable
            // onDragStart={(event) => onDragStart(event, card)}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
        >
            <img src={card.image} alt={`${card.value} ${card.color}`} />
        </div>
    );
};

export default Card;
