import React from 'react';
import logo from '../../assets/logo/logo.png'; // Replace with your logo's actual file path

const Navbar = () => {
  return (
    <nav className="bg-gray-100 py-4 sticky top-0 z-50 px-11">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Learn Arabic Logo" className="h-10" />
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <a href="#home" className="hover:text-teal-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-teal-500 transition">
              Our Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-teal-500 transition">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-teal-500 transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
