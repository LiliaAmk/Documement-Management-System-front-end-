import React from 'react';
import quizIcon from '../../assets/icons/generate-article-icon.png'; 
import wordIcon from '../../assets/icons/generate-article-icon.png';
import sentenceIcon from '../../assets/icons/generate-article-icon.png';
import aiTeacherIcon from '../../assets/icons/generate-article-icon.png';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: sentenceIcon,
      title: 'Generate a Sentence',
      description: 'Generate a complete Arabic sentence with translations and examples to improve your learning.',
      buttonText: 'Go to Generate Sentence',
      onClick: () => navigate('/generate-sentence'),
    },
    {
      icon: wordIcon,
      title: 'New Arabic Word',
      description: 'Discover a new Arabic word every day, with easy explanations and examples to help you use it confidently.',
      buttonText: 'Go to Generate Word',
      onClick: () => navigate('/generate-word'),
    },
    {
      icon: quizIcon,
      title: 'Arabic Quizzes',
      description: 'Enjoy fun and interactive quizzes that help you practice and improve your Arabic skills step by step.',
      buttonText: 'Coming Soon',
      disabled: true,
    },
    {
      icon: aiTeacherIcon,
      title: 'Chat with an AI Teacher',
      description: 'Talk to your own AI teacher to practice Arabic, ask questions, and get helpful tips anytime you need.',
      buttonText: 'Coming Soon',
      disabled: true,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-10">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Our <span className="text-teal-500">Services</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Discover daily quizzes, AI tools, and a structured way to learn Arabic.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <img src={service.icon} alt={`${service.title} Icon`} className="h-6 w-6" />
                </div>
              </div>
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              {/* Description */}
              <p className="mt-4 text-gray-600">{service.description}</p>
              {/* Button */}
              <button
                onClick={service.onClick}
                className={`mt-6 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${
                  service.disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-teal-500 text-white hover:bg-teal-600 transition'
                }`}
                disabled={service.disabled}
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
