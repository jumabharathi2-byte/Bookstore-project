import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    axios.defaults.withCredentials = true;
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:4000/admin/alogin",
      { email, password }
    );

    console.log("Login response:", res.data);

    if (res.data.status === "success") {
      localStorage.setItem("admin", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/ahome");
    } else {
      alert(res.data.message || "Invalid email or password");
    }

  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);

    if (err.response?.status === 401) {
      alert("Invalid email or password");
    } else {
      alert("Login failed, please try again.");
    }
  }
};

 

  return (
   <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-xl border border-red-500 overflow-hidden">
    
    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6">
        Login to Admin Account
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-red-500">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-red-500">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
          >
            Log In
          </button>
        </div>

        {/* Signup redirect */}
        <p className="mt-2 text-sm text-red-500 text-center">
          Don’t have an account?
          <button
            type="button"
            onClick={() => navigate("/asignup")}
            className="ml-2 text-red-600 hover:underline"
          >
            Signup
          </button>
        </p>

      </form>
    </div>

    <div className="absolute h-full w-full bg-red-600 opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
  </div>
</div>

  );
};

export default Alogin;
