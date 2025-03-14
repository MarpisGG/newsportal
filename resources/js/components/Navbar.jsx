import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
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
    </div>
  )
}

export default Navbar