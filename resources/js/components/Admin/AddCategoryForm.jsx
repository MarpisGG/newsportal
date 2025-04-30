import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const API_URL = "http://127.0.0.1:8000";

function AddCategoryForm() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.id === 1) {
          setIsAuthorized(true);
          fetchCategories();
        } else {
          navigate("/");
        }
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);
    if (categoryImage) formData.append("image", categoryImage);

    try {
      const endpoint = editMode
        ? `${API_URL}/api/categories/${editId}`
        : `${API_URL}/api/categories`;
      const method = editMode ? "PUT" : "POST"; // Correct HTTP method for edit and create

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (response.ok) {
        alert(editMode ? "Category updated!" : "Category added!");
        resetForm();
        fetchCategories();
      } else {
        alert("Failed to submit.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server error.");
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditId(category.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`${API_URL}/api/categories/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Category deleted!");
          fetchCategories();
        } else {
          alert("Failed to delete category.");
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Server error.");
      }
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setCategoryName("");
    setCategoryImage(null);
    setEditMode(false);
    setEditId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthorized) return null;

  return (
    <>
      <AdminNavbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Category" : "Add Category"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1 font-medium">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full"
            />
          </div>
          <div className="space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editMode ? "Update" : "Submit"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-2">Existing Categories</h3>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.id} className="border p-4 rounded flex items-center justify-between">
              <div>
                <p className="font-medium">{cat.name}</p>
                {cat.image && (
                  <img
                    src={`${API_URL}/storage/${cat.image}`}
                    alt={cat.name}
                    className="h-20 mt-2"
                  />
                )}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AddCategoryForm;
