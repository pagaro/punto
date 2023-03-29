/// src/components/Game.js
import React, {useState} from "react";
import Board from "./Board";
import {generatePlayers} from "../utils/gameLogic";
import Player from "./Player";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const Game = ({numPlayers}) => {
    const [board, setBoard] = useState( Array(11).fill(null).map(() => Array(11).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState(generatePlayers(numPlayers));


    const handleDrop = (x, y, card) => {


        setBoard((prevBoard) => {
            const newBoard = [...prevBoard]; // Créez une copie de la grille précédente
            if (!newBoard[x][y]) {
                // Ajoutez la carte à la position si la case est vide
                newBoard[x][y] = card;


                console.log(players)
                setPlayers((prevPlayers) => {
                    const newPlayers = [...prevPlayers];
                    newPlayers[currentPlayer].cards = newPlayers[currentPlayer].cards.filter(
                        (c) => c !== card
                    );
                    return newPlayers;
                });



            } else {
                // Si la case n'est pas vide, ignorez le déplacement ou affichez un message d'erreur
                console.error('Cette case est déjà occupée.');
            }
            return newBoard;
        });
    };


    const nextPlayer = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % numPlayers);
    };

    return (
        <DndProvider backend={HTML5Backend}>
        <div>
            <h2>Jeu pour {numPlayers} joueur(s)</h2>
            <Board numPlayers={numPlayers} handleDrop={handleDrop} board={board}/>

            <div className="player">
                <Player
                    player={players[currentPlayer]}
                    currentPlayer={currentPlayer}
                    isCurrentPlayer={true}
                    // onCardDrag={handleCardDrag}
                />
                <button onClick={nextPlayer}>Passer au joueur suivant</button>
            </div>

        </div>
        </DndProvider>
    );
};
export default Game;


