import React from 'react';

const UserStatsCard = ({ totalUploads, totalConversions, recentActivity }) => {
  return (
    <div className="user-stats-card">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{totalUploads || 0}</div>
          <div className="stat-label">Documents téléchargés</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{totalConversions || 0}</div>
          <div className="stat-label">Conversions effectuées</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{recentActivity || 0}</div>
          <div className="stat-label">Activité récente</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard; 