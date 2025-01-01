import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import heroImage from '../../assets/images/hero.png';
import dailyQuizIcon from '../../assets/icons/daily-quizzes-icon.png';
import aiIcon from '../../assets/icons/ai-powered-icon.png';
import learningIcon from '../../assets/icons/enjoy-learning-icon.png'; 

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleStartLearning = () => {
    navigate('/generate-word'); // Navigate to the new page
  };

  return (
    <section className="bg-teal-500 text-white relative overflow-hidden px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center py-16 relative">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left py-7">
          <h1 className="text-5xl font-bold">
            <span className="text-yellow-400">Learning</span> Arabic is now
            <br />
            much easier
          </h1>
          <p className="mt-4 text-lg text-gray-100">
            IQraa is a platform that lets you learn Arabic while enjoying your
            time.
          </p>

          {/* Start Learning Now Button */}
          <button
            onClick={handleStartLearning}
            className="mt-6 bg-yellow-400 text-teal-500 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Start Learning Now
          </button>
        </div>

        {/* Image and Floating Cards Section */}
        <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0 ">
          {/* Hero Image */}
          <img
            src={heroImage}
            alt="Learning Arabic"
            className="w-full max-w-md object-contain relative z-10"
          />

          {/* Floating Cards */}
          <div className="absolute -top-8 left-4 bg-white text-teal-500 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-10">
            <img src={dailyQuizIcon} alt="Daily Quizzes Icon" className="h-6 w-6" />
            <p className="font-semibold">Daily Quizzes</p>
          </div>
          <div className="absolute top-12 right-4 bg-white text-teal-500 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-10">
            <img src={aiIcon} alt="AI Powered Icon" className="h-6 w-6" />
            <p className="font-semibold">AI Powered</p>
          </div>
          <div className="absolute bottom-8 left-10 bg-white text-teal-500 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-10">
            <img src={learningIcon} alt="Enjoy Learning Icon" className="h-6 w-6" />
            <p className="font-semibold">Enjoy Learning</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
