// Importation des modules nécessaires
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userLoginStatus from "./component/form/userLoginStatus";
import LoggedHomePage from "./loggedHomePage";
import './game/game.css';

function HomePage() {
    // Utilisation du Hook d'état useState pour stocker l'état de connexion de l'utilisateur
    const [fields, setFields] = useState({ isLogged: false });

    // Utilisation du Hook useEffect pour appeler la fonction userLoginStatus lors du chargement de la page
    useEffect(() => {
        userLoginStatus().then((result) => {
            // Mise à jour de l'état de connexion de l'utilisateur
            setFields({ ...fields, isLogged: result.isLoggedIng });
        })
    }, []);

    // Si l'utilisateur est connecté, afficher la page LoggedHomePage
    if (fields.isLogged) {
        return <LoggedHomePage />;
    }

    // Sinon, afficher la page d'accueil avec les boutons de connexion et d'inscription
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

// Exportation du composant HomePage en tant que composant par défaut pour être utilisé dans d'autres fichiers
export default HomePage;
