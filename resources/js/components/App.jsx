import React from "react";
import Router from "../router/index";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Router />
            </main>
        </div>
    );
};

export default App;
