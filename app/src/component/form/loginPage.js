import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import userLoginStatus from "./userLoginStatus";
import './form.css';
import {toast, ToastContainer} from "react-toastify";

function LoginPage() {
    const [fields, setFields] = useState({email:'',password:''})
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", fields);
            localStorage.setItem('token', response.data.token)
            navigate('/');
        } catch (error) {
            console.log(error)
            toast(error.response.data)
        }
    }

    useEffect(()=> {
        userLoginStatus().then((result)=> {
            if (result.isLoggedIng){
                navigate("/");
            }
        })
    },[navigate])

    return (
        <div className="form-page">
            <form onSubmit={handleSubmit} className="form">
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
            <ToastContainer/>
        </div>
    );
}

export default LoginPage;
