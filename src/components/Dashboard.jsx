import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HomeIcon } from './ui/home';
import { RocketIcon } from './ui/rocket';
import { FlaskIcon } from './ui/flask';
import './Dashboard.css';

const Dashboard = ({ documents = [], onViewDocument, activeSection, onBackToLanding }) => {
  const { t, language } = useLanguage();
  const [recentDocuments, setRecentDocuments] = useState(0);

  // Calculer les statistiques simples
  useEffect(() => {
    setRecentDocuments(documents.length);
  }, [documents]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleAccessApp = () => {
    // Redirect to main app
    window.location.href = 'https://app.mytekx.io';
  };

  return (
    <div className="dashboard">
      {/* Header with back button */}
      <div className="dashboard-header">
        <div className="dashboard-header-top">
          <button 
            className="back-to-landing-btn" 
            onClick={onBackToLanding}
            title={language === 'fr' ? 'Retour à la page d\'accueil' : 'Back to landing page'}
          >
            <HomeIcon size={20} />
            <span>{language === 'fr' ? 'Accueil' : 'Home'}</span>
          </button>
          
          <div className="beta-warning">
            <FlaskIcon size={16} />
            <span>
              {language === 'fr' 
                ? 'Version Beta - Données fictives' 
                : 'Beta Version - Fictional Data'
              }
            </span>
          </div>
        </div>
        
        <h2>{language === 'fr' ? 'Tableau de bord' : 'Dashboard'}</h2>
        <p className="dashboard-subtitle">
          {language === 'fr' ? 'Aperçu de votre activité' : 'Overview of your activity'}
        </p>
      </div>

      {/* Main App Access - Primary Element */}
      <div className="main-app-access">
        <div className="app-access-content">
          <div className="app-access-icon">
            <RocketIcon size={48} />
          </div>
          <div className="app-access-text">
            <h3>{language === 'fr' ? 'Accéder à l\'Application' : 'Access Application'}</h3>
            <p>
              {language === 'fr' 
                ? 'Convertissez vos slides PDF en documents LaTeX structurés avec notre IA avancée'
                : 'Convert your PDF slides to structured LaTeX documents with our advanced AI'
              }
            </p>
          </div>
          <button className="app-access-btn" onClick={handleAccessApp}>
            <span>{language === 'fr' ? 'Lancer l\'Application' : 'Launch Application'}</span>
            <RocketIcon size={20} />
          </button>
        </div>
      </div>

      {/* Beta Notice */}
      <div className="beta-notice">
        <FlaskIcon size={24} />
        <div className="beta-notice-content">
          <h4>{language === 'fr' ? 'Version Beta' : 'Beta Version'}</h4>
          <p>
            {language === 'fr' 
              ? 'Cette version est en développement. Les données et statistiques affichées ci-dessous sont fictives et servent uniquement à des fins de démonstration.'
              : 'This version is under development. The data and statistics displayed below are fictional and serve demonstration purposes only.'
            }
          </p>
        </div>
      </div>

      {/* Existing Dashboard Metrics */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-icon">📄</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Documents traités' : 'Processed documents'}</h3>
            <span className="metric-value">{recentDocuments || 12}</span>
            <p className="metric-description">
              {language === 'fr' ? 'Documents convertis (fictif)' : 'Converted documents (fictional)'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Temps de traitement' : 'Processing time'}</h3>
            <span className="metric-value">{formatTime((recentDocuments || 12) * 30)}</span>
            <p className="metric-description">
              {language === 'fr' ? 'Temps total (fictif)' : 'Total time (fictional)'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Utilisation' : 'Usage'}</h3>
            <span className="metric-value">85%</span>
            <p className="metric-description">
              {language === 'fr' ? 'Fonctionnalités utilisées (fictif)' : 'Features used (fictional)'}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h3>{language === 'fr' ? 'Documents récents (fictifs)' : 'Recent documents (fictional)'}</h3>
          {documents.length > 0 ? (
            <div className="activity-list">
              {documents.slice(0, 5).map((doc, index) => (
                <div key={index} className="activity-item" onClick={() => onViewDocument(doc)}>
                  <div className="activity-icon">📄</div>
                  <div className="activity-content">
                    <div className="activity-title">{doc.title || `Document ${index + 1}`}</div>
                    <div className="activity-date">
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'Date inconnue'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-activity">
              <p>{language === 'fr' ? 'Aucun document trouvé' : 'No documents found'}</p>
              <div className="fictional-documents">
                <div className="activity-item fictional">
                  <div className="activity-icon">📄</div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {language === 'fr' ? 'Cours de Mathématiques - Chapitre 5' : 'Mathematics Course - Chapter 5'}
                    </div>
                    <div className="activity-date">
                      {new Date(Date.now() - 86400000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="activity-item fictional">
                  <div className="activity-icon">📄</div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {language === 'fr' ? 'Présentation Physique Quantique' : 'Quantum Physics Presentation'}
                    </div>
                    <div className="activity-date">
                      {new Date(Date.now() - 172800000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="activity-item fictional">
                  <div className="activity-icon">📄</div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {language === 'fr' ? 'Algorithmes et Structures de Données' : 'Algorithms and Data Structures'}
                    </div>
                    <div className="activity-date">
                      {new Date(Date.now() - 259200000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 