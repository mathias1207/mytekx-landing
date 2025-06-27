// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogoTestPage from './components/LogoTestPage';
import './App.css';
import { useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Importer les icônes
import { FaGlobe } from 'react-icons/fa';
import ForumPreview from './previews/ForumPreview';
import AIPreview from './previews/AIPreview';
import MobilePreview from './previews/MobilePreview';
// Importer le composant CookieConsent
import CookieConsent from './components/CookieConsent';

// Importer les nouvelles pages d'authentification
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Importer le système beta
import BetaGate from './components/BetaGate';
import { useBetaAccess } from './hooks/useBetaAccess';

// Ajout de la police Inter pour le titre MytekX
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Composant pour gérer les redirections conditionnelles
const ConditionalRedirect = () => {
  const { currentUser, loading } = useAuth();
  const { accessApp, showBetaGate, onBetaSuccess, closeBetaGate } = useBetaAccess();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si l'utilisateur est connecté, vérifier l'accès beta puis rediriger
  if (currentUser) {
    accessApp();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'accès...</p>
        </div>
        <BetaGate 
          isOpen={showBetaGate} 
          onClose={closeBetaGate} 
          onSuccess={onBetaSuccess} 
        />
      </div>
    );
  }

  // Sinon, rediriger vers la page de connexion
  return <Navigate to="/login" replace />;
};

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPreview, setCurrentPreview] = useState(null);
  const { accessApp, showBetaGate, onBetaSuccess, closeBetaGate } = useBetaAccess();

  const handleGetStarted = () => {
    // Utiliser le nouveau système beta au lieu de rediriger directement
    accessApp();
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
    <>
      <Router>
        <Routes>
          {/* Page d'accueil */}
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

          {/* Pages d'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages protégées */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Redirection conditionnelle */}
          <Route path="/app" element={<ConditionalRedirect />} />
          
          {/* Pages de prévisualisation */}
          <Route path="/forum-preview" element={<ForumPreview />} />
          <Route path="/ai-preview" element={<AIPreview />} />
          <Route path="/mobile-preview" element={<MobilePreview />} />
          <Route path="/logo-test" element={<LogoTestPage />} />

          {/* Route par défaut - redirection vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      {/* Modal Beta Gate global */}
      <BetaGate 
        isOpen={showBetaGate} 
        onClose={closeBetaGate} 
        onSuccess={onBetaSuccess} 
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;