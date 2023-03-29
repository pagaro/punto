// src/components/GridSquare.js
import React from 'react';
import { useDrop } from 'react-dnd';

const GridSquare = ({ x, y, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item) => {
            console.log(`Dropped card at position: ${x}, ${y}`);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                width: '50px',
                height: '50px',
                border: '1px solid black',
                backgroundColor: isOver ? 'lightblue' : 'white',
            }}
        >
            {children}
        </div>
    );
};

export default GridSquare;
