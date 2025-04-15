import React, { useState } from "react";
import axios from "axios";
import googlepng from "../../assets/img/google-logo.png";
import facebookpng from "../../assets/img/fb-logo.png";
import Swal from "sweetalert2";

function SignUP() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    day : "",
    month: "",
    year: "",
    date_of_birth: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.phone.trim() || !formData.day.trim() || !formData.month.trim() || !formData.year.trim()) {
          setMessage("All fields are required!");
          return;
      }
  
      const formattedDate = `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`;
  
      const finalData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phone: formData.phone.trim(),
          gender: formData.gender,
          date_of_birth: formattedDate,
      };
  
      try {
          const response = await axios.post("http://127.0.0.1:8000/api/register", finalData, {
              headers: { "Content-Type": "application/json" },
          });
  
            Swal.fire({
              title: "Success!",
              text: "Registration successful!",
              icon: "success"
            }).then(() => {
              window.location.href = '/login';
            });
      } catch (error) {
          console.error("Validation errors:", error.response?.data);
  
          Swal.fire({
              title: "Registration Failed",
              text: error.response?.data.message || "Something went wrong!",
              icon: "error"
          });
      }
  };
  

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Gradient Side Panel */}
      <div className="hidden md:block md:w-1/3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-full"></div>
      <div className="w-full md:w-2/3 flex items-center justify-center p-6 relative">
        {/* Background Shape */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 rounded-lg"></div>
        <div className="w-full max-w-md relative z-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">SIGN UP</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Full Name" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-sm text-gray-600">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700">Phone No.</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Your Phone Number" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            {/* Gender Selection */}
                  <div>
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                      type="radio" 
                      name="gender" 
                      value="Male" 
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                      type="radio" 
                      name="gender" 
                      value="Female" 
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                      type="radio" 
                      name="gender" 
                      value="Other" 
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Prefer not to say</span>
                    </label>
                    </div>
                  </div>
            {/* Date of Birth Selection */}
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <div className="flex space-x-2">
                <input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="DD" className="w-1/3 p-2 border border-gray-300 rounded-lg" />
                <input type="text" name="month" value={formData.month} onChange={handleChange} placeholder="MM" className="w-1/3 p-2 border border-gray-300 rounded-lg" />
                <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="YYYY" className="w-1/3 p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            {/* Sign Up Button */}
            <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">Sign Up</button>
            {/* OR Divider */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="h-px bg-gray-300 w-full"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px bg-gray-300 w-full"></div>
            </div>
            {/* Social Login Options */}
            <div className="flex justify-center space-x-4 mt-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <img src={googlepng} alt="Google" className="w-5 h-5 mr-2" /> Sign up with Google
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <img src={facebookpng} alt="Facebook" className="w-5 h-5 mr-2" /> Sign up with Facebook
              </button>
            </div>
            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUP;