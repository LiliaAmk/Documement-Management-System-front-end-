import React, { useState } from 'react';
import axios from 'axios';

const WordExplorer = () => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exploreWord = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      setError('Please enter a word to explore');
      return;
    }
    
    setLoading(true);
    setError('');
    setWordData(null);  // Clear previous data
    
    try {
      const response = await axios.post('http://localhost:5000/api/explore-word', {
        word: word.trim()
      });
      
      if (response.data.status === 'success' && response.data.data) {
        console.log('Response data:', response.data);  // Debug log
        setWordData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to analyze word');
      }
    } catch (error) {
      console.error('Error details:', error);  // Debug log
      setError(error.response?.data?.message || 'Failed to analyze word. Please try again.');
      setWordData(null);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Arabic Word Explorer</h1>
      <p className="text-center text-gray-600 mb-8">Discover the rich meaning and usage of Arabic words</p>

      <form onSubmit={exploreWord} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter an Arabic word (e.g., كتاب، جميل، قلم)"
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 text-lg"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300"
            disabled={loading || !word.trim()}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              'Explore'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">{error}</p>
          <p className="text-sm text-red-600 mt-1">
            Try a different word or check if you've entered the word correctly in Arabic.
          </p>
        </div>
      )}

      {wordData && (
        <div className="space-y-8">
          {/* Root Word */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Root Word</h2>
            <p className="text-xl mb-2">{wordData.root.letters}</p>
            <p className="text-gray-600">{wordData.root.meaning}</p>
          </section>

          {/* Derivatives */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Common Derivatives</h2>
            <div className="space-y-4">
              {wordData.derivatives.map((deriv, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-xl">{deriv.word}</p>
                  <p className="text-gray-500">{deriv.pronunciation}</p>
                  <p className="text-gray-600">{deriv.meaning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Usage Examples */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Usage Examples</h2>
            <div className="space-y-4">
              {wordData.usage.map((ex, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-xl text-right mb-2">{ex.arabic}</p>
                  <p className="text-gray-500">{ex.pronunciation}</p>
                  <p className="text-gray-600">{ex.english}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dialectal Variations */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Dialectal Variations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Egyptian</h3>
                <p className="text-gray-600">{wordData.dialects.egyptian}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Algerian</h3>
                <p className="text-gray-600">{wordData.dialects.algerian}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Gulf</h3>
                <p className="text-gray-600">{wordData.dialects.gulf}</p>
              </div>
            </div>
          </section>

          {/* Related Words */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Related Words</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wordData.related_words.map((word, index) => (
                <div key={index} className="border p-4 rounded">
                  <p className="text-xl">{word.word}</p>
                  <p className="text-gray-500">{word.pronunciation}</p>
                  <p className="text-gray-600">{word.meaning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Phrases */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Common Phrases</h2>
            <div className="space-y-4">
              {wordData.common_phrases.map((phrase, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-xl text-right mb-2">{phrase.phrase}</p>
                  <p className="text-gray-500">{phrase.pronunciation}</p>
                  <p className="text-gray-600">{phrase.meaning}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default WordExplorer;
