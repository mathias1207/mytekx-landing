import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './StatisticsSection.css';

const StatisticsSection = ({ documents = [] }) => {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalPages: 0,
    averagePages: 0,
    recentDocuments: 0
  });

  useEffect(() => {
    const totalDocuments = documents.length;
    const totalPages = documents.reduce((total, doc) => total + (doc.pages || 1), 0);
    const averagePages = totalDocuments > 0 ? Math.round(totalPages / totalDocuments) : 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentDocuments = documents.filter(doc => 
      doc.createdAt && new Date(doc.createdAt) >= thirtyDaysAgo
    ).length;

    setStats({ totalDocuments, totalPages, averagePages, recentDocuments });
  }, [documents]);

  return (
    <div className="statistics-page">
      {/* Development Overlay */}
      <div className="development-overlay">
        <div className="development-notice">
          <div className="development-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2>{t('underDevelopment')}</h2>
          <p>{t('underDevelopmentMessage')}</p>
          <div className="development-footer">
            <span>{t('stayTuned')}</span>
          </div>
        </div>
      </div>
      
      {/* Grayed out content */}
      <div className="content-grayed">
        <div className="statistics-header">
          <h2>{language === 'fr' ? 'Statistiques' : 'Statistics'}</h2>
          <p>{language === 'fr' ? 'Aperçu de votre utilisation' : 'Overview of your usage'}</p>
        </div>

        <div className="statistics-grid">
          <div className="stat-card">
            <div className="stat-title-bar">
              <h3>{language === 'fr' ? 'Documents traités' : 'Documents processed'}</h3>
            </div>
            <div className="stat-value">{stats.totalDocuments}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title-bar">
              <h3>{language === 'fr' ? 'Pages converties' : 'Pages converted'}</h3>
            </div>
            <div className="stat-value">{stats.totalPages}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title-bar">
              <h3>{language === 'fr' ? 'Pages moyennes par document' : 'Avg. pages per doc'}</h3>
            </div>
            <div className="stat-value">{stats.averagePages}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title-bar">
              <h3>{language === 'fr' ? 'Documents ce mois' : 'Docs this month'}</h3>
            </div>
            <div className="stat-value">{stats.recentDocuments}</div>
          </div>
        </div>

        <div className="recent-activity">
          <div className="activity-title-bar">
            <h3>{language === 'fr' ? 'Activité récente' : 'Recent activity'}</h3>
          </div>
          {documents.length > 0 ? (
            <ul className="activity-list">
              {documents.slice(0, 5).map((doc, index) => (
                <li key={index} className="activity-item">
                  <span className="activity-date">
                    {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '—'}
                  </span>
                  <span className="activity-desc">
                    {doc.title || `Document ${index + 1}`} — {doc.pages || 1}p
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-activity">{language === 'fr' ? 'Aucune activité récente' : 'No recent activity'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
