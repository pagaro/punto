import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {email, password};
            const response = await axios.post("http://your-api-url.com/login", data);
            if (response.status !== 200) {
                throw new Error('Identification échouée');
            }
            // Save the token
            localStorage.setItem('token', response.data.token);
            navigate('/game');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}