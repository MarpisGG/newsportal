import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/winniLogo.png";

const API_URL = "http://127.0.0.1:8000";

function Footer() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Failed to fetch categories:", error));
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/news?category=${encodeURIComponent(slug)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <img
              src={logo}
              alt="WinniCode Logo"
              className="h-16 w-16 mb-4 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <h3 className="text-xl font-bold text-white mb-2">WinniNews</h3>
            <p className="text-sm">
              Trusted source for the latest news, tech trends, and world affairs — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/aboutus" className="hover:text-white">About Us</a></li>
              <li><a href="/contactus" className="hover:text-white">Contact Us</a></li>
              <li className="hover:text-white">Privacy Policy</li>
              <li className="hover:text-white">Terms & Conditions</li>
            </ul>
          </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://linkedin.com/company/winnicodegarudateknologi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
              <p className="mt-4 text-sm">📧 contact@WinniNews.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WinniNews. All rights reserved.
        </div>
    </footer>
  );
}

export default Footer;