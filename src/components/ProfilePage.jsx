import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import ProfileOverview from './ProfileOverview';
import Dashboard from './Dashboard';
import UserStatsCard from './UserStatsCard';
import { useLanguage } from '../contexts/LanguageContext';
import { FaArrowLeft, FaDownload, FaEye, FaFileAlt, FaFileCode, FaSearch, FaFilter, FaFilePdf, FaCode, FaSignOutAlt, FaUser, FaSpinner, FaFolderOpen, FaTrashAlt, FaExclamationTriangle, FaStar, FaRegStar, FaFlag, FaGlobe, FaMoneyBillWave, FaLock, FaCog, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showDocumentsPage, setShowDocumentsPage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [documentToReport, setDocumentToReport] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [showDashboardPage, setShowDashboardPage] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Référence aux boutons de téléchargement pour le positionnement des tooltips
  const downloadButtonsRef = useRef([]);
  
  // Ajout de traduction pour le signalement
  const translations = {
    fr: {
      reportSubmitted: "Merci ! Votre signalement a été envoyé avec succès.",
      reportIssue: "Signaler un problème",
      reportAction: "Signaler",
      reportDescription: "Veuillez décrire le problème rencontré avec ce document :",
      describeProblem: "Décrivez le problème ici...",
      submit: "Envoyer",
      settings: "Paramètres",
      settingsDescription: "Personnalisez votre compte et vos préférences",
      backToProfile: "Retour au profil"
    },
    en: {
      reportSubmitted: "Thank you! Your report has been submitted successfully.",
      reportIssue: "Report an issue",
      reportAction: "Report",
      reportDescription: "Please describe the issue you encountered with this document:",
      describeProblem: "Describe the issue here...",
      submit: "Submit",
      settings: "Settings",
      settingsDescription: "Customize your account and preferences",
      backToProfile: "Back to profile"
    }
  };
  
  // Fonction pour obtenir la traduction
  const getText = (key) => {
    return translations[language]?.[key] || translations.en[key];
  };
  
  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed in ProfilePage:", user ? user.email : "No user");
      setCurrentUser(user);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);
  
  // Charger les données utilisateur depuis Firestore
  useEffect(() => {
    if (!authReady || !currentUser) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data for:", currentUser.email);

        // Récupérer les données utilisateur depuis Firestore
        const userRef = firestoreDoc(db, "users", currentUser.uid);
        console.log("Attempting to fetch Firestore data from users collection for UID:", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          // Combiner les données d'authentification avec les données Firestore
          const firestoreData = userSnap.data();
          console.log("Firestore data retrieved:", firestoreData);
          
          // Traiter correctement les timestamps Firestore
          let createdAtDate;
          try {
            // Si c'est un timestamp Firestore
            if (firestoreData.createdAt && typeof firestoreData.createdAt.toDate === 'function') {
              createdAtDate = firestoreData.createdAt.toDate();
            } 
            // Si c'est une chaîne ISO
            else if (firestoreData.createdAt && typeof firestoreData.createdAt === 'string') {
              createdAtDate = new Date(firestoreData.createdAt);
            } 
            // Valeur par défaut
            else {
              createdAtDate = new Date();
            }
          } catch (dateError) {
            console.error("Error processing createdAt date:", dateError);
            createdAtDate = new Date();
          }
          
          setUserData({
            displayName: firestoreData.displayName || currentUser.displayName || 'User',
            email: firestoreData.email || currentUser.email,
            photoURL: firestoreData.photoURL || currentUser.photoURL,
            registrationDate: createdAtDate,
            accountStatus: firestoreData.isActivated ? 'active' : 'inactive',
            isBetaTester: firestoreData.isBetaTester || localStorage.getItem('hasBetaAccess') === 'true',
            occupation: firestoreData.occupation || '',
            organization: firestoreData.organization || '',
            fieldOfStudy: firestoreData.fieldOfStudy || '',
            country: firestoreData.country || '',
            bio: firestoreData.bio || '',
            stats: {
              conversions: firestoreData.stats?.conversions || 0,
              pagesProcessed: firestoreData.stats?.pagesProcessed || 0,
              timeSaved: firestoreData.stats?.timeSaved || '0h 0min'
            }
          });
          
        } else {
          console.warn("No data found in Firestore, checking localStorage");
          // Si aucune donnée n'existe dans Firestore, essayer localStorage
          const localStorageData = localStorage.getItem('userProfileData');
          
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            console.log("Retrieved data from localStorage after Firestore failed:", parsedData);
            
            setUserData({
              displayName: parsedData.displayName || currentUser.displayName || 'User',
              email: parsedData.email || currentUser.email,
              photoURL: parsedData.photoURL || currentUser.photoURL,
              registrationDate: parsedData.createdAt ? new Date(parsedData.createdAt) : new Date(),
              accountStatus: parsedData.isActivated ? 'active' : 'inactive',
              isBetaTester: parsedData.isBetaTester || localStorage.getItem('hasBetaAccess') === 'true',
              occupation: parsedData.occupation || '',
              organization: parsedData.organization || '',
              fieldOfStudy: parsedData.fieldOfStudy || '',
              country: parsedData.country || '',
              bio: parsedData.bio || '',
              stats: {
                conversions: 0,
                pagesProcessed: 0,
                timeSaved: '0h 0min'
              }
            });
          } else {
            // Configurer des données utilisateur par défaut en cas d'échec de localStorage aussi
            setUserData({
              displayName: localStorage.getItem('displayName') || 'User',
              email: localStorage.getItem('userEmail') || 'utilisateur@exemple.com',
              photoURL: null,
              registrationDate: new Date(),
              accountStatus: 'active',
              isBetaTester: localStorage.getItem('hasBetaAccess') === 'true',
              stats: {
                conversions: 0,
                pagesProcessed: 0,
                timeSaved: '0h 0min'
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Fallback vers localStorage en cas d'erreur
        try {
          const localStorageData = localStorage.getItem('userProfileData');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            setUserData({
              displayName: parsedData.displayName || 'User',
              email: parsedData.email || 'utilisateur@exemple.com',
              photoURL: parsedData.photoURL || null,
              registrationDate: parsedData.createdAt ? new Date(parsedData.createdAt) : new Date(),
              accountStatus: parsedData.isActivated ? 'active' : 'inactive',
              isBetaTester: parsedData.isBetaTester || localStorage.getItem('hasBetaAccess') === 'true',
              occupation: parsedData.occupation || '',
              organization: parsedData.organization || '',
              fieldOfStudy: parsedData.fieldOfStudy || '',
              country: parsedData.country || '',
              bio: parsedData.bio || '',
              stats: {
                conversions: 0,
                pagesProcessed: 0,
                timeSaved: '0h 0min'
              }
            });
          } else {
            // Configurer des données utilisateur par défaut en cas d'échec de localStorage aussi
            setUserData({
              displayName: localStorage.getItem('displayName') || 'User',
              email: localStorage.getItem('userEmail') || 'utilisateur@exemple.com',
              photoURL: null,
              registrationDate: new Date(),
              accountStatus: 'active',
              isBetaTester: localStorage.getItem('hasBetaAccess') === 'true',
              stats: {
                conversions: 0,
                pagesProcessed: 0,
                timeSaved: '0h 0min'
              }
            });
          }
        } catch (localStorageError) {
          console.error('Error using localStorage fallback:', localStorageError);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [authReady, currentUser]);
  
  // Charger les documents de l'utilisateur
  useEffect(() => {
    if (!authReady || !currentUser) return;

    const fetchUserDocuments = async () => {
      try {
        setDocumentsLoading(true);
        console.log("Attempting to load user documents for:", currentUser.email);
        
        let userDocuments = [];
        
        try {
          // Récupérer les documents depuis Firestore
          console.log("Fetching documents from Firestore for user:", currentUser.uid);
          const q = query(
            collection(db, "users", currentUser.uid, "documents"),
            orderBy("createdAt", "desc")
          );
          
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            userDocuments = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt) || new Date()
            }));
            console.log("Documents retrieved from Firestore:", userDocuments.length, "documents");
          } else {
            console.log("No documents found in Firestore for user:", currentUser.uid);
          }
        } catch (firestoreError) {
          console.error("Error fetching documents from Firestore:", firestoreError);
          // Continue avec la récupération depuis localStorage
        }
        
        // Si aucun document n'a été récupéré de Firestore ou en complément, vérifier localStorage
        const localStorageDocs = localStorage.getItem('userDocuments');
        if (localStorageDocs) {
          try {
            const parsedDocs = JSON.parse(localStorageDocs);
            console.log("All documents in localStorage:", parsedDocs.length, "total documents");
            
            // Filtrer les documents pour ne garder que ceux de l'utilisateur actuel
            const localDocs = parsedDocs.filter(doc => 
              doc.userEmail === currentUser.email || 
              doc.userId === currentUser.uid
            );
            console.log("Filtered documents for current user:", localDocs.length, "documents");
            
            // Formatter les dates pour les documents locaux
            const formattedLocalDocs = localDocs.map(doc => ({
              ...doc,
              createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date()
            }));
            
            // Combiner avec les documents de Firestore
            // Éviter les doublons en se basant sur fileId
            const existingFileIds = new Set(userDocuments.map(doc => doc.fileId));
            const uniqueLocalDocs = formattedLocalDocs.filter(doc => !existingFileIds.has(doc.fileId));
            
            userDocuments = [...userDocuments, ...uniqueLocalDocs];
            console.log("Total documents after combining Firestore + localStorage:", userDocuments.length);
          } catch (parseError) {
            console.error("Error parsing localStorage documents:", parseError);
          }
        } else {
          console.log("No documents found in localStorage");
        }
        
        // Trier les documents par date de création (du plus récent au plus ancien)
        userDocuments.sort((a, b) => b.createdAt - a.createdAt);
        
        setDocuments(userDocuments);
        console.log("Final documents set:", userDocuments.length, "documents loaded");
      } catch (error) {
        console.error("Error fetching user documents:", error);
      } finally {
        setDocumentsLoading(false);
      }
    };
    
    fetchUserDocuments();
  }, [authReady, currentUser]);
  
  // Filtrer les documents selon le terme de recherche et le type de filtre
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && doc.docType === filterType;
  });
  
  // Formatter la date
  const formatDate = (date) => {
    if (!date) return '';
    
    try {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Les mois commencent à 0
      const year = date.getFullYear();
      
      return language === 'fr' 
        ? `${day}/${month}/${year}` 
        : `${month}/${day}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  
  // Fonction pour ouvrir un document PDF
  const handleOpenDocument = async (doc) => {
    try {
      setDocumentsLoading(true);
      
      // Si le document a une URL directe pour le PDF
      if (doc.pdfURL) {
        window.open(doc.pdfURL, '_blank');
        setDocumentsLoading(false);
        return;
      }
      
      // Sinon, essayez de récupérer le fichier PDF depuis Firebase Storage
      const currentUser = auth.currentUser;
      if (doc.fileId && currentUser) {
        const pdfRef = ref(storage, `users/${doc.userId || currentUser.uid}/documents/${doc.fileId}.pdf`);
        try {
          const url = await getDownloadURL(pdfRef);
          window.open(url, '_blank');
        } catch (error) {
          console.error("Error retrieving PDF:", error);
          alert(t('pdfNotFound'));
        }
      } else {
        alert(t('viewError'));
      }
      
      setDocumentsLoading(false);
    } catch (error) {
      console.error("Error viewing document:", error);
      alert(t('viewError'));
      setDocumentsLoading(false);
    }
  };

  // Fonction pour télécharger un document TEX
  const handleDownloadDocument = async (doc) => {
    try {
      setDocumentsLoading(true);
      
      // Si le document a une URL directe
      if (doc.fileURL) {
        window.open(doc.fileURL, '_blank');
        setDocumentsLoading(false);
        return;
      }
      
      // Sinon, essayez de récupérer le fichier depuis Firebase Storage
      const currentUser = auth.currentUser;
      if (doc.fileId && currentUser) {
        const texRef = ref(storage, `users/${doc.userId || currentUser.uid}/documents/${doc.fileId}.tex`);
        try {
          const url = await getDownloadURL(texRef);
          window.open(url, '_blank');
        } catch (error) {
          console.error("Error retrieving TEX file:", error);
          alert(t('fileNotFound'));
        }
      } else {
        alert(t('downloadError'));
      }
      
      setDocumentsLoading(false);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert(t('downloadError'));
      setDocumentsLoading(false);
    }
  };
  
  // Fonction pour ouvrir la modale de confirmation de suppression
  const openDeleteConfirmation = (doc) => {
    setDocumentToDelete(doc);
    setShowDeleteModal(true);
  };

  // Fonction pour fermer la modale de confirmation
  const closeDeleteConfirmation = () => {
    setShowDeleteModal(false);
    setDocumentToDelete(null);
  };

  // Fonction pour supprimer un document
  const handleDeleteDocument = async () => {
    try {
      setDocumentsLoading(true);
      
      if (!documentToDelete) {
        console.error("Aucun document à supprimer");
        alert(t('deleteError'));
        closeDeleteConfirmation();
        return;
      }
      
      const docToDelete = documentToDelete;
      
      // Vérifier les données requises
      const currentUser = auth.currentUser;
      if (!docToDelete.fileId || !currentUser) {
        console.error("Données manquantes pour la suppression:", { 
          fileId: docToDelete.fileId, 
          currentUser: currentUser ? currentUser.uid : 'non connecté' 
        });
        alert(t('deleteError'));
        closeDeleteConfirmation();
        return;
      }

      // 1. D'abord supprimer le document de Firestore
      try {
        console.log(`Tentative de suppression du document Firestore: users/${currentUser.uid}/documents/${docToDelete.id}`);
        const docRef = firestoreDoc(db, "users", currentUser.uid, "documents", docToDelete.id);
        await deleteDoc(docRef);
        console.log("Document supprimé avec succès de Firestore");
      } catch (firestoreError) {
        console.error("Erreur lors de la suppression du document Firestore:", firestoreError);
        // Continuer quand même pour supprimer les fichiers et mettre à jour le localStorage
      }
      
      // 2. Ensuite supprimer les fichiers du Storage
      try {
        const pdfRef = ref(storage, `users/${docToDelete.userId || currentUser.uid}/documents/${docToDelete.fileId}.pdf`);
        console.log(`Tentative de suppression du PDF: ${pdfRef.fullPath}`);
        await deleteObject(pdfRef).catch(err => console.log("Erreur PDF (peut-être normal si le fichier n'existe pas):", err.message));
        
        const texRef = ref(storage, `users/${docToDelete.userId || currentUser.uid}/documents/${docToDelete.fileId}.tex`);
        console.log(`Tentative de suppression du TEX: ${texRef.fullPath}`);
        await deleteObject(texRef).catch(err => console.log("Erreur TEX (peut-être normal si le fichier n'existe pas):", err.message));
        
        console.log("Fichiers supprimés du Storage");
      } catch (storageError) {
        console.error("Erreur lors de la suppression des fichiers Storage:", storageError);
        // Continuer quand même pour mettre à jour le localStorage
      }
      
      // 3. Enfin, mettre à jour le localStorage
      try {
        const localStorageDocs = localStorage.getItem('userDocuments');
        if (localStorageDocs) {
          const parsedDocs = JSON.parse(localStorageDocs);
          const updatedDocs = parsedDocs.filter(item => item.fileId !== docToDelete.fileId);
          localStorage.setItem('userDocuments', JSON.stringify(updatedDocs));
          console.log("Document supprimé du localStorage");
        }
      } catch (localStorageError) {
        console.error("Erreur lors de la mise à jour du localStorage:", localStorageError);
        // Ce n'est pas critique, on peut continuer
      }
      
      // 4. Mettre à jour l'interface utilisateur
      setDocuments(prevDocs => prevDocs.filter(item => item.fileId !== docToDelete.fileId));
      console.log("Interface utilisateur mise à jour");
      
      // Fermer la modale
      closeDeleteConfirmation();
    } catch (error) {
      console.error("Erreur globale lors de la suppression du document:", error);
      alert(t('deleteError'));
      closeDeleteConfirmation();
    } finally {
      setDocumentsLoading(false);
    }
  };
  
  // Fonction pour retourner à la vue principale depuis la page de documents
  const handleBackToProfile = () => {
    setShowDocumentsPage(false);
    setShowSettingsPage(false);
    setShowDashboardPage(false);
  };

  // Fonction pour voir tous les documents
  const handleViewAllDocuments = () => {
    setShowDocumentsPage(true);
    setShowSettingsPage(false);
  };
  
  // Fonction pour ouvrir la page des paramètres
  const handleOpenSettings = () => {
    setShowSettingsPage(true);
    setShowDocumentsPage(false);
  };
  
  // Fonction pour gérer la notation d'un document
  const handleRateDocument = (document, rating) => {
    const updatedDocuments = documents.map(doc => {
      if (doc.fileId === document.fileId) {
        return { ...doc, rating };
      }
      return doc;
    });
    
    setDocuments(updatedDocuments);
    
    // Ici, vous pourriez implémenter la sauvegarde de la notation dans Firestore ou localStorage
    try {
      const localStorageDocs = localStorage.getItem('userDocuments');
      if (localStorageDocs) {
        const parsedDocs = JSON.parse(localStorageDocs);
        const updatedLocalDocs = parsedDocs.map(doc => {
          if (doc.fileId === document.fileId) {
            return { ...doc, rating };
          }
          return doc;
        });
        localStorage.setItem('userDocuments', JSON.stringify(updatedLocalDocs));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notation:", error);
    }
  };
  
  // Fonction pour ouvrir la modale de signalement
  const openReportModal = (doc) => {
    setDocumentToReport(doc);
    setShowReportModal(true);
  };
  
  // Fonction pour fermer la modale de signalement
  const closeReportModal = () => {
    setShowReportModal(false);
    setDocumentToReport(null);
    setReportReason('');
  };
  
  // Fonction pour soumettre un signalement
  const handleSubmitReport = () => {
    // Implémentation future: envoi du signalement à un système de gestion des problèmes
    console.log("Document signalé:", documentToReport, "Raison:", reportReason);
    alert(getText('reportSubmitted'));
    closeReportModal();
  };
  
  // Fonction pour afficher le tableau de bord
  const handleOpenDashboard = () => {
    setShowDashboardPage(true);
    setShowDocumentsPage(false);
    setShowSettingsPage(false);
  };
  
  // Si on est sur la page des paramètres
  if (showSettingsPage) {
    return (
      <div className="profile-page">
        <div className="profile-page-header">
        <div className="fixed-back-button">
        <button className="back-icon" onClick={onBack}>
            <FaArrowLeft />
        </button>
        </div>
          
          <h1 className="profile-page-title">
            {getText('settings')}
          </h1>
        </div>
        
        <div className="settings-view">
          <div className="settings-categories">
            {/* Profil utilisateur */}
            <div className="settings-category">
              <h4 className="settings-category-title">
                <FaUser className="settings-icon" /> 
                {language === 'fr' ? 'Profil utilisateur' : 'User Profile'}
              </h4>
              <div className="settings-options">
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Modifier le profil' : 'Edit Profile'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'Photo, nom, bio' : 'Photo, name, bio'}</span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Changer le mot de passe' : 'Change Password'}</span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Modifier l\'email' : 'Change Email'}</span>
                </div>
              </div>
            </div>
            
            {/* Préférences de conversion */}
            <div className="settings-category">
              <h4 className="settings-category-title">
                <FaFileAlt className="settings-icon" /> 
                {language === 'fr' ? 'Préférences de conversion' : 'Conversion Preferences'}
              </h4>
              <div className="settings-options">
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Style LaTeX par défaut' : 'Default LaTeX Style'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'Article, rapport, etc.' : 'Article, report, etc.'}</span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Format d\'exportation préféré' : 'Preferred Export Format'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'PDF, TEX, HTML' : 'PDF, TEX, HTML'}</span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Options de formatage' : 'Formatting Options'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'Police, marges, espacement' : 'Font, margins, spacing'}</span>
                </div>
              </div>
            </div>
            
            {/* Interface et apparence */}
            <div className="settings-category">
              <h4 className="settings-category-title">
                <FaGlobe className="settings-icon" /> 
                {language === 'fr' ? 'Interface et apparence' : 'Interface and Appearance'}
              </h4>
              <div className="settings-options">
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Thème' : 'Theme'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'Clair / Sombre' : 'Light / Dark'}</span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">{language === 'fr' ? 'Langue' : 'Language'}</span>
                  <span className="settings-option-description">{language === 'fr' ? 'Français / English' : 'Français / English'}</span>
                </div>
              </div>
            </div>
            
            {/* Confidentialité et sécurité */}
            <div className="settings-category">
              <h4 className="settings-category-title">
                <FaShieldAlt className="settings-icon" /> 
                {language === 'fr' ? 'Confidentialité et sécurité' : 'Privacy and Security'}
              </h4>
              <div className="settings-options">
                <div className="settings-option">
                  <span className="settings-option-label">
                    {language === 'fr' ? 'Authentification à deux facteurs' : 'Two-Factor Authentication'}
                  </span>
                  <span className="settings-option-badge disabled">
                    {language === 'fr' ? 'Désactivé' : 'Disabled'}
                  </span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">
                    {language === 'fr' ? 'Sessions actives' : 'Active Sessions'}
                  </span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">
                    {language === 'fr' ? 'Données personnelles' : 'Personal Data'}
                  </span>
                </div>
                <div className="settings-option">
                  <span className="settings-option-label">
                    {language === 'fr' ? 'Supprimer le compte' : 'Delete Account'}
                  </span>
                  <span className="settings-option-badge danger">
                    {language === 'fr' ? 'Dangereux' : 'Dangerous'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si on est sur la page des documents
  if (showDocumentsPage) {
    return (
      <div className="profile-page">
        <div className="profile-page-header">
          <button 
            className="back-button" 
            onClick={handleBackToProfile}
            aria-label={t('backToProfile')}
          >
            <FaArrowLeft />
            <span>{t('backToProfile')}</span>
          </button>
          
          <h1 className="profile-page-title">
            {t('myDocuments')}
          </h1>
        </div>

        {/* Modale de confirmation de suppression */}
        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="delete-modal-header">
                <FaExclamationTriangle className="delete-icon" />
                <h3>{t('confirmDeleteTitle')}</h3>
              </div>
              <div className="delete-modal-body">
                <p>{t('confirmDelete')}</p>
                {documentToDelete && (
                  <div className="document-to-delete">
                    <strong>{documentToDelete.title}</strong>
                  </div>
                )}
              </div>
              <div className="delete-modal-footer">
                <button 
                  className="cancel-button" 
                  onClick={closeDeleteConfirmation}
                >
                  {t('cancel')}
                </button>
                <button 
                  className="confirm-delete-button" 
                  onClick={handleDeleteDocument}
                >
                  {t('confirmDeleteButton')}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modale de signalement de problème */}
        {showReportModal && (
          <div className="delete-modal-overlay">
            <div className="report-modal">
              <div className="report-modal-header">
                <FaFlag className="report-icon" />
                <h3>{getText('reportIssue')}</h3>
              </div>
              <div className="report-modal-body">
                <p>{getText('reportDescription')}</p>
                {documentToReport && (
                  <div className="document-to-report">
                    <strong>{documentToReport.title}</strong>
                  </div>
                )}
                <textarea 
                  className="report-textarea"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder={getText('describeProblem')}
                  rows={4}
                ></textarea>
              </div>
              <div className="report-modal-footer">
                <button 
                  className="cancel-button" 
                  onClick={closeReportModal}
                >
                  {t('cancel')}
                </button>
                <button 
                  className="confirm-report-button" 
                  onClick={handleSubmitReport}
                  disabled={!reportReason.trim()}
                >
                  {getText('submit')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="documents-view">
          {documentsLoading ? (
            <div className="documents-loading">
              <div className="documents-loading-spinner"></div>
              <p>{t('loadingDocuments')}</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="no-documents-container">
              <FaFileAlt className="no-documents-icon large" />
              <p>{t('noDocumentsYet')}</p>
            </div>
          ) : (
            <>
              {/* Contrôles de recherche et filtrage */}
              <div className="documents-controls">
                <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder={t('searchDocuments')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
                
                <div className="filter-container">
                  <FaFilter className="filter-icon" />
                  <select 
                    className="filter-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">{t('allDocuments')}</option>
                    <option value="slides">{t('slidesOnly')}</option>
                    <option value="document">{t('textDocumentsOnly')}</option>
                  </select>
                </div>
              </div>
              
              {filteredDocuments.length === 0 ? (
                <div className="no-documents">
                  <FaFileAlt className="no-documents-icon" />
                  <p>{t('noDocumentsFound')}</p>
                </div>
              ) : (
                <div className="documents-list">
                  {filteredDocuments.map((doc, index) => (
                    <div key={doc.id || index} className="document-card">
                      <div className="document-icon">
                        {doc.docType === 'slides' ? <FaFileAlt /> : <FaFileCode />}
                      </div>
                      <div className="document-info">
                        <h4 className="document-title">{doc.title}</h4>
                        <div className="document-details">
                          <span className="document-date">{formatDate(doc.createdAt)}</span>
                          <span className="document-pages">{doc.pages} {doc.pages === 1 ? t('page') : t('pages')}</span>
                          <span className="document-type">{doc.docType === 'slides' ? t('slides') : t('textDocument')}</span>
                        </div>
                        
                        {/* Système de notation */}
                        <div className="document-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star} 
                              className="rating-star" 
                              onClick={() => handleRateDocument(doc, star)}
                              aria-label={`Rate ${star} stars`}
                            >
                              {star <= (doc.rating || 0) ? (
                                <FaStar className="star-filled" />
                              ) : (
                                <FaRegStar className="star-empty" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="document-actions">
                        <button 
                          className="document-action view"
                          onClick={() => handleOpenDocument(doc)}
                          data-tooltip={t('viewPDF')}
                        >
                          <FaFilePdf />
                          <span className="action-label">PDF</span>
                        </button>
                        <button 
                          className="document-action download"
                          onClick={() => handleDownloadDocument(doc)}
                          data-tooltip={t('downloadTex')}
                        >
                          <FaCode />
                          <span className="action-label">TEX</span>
                        </button>
                        <button 
                          className="document-action report"
                          onClick={() => openReportModal(doc)}
                          data-tooltip={getText('reportIssue')}
                        >
                          <FaFlag />
                          <span className="action-label">{getText('reportAction')}</span>
                        </button>
                        <button 
                          className="document-action delete"
                          onClick={() => openDeleteConfirmation(doc)}
                          data-tooltip={t('deleteDocument')}
                        >
                          <FaTrashAlt />
                          <span className="action-label">{t('delete')}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Si on est sur la page du tableau de bord
  if (showDashboardPage) {
    return (
      <div className="profile-page">
        <div className="profile-page-header">
          <button 
            className="back-button" 
            onClick={handleBackToProfile}
            aria-label={t('backToProfile')}
          >
            <FaArrowLeft />
            <span>{t('backToProfile')}</span>
          </button>
          
          <h1 className="profile-page-title">
            {t('dashboard')}
          </h1>
        </div>
        
        {/* Page complète du tableau de bord */}
        <Dashboard userData={userData} documents={documents} />
      </div>
    );
  }

  // Vue principale du profil
  return (
    <div className="profile-page">
      <div className="profile-page-header">
      <div className="fixed-back-button">
        <button className="back-icon" onClick={onBack}>
            <FaArrowLeft />
        </button>
        </div>
        
        <h1 className="profile-page-title">
          {t('myProfile')}
        </h1>
      </div>
      
      {loading ? (
        <div className="profile-loading">
          <div className="profile-loading-spinner"></div>
          <p>{t('loadingProfile')}</p>
        </div>
      ) : error ? (
        <div className="profile-error">
          <p>Une erreur est survenue lors du chargement de votre profil.</p>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
      ) : (
        <div className="profile-sections">
          <ProfileOverview userData={userData} />
          
          {/* Ajout du composant UserStatsCard */}
          <UserStatsCard documents={documents} />
          
          {/* Carte cliquable pour le tableau de bord */}
          <div className="profile-section-placeholder dashboard-card" onClick={handleOpenDashboard}>
            <div className="section-header">
              <h3>{t('dashboard')}</h3>
              <FaChartLine className="dashboard-header-icon" />
            </div>
            <p>{language === 'fr' ? 'Consultez vos statistiques et analyses' : 'View your statistics and analytics'}</p>
          </div>
          
          {/* Section pour les documents - transformée en carte cliquable */}
          <div className="profile-section-placeholder documents-card" onClick={handleViewAllDocuments}>
            <div className="section-header">
              <h3>{t('myDocuments')}</h3>
              {!documentsLoading && documents.length > 0 && (
                <span className="document-badge">{documents.length}</span>
              )}
            </div>
            <p>{documentsLoading ? t('loadingDocuments') : documents.length === 0 ? t('noDocumentsYet') : t('viewDocumentsDesc')}</p>
          </div>
          
          {/* Section pour les paramètres - transformée en carte cliquable */}
          <div className="profile-section-placeholder settings-card" onClick={handleOpenSettings}>
            <div className="section-header">
              <h3>{getText('settings')}</h3>
              <FaCog className="settings-header-icon" />
            </div>
            <p>{getText('settingsDescription')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 