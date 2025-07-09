// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import About from './components/About';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import CookiePolicy from './components/CookiePolicy';
import SolutionPage from './components/SolutionPage';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Composant wrapper pour la page d'accueil avec navigation
function LandingPageWrapper() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  // Utiliser window.location.href pour forcer le rechargement et garantir le scroll
  const handleShowAbout = () => window.location.href = '/about';
  const handleShowFAQ = () => window.location.href = '/faq';
  const handleShowPrivacyPolicy = () => window.location.href = '/privacy';
  const handleShowTermsOfUse = () => window.location.href = '/terms';
  const handleShowCookiePolicy = () => window.location.href = '/cookie';
  const handleShowSolution = (solutionType) => window.location.href = `/solution/${solutionType}`;

  // Fonction pour changer la langue
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LandingPage 
      onShowAbout={handleShowAbout}
      onShowFAQ={handleShowFAQ}
      onShowPrivacyPolicy={handleShowPrivacyPolicy}
      onShowTermsOfUse={handleShowTermsOfUse}
      onShowCookiePolicy={handleShowCookiePolicy}
      onShowSolution={handleShowSolution}
      language={language}
      onLanguageChange={handleLanguageChange}
    />
  );
}

// Composants wrapper pour les autres pages avec bouton retour
function AboutWrapper() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return <About onBack={() => navigate('/')} language={language} />;
}

function FAQWrapper() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return <FAQ onBack={() => navigate('/')} language={language} />;
}

function PrivacyPolicyWrapper() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return <PrivacyPolicy onBack={() => navigate('/')} language={language} />;
}

function TermsOfUseWrapper() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return <TermsOfUse onBack={() => navigate('/')} language={language} />;
}

function CookiePolicyWrapper() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return <CookiePolicy onBack={() => navigate('/')} language={language} />;
}

function SolutionPageWrapper() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { language } = useLanguage();
  const solutionType = type || 'student';
  
  return (
    <SolutionPage 
      onBack={() => navigate('/')} 
      solutionType={solutionType}
      language={language}
    />
  );
}

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPageWrapper />} />
            <Route path="/about" element={<AboutWrapper />} />
            <Route path="/faq" element={<FAQWrapper />} />
            <Route path="/privacy" element={<PrivacyPolicyWrapper />} />
            <Route path="/terms" element={<TermsOfUseWrapper />} />
            <Route path="/cookie" element={<CookiePolicyWrapper />} />
            <Route path="/solution/:type" element={<SolutionPageWrapper />} />
            <Route path="*" element={<LandingPageWrapper />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;