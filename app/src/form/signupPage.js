import React, {useEffect, useState} from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import {useNavigate} from "react-router-dom";
import './form.css';
import userLoginStatus from "./userLoginStatus";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage() {
    const [fields, setFields] = useState({email: '', password: '',confirmPassword :'',dob:''});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (fields.password !== fields.confirmPassword) {
            toast('Les mots de passe ne correspondent pas')
            return;
        }

        const passwordStrength = zxcvbn(fields.password);

        if (passwordStrength.score < 3) {
            toast("Mot de passe faible , pas bloquant")
            //todo
            // return;
        }

        try {
            await axios.post("http://localhost:3000/signup", fields);
            navigate("/login");
        } catch (error) {
            console.log(error)
            toast(error.response.data)
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
        <div className="form-page">
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Email:
                    <input type="email" value={fields.email} onChange={e => setFields({...fields , email: e.target.value})}/>
                </label>
                <br/>
                <label>
                    Date de naissance:
                    <input type="date" value={fields.dob} onChange={e => setFields({...fields , dob: e.target.value})}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={fields.password} onChange={e => setFields({...fields , password: e.target.value})}/>
                </label>
                <br/>
                <label>
                    Confirmer Password:
                    <input type="password" value={fields.confirmPassword} onChange={e => setFields({...fields , confirmPassword: e.target.value})}/>
                </label>
                <br/>
                <button type="submit">Signup</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignupPage;
