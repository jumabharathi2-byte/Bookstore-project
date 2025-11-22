import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snavbar from "./Snavbar";

function Addbook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    description: "",
    itemImage: null,
  });

  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("seller")); // should contain { id: "..." }

  const handleChange = (e) => {
    if (e.target.name === "itemImage") {
      setFormData({ ...formData, itemImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seller || !seller.id) {
      alert("Seller not found. Please login again.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("itemImage", formData.itemImage);
    data.append("sellerId", seller.id); // must be string

    try {
      await axios.post("http://localhost:4000/seller/items", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book added successfully!");
      navigate("/myproducts");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5ecd9]">
      <Snavbar />
      <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-lg bg-[#fcf7ed]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Book</h2>
        <form onSubmit={handleSubmit}>
          {["title", "author", "genre", "price", "description"].map((field) => (
            <input
              key={field}
              type={field === "price" ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="border w-full py-2 px-3 mb-4 rounded"
              required
            />
          ))}
          <div className="mb-4">
            <label>Book Image</label>
            <input type="file" name="itemImage" accept="image/*" onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full py-2 px-4 rounded bg-[#8b6f47] text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addbook;
