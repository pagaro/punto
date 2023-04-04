import React, {useState} from 'react';
import axios from 'axios';
import '../component/form/form.css';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";

function CreatePage() {
    // Initialise un état "fields" qui contient le nom de la partie
    const [fields, setFields] = useState({name: ''})
    // Récupère le token de l'utilisateur stocké dans le local storage
    const token = localStorage.getItem('token');
    // Initialise un hook de navigation pour rediriger l'utilisateur après la création de la partie
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Envoie une requête POST à l'API pour créer une partie avec le nom spécifié dans l'état "fields"
            // Utilise le token de l'utilisateur pour l'authentification
            const response = await axios.post("http://localhost:3000/creategame", {name: fields.name}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Récupère l'ID de la partie créée dans la réponse de l'API
            const id = response.data.id
            // Redirige l'utilisateur vers la page de la partie créée
            navigate('/game/' + id);
        } catch (error) {
            // Affiche une erreur en cas d'échec de la création de la partie
            console.log(error)
            toast(error.response.data)
        }
    }

    // Rendu de la page de création de la partie
    return (
        <div className="form-page">
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Nom de la partie:
                    <input type="name" value={fields.name}
                           onChange={e => setFields({...fields, name: e.target.value})}/>
                </label>
                <br/>
                <button type="submit">Creation de la partie</button>
            </form>
            <ToastContainer/>
        </div>

    );
}

export default CreatePage;
