import React from "react";

function Categories({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onCategoryChange("all")}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
