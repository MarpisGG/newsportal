import React from "react";
import Router from "../router/index";
import { NavLink } from "react-router-dom";

const App = () => {
    return (
        <div className="app-container">
            <header className="header">
                <h1>Winninews</h1>
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Landing
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/Login"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="main-content">
                <Router />
            </main>
        </div>
    );
};

export default App;
