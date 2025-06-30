import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Overlay = ({ children, onClose }) => {
  const { language } = useLanguage();
  
  const closeText = language === 'fr' ? 'Fermer' : 'Close';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur">
      <div className="mx-auto my-10 max-w-4xl rounded-xl shadow-2xl" style={{ background: '#1a1f2e' }}>
        <div className="max-h-[80vh] overflow-y-auto p-8" style={{ background: '#1a1f2e' }}>
          {children}
        </div>
        <div className="border-t p-4 text-center" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <button 
            onClick={onClose}
            className="rounded-lg px-6 py-2 transition-colors"
            style={{ 
              background: '#33d4ff', 
              color: '#1a1f2e',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => e.target.style.background = '#2db8d9'}
            onMouseLeave={(e) => e.target.style.background = '#33d4ff'}
          >
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay; 