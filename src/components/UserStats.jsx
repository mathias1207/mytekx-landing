import React from 'react';
import { FaChartLine, FaClock, FaFileAlt, FaInfinity } from 'react-icons/fa';
import './UserStats.css';

// Composant simplifié qui n'affiche plus de limites ou de statistiques d'abonnement
function UserStats({ stats = null }) {
  // Si aucune statistique n'est fournie, afficher un message simple
  if (!stats) {
    return (
      <div className="stats-container">
        <div className="stats-header">
          <h2>Utilisation libre</h2>
          <div className="period-badge">Aucune limite</div>
        </div>
        <div className="stats-message">
          <FaInfinity className="infinity-icon" />
          <h3>Utilisez MyTekX sans restrictions</h3>
          <p>Profitez de toutes les fonctionnalités de l'application sans limite de documents ou de pages.</p>
        </div>
      </div>
    );
  }

  // Afficher seulement les statistiques de base sans limites
  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>Vos Statistiques</h2>
        <div className="period-badge">Utilisation libre</div>
      </div>

      <div className="stats-grid">
        {/* Statistiques mensuelles simplifiées */}
        <div className="stats-card monthly">
          <h3>
            <FaChartLine /> Ce mois-ci
          </h3>
          <div className="stat-item">
            <div className="stat-header">
              <span>Documents traités</span>
              <span className="stat-value">
                {stats.monthly?.documentsUploaded || 0}
              </span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-header">
              <span>Pages traitées</span>
              <span className="stat-value">
                {stats.monthly?.pagesProcessed || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Statistiques totales simplifiées */}
        <div className="stats-card total">
          <h3>
            <FaFileAlt /> Total
          </h3>
          <div className="stat-item">
            <div className="stat-header">
              <span>Documents traités</span>
              <span className="stat-value">
                {stats.total?.documentsUploaded || 0}
              </span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-header">
              <span>Pages traitées</span>
              <span className="stat-value">
                {stats.total?.pagesProcessed || 0}
              </span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-header">
              <span>Temps économisé</span>
              <span className="stat-value">
                <FaClock className="time-icon" />
                {stats.total?.timeSaved || '0h 0min'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStats; 