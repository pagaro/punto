import React, {useState} from 'react';
import axios from 'axios';
import './form.css';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";

function CreatePage() {
    const [fields, setFields] = useState({name: ''})
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/creategame", {name: fields.name}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const id = response.data.id
            navigate('/game/' + id);
        } catch (error) {
            console.log(error)
            toast(error.response.data)
        }
    }

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
