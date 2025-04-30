import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
    return (
        <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-xl font-semibold">Admin Panel</div>
                <div className="space-x-4">
                    <Link to="/admin" className="hover:underline">
                        Add News
                    </Link>
                    <Link to="/addcategoryform" className="hover:underline">
                        Add Category
                    </Link>
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
