import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Dashboard.css';

const Dashboard = ({ documents = [], onViewDocument, activeSection }) => {
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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>{language === 'fr' ? 'Tableau de bord' : 'Dashboard'}</h2>
        <p className="dashboard-subtitle">
          {language === 'fr' ? 'Aperçu de votre activité' : 'Overview of your activity'}
        </p>
      </div>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-icon">📄</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Documents traités' : 'Processed documents'}</h3>
            <span className="metric-value">{recentDocuments}</span>
            <p className="metric-description">
              {language === 'fr' ? 'Documents convertis au total' : 'Total converted documents'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Temps de traitement' : 'Processing time'}</h3>
            <span className="metric-value">{formatTime(recentDocuments * 30)}</span>
            <p className="metric-description">
              {language === 'fr' ? 'Temps total de traitement' : 'Total processing time'}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>{language === 'fr' ? 'Utilisation' : 'Usage'}</h3>
            <span className="metric-value">100%</span>
            <p className="metric-description">
              {language === 'fr' ? 'Toutes les fonctionnalités disponibles' : 'All features available'}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h3>{language === 'fr' ? 'Documents récents' : 'Recent documents'}</h3>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 