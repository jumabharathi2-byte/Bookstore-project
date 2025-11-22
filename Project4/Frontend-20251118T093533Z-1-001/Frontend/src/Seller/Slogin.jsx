import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Slogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
         "http://localhost:4000/seller/slogin",
        { email, password },
        { withCredentials: true } 
      );

      console.log("Login Response:", res.data);
      if (res.data.status === "success") {
  localStorage.setItem("sellerToken", res.data.token);
  localStorage.setItem("seller", JSON.stringify(res.data.user));

  alert("Login successful!");
  navigate("/shome");
} else {
  alert(res.data.msg || "Invalid credentials");
}


    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/ssignup");
  };

  return (
       <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-xl border border-red-500 overflow-hidden">
    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6">
        Login to Seller Account
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div>
          <label className="block text-sm font-medium text-red-500">Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-500">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
        >
          Log In
        </button>

        <p className="mt-2 text-sm text-red-500 text-center">
          Don't have an account?
          <button
            onClick={handleSignupRedirect}
            className="ml-2 text-red-600 hover:underline"
          >
            Signup
          </button>
        </p>

      </form>
    </div>

    <div className="absolute h-full w-full bg-red-500 opacity-10 transform -skew-y-6"></div>
  </div>
</div>

  );
};

export default Slogin;
