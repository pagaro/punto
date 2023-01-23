import {Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


function App() {
    return (
            <Routes>
                <Route exact path="/" element={<HomePage/>} ></Route>
                <Route exact path="/login" element={<LoginPage/>} ></Route>
                <Route exact path="/register" element={<RegisterPage/>} ></Route>
            </Routes>

    );
}

export default App;
