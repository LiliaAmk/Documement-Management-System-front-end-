import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: 'Maab Chaoui',
      title: '4th year ENSIA student',
      additionalTitles: ['Skill&Tell Scientific Club Co-founder and Former President', 'Title 3'],
      image: require('../../assets/images/maab.jpg'), 
    },
    {
      name: 'Abdelhak Chellal',
      title: '4th year ENSIA student',
      additionalTitles: ['Skill&Tell President', 'Backend Developer'],
      image: require('../../assets/images/abdelhak.jpg'),
    },
    {
      name: 'Oumaima Maatar',
      title: '4th year ENSIA student',
      additionalTitles: ['Frontend developer', 'Former intern at SLB'],
      image: require('../../assets/images/oumaima.jpg'),
    },
    {
      name: 'Besmala Bendif',
      title: '4th year ENSIA student',
      additionalTitles: ['UI designer', 'Backend Developer'],
      image: require('../../assets/images/besmala.jpg'),
    },
    {
      name: 'Mohamed Idris Hamadi',
      title: '4th year ENSIA student',
      additionalTitles: ['Current President of SecAi Students Club', 'Former intern at SLB','Current intern at CTC'],    
      image: require('../../assets/images/idris.jpg'),
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
    <section className="bg-white py-16 relative">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          About <span className="text-teal-500">us</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Let’s discover the team that makes learning Arabic easy and fun for
          everyone.
        </p>

        <div className="mt-12 flex items-center justify-center relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 text-2xl hover:text-teal-700 focus:outline-none"
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

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500 text-2xl hover:text-teal-700 focus:outline-none"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
