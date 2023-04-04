// Importation des modules nécessaires
import React from "react";
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from "./homePage";
import LoginPage from "./component/form/loginPage";
import CreatePage from "./game/createPage";
import SignupPage from "./component/form/signupPage";
import LobbyPage from "./game/lobbyPage";

// Définition du composant PrivateRoute qui vérifie la présence du token dans le localStorage
const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    // Si le token est présent, afficher les éléments enfants de la route parente avec Outlet
    // Sinon, rediriger l'utilisateur vers la page de connexion avec Navigate
    return token ? <Outlet/> : <Navigate to="/login"/>;
}

// Définition du composant principal App qui utilise la bibliothèque de routage react-router-dom
function App() {
    return (
        // Définition des routes pour chaque page de l'application
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/signup" element={<SignupPage/>}/>
            {/* La route /game est protégée par PrivateRoute */}
            <Route exact path='/game' element={<PrivateRoute/>}>
                <Route exact path='/game' element={<CreatePage/>}/>
            </Route>
            {/* La route /game/:id affiche la page de lobby avec l'ID du jeu */}
            <Route path="/game/:id" element={<LobbyPage/>}></Route>
        </Routes>

    );
}

// Exportation du composant principal App en tant que composant par défaut pour être utilisé dans d'autres fichiers
export default App;
