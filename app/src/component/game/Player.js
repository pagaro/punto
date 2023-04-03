// src/components/Player.js
import React from 'react';
import Card from './Card';

const Player = ({ player, isActive }) => {
    const { id, cards, color } = player;

    return (
        <div className={`player${isActive ? ' active' : ''}`}>
            <h3>Joueur {id} - Couleur: {color}</h3>
            <div className="player-cards">
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Player;
