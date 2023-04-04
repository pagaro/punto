// src/components/Player.js
import React from 'react';
import Card from './Card';

const Player = ({ player, isActive }) => {
// on extrait l'id du joueur, les cartes qu'il possède et sa couleur
    const { id, cards, color } = player;

    return (
        // la classe CSS 'active' est ajoutée au conteneur du joueur si isActive est true
        <div className={`player${isActive ? ' active' : ''}`}>
            <h3>Joueur {id} - Couleur: {color}</h3>
            <div className="player-cards">
                // on boucle sur les cartes du joueur et on affiche chaque carte avec le composant Card
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Player;
