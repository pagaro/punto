import React from "react";
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import GamePage from "./GamePage";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet/> : <Navigate to="/login"/>;
}

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/register" element={<RegisterPage/>}/>
            <Route exact path='/game' element={<PrivateRoute/>}>
                <Route exact path='/game' element={<GamePage/>}/>
            </Route>
        </Routes>

    );
}

export default App;
