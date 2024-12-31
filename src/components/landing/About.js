import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: 'Maab Chaoui',
      title: '4th year student ENSIA',
      additionalTitles: ['Title 2', 'Title 3'],
      image: require('../../assets/images/about-us.png'), // Update the path to your image
    },
    {
      name: 'Abdelhak Chellal',
      title: 'Software Engineer',
      additionalTitles: ['Title 2', 'Title 3'],
      image: require('../../assets/images/about-us.png'),
    },
    {
      name: 'Oumaima Maatar',
      title: 'AI Specialist',
      additionalTitles: ['Title 2', 'Title 3'],
      image: require('../../assets/images/about-us.png'),
    },
    {
      name: 'Besmala Bendif',
      title: 'Data Scientist',
      additionalTitles: ['Title 2', 'Title 3'],
      image: require('../../assets/images/about-us.png'),
    },
    {
      name: 'Mohamed Idris Hamadi',
      title: 'UX Designer',
      additionalTitles: ['Title 2', 'Title 3'],
      image: require('../../assets/images/about-us.png'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const { name, title, additionalTitles, image } = teamMembers[currentIndex];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          About <span className="text-teal-500">us</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Let’s discover the team that makes learning Arabic easy and fun for
          everyone.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="text-teal-500 text-2xl hover:text-teal-700 focus:outline-none"
          >
            <FaChevronLeft />
          </button>

          {/* Member Info */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-64 h-64 flex-shrink-0">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
              <p className="mt-2 text-gray-600">{title}</p>
              {additionalTitles.map((item, index) => (
                <p key={index} className="text-gray-600">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handleNext}
            className="text-teal-500 text-2xl hover:text-teal-700 focus:outline-none"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
