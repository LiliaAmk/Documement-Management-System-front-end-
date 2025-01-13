import React, { useState } from 'react';
import axios from 'axios';

const ArabicQuiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedDesc, setSelectedDesc] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [inputError, setInputError] = useState('');

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!category || !level) {
      setInputError('Please fill in both fields');
      return;
    }
    setInputError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-quiz', {
        level,
        topic: category
      });
      if (response.data.status === 'success' && response.data.data) {
        setQuizData(response.data.data);
        setMatches({});
        setShowResults(false);
        setSelectedWord(null);
        setSelectedDesc(null);
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setInputError('Failed to generate quiz. Please try again.');
    }
    setLoading(false);
  };

  const handleWordClick = (index) => {
    if (showResults) return;
    
    // If this word is already matched, do nothing
    if (Object.values(matches).includes(index)) return;

    // Toggle word selection
    setSelectedWord(selectedWord === index ? null : index);

    // If there's a selected description, create a match
    if (selectedDesc !== null) {
      setMatches(prev => ({
        ...prev,
        [selectedDesc]: index
      }));
      setSelectedWord(null);
      setSelectedDesc(null);
    }
  };

  const handleDescClick = (index) => {
    if (showResults) return;
    
    // If this description is already matched, do nothing
    if (index in matches) return;

    // Toggle description selection
    setSelectedDesc(selectedDesc === index ? null : index);

    // If there's a selected word, create a match
    if (selectedWord !== null) {
      setMatches(prev => ({
        ...prev,
        [index]: selectedWord
      }));
      setSelectedWord(null);
      setSelectedDesc(null);
    }
  };

  const removeMatch = (descIndex) => {
    if (showResults) return;
    const newMatches = { ...matches };
    delete newMatches[descIndex];
    setMatches(newMatches);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const isCorrectMatch = (descIndex, wordIndex, quizData) => {
    if (!quizData || !Array.isArray(quizData)) return false;
    
    const description = quizData.find(item => 
      item && item.shuffledIndex === parseInt(descIndex)
    );
    const word = quizData.find(item => 
      item && item.originalIndex === wordIndex
    );
    
    return description && word && description.originalIndex === word.originalIndex;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Arabic Matching Quiz</h1>
      
      {/* Quiz Generation Form */}
      <form onSubmit={handleGenerateQuiz} className="max-w-md mx-auto mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category / الفئة
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter a category (e.g., mathematics, science, literature)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              dir="auto"
            />
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Level / المستوى
            </label>
            <input
              type="text"
              id="level"
              placeholder="Enter level (e.g., مبتدئ, متوسط, متقدم)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              dir="auto"
            />
          </div>

          {inputError && (
            <p className="text-red-500 text-sm">{inputError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500 border-r-2 mx-auto"></div>
          <p className="mt-4">Loading quiz...</p>
        </div>
      )}

      {quizData && Array.isArray(quizData) && !loading && (
        <div className="grid grid-cols-2 gap-8">
          {/* Words Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-center">Arabic Words</h2>
            {quizData.map((item, index) => (
              item && (
                <div
                  key={`word-${index}`}
                  onClick={() => handleWordClick(item.originalIndex)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedWord === item.originalIndex
                      ? 'bg-teal-100 border-2 border-teal-500'
                      : 'bg-white hover:bg-gray-50'
                  } ${
                    Object.values(matches).includes(item.originalIndex)
                      ? showResults
                        ? isCorrectMatch(
                            Object.keys(matches).find(key => matches[key] === item.originalIndex),
                            item.originalIndex,
                            quizData
                          )
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : 'bg-gray-100 border-2 border-teal-300'
                      : ''
                  }`}
                >
                  <p className="text-lg font-bold">{item.word}</p>
                  <p className="text-sm text-gray-600">Pronunciation: {item.pronunciation}</p>
                </div>
              )
            ))}
          </div>

          {/* Descriptions Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-center">Descriptions</h2>
            {quizData.map((item) => {
              if (!item) return null;
              const descIndex = item.shuffledIndex;
              return (
                <div
                  key={`desc-${descIndex}`}
                  onClick={() => handleDescClick(descIndex)}
                  className={`p-4 rounded-lg cursor-pointer transition-all relative ${
                    selectedDesc === descIndex
                      ? 'bg-teal-100 border-2 border-teal-500'
                      : 'bg-white hover:bg-gray-50'
                  } ${
                    descIndex in matches
                      ? showResults
                        ? isCorrectMatch(descIndex, matches[descIndex], quizData)
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : 'bg-gray-100 border-2 border-teal-300'
                      : ''
                  }`}
                >
                  <p className="text-gray-700">{item.description}</p>
                  {descIndex in matches && !showResults && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMatch(descIndex);
                      }}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {quizData && Object.keys(matches).length === quizData.length && !showResults && (
        <div className="mt-8 text-center">
          <button
            onClick={checkAnswers}
            className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Check Answers
          </button>
        </div>
      )}

      {showResults && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-teal-600">
            Score: {
              Object.entries(matches).filter(([descIndex, wordIndex]) => 
                isCorrectMatch(parseInt(descIndex), wordIndex, quizData)
              ).length
            }/{quizData.length}
          </h3>
          <button
            onClick={() => {
              setQuizData(null);
              setMatches({});
              setShowResults(false);
            }}
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
          >
            Try Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default ArabicQuiz;
