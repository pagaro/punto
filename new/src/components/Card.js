// src/components/Card.js
import React from 'react';
import { useDrag } from 'react-dnd';
import './Card.css'

const Card = ({ card }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { card },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div className="card"
             ref={drag}
             style={{
                 opacity: isDragging ? 0.5 : 1,
                 cursor: 'move',
             }}>
            <img src={card.image} alt={`${card.value} ${card.color}`} />
            {/*<img src="../assets/images/card-back.png" alt={`${card.value} ${card.color}`}/>*/}
        </div>
    );
};

export default Card;
