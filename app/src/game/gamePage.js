import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function GamePage() {
    const [fields, setFields] = useState({name: ''});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect( () => {
        axios.post("http://localhost:3000/statusgame", {id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setFields({...fields, name: response.data.name})
        }).catch((error) => {
            console.log(error)
            navigate("/game")
        })

    }, [])


    return (
        <div>
            <h1>Welcome to the Punto Game Page</h1>
            {fields.name && <p>{fields.name}</p>}
        </div>
    );
}

export default GamePage;
