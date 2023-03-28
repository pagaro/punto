import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function GamePage() {
    const [fields, setFields] = useState({name: ''});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {id} = useParams()
    const [board, setBoard] = useState(Array(42).fill(null));
    const [player, setPlayer] = useState(1);

    useEffect(() => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setFields({...fields, name: response.data.game.name})
        }).catch((error) => {
            console.log(error)
            navigate("/game")
        })

    }, [])

    const handleClick = (index) => {
        const newBoard = [...board];
        for (let i = 35 + (index % 7); i >= 0; i -= 7) {
            if (!newBoard[i]) {
                newBoard[i] = player;
                setBoard(newBoard);
                setPlayer(player === 1 ? 2 : 1);
                break;
            }
        }
    }


    const renderCell = (index) => {
        return (
            <div
                className={`cell ${board[index] === 1 ? "player1" : board[index] === 2 ? "player2" : ""}`}
                key={index}
                onClick={() => handleClick(index)}
            ></div>
        );
    };

    const renderBoard = () => {
        const boardCells = [];
        for (let i = 0; i < 42; i++) {
            boardCells.push(renderCell(i));
        }
        return boardCells;
    };


    return (
        <div>
            <h1>Welcome to the Punto Game Page</h1>
            {fields.name && <p>{fields.name}</p>}
            <div className="board">{renderBoard()}</div>
            <div className="player">Player {player}'s turn</div>
            <input type="str" value={fields.confirmPassword} onChange={e => setFields({...fields , confirmPassword: e.target.value})}/>
            <button type="submit">Signup</button>
        </div>
    );
}

export default GamePage;
