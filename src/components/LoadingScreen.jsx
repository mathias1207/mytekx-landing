import React from 'react';
import './LogoAnimation.css'; // Nouveau fichier CSS pour l'animation du logo
import { createPortal } from 'react-dom';

const LoadingScreen = ({ progress, onCancel, language, status, estimatedTime }) => {
  return createPortal(
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <div className="logo-animated">ΘΞ</div>
      <div className="loading-message">
        {language === 'fr' 
          ? 'Votre fichier est en cours de chargement... ça risque d\'être long, allez prendre un café !' 
          : 'Your file is being processed... this might take a while, go grab a coffee!'}
      </div>
    </div>,
    document.body
  );  
};

export default LoadingScreen; 