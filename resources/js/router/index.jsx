import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUP from "../components/SignUP";
import Login from "../components/Login";
import Landing from "../components/Landing";
import Admin from "../components/Admin/Admin";
import AddCategoryForm from "../components/Admin/AddCategoryForm";
import AdminMessages from "../components/Admin/AdminMessages";
import Contactus from "../components/Contactus";
import App from "../components/App";
import NotfoundPage from "../components/NotfoundPage";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import AboutUs from "../components/AboutUs";
import Categories from "../components/Categories";
import GoogleCallback from "../components/GoogleCallback";
import NewsPage from "../components/NewsPage";


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
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/AddCategoryForm" element={<AddCategoryForm />} />
                <Route path="/AdminMessages" element={<AdminMessages />} />
                <Route path="/google/callback" element={<GoogleCallback />} />
                <Route path="/NewsPage" element={<NewsPage />} />
            </Routes>
        </div>
    );
}

export default index;
