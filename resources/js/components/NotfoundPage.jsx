import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-6 text-center">
            {/* SVG Illustration */}
            <div className="w-full max-w-lg mb-12 animate-bounce-slow">
                <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="800" height="600" fill="none" />
                    {/* 404 Text */}
                    <text
                        x="400"
                        y="200"
                        fontSize="160"
                        fontWeight="bold"
                        fill="#2563eb"
                        textAnchor="middle"
                    >
                        404
                    </text>
                    {/* Character with Sad Error Face */}
                    <circle
                        cx="400"
                        cy="350"
                        r="70"
                        fill="#f3f4f6"
                        stroke="#3b82f6"
                        strokeWidth="5"
                    />
                    <circle cx="380" cy="330" r="10" fill="#1f2937" />{" "}
                    {/* Left eye */}
                    <circle cx="420" cy="330" r="10" fill="#1f2937" />{" "}
                    {/* Right eye */}
                    <path
                        d="M375 370 Q400 350 425 370"
                        stroke="#1f2937"
                        strokeWidth="4"
                        fill="none"
                    />{" "}
                    {/* Sad mouth */}
                    <line
                        x1="370"
                        y1="320"
                        x2="390"
                        y2="310"
                        stroke="#1f2937"
                        strokeWidth="3"
                    />{" "}
                    {/* Left eyebrow */}
                    <line
                        x1="410"
                        y1="310"
                        x2="430"
                        y2="320"
                        stroke="#1f2937"
                        strokeWidth="3"
                    />{" "}
                    {/* Right eyebrow */}
                    {/* Floating shapes */}
                    <circle cx="200" cy="150" r="30" fill="#93c5fd" />
                    <circle cx="600" cy="450" r="20" fill="#60a5fa" />
                    <rect
                        x="120"
                        y="400"
                        width="40"
                        height="40"
                        fill="#bfdbfe"
                        rx="8"
                    />
                    <rect
                        x="660"
                        y="200"
                        width="30"
                        height="30"
                        fill="#93c5fd"
                        rx="6"
                    />
                </svg>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-700 mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleGoHome}
                    className="px-10 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Take Me Home
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="px-10 py-4 bg-white text-blue-600 border-2 border-blue-600 text-xl font-semibold rounded-full hover:bg-blue-100 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Go Back
                </button>
            </div>

            <p className="text-gray-600 mt-12">
                Need help?{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                    Contact Support
                </a>
            </p>
        </div>
    );
}

export default NotFoundPage;
