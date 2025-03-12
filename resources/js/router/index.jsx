import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../components/HomePage";
import About from "../components/About";
import Landing from "../components/Landing";
import App from "../components/App";
import NotfoundPage from "../components/NotfoundPage";

function index() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<NotfoundPage />} />
            </Routes>
        </div>
    );
}

export default index;
