import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import userLoginStatus from "./form/userLoginStatus";
import LoggedHomePage from "./loggedHomePage";

function HomePage() {
    const [fields, setFields] = useState({isLogged: false});

    useEffect(() => {
        userLoginStatus().then((result) => {
            setFields({...fields, isLogged: result.isLoggedIng})
        })
    }, []);


    if (fields.isLogged) {
        return <LoggedHomePage/>
    }

    return (
        <div>
            <h1>Welcome to the Punto Home Page</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
        </div>
    );
}


export default HomePage;
