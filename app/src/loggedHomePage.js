// Importation des modules nécessaires
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import './game/game.css';
import io from 'socket.io-client';
import ListGames from "./component/list/listGames";

// Création d'un client socket.io pour se connecter au serveur
const socket = io('http://localhost:3000', { transports: ['websocket'] });

function LoggedHomePage() {
    // Utilisation du Hook d'état useState pour stocker les informations de la page
    const [fields, setFields] = useState({ games: [], isConnected: socket.connected });
    const [newGame, setNewGame] = useState(undefined);
    const token = localStorage.getItem('token');

    // Utilisation du Hook useEffect pour effectuer des opérations après le chargement de la page
    useEffect(() => {
        // Appel à l'API pour récupérer la liste des parties
        axios.post("http://localhost:3000/listsgames", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const { games } = response.data;
            // Mise à jour des jeux disponibles
            setFields({ ...fields, games: games });
        }).catch((error) => {
            console.log(error)
            // Affichage d'une notification en cas d'erreur
            toast(error.response.data)
            setFields({ ...fields, games: [] });
        })

        // Ecouteurs d'événements socket.io pour la connexion et la déconnexion
        socket.on('connect', () => {
            console.log("connect")
            setFields({ ...fields, isConnected: true })
        });

        socket.on('disconnect', () => {
            console.log("disconnect")
            setFields({ ...fields, isConnected: false })
        });

        // Ecouteur d'événement socket.io pour l'ajout d'un nouveau jeu
        socket.on('gameadded', (game) => {
            console.log("gameadded")
            setNewGame(game)
        });
    }, []);

    // Utilisation du Hook useEffect pour ajouter un nouveau jeu à la liste des jeux disponibles
    useEffect(() => {
        if (!newGame) return
        setFields({ ...fields, games: [...fields.games, newGame] })
    }, [newGame])

    // Affichage de la page avec la liste des jeux disponibles et le bouton pour créer un nouveau jeu
    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>Welcome to the Punto Home Page</h1>
                <div>
                    <label>Liste des parties : </label>
                    <ListGames items={fields.games} />
                </div>
                <Link to="/game">
                    <button>Nouvelle partie</button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
}

// Exportation du composant LoggedHomePage en tant que composant par défaut pour être utilisé dans d'autres fichiers
export default LoggedHomePage;
