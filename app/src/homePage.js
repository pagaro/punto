import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import userLoginStatus from "./component/form/userLoginStatus";
import LoggedHomePage from "./loggedHomePage";
import './game/game.css';
import ListGames from "./component/list/listGames";
import {ToastContainer} from "react-toastify";

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
        <div className="lobby-page">
            <div className="lobby">
                <h1>Welcome to the Punto Home Page</h1>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
            </div>
        </div>
    );
}


export default HomePage;
