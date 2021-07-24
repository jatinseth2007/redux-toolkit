import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/homepage">
                        <Register />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
