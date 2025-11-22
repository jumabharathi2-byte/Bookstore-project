import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { email: email.trim(), password: password.trim() };

      // FIRST send request
      const res = await axios.post(
        "http://localhost:4000/user/login",
        payload,
        { withCredentials: true }
      );

      // THEN check response
      console.log("Backend Response:", res.data);

      if (res.data.status === "success") {
  localStorage.setItem("user", JSON.stringify(res.data.user));
  localStorage.setItem("token", res.data.token); // Save JWT
  alert("Login successful");
  navigate("/uhome");


      } else {
        alert(res.data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const redirectToSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-xl border border-red-400 overflow-hidden">
    
    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6">
        User Login
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-red-700">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-red-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
        >
          Log in
        </button>

        {/* Redirect */}
        <p className="mt-2 text-sm text-red-700 text-center">
          Don’t have an account?
          <button
            onClick={redirectToSignup}
            className="ml-2 text-red-600 font-bold hover:underline"
          >
            Signup
          </button>
        </p>
      </form>
    </div>

    {/* Soft Red Accent Background */}
    <div className="absolute h-full w-full bg-red-200 opacity-20 transform -skew-y-6"></div>
  </div>
</div>

  );
};

export default Login;
