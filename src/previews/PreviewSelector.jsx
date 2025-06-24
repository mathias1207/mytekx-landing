import React, { useState } from 'react';
import ForumPreview from './ForumPreview';
import AIPreview from './AIPreview';
import MobilePreview from './MobilePreview';
import './PreviewStyles.css';

const PreviewSelector = () => {
  const [currentPreview, setCurrentPreview] = useState(null);

  const renderPreview = () => {
    switch(currentPreview) {
      case 'forum':
        return <ForumPreview onBack={() => setCurrentPreview(null)} />;
      case 'ai':
        return <AIPreview onBack={() => setCurrentPreview(null)} />;
      case 'mobile':
        return <MobilePreview onBack={() => setCurrentPreview(null)} />;
      default:
        return (
          <div className="preview-selector">
            <h1>MyTekX Previews</h1>
            <p>Sélectionnez une prévisualisation à afficher :</p>
            <div className="preview-buttons">
              <button onClick={() => setCurrentPreview('forum')}>Forum Preview</button>
              <button onClick={() => setCurrentPreview('ai')}>AI Preview</button>
              <button onClick={() => setCurrentPreview('mobile')}>Mobile App Preview</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="preview-selector-container">
      {currentPreview && (
        <div className="back-button-container">
          <button className="back-button" onClick={() => setCurrentPreview(null)}>
            ← Retour
          </button>
        </div>
      )}
      {renderPreview()}
    </div>
  );
};

export default PreviewSelector; 