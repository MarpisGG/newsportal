import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';

function ContactUs() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
    file: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = new FormData();
    payload.append("first_name", formData.first_name);
    payload.append("last_name", formData.last_name);
    payload.append("email", formData.email);
    payload.append("message", formData.message);
    if (formData.file) {
      payload.append("file", formData.file);
    }
  
    try {
      await axios.post("http://localhost:8000/api/messages", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'Your message has been sent successfully!',
        confirmButtonColor: '#6b46c1'
      });
  
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send message. Please try again.',
        confirmButtonColor: '#e53e3e' // merah (tailwind red-600)
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-10 bg-gray-100">
        <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
            <p className="text-l">Any question or remarks? Just write us a message!</p>
          </div>


          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-48 p-3 border border-gray-300 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md cursor-pointer"
                >
                  Submit
                </button>
              </div>

              <div className="w-full h-[76%] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-purple-100 rounded-lg">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="p-3 border border-dashed border-gray-400 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;