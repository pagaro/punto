import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GamePage from "./gamePage";
import './game.css';
import {toast, ToastContainer} from "react-toastify";

function LobbyPage() {
    const [fields, setFields] = useState({name: '', status: '', users: []});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const {name, status, id_users} = response.data;
            setFields({...fields, name: name, status: status, users: id_users});
        }).catch((error) => {
            toast(error)
            console.log(error.message)
            navigate("/game")
        })
    }, [])

    function handleStartGame() {
        console.log("toto")
        axios.post("http://localhost:3000/startgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log("titi")
        }).catch((error) => {
            console.log(error)
            toast(error.message)
            console.log(error.message)
        })
    }

    if (fields.status === "RUNNING") {
        return <GamePage/>
    }

    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>{fields.name}</h1>
                <div>
                    <label>Joueurs connectés : </label>
                    <ul>
                        {fields.users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleStartGame}>Lancer la partie</button>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default LobbyPage;
