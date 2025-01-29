import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateWordPage from './pages/GenerateWordPage';
import GenerateDefinition from './pages/GenerateSentencePage';
import QuizPage from './pages/QuizPage';  // Update import
import GrammarPage from './pages/GrammarPage';  // New import
import WordGamePage from './pages/WordGamePage';  // New import
import WordExplorerPage from './pages/WordExplorerPage';  // Add this import
import SentenceAnalyzerPage from './pages/SentenceAnalyzerPage';  // New import
import SentenceGenerationPage from './pages/SentenceGenerationPage';  // Add this import
import TranslationPage from './pages/TranslationPage';  // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ScrollToSection />} />
        <Route path="/generate-word" element={<GenerateWordPage />} />
        <Route path="/get-definition" element={<GenerateDefinition />} />
        <Route path="/arabic-quiz" element={<QuizPage />} />  {/* Update route */}
        <Route path="/grammar" element={<GrammarPage />} />  {/* New route */}
        <Route path="/word-game" element={<WordGamePage />} />  {/* New route */}
        <Route path="/word-explorer" element={<WordExplorerPage />} />
        <Route path="/sentence-analyzer" element={<SentenceAnalyzerPage />} />  {/* New route */}
        <Route path="/generate-sentences" element={<SentenceGenerationPage />} />  {/* New route */}
        <Route path="/translation" element={<TranslationPage />} />  {/* New route */}
      </Routes>
    </Router>
  );
}

// Component to handle scrolling to sections
const ScrollToSection = () => {
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    const sectionId = currentPath.replace('/', ''); // Extract the section ID
    if (sectionId && sectionId !== 'generate-word') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return <LandingPage />;
};

export default App;
