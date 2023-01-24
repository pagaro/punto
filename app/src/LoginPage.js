import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import userLoginStatus from "./userLoginStatus";

function LoginPage() {
    const [fields, setFields] = useState({email:'',password:'',error: null})
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", fields);
            localStorage.setItem('token', response.data.token)
            navigate('/game');
        } catch (error) {
            console.error(error);
            setFields({...fields , error: error.response.data.message})
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
                    <input type="email" value={fields.email} onChange={e => setFields({...fields , email: e.target.value})}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={fields.password} onChange={e => setFields({...fields , password: e.target.value})}/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
            {fields.error && <p>{fields.error}</p>}
        </div>
    );
}

export default LoginPage;
