// src/context/CardContext.js
import { createContext } from 'react';

const CardContext = createContext({
    draggedCard: null,
    setDraggedCard: () => {},
});

export default CardContext;