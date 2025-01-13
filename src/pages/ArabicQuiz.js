import React, { useState } from 'react';
import axios from 'axios';

const ArabicQuiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = async (level, topic) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-quiz', {
        level,
        topic
      });
      setQuizData(response.data.data);
      setCurrentAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
    setLoading(false);
  };

  const handleAnswer = (questionIndex, answer) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const checkAnswers = () => {
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (currentAnswers[index] === question.word) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Arabic Learning Quiz</h1>
      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => generateQuiz('مبتدئ', 'رياضيات')}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Math Quiz (Beginner)
        </button>
        <button
          onClick={() => generateQuiz('متقدم', 'عربية')}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Arabic Quiz (Advanced)
        </button>
      </div>

      {loading && <div className="text-center">Loading quiz...</div>}

      {quizData && !loading && (
        <div className="space-y-8">
          {quizData.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{item.word}</h3>
              <p className="mb-2">Pronunciation: {item.pronunciation}</p>
              <p className="mb-4">Description: {item.description}</p>
              <input
                type="text"
                placeholder="Enter meaning in English"
                className="w-full p-2 border rounded"
                onChange={(e) => handleAnswer(index, e.target.value)}
                value={currentAnswers[index] || ''}
              />
              {showResults && (
                <div className={`mt-2 ${currentAnswers[index] === item.meaning ? 'text-green-500' : 'text-red-500'}`}>
                  Correct answer: {item.meaning}
                </div>
              )}
            </div>
          ))}
          
          {!showResults && (
            <button
              onClick={checkAnswers}
              className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            >
              Check Answers
            </button>
          )}
          
          {showResults && (
            <div className="text-center text-xl font-bold">
              Score: {score}/{quizData.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArabicQuiz;
