import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/footer/Footer';

const SentenceGenerationPage = () => {
  const [level, setLevel] = useState('1');
  const [topic, setTopic] = useState('1');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const levels = {
    "1": "ابتدائي / Elementary",
    "2": "متوسط / Intermediate",
    "3": "متقدم / Advanced"
  };

  const topics = {
    "1": "لغة عربية / Arabic Language",
    "2": "ثقافة / Culture",
    "3": "حياة يومية / Daily Life",
    "4": "أدب / Literature"
  };

  const generateSentences = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-sentences', {
        level: levels[level].split('/')[0].trim(),
        topic: topics[topic].split('/')[0].trim()
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error generating sentences. Please try again.');
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
              Arabic Sentence <span className="text-teal-600">Generator</span>
            </h1>
            <p className="text-lg text-gray-600">
              Generate Arabic sentences with detailed grammatical analysis and cultural context
            </p>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-all hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Level Selection */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Choose Level <span className="text-gray-500 text-base">/ اختر المستوى</span>
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 p-3 focus:border-teal-500 focus:ring focus:ring-teal-200 transition-all"
                >
                  {Object.entries(levels).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Choose Topic <span className="text-gray-500 text-base">/ اختر الموضوع</span>
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 p-3 focus:border-teal-500 focus:ring focus:ring-teal-200 transition-all"
                >
                  {Object.entries(topics).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateSentences}
              disabled={loading}
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
                  Generating Sentences...
                </div>
              ) : (
                'Generate Sentences'
              )}
            </button>
          </div>

          {/* Results Section */}
          {analysis && (
            <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none 
                          transform transition-all hover:shadow-xl">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Generated Sentences</h2>
                <p className="text-gray-600">Detailed analysis and explanation</p>
              </div>
              <div className="prose-lg prose-teal">
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

export default SentenceGenerationPage;
