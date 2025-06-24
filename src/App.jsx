// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogoTestPage from './components/LogoTestPage';
import './App.css';
import { useLanguage } from './contexts/LanguageContext';
// Importer les icônes
import { FaGlobe } from 'react-icons/fa';
import ForumPreview from './previews/ForumPreview';
import AIPreview from './previews/AIPreview';
import MobilePreview from './previews/MobilePreview';
// Importer le composant CookieConsent
import CookieConsent from './components/CookieConsent';

// Ajout de la police Inter pour le titre MytekX
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

function App() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPreview, setCurrentPreview] = useState(null);

  const handleGetStarted = () => {
    // Rediriger vers l'application MyTekX en production
    window.location.href = 'https://app.mytekx.io';
  };

  const handleShowPreview = (previewType) => {
    setCurrentPreview(previewType);
  };

  // Si une prévisualisation est sélectionnée, l'afficher
  if (currentPreview) {
    return (
      <div className="app-container">
        <div className="back-button-container">
          <button className="back-button" onClick={() => setCurrentPreview(null)}>
            ← Retour à l'accueil
          </button>
        </div>
        {currentPreview === 'forum' && <ForumPreview onBack={() => setCurrentPreview(null)} />}
        {currentPreview === 'ai' && <AIPreview onBack={() => setCurrentPreview(null)} />}
        {currentPreview === 'mobile' && <MobilePreview onBack={() => setCurrentPreview(null)} />}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="language-toggle-landing">
              <button 
                onClick={toggleLanguage}
                className="language-button"
                style={{ zIndex: 1000 }}
              >
                <FaGlobe /> {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>
            <LandingPage 
              onGetStarted={handleGetStarted} 
              onShowPreview={handleShowPreview}
            />
            <CookieConsent />
          </>
        } />
        
        <Route path="/forum-preview" element={<ForumPreview />} />
        <Route path="/ai-preview" element={<AIPreview />} />
        <Route path="/mobile-preview" element={<MobilePreview />} />
        <Route path="/logo-test" element={<LogoTestPage />} />
      </Routes>
    </Router>
  );
}

export default App;