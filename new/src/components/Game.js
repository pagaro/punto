// src/components/Game.js
import React, { useState, useEffect } from "react";
import Board from "./Board";
import PlayerHand from "./PlayerHand";
import { distributeCards } from "../utils/gameLogic";
// import "./Game.css";

const Game = ({ numPlayers, cardBack }) => {
    const [hands, setHands] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const dealCards = async () => {
            const hands = await distributeCards(numPlayers);
            setHands(hands);
        };
        dealCards();
    }, [numPlayers]);

    const selectCard = (card) => {
        if (currentPlayerIndex === 0) {
            setSelectedCard(card);
        }
    };

    const playCard = (rowIndex, colIndex) => {
        if (selectedCard) {
            const playedCard = {
                ...selectedCard,
                imagePath: selectedCard.imagePath.replace("card-front", "card-back"),
            };
            const newHands = [...hands];
            newHands[currentPlayerIndex] = newHands[currentPlayerIndex].filter(
                (card) => card !== selectedCard
            );
            setHands(newHands);
            setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
            setSelectedCard(null);
            Board.playCard(playedCard, rowIndex, colIndex);
        }
    };

    useEffect(() => {
        const winningColor = Board.checkForWinner();
        if (winningColor) {
            setWinner(winningColor);
        }
    }, [currentPlayerIndex]);

    return (
        <div className="game">
            <div className="board-container">
                <Board playCard={playCard} cardBack={cardBack} />
                {winner && (
                    <div className="winner-message">
                        {`${winner.toUpperCase()} WINS!`}
                    </div>
                )}
            </div>
            <div className="player-hands">
                {hands.map((cards, i) => (
                    <PlayerHand
                        key={i}
                        cards={cards}
                        selectCard={selectCard}
                        currentPlayer={i === currentPlayerIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default Game;
