import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaTimes, FaUser, FaBriefcase, FaGraduationCap, FaUniversity, FaGlobe } from 'react-icons/fa';
import './RegistrationForm.css';

const RegistrationForm = ({ onComplete, onCancel, userData }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    displayName: userData?.displayName || '',
    occupation: '',
    organization: '',
    fieldOfStudy: '',
    bio: '',
    country: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Liste des options pour l'occupation
  const occupationOptions = [
    { value: 'student', label: t('occupationStudent') },
    { value: 'teacher', label: t('occupationTeacher') },
    { value: 'researcher', label: t('occupationResearcher') },
    { value: 'professional', label: t('occupationProfessional') },
    { value: 'other', label: t('occupationOther') }
  ];

  // Liste des pays
  const countryOptions = [
    { value: 'fr', label: t('countryFrance') },
    { value: 'us', label: t('countryUSA') },
    { value: 'ca', label: t('countryCanada') },
    { value: 'ch', label: t('countrySwitzerland') },
    { value: 'be', label: t('countryBelgium') },
    { value: 'other', label: t('countryOther') }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur si l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Valider le nom d'affichage
    if (!formData.displayName.trim()) {
      newErrors.displayName = t('errorRequiredField');
    } else if (formData.displayName.length < 3) {
      newErrors.displayName = t('errorNameTooShort');
    }
    
    // Valider l'occupation
    if (!formData.occupation) {
      newErrors.occupation = t('errorRequiredField');
    }
    
    // Si l'occupation est student ou teacher, l'organisation est requise
    if ((formData.occupation === 'student' || formData.occupation === 'teacher' || 
         formData.occupation === 'researcher') && !formData.organization.trim()) {
      newErrors.organization = t('errorRequiredField');
    }
    
    // Si l'occupation est student, le domaine d'étude est requis
    if (formData.occupation === 'student' && !formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = t('errorRequiredField');
    }

    // Valider le pays
    if (!formData.country) {
      newErrors.country = t('errorRequiredField');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ajouter des logs pour le débogage
    console.log("Formulaire soumis avec les données:", formData);
    
    if (!validate()) {
      console.log("Validation échouée, erreurs:", errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Tentative de soumission des données utilisateur:", formData);
      console.log("Données utilisateur disponibles:", userData);
      
      // Désactiver temporairement le bouton pour éviter les soumissions multiples
      document.querySelector('.submit-button').disabled = true;
      
      // Appeler le callback avec les données du formulaire
      onComplete(formData);
      
      console.log("Callback onComplete exécuté");
    } catch (error) {
      console.error("Error saving user data:", error);
      alert(`Erreur lors de la soumission: ${error.message}`);
      setErrors(prev => ({ ...prev, submit: t('errorSavingData') }));
      
      // Réactiver le bouton en cas d'erreur
      setTimeout(() => {
        document.querySelector('.submit-button').disabled = false;
        setIsSubmitting(false);
      }, 1000);
    }
    // Ne pas appeler setIsSubmitting(false) ici pour empêcher la réactivation du formulaire
    // avant la redirection ou la fermeture du modal
  };

  return (
    <div className="registration-modal">
      <div className="registration-content">
        <span className="close-button" onClick={onCancel}>
          <FaTimes />
        </span>
        
        <h2>
          <span className="logo-icon" style={{ fontSize: '1.2rem', marginRight: '10px' }}>ΘΞ</span>
          {t('completeYourProfile')}
        </h2>
        
        <p className="registration-description">
          {t('registrationDescription')}
        </p>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayName">
              <FaUser className="form-icon" />
              {t('displayName')}
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formData.displayName}
              onChange={handleChange}
              placeholder={t('displayNamePlaceholder')}
              className={errors.displayName ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.displayName && <p className="error-message">{errors.displayName}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="occupation">
              <FaBriefcase className="form-icon" />
              {t('occupation')}
            </label>
            <select
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={errors.occupation ? "error" : ""}
              disabled={isSubmitting}
            >
              <option value="">{t('selectOccupation')}</option>
              {occupationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.occupation && <p className="error-message">{errors.occupation}</p>}
          </div>
          
          {(formData.occupation === 'student' || formData.occupation === 'teacher' || formData.occupation === 'researcher') && (
            <div className="form-group">
              <label htmlFor="organization">
                <FaUniversity className="form-icon" />
                {t('organization')}
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder={t('organizationPlaceholder')}
                className={errors.organization ? "error" : ""}
                disabled={isSubmitting}
              />
              {errors.organization && <p className="error-message">{errors.organization}</p>}
            </div>
          )}
          
          {formData.occupation === 'student' && (
            <div className="form-group">
              <label htmlFor="fieldOfStudy">
                <FaGraduationCap className="form-icon" />
                {t('fieldOfStudy')}
              </label>
              <input
                id="fieldOfStudy"
                name="fieldOfStudy"
                type="text"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder={t('fieldOfStudyPlaceholder')}
                className={errors.fieldOfStudy ? "error" : ""}
                disabled={isSubmitting}
              />
              {errors.fieldOfStudy && <p className="error-message">{errors.fieldOfStudy}</p>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="country">
              <FaGlobe className="form-icon" />
              {t('country')}
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "error" : ""}
              disabled={isSubmitting}
            >
              <option value="">{t('selectCountry')}</option>
              {countryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.country && <p className="error-message">{errors.country}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">
              {t('bio')}
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder={t('bioPlaceholder')}
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {errors.submit && <p className="error-message submit-error">{errors.submit}</p>}
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('skip')}
            </button>
            
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? t('saving') 
                : t('saveProfile')}
            </button>
          </div>
          
          <p className="privacy-note">
            {t('privacyNote')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm; 