// Crée un contexte pour les cartes qui sera utilisé pour partager les informations entre les différents composants
import { createContext } from 'react';

// Initialise un contexte "CardContext" avec les valeurs par défaut pour la carte en cours de déplacement et la fonction pour la définir
const CardContext = createContext({
    draggedCard: null,
    setDraggedCard: () => {},
});

// Exporte le contexte "CardContext" pour l'utiliser dans d'autres composants
export default CardContext;
