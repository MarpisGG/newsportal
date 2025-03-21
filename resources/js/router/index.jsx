import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUP from "../components/SignUP";
import Login from "../components/Login";
import Landing from "../components/Landing";
import Admin from "../components/Admin";
import Contactus from "../components/Contactus";
import App from "../components/App";
import NotfoundPage from "../components/NotfoundPage";

function index() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/SignUP" element={<SignUP />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/*" element={<NotfoundPage />} />
                <Route path="/Contactus" element={<Contactus />} />
            </Routes>
        </div>
    );
}

export default index;
