import React from 'react';
import quizIcon from '../../assets/icons/generate-article-icon.png'; 
import wordIcon from '../../assets/icons/generate-article-icon.png';
import articleIcon from '../../assets/icons/generate-article-icon.png';
import aiTeacherIcon from '../../assets/icons/generate-article-icon.png';

const Services = () => {
  const services = [
    {
      icon: quizIcon,
      title: 'Arabic Quizzes',
      description: 'Enjoy fun and interactive quizzes that help you practice and improve your Arabic skills step by step.',
    },
    {
      icon: wordIcon,
      title: 'New Arabic Word',
      description: 'Discover a new Arabic word every day, with easy explanations and examples to help you use it confidently.',
    },
    {
      icon: articleIcon,
      title: 'Generate an acrticle',
      description: 'Quickly create your own Arabic article on any topic you like, perfect for learning or sharing your thoughts.',
    },
    {
      icon: aiTeacherIcon,
      title: 'Chat with an AI teacher',
      description: 'Talk to your own AI teacher to practice Arabic, ask questions, and get helpful tips anytime you need.Talk to your own AI teacher to practice Arabic, ask questions, and get helpful tips anytime you need.',
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
