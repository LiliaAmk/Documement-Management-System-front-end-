import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/footer/Footer';

const TranslationPage = () => {
  const [direction, setDirection] = useState('1');
  const [sentence, setSentence] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValid, setInputValid] = useState(true);

  const isArabic = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  const validateInput = (text) => {
    if (!text.trim()) {
      setError('');
      setInputValid(true);
      return;
    }

    const isArabicText = isArabic(text);
    const shouldBeArabic = direction === '2';

    if (isArabicText !== shouldBeArabic) {
      setError(
        shouldBeArabic 
          ? 'Please enter Arabic text or switch the translation direction to English → Arabic'
          : 'Please enter English text or switch the translation direction to Arabic → English'
      );
      setInputValid(false);
    } else {
      setError('');
      setInputValid(true);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSentence(text);
    validateInput(text);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
    setSentence('');
    setError('');
    setInputValid(true);
    setAnalysis('');
  };

  const handleTranslation = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        direction,
        sentence,
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing translation. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-teal-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Translation <span className="text-teal-600">Analysis</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get detailed analysis of translations between English and Arabic with word-by-word breakdown
              and cultural context
            </p>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Direction Selection */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Translation Direction
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['1', '2'].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleDirectionChange({ target: { value } })}
                      className={`py-3 px-4 rounded-lg text-center transition-all ${
                        direction === value
                          ? 'bg-teal-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {value === '1' ? 'English → Arabic' : 'Arabic → English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Enter {direction === '1' ? 'English' : 'Arabic'} Text
                </label>
                <textarea
                  value={sentence}
                  onChange={handleInputChange}
                  dir={direction === '2' ? 'rtl' : 'ltr'}
                  className={`w-full h-32 rounded-lg border-2 p-3 transition-all
                    ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                    focus:border-teal-500 focus:ring focus:ring-teal-200`}
                  placeholder={`Type your ${direction === '1' ? 'English' : 'Arabic'} text here...`}
                />
                {error && (
                  <p className="text-red-600 text-sm mt-1">
                    ⚠️ {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleTranslation}
                disabled={loading || !sentence.trim() || !inputValid}
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg text-lg font-medium 
                         hover:bg-teal-700 disabled:bg-gray-400 transform transition-all 
                         hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Translation...
                  </div>
                ) : (
                  'Analyze Translation'
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {analysis && (
            <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Translation Analysis</h2>
                <p className="text-gray-600">
                  Detailed breakdown and cultural context
                </p>
              </div>
              <div className="prose-lg prose-teal prose-headings:text-gray-900 prose-p:text-gray-700 
                            prose-strong:text-gray-900 prose-ul:text-gray-700">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TranslationPage;
