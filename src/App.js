import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateWordPage from './pages/GenerateWordPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* LandingPage handles Services, About, and Contact */}
        <Route path="/*" element={<ScrollToSection />} />
        {/* Keep GenerateWordPage as a separate route */}
        <Route path="/generate-word" element={<GenerateWordPage />} />
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
