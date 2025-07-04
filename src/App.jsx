// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import About from './components/About';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import CookiePolicy from './components/CookiePolicy';
import SolutionPage from './components/SolutionPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [currentSection, setCurrentSection] = useState('landing');
  const [selectedSolution, setSelectedSolution] = useState('student');

  const handleShowAbout = () => setCurrentSection('about');
  const handleShowFAQ = () => setCurrentSection('faq');
  const handleShowPrivacyPolicy = () => setCurrentSection('privacy');
  const handleShowTermsOfUse = () => setCurrentSection('terms');
  const handleShowCookiePolicy = () => setCurrentSection('cookie');
  const handleShowSolution = (solutionType) => {
    setSelectedSolution(solutionType);
    setCurrentSection('solution');
  };
  const handleBackToLanding = () => setCurrentSection('landing');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'about':
        return <About onBack={handleBackToLanding} />;
      case 'faq':
        return <FAQ onBack={handleBackToLanding} />;
      case 'privacy':
        return <PrivacyPolicy onBack={handleBackToLanding} />;
      case 'terms':
        return <TermsOfUse onBack={handleBackToLanding} />;
      case 'cookie':
        return <CookiePolicy onBack={handleBackToLanding} />;
      case 'solution':
        return (
          <SolutionPage 
            onBack={handleBackToLanding} 
            solutionType={selectedSolution} 
          />
        );
      default:
        return (
          <LandingPage 
            onShowAbout={handleShowAbout}
            onShowFAQ={handleShowFAQ}
            onShowPrivacyPolicy={handleShowPrivacyPolicy}
            onShowTermsOfUse={handleShowTermsOfUse}
            onShowCookiePolicy={handleShowCookiePolicy}
            onShowSolution={handleShowSolution}
          />
        );
    }
  };

  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={renderCurrentSection()} />
            <Route path="*" element={renderCurrentSection()} />
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;