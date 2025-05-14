import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import defimg from "../../assets/img/default-profile.jpg";
import Swal from "sweetalert2";
import logo from "../../assets/img/winniLogo.png";

// Define your API URL as a constant
const API_URL = "http://127.0.0.1:8000";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const defaultProfileImg = defimg;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Failed to fetch categories:", error));

    setLoading(false);
  }, []);

  const getProfileImageUrl = () => {
    const storedImageUrl = localStorage.getItem("profile_image_url");

    if (storedImageUrl) {
      return storedImageUrl;
    }

    if (userData && userData.profile_image) {
      return `${API_URL}/storage/${userData.profile_image}`;
    }

    return defaultProfileImg;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const showLogoutAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire("Signed out!", "You have been signed out.", "success");
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile_image_url");
    setUserData(null);
    setProfileMenuOpen(false);
  };

  const renderAuthSection = () => {
    if (loading) {
      return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>;
    }

    if (userData) {
      return (
        <div className="relative">
          <button onClick={toggleProfileMenu} className="flex items-center focus:outline-none">
            <img
              src={getProfileImageUrl()}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover border-2 border-blue-600"
            />
            <span className="ml-2 hidden md:block text-gray-700">{userData.name}</span>
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                onClick={() => setProfileMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={showLogoutAlert}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
          Sign In
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <header className="bg-white shadow-md sticky top-0 z-50 py-2.5">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to={"/"} className="text-gray-600 hover:text-blue-600 transition-colors">
              <img src={logo} alt="WinniCode Logo" className="h-20 w-20 mr-0" />
            </NavLink>
            <div className="ms-4 md:flex gap-4 font-bold text-lg hidden">
              <NavLink to={"/contactus"} className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact Us
              </NavLink>
              <NavLink to={"/aboutus"} className="text-gray-600 hover:text-blue-600 transition-colors">
                About Us
              </NavLink>
              <NavLink to={"/Categories"} className="text-gray-600 hover:text-blue-600 transition-colors">
                Categories
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex justify-end flex-grow mx-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden md:block">{renderAuthSection()}</div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed top-[6.5rem] left-0 right-0 bg-white border-t shadow-lg z-50 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-3">
              <div className="flex flex-col space-y-3 pb-3 border-b">
                <NavLink
                  to={"/contactus"}
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to={"/aboutus"}
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </NavLink>
              </div>

              <div className="pb-3 border-b">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <NavLink
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {!userData ? (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                  <NavLink to="/login" className="text-center text-gray-600 hover:text-blue-600 py-2">
                    Sign In
                  </NavLink>
                </div>
              ) : (
                <div className="pt-2 border-t">
                  <div className="flex items-center px-3 py-2">
                    <img
                      src={getProfileImageUrl()}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{userData.name}</span>
                  </div>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={showLogoutAlert}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
