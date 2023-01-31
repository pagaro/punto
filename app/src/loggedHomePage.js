import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import './game/game.css';
import io from 'socket.io-client';
import ListGames from "./component/list/listGames";

const socket = io('http://localhost:3000', {transports: ['websocket']});

function LoggedHomePage() {
    const [fields, setFields] = useState({games: [], isConnected: socket.connected});
    const [newGame, setNewGame] = useState(undefined);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.post("http://localhost:3000/listsgames", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const {games} = response.data;
            setFields({...fields, games: games});
        }).catch((error) => {
            console.log(error)
            toast(error.response.data)
            setFields({...fields, games: []});
        })

        socket.on('connect', () => {
            console.log("connect")
            setFields({...fields, isConnected: true})
        });

        socket.on('disconnect', () => {
            console.log("disconnect")
            setFields({...fields, isConnected: false})
        });

        socket.on('gameadded', (game) => {
            console.log("gameadded")
            setNewGame(game)
        });
    }, [])


    useEffect(() => {
        if (!newGame) return
        setFields({...fields, games: [...fields.games, newGame]})
    }, [newGame])

    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>Welcome to the Punto Home Page</h1>
                <div>
                    <label>Liste des parties : </label>
                    <ListGames items={fields.games}/>
                </div>
                <Link to="/game">
                    <button>Nouvelle partie</button>
                </Link>
            </div>
            <ToastContainer/>
        </div>
    );

}


export default LoggedHomePage;
