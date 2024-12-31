import React from "react";
import logo from '../../assets/logo/logo.png'; 
const Footer = () => {
  return (
    <footer className="bg-[#0D0D2B] py-8">
      <div className="container mx-auto px-4">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Learn Arabic Logo" className="h-8" />
            <div className="w-px h-6 bg-gray-600"></div>
            <p className="text-white text-sm font-medium">Your way to learn Arabic</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition duration-200"
          >
            Our Services
          </a>
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition duration-200"
          >
            Terms & Conditions
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">&copy; 2024</div>
      </div>
    </footer>
  );
};

export default Footer;