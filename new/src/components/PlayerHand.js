// src/components/PlayerHand.js
import React from "react";
import Card from "./Card";

const PlayerHand = ({ cards }) => {
    return (
        <div className="player-hand">
            {cards.map((card, i) => (
                <Card key={i} value={card.value} color={card.color} imagePath={card.imagePath} />
            ))}
        </div>
    );
};
export default PlayerHand;
