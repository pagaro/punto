// src/components/Card.js

import React, {useContext} from 'react';
import './Card.css';
import CardContext from '../../context/CardContext';

const Card = ({ card,index, onDragStart, onDragEnd }) => {
    // Récupère la fonction setDraggedCard depuis le contexte CardContext
    const { setDraggedCard } = useContext(CardContext);

    // Gère le début d'un drag-and-drop en définissant les données transférées et en appelant la fonction onDragStart passée en props
    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', index);
        setDraggedCard(card);
        onDragStart(event,card);
    };

    return (
        // Composant affichant une carte avec son image et la gestion des événements de drag-and-drop
        <div
            className="card"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
        >
            <img src={card.image} alt={`${card.value} ${card.color}`} />
        </div>
    );
};

export default Card;
