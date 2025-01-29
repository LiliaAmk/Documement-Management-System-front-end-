import React, { useState } from 'react';

const GenerateDefinition = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);

  const wordsData = {
    "Literature": {
      "Beginner": { arabic: "الكلمة", transliteration: "Al-Kalima", meaning: "في الأدب تعني جعل النص مؤثرًا يحتوي على أشياء غير معروفة ومتطابقة." },
      "Intermediate": { arabic: "", transliteration: "", meaning: "" },
      "Advanced": { arabic: "", transliteration: "", meaning: "" }
    },
    "Health and Medicine": {
      "Beginner": { arabic: "", transliteration: "", meaning: "" },
      "Intermediate": { arabic: "الطب", transliteration: "At-Tibb", meaning: "هو مجال يهتم بتشخيص الأمراض وعلاجها والوقاية منها." },
      "Advanced": { arabic: "", transliteration: "", meaning: "" }
    },
    "Economics": {
      "Beginner": { arabic: "", transliteration: "", meaning: "" },
      "Intermediate": { arabic: "", transliteration: "", meaning: "" },
      "Advanced": { arabic: "الطلب", transliteration: "At-Talab", meaning: "هو مقدار السلع والخدمات التي يرغب الأفراد في شرائها عند مستويات سعرية مختلفة." }
    }
  };

  const handleGenerateDefinition = () => {
    setLoading(true);
    setDefinition(null);

    setTimeout(() => {
      let foundDefinition = null;
      Object.values(wordsData).forEach((levels) => {
        Object.values(levels).forEach((entry) => {
          if (entry.arabic === word) {
            foundDefinition = entry;
          }
        });
      });

      setDefinition(foundDefinition || { meaning: "Definition not found." });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Discover Word Definition</h1>

      <input
        type="text"
        placeholder="Enter Arabic word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <button
        onClick={handleGenerateDefinition}
        className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition"
      >
        Get Definition
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {definition && (
        <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center border border-gray-200 mt-6">
          <p className="text-lg font-semibold text-teal-600">{word}</p>
          <div className="mt-4 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            {definition.meaning}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateDefinition;