/// src/components/Game.js
import React, {useState} from "react";
import Board from "./Board";
import {checkForWin, placeCard} from "../utils/gameLogic";

const Game = ({numPlayers}) => {
    const [cards, setCards] = useState(Array(36).fill(null));
    const [currentColor, setCurrentColor] = useState("#FF0000");

    const handleClick = (index) => {
        // Vérifie si l'emplacement est vide
        if (cards[index]) {
            alert("Emplacement déjà occupé !");
            return;
        }

        // Place la carte sur le plateau
        const newCards = placeCard(cards, index, currentColor);
        setCards(newCards);

        // Vérifie si le joueur a gagné
        if (checkForWin(newCards)) {
            alert("Victoire !");
            // Réinitialiser le plateau ou gérer la fin de la partie
            setCards(Array(36).fill(null));
        }

        // Modifier la couleur de la carte à placer pour le prochain tour (selon la logique du jeu)
        setCurrentColor(currentColor === "#FF0000" ? "#00FF00" : "#FF0000");
    };

    return (
        <div>
            <h2>Jeu pour {numPlayers} joueur(s)</h2>
            <Board cards={cards} handleClick={handleClick}/>
        </div>
    );
};
export default Game;


