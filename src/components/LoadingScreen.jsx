import React from 'react';
import './LogoAnimation.css'; // Nouveau fichier CSS pour l'animation du logo
import { createPortal } from 'react-dom';

const LoadingScreen = ({ progress, onCancel, language, status, estimatedTime }) => {
  // La fonction pour formatter le temps restant
  const formatRemainingTime = (seconds) => {
    if (!seconds || seconds <= 0) return language === 'fr' ? 'Calcul en cours...' : 'Calculating...';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return language === 'fr' 
        ? `Temps restant: ${remainingSeconds} secondes` 
        : `Time remaining: ${remainingSeconds} seconds`;
    } else if (minutes === 1) {
      return language === 'fr' 
        ? `Temps restant : 1 minute ${remainingSeconds} secondes` 
        : `Time remaining: 1 minute ${remainingSeconds} seconds`;
    } else {
      return language === 'fr' 
        ? `Temps restant : ${minutes} minutes ${remainingSeconds} secondes` 
        : `Time remaining: ${minutes} minutes ${remainingSeconds} seconds`;
    }
  };
  
  return createPortal(
    <div className="loading-screen">
      <div className="logo-animated">ΘΞ</div>
      <div className="loading-text">
        {language === 'fr' ? 'Génération du document...' : 'Generating document...'}
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="status-text">
          {status || (language === 'fr' ? 'Initialisation...' : 'Initializing...')}
        </div>
        
        <div className="time-estimate">
          {formatRemainingTime(estimatedTime)}
        </div>
        
        <button className="cancel-button" onClick={onCancel}>
          {language === 'fr' ? 'Annuler' : 'Cancel'}
        </button>
      </div>
    </div>,
    document.body
  );  
};

export default LoadingScreen; 