import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUP from "../components/SignUP";
import Login from "../components/Login";
import Landing from "../components/Landing";
import Admin from "../components/Admin";
import Contactus from "../components/Contactus";
import App from "../components/App";
import NotfoundPage from "../components/NotfoundPage";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

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
                <Route path="/Profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </div>
    );
}

export default index;
