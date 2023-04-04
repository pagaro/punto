import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GamePage from "./gamePage";
import {toast, ToastContainer} from "react-toastify";
import ListUsers from "../component/list/listUsers";
import JoinButton from "../component/button/joinButton";
import StartButton from "../component/button/startButton";
import io from 'socket.io-client';

// Initialise un client Socket.io pour la communication en temps réel avec le serveur
const socket = io('http://localhost:3000', {transports: ['websocket']});

function LobbyPage() {
    // Initialise un état "fields" qui contient les informations de la partie, notamment le nom, l'état, les joueurs, etc.
    const [fields, setFields] = useState({name: '', status: '', users: [], is_in: false,isConnected: socket.connected });
    // Initialise un état "newUser" pour stocker le dernier utilisateur ajouté
    const [newUser, setNewUser] = useState(undefined);
    // Récupère le token de l'utilisateur stocké dans le local storage
    const token = localStorage.getItem('token');
    // Initialise un hook de navigation pour rediriger l'utilisateur
    const navigate = useNavigate();
    // Récupère l'ID de la partie à rejoindre à partir des paramètres de l'URL
    const {id} = useParams()

    // Effectue une requête GET à l'API pour récupérer les informations de la partie
    useEffect(() => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // Met à jour l'état "fields" avec les informations récupérées dans la réponse de l'API
            const {name, status} = response.data.game;
            const users = response.data.users
            const {is_in} = response.data;
            setFields({...fields, name: name, status: status, users: users, is_in: is_in});

        }).catch((error) => {
            // En cas d'erreur, affiche un message d'erreur et redirige l'utilisateur vers la page de jeu
            toast(error.message)
            console.log(error)
            navigate("/game")
        })

        // Écoute les événements Socket.io pour la connexion et la déconnexion du client, ainsi que l'ajout d'un utilisateur
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

    // Effectue une mise à jour de l'état "fields" avec le nouvel utilisateur ajouté
    useEffect(() => {
        if (!newUser) return
        setFields({...fields, users: [...fields.users, newUser]})
    }, [newUser])

    // Si l'état "status" de la partie est "RUNNING", redirige l'utilisateur vers la page de la partie
    if (fields.status === "RUNNING") {
        return <GamePage />
    }

    // Rendu de la page du lobby de la partie
    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>{fields.name}</h1>
                <div>
                    <label>Joueurs connectés : </label>
                    {/*Affiche la liste des utilisateurs connectés à la partie*/}
                    <ListUsers items={fields.users}/>
                </div>
                {/*Affiche le bouton "Rejoindre la partie" si l'utilisateur n'est pas déjà dans la partie*/}
                {fields.is_in ? <StartButton/>:<JoinButton/>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default LobbyPage;
