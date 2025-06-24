import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileStackIcon } from './ui/file-stack';
import { SearchIcon } from './ui/search';
import './DocumentsPage.css';

const DocumentsPage = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const mockDocuments = [
    { id: 1, title: 'Présentation Marketing Q4 2024', type: 'presentation', date: '2024-01-15', size: '2.4 MB', pages: 24, status: 'completed', tags: ['marketing', 'q4', 'stratégie'] },
    { id: 2, title: 'Rapport Financier Annuel', type: 'report', date: '2024-01-10', size: '1.8 MB', pages: 45, status: 'completed', tags: ['finance', 'rapport', 'annuel'] },
    { id: 3, title: 'Formation Nouveaux Employés', type: 'training', date: '2024-01-08', size: '3.2 MB', pages: 32, status: 'processing', tags: ['formation', 'rh', 'onboarding'] },
    { id: 4, title: 'Analyse Concurrentielle 2024', type: 'analysis', date: '2024-01-05', size: '2.1 MB', pages: 18, status: 'completed', tags: ['analyse', 'concurrence', 'marché'] },
    { id: 5, title: 'Roadmap Produit 2024', type: 'roadmap', date: '2024-01-03', size: '1.5 MB', pages: 28, status: 'completed', tags: ['produit', 'roadmap', 'développement'] },
    { id: 6, title: 'Guide Utilisateur v2.0', type: 'documentation', date: '2024-01-01', size: '4.1 MB', pages: 67, status: 'draft', tags: ['documentation', 'guide', 'utilisateur'] }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'title': return a.title.localeCompare(b.title);
      case 'size': return parseFloat(b.size) - parseFloat(a.size);
      default: return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'processing': return '#f59e0b';
      case 'draft': return '#6366f1';
      default: return '#64748b';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      completed: language === 'fr' ? 'Terminé' : 'Completed',
      processing: language === 'fr' ? 'En cours' : 'Processing',
      draft: language === 'fr' ? 'Brouillon' : 'Draft'
    };
    return statusMap[status] || status;
  };

  const getTypeText = (type) => {
    const typeMap = {
      presentation: language === 'fr' ? 'Présentation' : 'Presentation',
      report: language === 'fr' ? 'Rapport' : 'Report',
      training: language === 'fr' ? 'Formation' : 'Training',
      analysis: language === 'fr' ? 'Analyse' : 'Analysis',
      roadmap: language === 'fr' ? 'Roadmap' : 'Roadmap',
      documentation: language === 'fr' ? 'Documentation' : 'Documentation'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="documents-page">
      {/* Development Overlay */}
      <div className="development-overlay">
        <div className="development-notice">
          <div className="development-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        <div className="documents-header">
          <div className="header-title">
            <FileStackIcon size={32} />
            <div>
              <h1>{language === 'fr' ? 'Mes Documents' : 'My Documents'}</h1>
              <p>{language === 'fr' ? 'Gérez et consultez vos documents créés' : 'Manage and view your created documents'}</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{mockDocuments.length}</span>
              <span className="stat-label">{language === 'fr' ? 'Documents' : 'Documents'}</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockDocuments.filter(d => d.status === 'completed').length}</span>
              <span className="stat-label">{language === 'fr' ? 'Terminés' : 'Completed'}</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockDocuments.reduce((acc, doc) => acc + doc.pages, 0)}</span>
              <span className="stat-label">{language === 'fr' ? 'Pages' : 'Pages'}</span>
            </div>
          </div>
        </div>

        <div className="documents-controls">
          <div className="search-container">
            <SearchIcon size={20} />
            <input
              type="text"
              placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="controls-right">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">{language === 'fr' ? 'Tous les types' : 'All types'}</option>
              <option value="presentation">{getTypeText('presentation')}</option>
              <option value="report">{getTypeText('report')}</option>
              <option value="training">{getTypeText('training')}</option>
              <option value="analysis">{getTypeText('analysis')}</option>
              <option value="roadmap">{getTypeText('roadmap')}</option>
              <option value="documentation">{getTypeText('documentation')}</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">{language === 'fr' ? 'Trier par date' : 'Sort by date'}</option>
              <option value="title">{language === 'fr' ? 'Trier par titre' : 'Sort by title'}</option>
              <option value="size">{language === 'fr' ? 'Trier par taille' : 'Sort by size'}</option>
            </select>
          </div>
        </div>

        <div className="documents-grid">
          {sortedDocuments.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-title-bar">
                <h3>{doc.title}</h3>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(doc.status) }}>
                  {getStatusText(doc.status)}
                </span>
              </div>
              <div className="document-info">
                <p className="doc-type">{getTypeText(doc.type)}</p>
                <div className="meta">
                  <span>{doc.pages}p</span>
                  <span>{doc.size}</span>
                  <span>{new Date(doc.date).toLocaleDateString()}</span>
                </div>
                <div className="tags">
                  {doc.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                </div>
                <div className="actions">
                  <button className="btn">{language === 'fr' ? 'Ouvrir' : 'Open'}</button>
                  <button className="btn secondary">{language === 'fr' ? 'Partager' : 'Share'}</button>
                  <button className="btn danger">{language === 'fr' ? 'Supprimer' : 'Delete'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedDocuments.length === 0 && (
          <div className="empty">
            <FileStackIcon size={48} />
            <p>{language === 'fr' ? 'Aucun résultat.' : 'No results found.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;