import React, {useEffect, useState} from 'react';
import axios from 'axios';
import userLoginStatus from "./userLoginStatus";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const [fields, setFields] = useState({email: '', password: '', error: null});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFields({...fields,[event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {email: fields.email, password: fields.password};
            await axios.post("http://localhost:3000/register", data);

            navigate('/login');
        } catch (error) {
            console.error(error);
            setFields({...fields, error: error.response.data.message})
        }
    }

    useEffect(()=> {
        userLoginStatus().then((result)=> {
            if (result.isLoggedIng){
                navigate("/game");
            }
        })
    },[])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={fields.email} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" value={fields.password}
                           onChange={handleChange}/>
                </label>
                <br/>
                <button type="submit">Register</button>
            </form>
            {fields.error && <p>{fields.error}</p>}
        </div>
    );
}

export default RegisterPage;
