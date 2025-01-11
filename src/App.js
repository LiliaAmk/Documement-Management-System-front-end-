import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateWordPage from './pages/GenerateWordPage';
import GenerateSentencePage from './pages/GenerateSentencePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ScrollToSection />} />
        <Route path="/generate-word" element={<GenerateWordPage />} />
        <Route path="/generate-sentence" element={<GenerateSentencePage />} />
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
