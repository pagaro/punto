import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GamePage from "./gamePage";
import {toast, ToastContainer} from "react-toastify";
import ListUsers from "../component/list/listUsers";

function JoinPage() {
    const [fields, setFields] = useState({name: ''});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            const {name} = response.data.game;

            setFields({...fields, name: name});
            console.log(fields)
        }).catch((error) => {
            toast(error.message)
            console.log(error)
            navigate("/game")
        })
    }, [])

    function handleJoinGame() {
        axios.post("http://localhost:3000/joingame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            navigate("/game/" + id)
        }).catch((error) => {
            console.log(error)
            toast(error.message)
            console.log(error.message)
        })
    }

    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>{fields.name}</h1>
                <button onClick={handleJoinGame}>Rejoint la partie</button>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default JoinPage;
