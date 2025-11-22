import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0000] to-[#330000] text-white flex flex-col font-sans">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-black/70 shadow-xl border-b border-red-600 backdrop-blur-md z-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-red-500 drop-shadow-sm">
          📚 Readz
        </h1>

        <nav className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
          >
            User
          </Link>
          <Link
            to="/slogin"
            className="px-4 py-2 bg-black border border-red-600 text-red-400 rounded-lg hover:bg-red-700 hover:text-white transition duration-300 shadow-md"
          >
            Seller
          </Link>
          <Link
            to="/alogin"
            className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition duration-300 shadow-md"
          >
            Admin
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        <h2 className="text-6xl font-black mb-6 leading-tight text-red-500 drop-shadow-lg animate-fade-in">
          Let Every Page Bring You Closer to Calm
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Discover captivating books, connect with passionate sellers, and fuel your love for reading — only at{" "}
          <span className="text-red-400 font-semibold">Readz</span>.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:scale-110 hover:shadow-2xl transition-transform duration-300"
        >
          Start Exploring
        </Link>
      </div>

      {/* Categories */}
      <section className="bg-black text-white py-16 px-6 border-t border-red-700">
        <h3 className="text-4xl font-bold text-center mb-14 text-red-500 drop-shadow">
          Explore by Category
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Fiction", icon: "📖" },
            { title: "Science", icon: "🔬" },
            { title: "Biographies", icon: "👤" },
            { title: "Children's Books", icon: "🧒" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-700 to-black rounded-xl p-6 shadow-xl text-center hover:scale-110 transition-transform duration-300 border border-red-800"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h4 className="text-xl font-semibold text-red-300">{category.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
