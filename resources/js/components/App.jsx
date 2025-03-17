import React from "react";
import Router from "../router/index";
import Navbar from "./Navbar";

const App = () => {
    return (
        <div className="app-container">
            <main className="main-content">
                <Router />
            </main>
        </div>
    );
};

export default App;
