import React, { useState } from 'react';
import axios from 'axios';

const WordGame = () => {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState('مبتدئ');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');

  const generateWord = async () => {
    setLoading(true);
    setResult(null);
    setAnswer('');
    setShowHint(false);
    try {
      const response = await axios.post('http://localhost:5000/api/word-game', {
        level
      });
      if (response.data.status === 'success') {
        setWord(response.data.data);
      }
    } catch (error) {
      setError('Failed to generate word. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const checkAnswer = () => {
    if (!answer.trim()) return;
    
    const isCorrect = answer.toLowerCase().includes(word.meaning.toLowerCase()) ||
                     word.meaning.toLowerCase().includes(answer.toLowerCase());
    setResult(isCorrect);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Arabic Word Explorer</h1>
      <p className="text-center text-gray-600 mb-8">Test your Arabic vocabulary knowledge</p>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="مبتدئ">Beginner / مبتدئ</option>
            <option value="متوسط">Intermediate / متوسط</option>
            <option value="متقدم">Advanced / متقدم</option>
          </select>
          <button
            onClick={generateWord}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'New Word'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {word && (
          <div className="space-y-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-2 text-teal-600">{word.word}</h2>
              <p className="text-gray-600 mb-2">{word.pronunciation}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What does this word mean in English?
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Type your answer here..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={checkAnswer}
                  className="flex-1 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>
            </div>

            {result !== null && (
              <div className={`p-4 rounded-lg ${result ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`font-medium ${result ? 'text-green-700' : 'text-red-700'}`}>
                  {result ? '✓ Correct!' : `✗ Not quite. The meaning is: ${word.meaning}`}
                </p>
              </div>
            )}

            {showHint && (
              <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Hint:</h3>
                    <p className="text-gray-600">{word.hint}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Example Usage:</h3>
                    <p className="text-gray-600 text-right">{word.example}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Common Phrases:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {word.phrases.map((phrase, index) => (
                        <li key={index} className="text-gray-600">{phrase}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;
