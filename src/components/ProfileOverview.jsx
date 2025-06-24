import React, { useState } from 'react';
import { FaUser, FaCheck, FaExclamationTriangle, FaClock, FaCrown, FaBriefcase, FaUniversity, FaGraduationCap, FaGlobe, FaInfoCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import './ProfileOverview.css';

const ProfileOverview = ({ userData = {} }) => {
  const { t, language } = useLanguage();
  const [hovering, setHovering] = useState(false);
  
  const {
    displayName = t('defaultUsername'), 
    email = 'email@exemple.com',
    photoURL = null,
    registrationDate = new Date(),
    accountStatus = 'active',
    isBetaTester = false,
    occupation = '',
    organization = '',
    fieldOfStudy = '',
    country = '',
    bio = ''
  } = userData;
  
  // Format date based on user's language preference
  const formatDate = (date) => {
    if (!date) return '';
    
    try {
      // Using the t function for month names and date format
      const months = {
        0: t('january'),
        1: t('february'),
        2: t('march'),
        3: t('april'),
        4: t('may'),
        5: t('june'),
        6: t('july'),
        7: t('august'),
        8: t('september'),
        9: t('october'),
        10: t('november'),
        11: t('december')
      };
      
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      return language === 'fr' 
        ? `${day} ${month} ${year}` 
        : `${month} ${day}, ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return t('invalidDate');
    }
  };
  
  // Map account status to readable text and color
  const statusMap = {
    active: {
      text: t('statusActive'),
      color: '#2ecc71',
      icon: <FaCheck />
    },
    inactive: {
      text: t('statusInactive'),
      color: '#e74c3c',
      icon: <FaExclamationTriangle />
    },
    pending: {
      text: t('statusPending'),
      color: '#f39c12',
      icon: <FaClock />
    }
  };
  
  const status = statusMap[accountStatus] || statusMap.pending;
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // Dans une vraie application, vous téléchargeriez le fichier ici
      alert(t('photoUploadDev'));
    }
  };
  
  // Fonction pour obtenir le nom d'occupation traduit
  const getOccupationName = (occupationValue) => {
    switch(occupationValue) {
      case 'student': return t('occupationStudent');
      case 'teacher': return t('occupationTeacher');
      case 'researcher': return t('occupationResearcher');
      case 'professional': return t('occupationProfessional');
      case 'other': return t('occupationOther');
      default: return '';
    }
  };
  
  // Fonction pour obtenir le nom du pays traduit
  const getCountryName = (countryValue) => {
    switch(countryValue) {
      case 'fr': return t('countryFrance');
      case 'us': return t('countryUSA');
      case 'ca': return t('countryCanada');
      case 'ch': return t('countrySwitzerland');
      case 'be': return t('countryBelgium');
      case 'other': return t('countryOther');
      default: return '';
    }
  };
  
  return (
    <div className="profile-overview">
      <div className="profile-overview-header">
        <h2></h2>
      </div>
      
      <div className="profile-overview-content">
        <div className="profile-photo-section">
          <div 
            className="profile-photo-container"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {photoURL ? (
              <img 
                src={photoURL} 
                alt={t('profilePhotoAlt')} 
                className="profile-photo" 
              />
            ) : (
              <div className="profile-photo-placeholder">
                <FaUser />
              </div>
            )}
            
            <div className={`profile-photo-overlay ${hovering ? 'visible' : ''}`}>
              <span>{t('changePhoto')}</span>
            </div>
            
            <input 
              type="file" 
              id="photo-upload" 
              accept="image/*" 
              className="photo-upload-input"
              onChange={handlePhotoUpload}
              aria-label={t('uploadPhoto')}
            />
          </div>
          
          <label htmlFor="photo-upload" className="upload-photo-button">
            {t('uploadPhoto')}
          </label>
        </div>
        
        <div className="profile-info">
          <div className="profile-name-section">
            <h3 className="profile-name">
              {displayName}
              {isBetaTester && (
                <span className="beta-tester-badge">
                  <FaCrown className="crown-icon" /> {t('betaTester')}
                </span>
              )}
            </h3>
            <p className="profile-email">{email}</p>
          </div>
          
          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="detail-label">{t('memberSince')}:</span>
              <span className="detail-value">{formatDate(registrationDate)}</span>
            </div>
            
            <div className="profile-detail-item">
              <span className="detail-label">{t('accountStatus')}:</span>
              <span className="detail-value status-indicator" style={{ color: status.color }}>
                {status.icon} {status.text}
              </span>
            </div>
            
            {/* Additional profile details from registration form */}
            {occupation && (
              <div className="profile-detail-item">
                <span className="detail-label">
                  <FaBriefcase className="detail-icon" /> {t('occupation')}:
                </span>
                <span className="detail-value">{getOccupationName(occupation)}</span>
              </div>
            )}
            
            {organization && (
              <div className="profile-detail-item">
                <span className="detail-label">
                  <FaUniversity className="detail-icon" /> {t('organization')}:
                </span>
                <span className="detail-value">{organization}</span>
              </div>
            )}
            
            {fieldOfStudy && (
              <div className="profile-detail-item">
                <span className="detail-label">
                  <FaGraduationCap className="detail-icon" /> {t('fieldOfStudy')}:
                </span>
                <span className="detail-value">{fieldOfStudy}</span>
              </div>
            )}
            
            {country && (
              <div className="profile-detail-item">
                <span className="detail-label">
                  <FaGlobe className="detail-icon" /> {t('country')}:
                </span>
                <span className="detail-value">{getCountryName(country)}</span>
              </div>
            )}
          </div>
          
          {bio && (
            <div className="profile-bio">
              <div className="bio-header">
                <FaInfoCircle className="bio-icon" />
                <h4>Bio</h4>
              </div>
              <p>{bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview; 