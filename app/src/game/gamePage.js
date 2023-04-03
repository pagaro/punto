import React, {useEffect, useState} from 'react';
import Game from "../component/game/Game";
import NumberOfPlayers from "../component/game/NumberOfPlayers";

function GamePage() {
    const [numPlayers, setNumPlayers] = useState(null);

    const handlePlayerSelection = (selectedNumPlayers) => {
        setNumPlayers(selectedNumPlayers);
    };

    return (
        <div className="App">
            {numPlayers ? (
                <Game numPlayers={numPlayers} />
            ) : (
                <NumberOfPlayers onSelect={handlePlayerSelection} />
            )}
        </div>
    );
}

export default GamePage;
