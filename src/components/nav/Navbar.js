import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/logo/logo_black.png'; // Replace with your logo's actual file path

const Navbar = () => {
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    navigate('/'); // Ensure we navigate to the LandingPage
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Allow a brief delay to ensure navigation occurs before scrolling
  };

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 px-11 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Learn Arabic Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <Link to="/" className="hover:text-teal-500 transition">
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => handleScroll('services')}
              className="hover:text-teal-500 transition"
            >
              Our Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll('about')}
              className="hover:text-teal-500 transition"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll('contact')}
              className="hover:text-teal-500 transition"
            >
              Contact us
            </button>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
