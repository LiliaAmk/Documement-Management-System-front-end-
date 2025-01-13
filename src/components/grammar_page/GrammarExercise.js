import React, { useState } from 'react';
import axios from 'axios';

const GrammarExercise = () => {
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState('');
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateExercises = async (e) => {
    e.preventDefault();
    if (!level) {
      setError('Please select a difficulty level');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-grammar', {
        level
      });
      
      if (response.data.status === 'success' && response.data.data?.length > 0) {
        setExercises(response.data.data);
        setAnswers({});
        setShowResults(false);
      } else {
        throw new Error(response.data.message || 'Failed to generate exercises');
      }
    } catch (error) {
      setError(error.message || 'Failed to generate exercises. Please try again.');
      console.error('Error:', error);
      setExercises(null);
    }
    setLoading(false);
  };

  const handleAnswer = (exerciseId, optionIndex) => {
    if (showResults) return;
    setAnswers(prev => ({
      ...prev,
      [exerciseId]: optionIndex
    }));
  };

  const calculateScore = () => {
    return exercises?.reduce((score, exercise) => {
      return score + (answers[exercise.id] === exercise.correctIndex ? 1 : 0);
    }, 0) || 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Arabic Grammar Exercises</h1>
      <p className="text-center text-gray-600 mb-8">Practice and improve your Arabic grammar skills</p>

      <form onSubmit={handleGenerateExercises} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Difficulty Level / اختر المستوى
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            >
              <option value="">Select Level / اختر المستوى</option>
              <option value="مبتدئ">Beginner / مبتدئ</option>
              <option value="متقدم">Advanced / متقدم</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transform hover:scale-[1.02] transition-all duration-200 text-lg font-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Exercises...
              </span>
            ) : (
              'Generate New Exercises'
            )}
          </button>
        </div>
      </form>

      {exercises && (
        <div className="space-y-8">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <span className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800">Choose the correct sentence</h3>
              </div>
              
              <div className="space-y-4">
                {exercise.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswer(exercise.id, optionIndex)}
                    className={`w-full p-4 text-right text-lg rounded-lg border-2 transition-all duration-200 ${
                      answers[exercise.id] === optionIndex
                        ? showResults
                          ? optionIndex === exercise.correctIndex
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-red-50 border-red-500 text-red-700'
                          : 'bg-teal-50 border-teal-500 text-teal-700'
                        : 'border-gray-200 hover:border-teal-500 hover:bg-teal-50'
                    }`}
                    disabled={showResults}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResults && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-semibold text-teal-700 mb-1">Grammar Rule</h4>
                    <p className="text-gray-700">{exercise.rule}</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700 mb-1">Common Mistake</h4>
                    <p className="text-gray-700">{exercise.mistake}</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Example Usage</h4>
                    <p className="text-gray-700">{exercise.usage}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {Object.keys(answers).length === exercises.length && !showResults && (
            <button
              onClick={() => setShowResults(true)}
              className="w-full bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600"
            >
              Check Answers
            </button>
          )}

          {showResults && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-teal-600">
                Score: {calculateScore()}/{exercises.length}
              </h3>
              <button
                onClick={() => {
                  setExercises(null);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
              >
                Try New Exercises
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GrammarExercise;
