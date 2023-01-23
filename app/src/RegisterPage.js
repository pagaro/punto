import React from 'react';
import axios from 'axios';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = { email: this.state.email, password: this.state.password };
            const response = await axios.post("http://localhost:3000/register", data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        );
    }
}

export default RegisterPage;
