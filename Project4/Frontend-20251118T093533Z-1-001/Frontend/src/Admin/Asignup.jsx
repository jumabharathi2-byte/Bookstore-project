import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Asignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password };
      const res = await axios.post("http://localhost:4000/admin/asignup", payload, { withCredentials: true });

      if (res.data === "Account Created") {
        alert("Account created successfully!");
        navigate("/alogin");
      } else if (res.data === "Already have an account") {
        alert("Account already exists!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create an account");
    }
  };

return (
 <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-lg border border-red-300">

    {/* Header */}
    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-4">
        Admin Registration
      </h2>
    </div>

    {/* Form */}
    <form className="space-y-6" onSubmit={handleSubmit}>

      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-red-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-300 rounded-md bg-white text-red-700 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-red-700">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-300 rounded-md bg-white text-red-700 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-red-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-300 rounded-md bg-white text-red-700 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300"
        >
          Signup
        </button>
      </div>

      {/* Login Redirect */}
      <p className="text-sm text-red-700 text-center">
        Already have an account?
        <button
          type="button"
          onClick={() => navigate("/alogin")}
          className="ml-2 text-red-600 font-bold hover:underline focus:outline-none"
        >
          Login
        </button>
      </p>

    </form>
  </div>
</div>

);
};

export default Asignup;
