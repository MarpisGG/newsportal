import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import defaultProfileImg from "../../assets/img/default-profile.jpg"; // Add a default profile image

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to get user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    setLoading(false);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, log out"
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user data and token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("profile_image_url");
        
        // Show success message
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Redirect to login page
          navigate("/login");
        });
      }
    });
  };

  // Format date from ISO to MM-DD-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}-${day}-${year}`;
  };

  // Get profile image URL
  const getProfileImageUrl = () => {
    // Check localStorage first for the most recent URL
    const storedImageUrl = localStorage.getItem("profile_image_url");
    
    // If we have a stored URL, use it
    if (storedImageUrl) {
      return storedImageUrl;
    }
    
    // If user has a profile_image value but no localStorage URL
    if (userData && userData.profile_image) {
      return `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/storage/${userData.profile_image}`;
    }
    
    // Default image if nothing else available
    return defaultProfileImg;
  };

  // Display loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-purple-600">Loading profile...</div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-500 mb-4">You need to log in to view your profile</div>
        <button 
          onClick={() => navigate("/login")}
          className="bg-purple-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-20">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden">
              <img
                src={getProfileImageUrl()}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfileImg;
                }}
              />
            </div>
            <h2 className="mt-2 text-xl font-bold">{userData.name}</h2>
          </div>

          {/* Edit Profile Link */}
          <div className="flex justify-end">
            <a href="/EditProfile" className="mt-1 text-blue-500 text-sm hover:underline">
              Edit Profile?
            </a>
          </div>

          {/* User Information */}
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-bold">Bio</label>
            <p className="text-justify">{userData.bio || "No bio information added yet."}</p>

            <label className="block mt-3 text-gray-600 text-sm font-bold">Gender</label>
            <p className="text-justify">{userData.gender || "Not specified"}</p>

            <label className="block mt-3 text-gray-600 text-sm font-bold">Birth Date</label>
            <p className="text-justify">{formatDate(userData.date_of_birth)}</p>

            <label className="block mt-3 text-gray-600 text-sm font-bold">Email</label>
            <p className="text-justify">{userData.email}</p>

            <label className="block mt-3 text-gray-600 text-sm font-bold">Phone No.</label>
            <p className="text-justify">{userData.phone || "Not specified"}</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => navigate("/EditProfile")}
              className="w-1/2 mr-2 bg-purple-500 text-white py-2 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="w-1/2 ml-2 bg-red-500 text-white py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;