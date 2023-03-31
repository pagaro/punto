// src/components/Board.js

import React, {useEffect, useState} from 'react';
import GridSquare from './GridSquare';
import Card from './Card';
import './Board.css'
import {validateDropSquare} from "../utils/ValideSquare";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

const Board = ({board, handleCardDrop, currentPlayer}) => {
    const [validAreaCenter, setValidAreaCenter] = useState({x: 5.5, y: 5.5});
    const [zoomLevel, setZoomLevel] = useState(2);

    const handleCardDragStart = (event, card) => {
        event.dataTransfer.setData('card', JSON.stringify(card));
    };

    useEffect(() => {
        // Met à jour la valeur de zoom
        let toto = calculateValidAreaCenter()
        // console.log(toto)
        // toto.x = -50 * (toto.x / toto.with -1)
        // toto.y = -50 * (toto.y / toto.with -1)
        // console.log((toto.x / (toto.with) + toto.x ))
        // toto.x = -150*toto.x
        // toto.y = -150*toto.y
        // setValidAreaCenter(toto);
        // setZoomLevel((prevZoomLevel) => 2 -toto.with/10);
        setZoomLevel((prevZoomLevel) => 2);


    }, [board]);

    const handleCardDragEnd = (event) => {
        // validateDropSquare = (event, x, y, board)
        // let toto = calculateValidAreaCenter()
        // console.log(toto)
        // setValidAreaCenter(toto);
        // setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
        // Vous pouvez gérer les actions après le glisser-déposer ici, si nécessaire.
    };

    const calculateValidAreaCenter = () => {
        let minX = board[0].length, maxX = 0, minY = board.length, maxY = 0;

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (validateDropSquare(x, y, board)) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        return {
            with: Math.max(maxX - minX + 1, maxY - minY + 1),
            x: (minX + maxX) / 2,
            y: (minY + maxY) / 2,
        };
    };

    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < 11; y++) {
            const cols = [];
            for (let x = 0; x < 11; x++) {
                cols.push(
                    <GridSquare
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        board={board}
                        handleCardDrop={handleCardDrop}
                    />
                );
            }
            rows.push(
                <div key={y} className="row">
                    {cols}
                </div>
            );
        }
        return rows;
    };

    return <div className="board">
        <TransformWrapper
            options={{minScale: 1, maxScale: 4, centerContent: false}}
            // zoomIn={{step: 5}}
            // zoomOut={{step: 5}}
        >{({setTransform, zoomIn, zoomOut, resetTransform, setScale, ...rest}) => {
            // setTransform(validAreaCenter.x, validAreaCenter.y, zoomLevel)
            // console.log()
            return (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={() => zoomIn()}>+</button>
                        <button onClick={() => zoomOut()}>-</button>
                        <button onClick={() => resetTransform()}>x</button>
                    </div>
                    <TransformComponent>
                        <div className="grid-container">{renderGrid()}</div>
                    </TransformComponent>
                </React.Fragment>
            );
        }}
        </TransformWrapper>
        {/*<div className="grid-container">{renderGrid()}</div>*/}

        <div className="player">
            <h3>Player {currentPlayer.id}-{currentPlayer.color}</h3>
            {currentPlayer.cards.map((card, index) => (
                <Card
                    index={index}
                    card={card}
                    onDragStart={handleCardDragStart}
                    onDragEnd={handleCardDragEnd}
                />
            ))}
        </div>
    </div>;
};


export default Board;
