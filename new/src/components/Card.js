import React from 'react';
import './Card.css';
const Card = ({ card }) => {
    // console.log(card)
    return (
        <div className="card">
            <img src={card.image} alt={`${card.value} ${card.color}`} />
            {/*<img src="../assets/images/card-back.png" alt={`${card.value} ${card.color}`}/>*/}
        </div>
    );
};

export default Card;
