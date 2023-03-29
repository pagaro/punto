// src/components/GridSquare.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Card from "./Card";

const GridSquare = ({ x, y, handleDrop, card }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item) => handleDrop(x, y, item.card),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                backgroundColor: isOver ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
                width: '50px',
                height: '50px',
                border: '1px solid black',
                boxSizing: 'border-box',
            }}
            className="grid-square"

        >
            {card && <Card card={card} />}
        </div>
    );
};

export default GridSquare;
