import React from 'react';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function BackButton({ onBack, language = 'fr', showText = false }) {
  const labels = {
    fr: "Retour à l'accueil",
    en: "Back to home"
  };

  return (
    <div className="fixed-back-button">
      <button className="back-icon" onClick={onBack} title={labels[language]}>
        <FaArrowLeft />
        {showText && <span className="back-text">{labels[language]}</span>}
      </button>
    </div>
  );
} 