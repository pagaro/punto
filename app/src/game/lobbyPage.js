import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GamePage from "./gamePage";
import {toast, ToastContainer} from "react-toastify";
import ListUsers from "../component/list/listUsers";
import JoinButton from "../component/button/joinButton";
import StartButton from "../component/button/startButton";
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {transports: ['websocket']});

function LobbyPage() {
    const [fields, setFields] = useState({name: '', status: '', users: [], is_in: false,isConnected: socket.connected });
    const [newUser, setNewUser] = useState(undefined);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const {name, status, id_users} = response.data.game;
            const {is_in} = response.data;
            setFields({...fields, name: name, status: status, users: id_users, is_in: is_in});
        }).catch((error) => {
            toast(error.message)
            console.log(error)
            navigate("/game")
        })

        socket.on('connect', () => {
            console.log("connect")
            setFields({...fields, isConnected: true})
        });

        socket.on('disconnect', () => {
            console.log("disconnect")
            setFields({...fields, isConnected: false})
        });

        socket.on('useradded', (user) => {
            console.log("useradded",user)
            setNewUser(user)
        });
    }, [])

    useEffect(() => {
        if (!newUser) return
        setFields({...fields, users: [...fields.users, newUser._id]})
    }, [newUser])

    if (fields.status === "RUNNING") {
        return <GamePage />
    }

    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>{fields.name}</h1>
                <div>
                    <label>Joueurs connectés : </label>
                    <ListUsers items={fields.users}/>
                </div>
                {fields.is_in ? <StartButton/>:<JoinButton/>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default LobbyPage;
