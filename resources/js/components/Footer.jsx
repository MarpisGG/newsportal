import React, { useEffect, useState } from 'react';
import logo from "../../assets/img/winniLogo.png";

const API_URL = "http://127.0.0.1:8000";

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error("Failed to fetch categories:", error));
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src={logo}
              alt="WinniCode Logo"
              className="h-20 w-20 mr-4 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <h3 className="text-xl font-bold text-white mb-4">WinniNews</h3>
            <p className="text-sm">
              Your trusted source for the latest news and
              in-depth analysis from around the world.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category, index) => (
                <li key={index}>
                  <a
                    href={`/category/${category.name.toLowerCase()}`}
                    className="hover:text-white"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">More Categories</h4>
            <ul className="space-y-2">
              {categories.slice(4).map((category, index) => (
                <li key={index}>
                  <a
                    href={`/category/${category.name.toLowerCase()}`}
                    className="hover:text-white"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex flex-col space-y-2">
              <a href="https://twitter.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://facebook.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
              <p className="text-sm">contact@WinniNews.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} WinniNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
