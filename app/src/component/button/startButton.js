import React from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

function StartButton() {
    const token = localStorage.getItem('token');
    const {id} = useParams()
    function handleStartGame() {
        axios.post("http://localhost:3000/startgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error)
            toast(error.message)
            console.log(error.message)
        })
    }

    return (
        <button onClick={handleStartGame}>Lancer la partie</button>
    );
}

export default StartButton;
