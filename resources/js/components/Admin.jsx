import React, { useState } from "react";

function AddNewsForm() {
    const [formData, setFormData] = useState({
        author: "",
        newsCategory: "",
        newsTitle: "",
        newsContent: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // Here you would typically send the data to your backend
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white p-6">
            <div className="w-full max-w-5xl">
                <h1 className="text-5xl font-bold text-center mb-10">
                    ADD NEWS
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Author :
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-100 rounded-md"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="newsTitle"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    News Title :
                                </label>
                                <input
                                    type="text"
                                    id="newsTitle"
                                    name="newsTitle"
                                    value={formData.newsTitle}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-100 rounded-md"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="newsContent"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    News Content :
                                </label>
                                <textarea
                                    id="newsContent"
                                    name="newsContent"
                                    value={formData.newsContent}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full p-3 bg-gray-100 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="newsCategory"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    News Category :
                                </label>
                                <input
                                    type="text"
                                    id="newsCategory"
                                    name="newsCategory"
                                    value={formData.newsCategory}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-100 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Add Image :
                                </label>
                                <div className="border border-gray-200 rounded-md p-3 h-48 flex flex-col justify-center items-center bg-gray-100">
                                    {formData.image ? (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.image
                                            )}
                                            alt="Preview"
                                            className="max-h-full"
                                        />
                                    ) : (
                                        <>
                                            <div className="text-gray-400 mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-16 w-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Drag Image Here, Please :)
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "fileInput"
                                                        )
                                                        .click()
                                                }
                                                className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded"
                                            >
                                                Select
                                            </button>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start mt-6 space-x-4">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-pink-500 text-white font-medium rounded"
                        >
                            Post
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    author: "",
                                    newsCategory: "",
                                    newsTitle: "",
                                    newsContent: "",
                                    image: null,
                                })
                            }
                            className="px-6 py-2.5 bg-red-500 text-white font-medium rounded"
                        >
                            <a href="/">Cancel</a>
                        </button>
                    </div>
                </form>

                {/* Decorative element to match the image */}
                <div className="absolute right-0 bottom-0 h-64 w-64 overflow-hidden">
                    <div className="absolute right-0 bottom-0 h-64 w-96 bg-pink-500 rounded-tl-full transform rotate-12 origin-bottom-right"></div>
                    <div className="absolute right-0 bottom-0 h-32 w-64 bg-blue-500 rounded-tl-full transform -rotate-12 origin-bottom-right"></div>
                </div>
            </div>
        </div>
    );
}

export default AddNewsForm;
