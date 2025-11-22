import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-red-400 py-10 px-4 text-center border-t border-red-700 mt-auto shadow-inner">

      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-red-800 transition duration-300 shadow-lg"
        >
          Contact Us
        </button>
      </div>

      <p className="mb-3 italic text-red-300 max-w-xl mx-auto">
        "Find peace, purpose, and stories that stay with you forever."
      </p>

      <p className="mb-1 text-red-400">📞 Call At: 127-865-586-67</p>

      <p className="text-sm mt-3 text-red-500">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Readz</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
