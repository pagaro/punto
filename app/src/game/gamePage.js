import React, {useState} from 'react';
import Game from "../component/game/Game";
import NumberOfPlayers from "../component/game/NumberOfPlayers";

function GamePage() {
    // Initialise un état "numPlayers" qui représente le nombre de joueurs dans la partie
    const [numPlayers, setNumPlayers] = useState(null);

    // Fonction de sélection du nombre de joueurs qui met à jour l'état "numPlayers"
    const handlePlayerSelection = (selectedNumPlayers) => {
        setNumPlayers(selectedNumPlayers);
    };

    // Rendu de la page de jeu
    return (
        <div className="App">
            {/* Si le nombre de joueurs est sélectionné, affiche le composant Game avec le nombre de joueurs en tant que prop */}
            {numPlayers ? (
                <Game numPlayers={numPlayers}/>
            ) : (
                <NumberOfPlayers onSelect={handlePlayerSelection}/>
            )}
        </div>
    );
}

export default GamePage;
