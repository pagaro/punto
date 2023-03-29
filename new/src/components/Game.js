/// src/components/Game.js
import React, {useState} from "react";
import Board from "./Board";
import { generatePlayers} from "../utils/gameLogic";
import Player from "./Player";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const Game = ({numPlayers}) => {
    const [board, setBoard] = useState( Array(11).fill(null).map(() => Array(11).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const players = generatePlayers(numPlayers);


    const handleDrop = (x, y, card) => {

        const newBoard = board.map((row) => row.slice());
        // Place the card on the new board
        newBoard[x][y] = card;
        setBoard(newBoard)
    };

    return (
        <DndProvider backend={HTML5Backend}>
        <div>
            <h2>Jeu pour {numPlayers} joueur(s)</h2>
            <Board numPlayers={numPlayers} handleDrop={handleDrop} board={board}/>

            <div className="player-cards">
                {players.map((player, index) => (
                    <Player key={index} player={player} isActive={currentPlayer === index} />
                ))}
            </div>
        </div>
        </DndProvider>
    );
};
export default Game;


