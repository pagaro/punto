import React from "react";
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import LoginPage from "./form/loginPage";
import CreatePage from "./form/createPage";
import SignupPage from "./form/signupPage";
import LobbyPage from "./game/lobbyPage";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet/> : <Navigate to="/login"/>;
}

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/signup" element={<SignupPage/>}/>
            <Route exact path='/game' element={<PrivateRoute/>}>
                <Route exact path='/game' element={<CreatePage/>}/>
            </Route>
            <Route path="/game/:id" element={<LobbyPage/>}></Route>
        </Routes>

    );
}

export default App;
