import React, { useState, useEffect } from "react";
import axios from "axios";
import googlepng from "../../assets/img/google-logo.png";
import facebookpng from "../../assets/img/fb-logo.png";
import Swal from "sweetalert2";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const name = urlParams.get("name");

        if (token && name) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", name);
            window.location.href = name === "admin" ? "/admin" : "/";
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            Swal.fire({
                title: "Error",
                text: "Email and password are required!",
                icon: "error"
            });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: formData.email.trim(),
                password: formData.password
            }, {
                headers: { "Content-Type": "application/json" }
            });

            localStorage.setItem("user", JSON.stringify(response.data.user));
            // Jika backend pakai token auth
            // localStorage.setItem("token", response.data.token);

            if (response.data.user.id === 1) {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }

        } catch (error) {
            console.error("Login error:", error.response?.data);
            Swal.fire({
                title: "Login Failed",
                text: error.response?.data.message || "Invalid credentials",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white">
            <div className="hidden md:block w-1/3 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 rounded-tr-3xl rounded-br-3xl"></div>

            <div className="w-full md:w-2/3 flex items-center justify-center p-6">
                <div className="w-full max-w-md relative">
                    <div className="absolute -z-10 opacity-20 w-full h-full">
                        <div className="absolute top-24 right-0 w-64 h-64 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-2xl"></div>
                    </div>

                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
                            LOGIN
                        </h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="block text-sm text-gray-600">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-12 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-gray-600">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="text-center">
                                <a
                                    href="/ForgotPassword"
                                    className="text-sm text-purple-600 hover:text-purple-800"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <div className="flex items-center justify-center space-x-2">
                                <div className="h-px bg-gray-300 w-full"></div>
                                <span className="text-sm text-gray-500">OR</span>
                                <div className="h-px bg-gray-300 w-full"></div>
                            </div>

                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = "http://127.0.0.1:8000/api/auth/google/redirect")
                                    }
                                    className="flex items-center space-x-2 p-2 border border-gray-400 rounded-[10px]"
                                >
                                    <img src={googlepng} alt="Google Logo" className="w-5 h-5" />
                                    <span className="text-sm text-gray-600">Sign in with Google</span>
                                </button>

                                <button
                                    type="button"
                                    className="flex items-center space-x-2 p-2 border border-gray-400 rounded-[10px]"
                                >
                                    <img src={facebookpng} alt="Facebook Logo" className="w-5 h-5" />
                                    <span className="text-sm text-gray-600">Sign in with Facebook</span>
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <a
                                        href="SignUP"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
