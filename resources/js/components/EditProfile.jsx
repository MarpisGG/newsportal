import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    bio: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    try {
      const userData = JSON.parse(storedUser);
      
      // Format date to yyyy-MM-dd for input[type="date"]
      let formattedDate = "";
      if (userData.date_of_birth) {
        const date = new Date(userData.date_of_birth);
        formattedDate = date.toISOString().split('T')[0];
      }
      
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        date_of_birth: formattedDate,
        bio: userData.bio || ""
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading user data:", error);
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      Swal.fire({
        title: "Error",
        text: "Name and email are required!",
        icon: "error"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Get user ID from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData.id;
      
      // Get token if using token-based auth
      // const token = localStorage.getItem("token");
      
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${userId}`, 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            // If using token auth
            // "Authorization": `Bearer ${token}`
          }
        }
      );
      
      // Update user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        ...formData
      }));
      
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success"
      }).then(() => {
        navigate("/profile");
      });
      
    } catch (error) {
      console.error("Error updating profile:", error.response?.data);
      
      Swal.fire({
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-purple-600">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-20">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
          
          {/* Profile Picture (placeholder for future implementation) */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
            <button className="mt-2 text-sm text-purple-600 hover:underline">
              Change Photo
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your full name"
              />
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your email"
              />
            </div>
            
            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your phone number"
              />
            </div>
            
            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            
            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            
            {/* Bio */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows="4"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-1/2 mr-2 bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-1/2 ml-2 bg-purple-500 text-white py-2 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 disabled:opacity-70"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;