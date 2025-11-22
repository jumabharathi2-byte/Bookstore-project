import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: name.trim(), email: email.trim(), password: password.trim() };


    try {
      const res = await axios.post("http://localhost:4000/user/signup", payload, { withCredentials: true });
      if (res.data.msg === "Account Created") {
        alert("Account created successfully!");
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/login'); 
      } else {
        alert(res.data.msg || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create an account");
    }
  };

  const redirectToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-xl border border-red-400 overflow-hidden">
    
    {/* Header */}
    <div className="text-center mb-4">
      <h2 className="text-3xl font-extrabold text-red-600">
        User Registration
      </h2>
    </div>

    {/* Form */}
    <form className="space-y-6" onSubmit={handleSubmit}>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-red-700">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300 
          focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Name"
        />
      </div>

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
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300 
          focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Email address"
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
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300 
          focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          placeholder="Password"
        />
      </div>

      {/* Signup Button */}
      <div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-md w-full"
        >
          Signup
        </button>
      </div>

      {/* Login Redirect */}
      <p className="text-sm text-red-700">
        Already have an account?
        <button
          onClick={redirectToLogin}
          className="ml-2 text-red-600 font-bold hover:underline"
        >
          Login
        </button>
      </p>
    </form>

    {/* Decorative Background */}
    <div className="absolute h-full w-full bg-red-200 opacity-20 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>

  </div>
</div>

  );
};

export default Signup;
