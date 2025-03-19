import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const categories = [
    "World",
    "Politics",
    "Business",
    "Technology",
    "Science",
    "Health",
    "Sports",
    "Entertainment",
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              WinniNews
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {categories.map((category, index) => (
              <NavLink
                key={index}
                to={`/category/${category.toLowerCase()}`}
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-600 font-medium border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all duration-200 pb-1"
                }
              >
                {category}
              </NavLink>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm">
              Subscribe
            </button>
            <NavLink to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sign In
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category, index) => (
                <NavLink
                  key={index}
                  to={`/category/${category.toLowerCase()}`}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${
                      isActive 
                        ? "bg-blue-100 text-blue-600 font-medium" 
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {category}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
                <NavLink to="/login" className="text-center text-gray-600 hover:text-blue-600 py-2">
                  Sign In
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;