import React, { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AccountSection.css';

const AccountSection = ({ onLogout }) => {
  const [user, setUser] = useState({
    uid: 'mock-user-id',
    email: 'user@example.com',
    displayName: 'Test User'
  });
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    bio: '',
    occupation: '',
    organization: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadUserData = async (user) => {
    try {
      setUserData({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        bio: '',
        occupation: '',
        organization: '',
        country: ''
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Mettre à jour le profil
      setUser(prev => ({
        ...prev,
        displayName: userData.displayName,
        photoURL: userData.photoURL
      }));

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Mettre à jour le mot de passe
      setUser(prev => ({
        ...prev,
        password: passwordData.newPassword
      }));

      setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès !' });
      setShowPasswordChange(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du mot de passe.' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="account-section">
      <div className="account-header">
        <FaUser className="account-icon" />
        <div>
          <h1>Mon compte</h1>
          <p>Gérez vos informations personnelles et paramètres</p>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Informations de profil */}
      <div className="account-section-card">
        <div className="card-header">
          <h2>Informations du profil</h2>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit /> {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom d'affichage</label>
              <input
                type="text"
                value={userData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                disabled={!isEditing}
                placeholder="Votre nom d'affichage"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Profession</label>
              <input
                type="text"
                value={userData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                disabled={!isEditing}
                placeholder="Votre profession"
              />
            </div>
            <div className="form-group">
              <label>Organisation</label>
              <input
                type="text"
                value={userData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                disabled={!isEditing}
                placeholder="Votre organisation"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pays</label>
              <select
                value={userData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={!isEditing}
              >
                <option value="">Sélectionnez un pays</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label>Photo de profil (URL)</label>
              <input
                type="url"
                value={userData.photoURL}
                onChange={(e) => handleInputChange('photoURL', e.target.value)}
                disabled={!isEditing}
                placeholder="https://exemple.com/photo.jpg"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Bio</label>
            <textarea
              value={userData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              placeholder="Parlez-nous de vous..."
              rows={3}
            />
          </div>

          {isEditing && (
            <div className="form-actions">
              <button 
                className="save-button"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sécurité */}
      <div className="account-section-card">
        <div className="card-header">
          <h2>Sécurité</h2>
          <button 
            className="edit-button"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
          >
            <FaEdit /> Changer le mot de passe
          </button>
        </div>

        {showPasswordChange && (
          <div className="password-form">
            <div className="form-group">
              <label>Mot de passe actuel</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Votre mot de passe actuel"
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Nouveau mot de passe</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Nouveau mot de passe (min. 6 caractères)"
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirmer le nouveau mot de passe</label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirmez le nouveau mot de passe"
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="save-button"
                onClick={handlePasswordChange}
                disabled={loading}
              >
                {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions du compte */}
      <div className="account-section-card">
        <div className="card-header">
          <h2>Actions du compte</h2>
        </div>

        <div className="account-actions">
          <button className="logout-button" onClick={onLogout}>
            <FaSignOutAlt /> Se déconnecter
          </button>
          
          <button className="delete-button">
            <FaTrash /> Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSection; 