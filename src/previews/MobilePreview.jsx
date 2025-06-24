import React from 'react';
import './PreviewStyles.css';
import { FaArrowLeft, FaHome, FaSearch, FaUser, FaUpload, FaEllipsisV, FaBell, FaCamera, FaRegFileAlt, FaRegCalendarAlt, FaComments } from 'react-icons/fa';

export default function MobilePreview({ onBack }) {
  return (
    <div className="preview-container mobile-app-preview">
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Retour à la page d'accueil
        </button>
      </div>
      
      <h1 className="preview-title">Aperçu de l'application mobile MyTekX</h1>
      
      <div className="mobile-preview-container">
        <div className="mobile-device">
          <div className="device-header">
            <div className="device-time">14:25</div>
            <div className="device-notch"></div>
            <div className="device-icons">
              <span className="signal"></span>
              <span className="wifi"></span>
              <span className="battery"></span>
            </div>
          </div>
          
          <div className="app-header">
            <div className="app-logo">
              <span className="logo-icon">ΘΞ</span>
              <span>MyTekX</span>
            </div>
            <div className="app-actions">
              <FaBell className="app-icon" />
              <FaEllipsisV className="app-icon" />
            </div>
          </div>
          
          <div className="app-content">
            <div className="app-tabs">
              <div className="tab active">Documents</div>
              <div className="tab">Forum</div>
              <div className="tab">Profil</div>
            </div>
            
            <div className="mobile-section recent-documents">
              <h3>Documents récents</h3>
              <div className="document-list">
                <div className="document-item">
                  <div className="document-icon"><FaRegFileAlt /></div>
                  <div className="document-info">
                    <div className="document-title">Théorie des graphes</div>
                    <div className="document-date">Modifié le 12 mai</div>
                  </div>
                </div>
                <div className="document-item">
                  <div className="document-icon"><FaRegFileAlt /></div>
                  <div className="document-info">
                    <div className="document-title">Algèbre linéaire</div>
                    <div className="document-date">Modifié le 10 mai</div>
                  </div>
                </div>
                <div className="document-item">
                  <div className="document-icon"><FaRegFileAlt /></div>
                  <div className="document-info">
                    <div className="document-title">Mécanique quantique</div>
                    <div className="document-date">Modifié le 8 mai</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mobile-section quick-actions">
              <h3>Actions rapides</h3>
              <div className="action-buttons">
                <div className="action-button">
                  <div className="action-icon camera"><FaCamera /></div>
                  <div className="action-label">Prendre une photo</div>
                </div>
                <div className="action-button">
                  <div className="action-icon upload"><FaUpload /></div>
                  <div className="action-label">Importer un PDF</div>
                </div>
                <div className="action-button">
                  <div className="action-icon create"><FaRegFileAlt /></div>
                  <div className="action-label">Nouveau document</div>
                </div>
              </div>
            </div>
            
            <div className="mobile-section forum-activity">
              <h3>Activité du forum</h3>
              <div className="forum-updates">
                <div className="forum-update">
                  <div className="update-icon"><FaComments /></div>
                  <div className="update-content">
                    <div className="update-title">Méthodes numériques</div>
                    <div className="update-text">Thomas a répondu à votre question</div>
                    <div className="update-time">Il y a 1 heure</div>
                  </div>
                </div>
                <div className="forum-update">
                  <div className="update-icon"><FaComments /></div>
                  <div className="update-content">
                    <div className="update-title">Intégration par parties</div>
                    <div className="update-text">Votre document a reçu 3 nouveaux votes</div>
                    <div className="update-time">Il y a 3 heures</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mobile-navigation">
            <div className="nav-item active">
              <FaHome className="nav-icon" />
              <span className="nav-label">Accueil</span>
            </div>
            <div className="nav-item">
              <FaSearch className="nav-icon" />
              <span className="nav-label">Recherche</span>
            </div>
            <div className="nav-item">
              <div className="nav-plus">+</div>
            </div>
            <div className="nav-item">
              <FaRegCalendarAlt className="nav-icon" />
              <span className="nav-label">Activité</span>
            </div>
            <div className="nav-item">
              <FaUser className="nav-icon" />
              <span className="nav-label">Profil</span>
            </div>
          </div>
        </div>
        
        <div className="preview-features">
          <div className="feature">
            <h3>Accédez à vos documents partout</h3>
            <p>Consultez, modifiez et partagez vos documents LaTeX depuis votre téléphone ou tablette, où que vous soyez.</p>
          </div>
          <div className="feature">
            <h3>Capturez des photos de tableaux et notes</h3>
            <p>Transformez instantanément des photos de notes manuscrites ou de tableaux en documents LaTeX structurés.</p>
          </div>
          <div className="feature">
            <h3>Restez connecté à la communauté</h3>
            <p>Suivez l'activité du forum, recevez des notifications et participez aux discussions depuis l'application mobile.</p>
          </div>
          <div className="feature">
            <h3>Synchronisation transparente</h3>
            <p>Tous vos documents sont automatiquement synchronisés entre vos appareils pour un accès ininterrompu.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 