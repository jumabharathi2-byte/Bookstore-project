import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Ssignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Make axios send cookies automatically
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, email, password };

      // ✅ Make sure this URL matches your backend route
      const res = await axios.post(
        "http://localhost:4000/seller/ssignup",
        payload,
        { withCredentials: true }
      );

      console.log("Signup response:", res.data);

      if (res.data.msg === "Account created") {
        alert("Account created successfully!");
        localStorage.setItem("seller", JSON.stringify(res.data.user));
        navigate("/slogin");
      } else {
        alert(res.data.msg || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to create an account");
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/slogin");
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="relative max-w-md w-full bg-white p-8 rounded-md shadow-xl border border-red-500 overflow-hidden">
    
    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6">
        Seller Registration
      </h2>
    </div>

    <form className="space-y-6" onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-red-500">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-red-500">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-red-500">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-red-400 rounded-md bg-white text-red-700 placeholder-red-300"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
      >
        Signup
      </button>

      <p className="text-sm text-red-500 text-center">
        Already have an account?
        <button
          onClick={handleLoginRedirect}
          className="ml-2 text-red-600 hover:underline"
        >
          Login
        </button>
      </p>

    </form>

    <div className="absolute h-full w-full bg-red-500 opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
  </div>
</div>
  );
};

export default Ssignup;
