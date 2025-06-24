import React, { useState, useEffect } from 'react';
import { FaCookieBite, FaCheck, FaTimes, FaCog } from 'react-icons/fa';
import './CookieConsent.css';

const CookieConsent = ({ language }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Toujours activé
    analytics: true,
    marketing: false,
    personalization: false
  });

  // Vérifier si le consentement aux cookies a déjà été donné
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      setCookiePreferences(JSON.parse(cookieConsent));
    }
  }, []);

  // Gérer l'acceptation de tous les cookies
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  // Gérer le refus des cookies non nécessaires
  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setCookiePreferences(essentialOnly);
    setShowBanner(false);
  };

  // Gérer l'enregistrement des préférences personnalisées
  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    setShowBanner(false);
  };

  // Modifier une préférence spécifique
  const handleTogglePreference = (key) => {
    if (key === 'necessary') return; // Ne peut pas être désactivé
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Textes localisés
  const texts = {
    fr: {
      title: "Vos préférences de cookies",
      description: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez choisir quels cookies vous acceptez.",
      necessary: "Cookies nécessaires",
      necessaryDesc: "Essentiels au fonctionnement du site. Ne peuvent pas être désactivés.",
      analytics: "Cookies d'analyse",
      analyticsDesc: "Nous aident à comprendre comment vous utilisez notre site.",
      marketing: "Cookies marketing",
      marketingDesc: "Utilisés pour la publicité ciblée et les campagnes marketing.",
      personalization: "Cookies de personnalisation",
      personalizationDesc: "Permettent de personnaliser votre expérience.",
      acceptAll: "Tout accepter",
      rejectNonEssential: "Refuser",
      savePreferences: "Enregistrer mes préférences",
      customizeButton: "Personnaliser",
      alwaysOn: "Toujours actif"
    },
    en: {
      title: "Your Cookie Preferences",
      description: "We use cookies to enhance your experience, analyze traffic, and personalize content. You can choose which cookies you accept.",
      necessary: "Necessary Cookies",
      necessaryDesc: "Essential for the website to function. Cannot be disabled.",
      analytics: "Analytics Cookies",
      analyticsDesc: "Help us understand how you use our site.",
      marketing: "Marketing Cookies",
      marketingDesc: "Used for targeted advertising and marketing campaigns.",
      personalization: "Personalization Cookies",
      personalizationDesc: "Allow us to personalize your experience.",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject",
      savePreferences: "Save My Preferences",
      customizeButton: "Customize",
      alwaysOn: "Always on"
    }
  };

  // Sélectionner la langue appropriée
  const t = texts[language] || texts.en;

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-wrapper">
      <div className="cookie-consent-banner">
        <div className="cookie-header">
          <div className="cookie-title">
            <FaCookieBite className="cookie-icon" />
            <h3>{t.title}</h3>
          </div>
          <button 
            className="cookie-close" 
            onClick={handleRejectNonEssential} 
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="cookie-content">
          <p>{t.description}</p>

          {!showDetails ? (
            <div className="cookie-actions">
              <button
                className="cookie-button accept-all"
                onClick={handleAcceptAll}
              >
                <FaCheck className="button-icon" />
                {t.acceptAll}
              </button>
              <button
                className="cookie-button reject"
                onClick={handleRejectNonEssential}
              >
                <FaTimes className="button-icon" />
                {t.rejectNonEssential}
              </button>
              <button
                className="cookie-button customize"
                onClick={() => setShowDetails(true)}
              >
                <FaCog className="button-icon" />
                {t.customizeButton}
              </button>
            </div>
          ) : (
            <div className="cookie-preferences">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>{t.necessary}</h4>
                  <p>{t.necessaryDesc}</p>
                </div>
                <div className="preference-toggle">
                  <span className="always-on">{t.alwaysOn}</span>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>{t.analytics}</h4>
                  <p>{t.analyticsDesc}</p>
                </div>
                <div className="preference-toggle">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>{t.marketing}</h4>
                  <p>{t.marketingDesc}</p>
                </div>
                <div className="preference-toggle">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>{t.personalization}</h4>
                  <p>{t.personalizationDesc}</p>
                </div>
                <div className="preference-toggle">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.personalization}
                      onChange={() => handleTogglePreference('personalization')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="cookie-actions">
                <button
                  className="cookie-button save-preferences"
                  onClick={handleSavePreferences}
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 