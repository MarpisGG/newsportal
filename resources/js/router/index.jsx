import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUP from "../components/SignUP";
import Login from "../components/Login";
import Landing from "../components/Landing";
import App from "../components/App";
import NotfoundPage from "../components/NotfoundPage";

function index() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/SignUP" element={<SignUP />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<NotfoundPage />} />
            </Routes>
        </div>
    );
}

export default index;
