import React, { useState } from "react";

function HomePage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Gradient Side Panel */}
            <div className="hidden md:block w-1/3 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 rounded-tr-3xl rounded-br-3xl"></div>

            {/* Sign Up Form Section */}
            <div className="w-full md:w-2/3 flex items-center justify-center p-6">
                <div className="w-full max-w-md relative">
                    {/* Background Abstract Shape */}
                    <div className="absolute -z-10 opacity-20 w-full h-full">
                        <div className="absolute top-24 right-0 w-64 h-64 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-2xl"></div>
                    </div>

                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            SIGN UP
                        </h2>

                        <form className="space-y-4">
                            {/* Full Name Input */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter Your Full Name"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter Your Email Address"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="Enter Your Password"
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
                                <p className="text-xs text-gray-500">
                                    Use 8 or more characters with a mix of
                                    letters/numbers & symbols.
                                </p>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Phone No.
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>

                            {/* Gender */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Gender
                                </label>
                                <div className="flex space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            id="male"
                                            type="radio"
                                            name="gender"
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor="male"
                                            className="text-sm text-gray-600"
                                        >
                                            Male
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="female"
                                            type="radio"
                                            name="gender"
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor="female"
                                            className="text-sm text-gray-600"
                                        >
                                            Female
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="other"
                                            type="radio"
                                            name="gender"
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor="other"
                                            className="text-sm text-gray-600"
                                        >
                                            Prefer not to say
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-1">
                                <label className="block text-sm text-gray-600">
                                    Date of Birth
                                </label>
                                <div className="flex space-x-2">
                                    <div className="w-1/3">
                                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none">
                                            <option value="">Date</option>
                                            {Array.from(
                                                { length: 31 },
                                                (_, i) => i + 1
                                            ).map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/3">
                                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none">
                                            <option value="">Month</option>
                                            {[
                                                "January",
                                                "February",
                                                "March",
                                                "April",
                                                "May",
                                                "June",
                                                "July",
                                                "August",
                                                "September",
                                                "October",
                                                "November",
                                                "December",
                                            ].map((month, index) => (
                                                <option
                                                    key={index}
                                                    value={index + 1}
                                                >
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/3">
                                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none">
                                            <option value="">Year</option>
                                            {Array.from(
                                                { length: 100 },
                                                (_, i) =>
                                                    new Date().getFullYear() - i
                                            ).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Sign Up
                            </button>

                            {/* OR Divider */}
                            <div className="flex items-center justify-center space-x-2 mt-4">
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
                                    className="flex items-center space-x-2 p-2"
                                >
                                    <span className="text-sm text-gray-600">
                                        Sign in with Google
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center space-x-2 p-2"
                                >
                                    <span className="text-sm text-gray-600">
                                        Sign in with Facebook
                                    </span>
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    have an account?{" "}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Sign in
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

export default HomePage;
