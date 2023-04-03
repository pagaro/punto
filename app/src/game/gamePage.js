import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Game from "./components/Game";
import NumberOfPlayers from "./components/NumberOfPlayers";

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
