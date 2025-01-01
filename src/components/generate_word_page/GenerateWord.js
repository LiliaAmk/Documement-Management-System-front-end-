import React, { useState } from 'react';

const GenerateWord = () => {
  const [word, setWord] = useState({
    arabic: "كتاب",
    transliteration: "Kitab",
    meaning: `"كتاب" means "book" in Arabic. It is used to refer to any kind of book, whether for reading, studying, or writing`,
  });

  const [category, setCategory] = useState("General");
  const [difficulty, setDifficulty] = useState("All Levels");

  const handleGenerateWord = () => {
    // Simulate word generation (Replace this with your backend or logic to fetch words)
    setWord({
      arabic: "قلم",
      transliteration: "Qalam",
      meaning: `means "pen" in Arabic. It is used for writing and drawing purposes.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-700">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Discover a new word</h1>

      {/* Word Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center border border-gray-200">
        <p className="text-lg font-semibold text-teal-600">{`(${word.transliteration}) "${word.arabic}"`}</p>
        
        {/* Gray Inner Rectangle */}
        <div className="mt-4 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
          {word.meaning}
        </div>
      </div>

      {/* Filters Section */}
      <div className="mt-8 flex space-x-4">
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="Economics">Economics</option>
          <option value="Science">Science</option>
          <option value="Literature">Literature</option>
          <option value="Politics">Politics</option>
          <option value="History & geography">History & geography</option>
          <option value="Health and Medicine">Health and Medicine</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Islamic">Islamic</option>
        </select>

        {/* Difficulty Select */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateWord}
        className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition"
      >
        Generate Word
      </button>
    </div>
  );
};

export default GenerateWord;
