import React ,{Component} from "react";
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myVariable: ""
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000`)
            .then(res => res.json())
            .then(data => this.setState({myVariable: data.data}))
            .catch(error => console.error(error));
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {this.state.myVariable}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>)
    }
}

export default App;
