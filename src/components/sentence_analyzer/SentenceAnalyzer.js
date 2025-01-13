import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const SentenceAnalyzer = () => {
  const [sentence, setSentence] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSentence = async (e) => {
    e.preventDefault();
    if (!sentence.trim()) {
      setError('Please enter a sentence to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    setAnalysis(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/analyze-sentence', {
        sentence: sentence.trim()
      });
      
      if (response.data.status === 'success') {
        setAnalysis(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to analyze sentence');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Arabic Sentence Analyzer</h1>
      <p className="text-center text-gray-600 mb-8">Analyze the grammar and structure of Arabic sentences</p>

      <form onSubmit={analyzeSentence} className="mb-8">
        <div className="space-y-4">
          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter an Arabic sentence..."
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-teal-500 text-lg"
            dir="rtl"
            rows="3"
          />
          
          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300"
            disabled={loading || !sentence.trim()}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              'Analyze Sentence'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            className="bg-white p-6 rounded-lg shadow-lg"
            components={{
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-4 text-teal-600" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-3 text-teal-600" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-gray-800" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-600 mb-4" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded" {...props} />
            }}
          >
            {analysis.analysis}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default SentenceAnalyzer;
