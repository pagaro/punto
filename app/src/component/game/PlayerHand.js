// src/components/PlayerHand.js
import React from "react";
import Card from "./Card";

const PlayerHand = ({ cards }) => {
    return (
// le conteneur des cartes du joueur a la classe CSS 'player-hand'
        <div className="player-hand">
            // on boucle sur les cartes du joueur et on affiche chaque carte avec le composant Card
            {cards.map((card, i) => (
                <Card key={i} value={card.value} color={card.color} imagePath={card.imagePath} />
            ))}
        </div>
    );
};
export default PlayerHand;