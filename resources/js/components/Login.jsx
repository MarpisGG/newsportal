import React, { useState } from "react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Gradient Side Panel */}
            <div className="hidden md:block w-1/3 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 rounded-tr-3xl rounded-br-3xl"></div>

            {/* Login Form Section */}
            <div className="w-full md:w-2/3 flex items-center justify-center p-6">
                <div className="w-full max-w-md relative">
                    {/* Background Abstract Shape */}
                    <div className="absolute -z-10 opacity-20 w-full h-full">
                        <div className="absolute top-24 right-0 w-64 h-64 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-2xl"></div>
                    </div>

                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
                            LOGIN
                        </h2>

                        <form className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-sm text-gray-600">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="block text-sm text-gray-600">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-center">
                                <a
                                    href="#"
                                    className="text-sm text-purple-600 hover:text-purple-800"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Login
                            </button>

                            {/* OR Divider */}
                            <div className="flex items-center justify-center space-x-2">
                                <div className="h-px bg-gray-300 w-full"></div>
                                <span className="text-sm text-gray-500">
                                    OR
                                </span>
                                <div className="h-px bg-gray-300 w-full"></div>
                            </div>

                            {/* Social Login Options */}
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    className="p-2 bg-gray-100 rounded-full"
                                >
                                    <span className="text-sm text-gray-600">
                                        G
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="p-2 bg-gray-100 rounded-full"
                                >
                                    <span className="text-sm text-gray-600">
                                        f
                                    </span>
                                </button>
                            </div>

                            {/* Sign Up Link */}
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
