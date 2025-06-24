import React from 'react';
import './PreviewStyles.css';

export default function ForumPreview() {
  return (
    <div className="preview-container forum-preview">
      <header className="preview-header">
        <div className="preview-logo">
          <span className="logo-icon">ΘΞ</span>
          <span className="logo-text">MyTekX Community</span>
        </div>
        <div className="preview-nav">
          <a href="#" className="preview-nav-item active">Accueil</a>
          <a href="#" className="preview-nav-item">Mes sujets</a>
          <a href="#" className="preview-nav-item">Catégories</a>
          <a href="#" className="preview-nav-item">Recherche</a>
        </div>
        <div className="preview-user">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="preview-avatar" />
          <span>Thomas D.</span>
        </div>
      </header>

      <div className="preview-main forum-main">
        <div className="forum-sidebar">
          <h3 className="sidebar-title">Catégories</h3>
          <ul className="category-list">
            <li className="category-item active">
              <span className="category-icon">📚</span>
              <span className="category-name">Mathématiques</span>
              <span className="category-count">134</span>
            </li>
            <li className="category-item">
              <span className="category-icon">💻</span>
              <span className="category-name">Informatique</span>
              <span className="category-count">98</span>
            </li>
            <li className="category-item">
              <span className="category-icon">🧪</span>
              <span className="category-name">Physique</span>
              <span className="category-count">76</span>
            </li>
            <li className="category-item">
              <span className="category-icon">🧬</span>
              <span className="category-name">Biologie</span>
              <span className="category-count">51</span>
            </li>
            <li className="category-item">
              <span className="category-icon">📊</span>
              <span className="category-name">Économie</span>
              <span className="category-count">42</span>
            </li>
          </ul>

          <h3 className="sidebar-title">Mes groupes</h3>
          <ul className="group-list">
            <li className="group-item">
              <span className="group-icon">👨‍🎓</span>
              <span className="group-name">Master IA Paris 1</span>
            </li>
            <li className="group-item">
              <span className="group-icon">🔬</span>
              <span className="group-name">Lab. de Recherche</span>
            </li>
          </ul>
        </div>

        <div className="forum-content">
          <div className="content-header">
            <h2 className="content-title">Discussion populaires - Mathématiques</h2>
            <button className="new-topic-btn">+ Nouveau sujet</button>
          </div>

          <div className="topics-list">
            <div className="topic-item pinned">
              <div className="topic-voting">
                <span className="upvote">▲</span>
                <span className="vote-count">42</span>
                <span className="downvote">▼</span>
              </div>
              <div className="topic-content">
                <h3 className="topic-title">Comprendre la preuve du théorème de Stokes en analyse vectorielle</h3>
                <p className="topic-excerpt">J'ai essayé de comprendre la démonstration vue en cours mais je bloque sur l'application du théorème de Green-Riemann dans...</p>
                <div className="topic-meta">
                  <span className="topic-tag">Analyse</span>
                  <span className="topic-tag">Théorèmes</span>
                  <span className="topic-replies">12 réponses</span>
                  <span className="topic-views">256 vues</span>
                  <span className="topic-author">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Author" className="tiny-avatar" />
                    Emma B.
                  </span>
                </div>
              </div>
              <div className="topic-activity">
                <span className="activity-time">Il y a 2h</span>
                <div className="activity-user">
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Last Reply" className="tiny-avatar" />
                </div>
              </div>
            </div>

            <div className="topic-item">
              <div className="topic-voting">
                <span className="upvote">▲</span>
                <span className="vote-count">28</span>
                <span className="downvote">▼</span>
              </div>
              <div className="topic-content">
                <h3 className="topic-title">Resources pour les espaces de Hilbert et applications</h3>
                <p className="topic-excerpt">Je cherche des ressources complémentaires sur les espaces de Hilbert et leurs applications en physique quantique...</p>
                <div className="topic-meta">
                  <span className="topic-tag">Algèbre linéaire</span>
                  <span className="topic-tag">Quantique</span>
                  <span className="topic-replies">7 réponses</span>
                  <span className="topic-views">183 vues</span>
                  <span className="topic-author">
                    <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Author" className="tiny-avatar" />
                    Laurent M.
                  </span>
                </div>
              </div>
              <div className="topic-activity">
                <span className="activity-time">Il y a 5h</span>
                <div className="activity-user">
                  <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Last Reply" className="tiny-avatar" />
                </div>
              </div>
            </div>

            <div className="topic-item">
              <div className="topic-voting">
                <span className="upvote">▲</span>
                <span className="vote-count">19</span>
                <span className="downvote">▼</span>
              </div>
              <div className="topic-content">
                <h3 className="topic-title">Interprétation géométrique des groupes de Lie</h3>
                <p className="topic-excerpt">Je travaille sur un projet qui implique l'utilisation de groupes de Lie et j'ai du mal à visualiser certains concepts...</p>
                <div className="topic-meta">
                  <span className="topic-tag">Algèbre</span>
                  <span className="topic-tag">Géométrie</span>
                  <span className="topic-replies">5 réponses</span>
                  <span className="topic-views">127 vues</span>
                  <span className="topic-author">
                    <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Author" className="tiny-avatar" />
                    Sophie L.
                  </span>
                </div>
              </div>
              <div className="topic-activity">
                <span className="activity-time">Hier</span>
                <div className="activity-user">
                  <img src="https://randomuser.me/api/portraits/men/51.jpg" alt="Last Reply" className="tiny-avatar" />
                </div>
              </div>
            </div>

            <div className="topic-item">
              <div className="topic-voting">
                <span className="upvote">▲</span>
                <span className="vote-count">15</span>
                <span className="downvote">▼</span>
              </div>
              <div className="topic-content">
                <h3 className="topic-title">Partage: Document LaTeX sur les séries de Fourier avec visualisations</h3>
                <p className="topic-excerpt">J'ai créé un document complet sur les séries de Fourier avec des visualisations interactives. Je partage la source...</p>
                <div className="topic-meta">
                  <span className="topic-tag">Analyse</span>
                  <span className="topic-tag">LaTeX</span>
                  <span className="topic-tag">Ressources</span>
                  <span className="topic-replies">9 réponses</span>
                  <span className="topic-views">201 vues</span>
                  <span className="topic-author">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="tiny-avatar" />
                    Thomas D.
                  </span>
                </div>
              </div>
              <div className="topic-activity">
                <span className="activity-time">Il y a 2j</span>
                <div className="activity-user">
                  <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Last Reply" className="tiny-avatar" />
                </div>
              </div>
            </div>
          </div>

          <div className="pagination">
            <a href="#" className="page-item active">1</a>
            <a href="#" className="page-item">2</a>
            <a href="#" className="page-item">3</a>
            <span className="page-separator">...</span>
            <a href="#" className="page-item">12</a>
            <a href="#" className="page-next">›</a>
          </div>
        </div>

        <div className="forum-trending">
          <h3 className="trending-title">Tendances</h3>
          <div className="trending-item">
            <span className="trending-number">1</span>
            <span className="trending-text">Introduction aux équations différentielles</span>
          </div>
          <div className="trending-item">
            <span className="trending-number">2</span>
            <span className="trending-text">Problème de Riemann et applications</span>
          </div>
          <div className="trending-item">
            <span className="trending-number">3</span>
            <span className="trending-text">Cours complet sur les groupes et anneaux</span>
          </div>
          <div className="trending-item">
            <span className="trending-number">4</span>
            <span className="trending-text">Visualisation 3D des espaces vectoriels</span>
          </div>
          <div className="trending-item">
            <span className="trending-number">5</span>
            <span className="trending-text">Comprendre l'hypothèse de Riemann</span>
          </div>

          <div className="active-users">
            <h3 className="users-title">Utilisateurs actifs</h3>
            <div className="users-grid">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" className="active-user-avatar" title="Emma B." />
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="active-user-avatar" title="Paul R." />
              <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="User" className="active-user-avatar" title="Laurent M." />
              <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="User" className="active-user-avatar" title="Marie P." />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="active-user-avatar" title="Thomas D." />
              <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="User" className="active-user-avatar" title="Sophie L." />
              <img src="https://randomuser.me/api/portraits/men/51.jpg" alt="User" className="active-user-avatar" title="Éric F." />
              <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="User" className="active-user-avatar" title="Julie N." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 