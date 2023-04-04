import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

function JoinPage() {
    // Initialise un état "fields" qui contient le nom de la partie
    const [fields, setFields] = useState({name: ''});
    // Récupère le token de l'utilisateur stocké dans le local storage
    const token = localStorage.getItem('token');
    // Initialise un hook de navigation pour rediriger l'utilisateur après avoir rejoint la partie
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
            // Met à jour l'état "fields" avec le nom de la partie récupéré dans la réponse de l'API
            const {name} = response.data.game;
            setFields({...fields, name: name});
        }).catch((error) => {
            // En cas d'erreur, affiche un message d'erreur et redirige l'utilisateur vers la page de jeu
            toast(error.message)
            console.log(error)
            navigate("/game")
        })
    }, [])

    // Fonction de gestion du bouton "Rejoindre la partie" qui envoie une requête POST à l'API pour rejoindre la partie
    function handleJoinGame() {
        axios.post("http://localhost:3000/joingame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // Redirige l'utilisateur vers la page de la partie après avoir rejoint la partie avec succès
            navigate("/game/" + id)
        }).catch((error) => {
            // En cas d'erreur, affiche un message d'erreur
            console.log(error)
            toast(error.message)
        })
    }

    // Rendu de la page de rejoindre la partie
    return (
        <div className="lobby-page">
            <div className="lobby">
                <h1>{fields.name}</h1>
                {/* Affiche le bouton "Rejoindre la partie" qui déclenche la fonction handleJoinGame() */}
                <button onClick={handleJoinGame}>Rejoint la partie</button>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default JoinPage;
