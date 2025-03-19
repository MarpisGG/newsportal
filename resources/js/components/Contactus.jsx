import React from "react";
import Navbar from "../components/Navbar";

function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-[1454px] bg-white p-8 rounded-lg shadow-lg">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            {/* First Name */}
            <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            {/* Last Name */}
            <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Form Inputs */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full h-48 p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md">
              Submit
            </button>
          </div>

          {/* File Upload */}
          <div>
            <label className="block texat-gray-700 mb-1">Add File</label>
            <div className="w-full h-[76%] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-purple-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p className="text-gray-500 text-sm">Drop Image Here, Paste Or</p>
              <button className="mt-2 text-gray-700 px-4 py-2 rounded-lg">
                + Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ContactUs;
