import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FaUpload, FaDownload, FaMagic, FaCheck, FaRocket, FaGithub, FaFileAlt, FaCog, FaUsers, FaArrowDown, FaCrown, FaSpinner, FaChevronDown, FaChevronUp, FaBolt, FaChartBar, FaClock, FaLightbulb, FaPaperPlane,
  FaSync, FaGraduationCap, FaStar, FaGlobe, FaBrain,
  FaLock, FaTimes, FaGoogle, FaExclamationTriangle, FaMobileAlt,
  FaArrowRight, FaArrowLeft, FaChevronRight, FaShieldAlt, FaTwitter, FaLinkedin, FaInstagram, FaEdit, FaDiscord,
  FaUserGraduate, FaUniversity, FaSearch, FaAward, FaMoneyBillWave
} from 'react-icons/fa';
import { ChevronDownIcon } from './ui/chevron-down';
import { SunMediumIcon } from './ui/sun-medium';
import { MoonIcon } from './ui/moon';
import { useNavigate } from 'react-router-dom';
// Firebase imports
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc as firestoreDoc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc,
  serverTimestamp,
  deleteDoc,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { auth } from '../firebase/init';
import StudentSolution from './StudentSolution';
import TeacherSolution from './TeacherSolution';
import ResearcherSolution from './ResearcherSolution';
import InstitutionSolution from './InstitutionSolution';
import { useAuth } from '../contexts/AuthContext';
import { useBetaAccess } from '../hooks/useBetaAccess';

// Initialize Firestore
const db = getFirestore();

// Simple Firestore access check function
const checkFirestoreAccess = async () => {
  try {
    // Try to read from a test collection
    const testRef = firestoreDoc(db, 'test', 'test');
    await getDoc(testRef);
    return { success: true };
  } catch (error) {
    console.error('Firestore access check failed:', error);
    return { success: false, error: error.message };
  }
};

// First, add the CSS for the blinking green dot to the betaStyle constant
const betaStyle = `
  .beta-badge {
    font-size: 9px;
    background-color: #5A54F9;
    color: white;
    border-radius: 3px;
    padding: 2px 4px;
    margin-left: 5px;
    font-weight: bold;
    letter-spacing: 0.5px;
    vertical-align: top;
    display: inline-block;
    animation: blink 2s infinite;
  }
  
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #2ecc71;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
    50% { opacity: 0.8; }
    70% { box-shadow: 0 0 0 6px rgba(46, 204, 113, 0); }
    100% { opacity: 1; box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
  }
  
  .username-link {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .username-link:hover {
    color: #5A54F9;
    background-color: rgba(90, 84, 249, 0.05);
  }
`;

// Add this after the betaStyle definition, before the LandingPage component definition
const styleElement = document.createElement('style');
styleElement.textContent = betaStyle;
document.head.appendChild(styleElement);

export default function LandingPage({ onGetStarted, onShowPreview }) {
  const { t, language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const [docCount, setDocCount] = useState(500);
  const [activeBillingPeriod, setActiveBillingPeriod] = useState('monthly'); // Nouvel état pour suivre le mode d'affichage des prix
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [tempUserData, setTempUserData] = useState(null);
  const [firestoreAccessible, setFirestoreAccessible] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showPreview, setShowPreview] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showStudentSolution, setShowStudentSolution] = useState(false);
  const [showTeacherSolution, setShowTeacherSolution] = useState(false);
  const [showResearcherSolution, setShowResearcherSolution] = useState(false);
  const [showInstitutionSolution, setShowInstitutionSolution] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const { accessApp } = useBetaAccess();
  
  // Animation au scroll simplifiée - tout est visible par défaut
  useEffect(() => {
    // Simuler le compteur de documents qui augmente
    const interval = setInterval(() => {
      setDocCount(prevCount => {
        if (prevCount >= 500) {
          clearInterval(interval);
          return 500;
        }
        // Incrémenter de 1 à 2 documents à la fois pour une animation très lente
        return prevCount + Math.floor(Math.random() * 2) + 1;
      });
    }, 200); // Intervalle de 200ms pour une animation très lente
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Gérer la fermeture du menu déroulant quand on clique ailleurs sur la page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSolutionsMenu && !event.target.closest('.nav-dropdown')) {
        setShowSolutionsMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSolutionsMenu]);

  // Gestion automatique de la redirection après connexion via les modals
  useEffect(() => {
    console.log('📊 LandingPage useEffect - Auth state:', {
      isLoggedIn,
      showLoginModal,
      currentUser: currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
      showRegistrationForm,
      loading,
      timestamp: new Date().toISOString()
    });

    // Si l'utilisateur vient de se connecter via les modals (isLoggedIn mais modal fermé)
    // et que le contexte d'authentification est maintenant à jour, rediriger vers l'app
    if (isLoggedIn && !showLoginModal && currentUser && !showRegistrationForm && !loading) {
      console.log("🎯 User authenticated via landing page, triggering app access");
      // Petite pause pour s'assurer que tout est bien initialisé
      setTimeout(() => {
        accessApp();
      }, 1000);
    }
  }, [isLoggedIn, showLoginModal, currentUser, showRegistrationForm, loading, accessApp]);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    // Observer for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        
        // If the user has their email in localStorage, they chose "remember me"
        if (localStorage.getItem('userEmail') === currentUser.email) {
          localStorage.setItem('isLoggedIn', 'true');
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Vérifier l'accès à Firestore au chargement
  useEffect(() => {
    const verifyFirestoreAccess = async () => {
      const accessResult = await checkFirestoreAccess();
      console.log("Firestore access check result:", accessResult);
      
      if (!accessResult.success) {
        setFirestoreAccessible(false);
        console.warn("Firestore access issue detected, fallback to localStorage will be used", accessResult);
      }
    };
    
    verifyFirestoreAccess();
  }, []);

  // Fonction qui gère l'ouverture du modal de connexion
  const handleLoginButtonClick = () => {
    // Si l'utilisateur est déjà connecté, rediriger vers l'app
    if (isLoggedIn) {
      accessApp();
      return;
    }
    
    // Si l'utilisateur n'est pas connecté, ouvrir le modal de connexion
    setShowLoginModal(true);
  };

  // Fermer le modal en appuyant sur Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showLoginModal) {
          setShowLoginModal(false);
        }
        if (selectedFeature) {
          setSelectedFeature(null);
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showLoginModal, selectedFeature]);

  // Empêcher le scroll du body quand un modal est ouvert
  useEffect(() => {
    if (showLoginModal || selectedFeature) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLoginModal, selectedFeature]);
  
  // Contenu localisé
  const content = {
    fr: {
      titleMain: "Plus de clarté,",
      titleHighlight: "plus d'efficacité",
      subtitle: "Transformez vos slides en documents LaTeX structurés en quelques clics grâce à notre IA avancée.",
      ctaButton: "Essayez gratuitement",
      featuresTitle: "Pourquoi choisir MyTekX ?",
      // Navigation
      solutions: "Solutions",
      pricing: "Tarifs",
      affiliation: "Programme d'affiliation",
      login: "Connexion",
      // Menu Solutions
      solutionsMenu: [
        { 
          label: "Pour les étudiants", 
          onClick: () => setShowStudentSolution(true), 
          icon: <FaUserGraduate /> 
        },
        { 
          label: "Pour les enseignants", 
          onClick: () => setShowTeacherSolution(true), 
          icon: <FaUniversity /> 
        },
        { 
          label: "Pour les chercheurs", 
          onClick: () => setShowResearcherSolution(true), 
          icon: <FaSearch /> 
        },
        { 
          label: "Pour les institutions", 
          onClick: () => setShowInstitutionSolution(true), 
          icon: <FaAward /> 
        }
      ],
      features: [
        {
          emoji: "✨",
          title: "IA de synthèse avancée",
          description: "Notre intelligence artificielle détecte intuitions, définitions, preuves et récapitulatifs clés pour créer des documents parfaitement structurés."
        },
        {
          emoji: "🔍",
          title: "Analyse visuelle intelligente",
          description: "Reconnaissance automatique des graphes, tableaux, schémas et code source avec conversion en formats éditables."
        },
        {
          emoji: "📄",
          title: "Export multi-formats",
          description: "Générez des documents LaTeX ou PDF professionnels qui respectent les normes académiques et sont prêts à l'utilisation."
        },
        {
          emoji: "🌐",
          title: "Support multilingue",
          description: "Compréhension et traitement de documents en français, anglais et de nombreuses autres langues avec une précision remarquable."
        },
        {
          emoji: "📝",
          title: "Modèles personnalisables",
          description: "Accédez à une bibliothèque de modèles académiques et créez vos propres templates pour maintenir une cohérence dans vos documents."
        },
        {
          emoji: "👥",
          title: "Collaboration en temps réel",
          description: "Partagez vos documents, collaborez avec vos pairs et recevez des commentaires directement dans l'interface."
        }
      ],
      howItWorks: "Comment ça marche ?",
      steps: [
        {
          icon: <FaRocket />,
          title: "1. Importez votre document",
          description: "Téléchargez simplement vos slides ou documents en format PDF."
        },
        {
          icon: <FaSearch />,
          title: "2. Notre IA analyse le contenu",
          description: "Notre intelligence artificielle identifie la structure, les concepts clés et les éléments importants."
        },
        {
          icon: <FaMagic />,
          title: "3. MyTekX synthétise l'information",
          description: "Génération automatique d'un document structuré avec tous les éléments essentiels."
        },
        {
          icon: <FaCheck />,
          title: "4. Téléchargez votre synthèse",
          description: "Votre document est prêt à être utilisé, en format LaTeX ou PDF selon vos besoins."
        }
      ],
      demoTitle: "Voyez la transformation",
      demoSubtitle: "Découvrez comment MyTekX transforme des slides complexes en documents structurés et clairs",
      beforeLabel: "Avant: Slides PowerPoint",
      afterLabel: "Après: Document LaTeX",
      testimonialsTitle: "Ce que nos utilisateurs disent",
      testimonials: [
        {
          name: "Sophie Martin",
          role: "Étudiante en Master de Mathématiques",
          image: "https://randomuser.me/api/portraits/women/32.jpg",
          text: "MyTekX a révolutionné ma façon de prendre des notes. J'ai gagné des heures de travail sur mes cours avancés d'algèbre."
        },
        {
          name: "Thomas Dubois",
          role: "Professeur en Informatique",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          text: "J'utilise MyTekX pour transformer mes supports de cours en polycopiés pour mes étudiants. La qualité est remarquable."
        },
        {
          name: "Emma Bernard",
          role: "Doctorante en Physique",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          text: "La précision avec laquelle MytekX traite les équations complexes est bluffante. Un outil indispensable pour ma recherche."
        }
      ],
      docCounter: "documents transformés... et ce n'est que le début !",
      footer: "Révolutionnez vos documents académiques",
      startNow: "Commencer maintenant",
      faqTitle: "Questions fréquentes",
      faqItems: [
        {
          question: "Quels formats de fichiers sont supportés ?",
          answer: "Pour l'instant, MyTekX ne prend en charge que les documents PDF, mais nous travaillons pour ajouter d'autres formats dans le futur (PowerPoint, images, etc.)"
        },
        {
          question: "Est-ce que MyTekX préserve les formules mathématiques ?",
          answer: "Absolument ! MyTekX excelle particulièrement dans la reconnaissance et la conversion fidèle des équations mathématiques complexes en format LaTeX."
        },
        {
          question: "Combien de temps faut-il pour traiter un document ?",
          answer: "Le temps varie selon la complexité et la longueur du document, mais en moyenne, un support de cours de 30 slides est traité en 7-11 minutes."
        },
        {
          question: "Est-ce que je peux modifier le résultat final ?",
          answer: "Oui, vous recevez le code LaTeX source que vous pouvez modifier à votre guise, ainsi que le PDF généré."
        }
      ]
    },
    en: {
      titleMain: "More clarity,",
      titleHighlight: "more efficiency",
      subtitle: "Transform your slides into structured LaTeX documents in a few clicks with our advanced AI.",
      ctaButton: "Try for free",
      featuresTitle: "Why choose MyTekX",
      // Navigation
      solutions: "Solutions",
      pricing: "Pricing",
      affiliation: "Ambassador Program",
      login: "Log in",
      // Menu Solutions
      solutionsMenu: [
        { 
          label: "For students", 
          onClick: () => setShowStudentSolution(true), 
          icon: <FaUserGraduate /> 
        },
        { 
          label: "For teachers", 
          onClick: () => setShowTeacherSolution(true), 
          icon: <FaUniversity /> 
        },
        { 
          label: "For researchers", 
          onClick: () => setShowResearcherSolution(true), 
          icon: <FaSearch /> 
        },
        { 
          label: "For institutions", 
          onClick: () => setShowInstitutionSolution(true), 
          icon: <FaAward /> 
        }
      ],
      features: [
        {
          emoji: "✨",
          title: "Advanced AI Synthesis",
          description: "Our artificial intelligence detects intuitions, definitions, proofs, and key summaries to create perfectly structured documents."
        },
        {
          emoji: "🔍",
          title: "Intelligent Visual Analysis",
          description: "Automatic recognition of graphs, tables, diagrams, and source code with conversion to editable formats."
        },
        {
          emoji: "📄",
          title: "Multi-format Export",
          description: "Generate professional LaTeX or PDF documents that adhere to academic standards and are ready for use."
        },
        {
          emoji: "🌐",
          title: "Multilingual Support",
          description: "Understanding and processing documents in French, English and many other languages with remarkable accuracy."
        },
        {
          emoji: "📝",
          title: "Customizable Templates",
          description: "Access a library of academic templates and create your own to maintain consistency across your documents."
        },
        {
          emoji: "👥",
          title: "Real-time Collaboration",
          description: "Share your documents, collaborate with peers, and receive feedback directly within the interface."
        }
      ],
      howItWorks: "How it works",
      steps: [
        {
          icon: <FaRocket />,
          title: "1. Upload your document",
          description: "Simply upload your slides or documents in PDF format."
        },
        {
          icon: <FaSearch />,
          title: "2. Our AI analyzes the content",
          description: "Our artificial intelligence identifies the structure, key concepts, and important elements."
        },
        {
          icon: <FaMagic />,
          title: "3. MyTekX synthesizes the information",
          description: "Automatic generation of a structured document with all essential elements."
        },
        {
          icon: <FaCheck />,
          title: "4. Download your synthesis",
          description: "Your document is ready to use, in LaTeX, or PDF format depending on your needs."
        }
      ],
      demoTitle: "See the transformation",
      demoSubtitle: "Discover how MyTekX transforms complex slides into structured and clear documents",
      beforeLabel: "Before: PowerPoint Slides",
      afterLabel: "After: LaTeX Document",
      testimonialsTitle: "What our users say",
      testimonials: [
        {
          name: "Sophie Martin",
          role: "Mathematics Master's Student",
          image: "https://randomuser.me/api/portraits/women/32.jpg",
          text: "MyTekX has revolutionized my note-taking. I've saved hours of work on my advanced algebra courses."
        },
        {
          name: "Thomas Dubois",
          role: "Computer Science Professor",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          text: "I use MyTekX to transform my course materials into handouts for my students. The quality is remarkable."
        },
        {
          name: "Emma Bernard",
          role: "Physics PhD Candidate",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          text: "The precision with which MyTekX processes complex equations is mind-blowing. An essential tool for my research."
        }
      ],
      docCounter: "documents transformed... and this is just the beginning!",
      footer: "Revolutionize your academic documents",
      startNow: "Start now",
      faqTitle: "Frequently Asked Questions",
      faqItems: [
        {
          question: "What file formats are supported?",
          answer: "For now, MyTekX only supports PDF documents, but we are working to add other formats in the future (PowerPoint, images, etc.)"
        },
        {
          question: "Does MyTekX preserve mathematical formulas?",
          answer: "Absolutely! MyTekX excels particularly in recognizing and faithfully converting complex mathematical equations to LaTeX format."
        },
        {
          question: "How long does it take to process a document?",
          answer: "The time varies depending on the complexity and length of the document, but on average, a 30-slide course material is processed in 7-11 minutes."
        },
        {
          question: "Can I modify the final result?",
          answer: "Yes, you receive the source LaTeX code that you can modify as you wish, as well as the generated PDF."
        }
      ],
      affiliationTagline: "Recommend MyTekX, earn money.",
      affiliationDescription: "Our affiliate program lets you earn attractive commissions for each new subscription you bring us. Receive up to 30% of the amount of each sponsored subscription throughout its lifetime.",
      benefitCommission: "Monthly recurring commissions",
      benefitTracking: "Real-time conversion tracking",
      benefitMaterial: "Promotional materials provided",
      affiliationSignupTitle: "Be the first to know",
      affiliationSignupSubtitle: "Our affiliate program will be launched soon. Sign up to be among the first to benefit from it.",
      affiliationButton: "Notify me",
      affiliationStats: "Already 12 people registered",
      affiliationLaunch: "Launch planned for June 2025",
    }
  };
  
  // Sélectionner le contenu en fonction de la langue actuelle
  const { titleMain, titleHighlight, subtitle, ctaButton, featuresTitle, features,
          howItWorks, steps, demoTitle, demoSubtitle, beforeLabel, afterLabel, 
          testimonialsTitle, testimonials, docCounter, footer, solutions, pricing,
          affiliation, login, startNow, faqTitle, faqItems, solutionsMenu } = 
    content[language] || content.fr;
    
  // Variables additionnelles pour la section d'affiliation
  const affiliationTagline = language === 'fr' ? "Recommandez MyTekX, gagnez de l'argent." : content.en.affiliationTagline;
  const affiliationDescription = language === 'fr' ? 
    `Notre programme d'affiliation vous permet de gagner des commissions attractives pour chaque nouvel abonnement que vous nous amenez. Recevez jusqu'à <span className="highlight">30% du montant</span> de chaque abonnement parrainé pendant toute sa durée de vie.` 
    : `Our affiliate program lets you earn attractive commissions for each new subscription you bring us. Receive up to <span class="highlight">30% of the amount</span> of each sponsored subscription throughout its lifetime.`;
  const benefitCommission = language === 'fr' ? "Commissions récurrentes mensuelles" : content.en.benefitCommission;
  const benefitTracking = language === 'fr' ? "Suivi en temps réel des conversions" : content.en.benefitTracking;
  const benefitMaterial = language === 'fr' ? "Matériel promotionnel fourni" : content.en.benefitMaterial;
  const affiliationSignupTitle = language === 'fr' ? "Soyez les premiers informés" : content.en.affiliationSignupTitle;
  const affiliationSignupSubtitle = language === 'fr' ? 
    "Notre programme d'affiliation sera lancé prochainement. Inscrivez-vous pour être parmi les premiers à en profiter." 
    : content.en.affiliationSignupSubtitle;
  const affiliationStats = language === 'fr' ? "Déjà 12 personnes inscrites" : content.en.affiliationStats;
  const affiliationLaunch = language === 'fr' ? "Lancement prévu pour juin 2025" : content.en.affiliationLaunch;

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleLogin = async () => {
    // Vérifier les entrées
    if (!loginEmail || !loginPassword) {
      setLoginError(true);
      setLoginErrorMessage(language === 'fr' 
        ? "Veuillez entrer votre email et mot de passe." 
        : "Please enter your email and password.");
      return;
    }
    
    try {
      setIsLoading(true);
      setLoginError(false);
      
      // Se connecter avec Firebase
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      
      // Vérifier si les données utilisateur existent déjà dans Firestore
      const userRef = firestoreDoc(getFirestore(), "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        // Mettre à jour la date de dernière connexion
        await updateDoc(userRef, { 
          lastLogin: serverTimestamp() 
        });
      } else {
        // Créer un profil minimal s'il n'existe pas encore
        await setDoc(userRef, {
          displayName: userCredential.user.displayName || '',
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isActivated: true,
          isBetaTester: true
        });
      }
      
      // Compléter la connexion
      completeSignIn(userCredential.user);
      
      // Réinitialiser le formulaire
      setLoginEmail('');
      setLoginPassword('');
      
    } catch (error) {
      console.error("Error signing in:", error);
      
      setLoginError(true);
      
      switch(error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setLoginErrorMessage(language === 'fr'
            ? "Email ou mot de passe incorrect."
            : "Incorrect email or password.");
          break;
        case 'auth/user-disabled':
          setLoginErrorMessage(language === 'fr'
            ? "Ce compte a été désactivé. Contactez le support."
            : "This account has been disabled. Please contact support.");
          break;
        case 'auth/too-many-requests':
          setLoginErrorMessage(language === 'fr'
            ? "Trop de tentatives de connexion. Veuillez réessayer plus tard."
            : "Too many sign-in attempts. Please try again later.");
          break;
        default:
          setLoginErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    // Vérifier les entrées
    if (!loginEmail || !loginPassword) {
      setLoginError(true);
      setLoginErrorMessage(language === 'fr' 
        ? "Veuillez entrer votre email et mot de passe." 
        : "Please enter your email and password.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Créer l'utilisateur
      const result = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      
      // Stocker temporairement les données de l'utilisateur
      setTempUserData(result.user);
      
      // Fermer le modal de connexion et afficher le formulaire d'inscription
      setShowLoginModal(false);
      setShowRegistrationForm(true);
      
      // Réinitialiser le formulaire
      setLoginEmail('');
      setLoginPassword('');
      setLoginError(false);
      
    } catch (error) {
      console.error("Error signing up:", error);
      
      setLoginError(true);
      
      switch(error.code) {
        case 'auth/email-already-in-use':
          setLoginErrorMessage(language === 'fr'
            ? "Cette adresse email est déjà utilisée par un autre compte."
            : "This email address is already in use.");
          break;
        case 'auth/invalid-email':
          setLoginErrorMessage(language === 'fr'
            ? "L'adresse email n'est pas valide."
            : "The email address is not valid.");
          break;
        case 'auth/weak-password':
          setLoginErrorMessage(language === 'fr'
            ? "Le mot de passe est trop faible. Utilisez au moins 6 caractères."
            : "The password is too weak. Use at least 6 characters.");
          break;
        default:
          setLoginErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
      
      // Récupérer l'ID utilisateur avant de nettoyer le localStorage
      const userId = auth.currentUser?.uid;
      const userEmail = auth.currentUser?.email || localStorage.getItem('userEmail');
      
      // Nettoyer les données de connexion
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('displayName');
      localStorage.removeItem('userProfileData');
      
      // Nettoyer les documents de l'utilisateur tout en préservant ceux des autres
      try {
        const storedDocs = localStorage.getItem('userDocuments');
        if (storedDocs) {
          const parsedDocs = JSON.parse(storedDocs);
          // Filtrer pour conserver uniquement les documents qui n'appartiennent PAS à l'utilisateur déconnecté
          const otherUserDocs = parsedDocs.filter(doc => 
            (doc.userEmail !== userEmail) && 
            (doc.userId !== userId)
          );
          
          // Sauvegarder les documents restants
          localStorage.setItem('userDocuments', JSON.stringify(otherUserDocs));
          console.log("Documents from current user removed from localStorage during logout");
        }
      } catch (docsError) {
        console.error("Error cleaning user documents from localStorage:", docsError);
      }
      
      // Nous conservons hasBetaAccess pour que l'utilisateur n'ait pas à resaisir le code beta
      localStorage.removeItem('hasBetaAccess');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Vérifier si c'est un nouvel utilisateur
      const isNewUser = result._tokenResponse?.isNewUser;
      
      if (isNewUser) {
        // Stocker temporairement les données utilisateur
        setTempUserData(result.user);
        
        // Afficher le formulaire d'inscription
        setShowRegistrationForm(true);
      } else {
        // Vérifier si les données utilisateur existent déjà dans Firestore
        const userRef = firestoreDoc(getFirestore(), "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // Si l'utilisateur existe dans Firebase Auth mais pas dans Firestore,
          // créer un document utilisateur minimal
          await setDoc(userRef, {
            displayName: result.user.displayName || '',
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isActivated: true,
            isBetaTester: true
          });
        } else {
          // Mettre à jour la date de dernière connexion
          await updateDoc(userRef, { lastLogin: serverTimestamp() });
        }
        
        // Compléter la connexion
        completeSignIn(result.user);
      }
    } catch (error) {
      console.error("Error with Google Sign In:", error);
      
      let errorMessage = '';
      switch(error.code) {
        case 'auth/cancelled-popup-request':
        case 'auth/popup-closed-by-user':
          // L'utilisateur a fermé la popup, pas besoin d'afficher une erreur
          break;
        default:
          errorMessage = language === 'fr'
            ? "Une erreur est survenue lors de la connexion avec Google."
            : "An error occurred during Google sign in.";
          setLoginError(true);
          setLoginErrorMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Vérifier si c'est un nouvel utilisateur
      const isNewUser = result._tokenResponse?.isNewUser;
      
      if (isNewUser) {
        // Stocker temporairement les données utilisateur
        setTempUserData(result.user);
        
        // Afficher le formulaire d'inscription
        setShowRegistrationForm(true);
      } else {
        // Vérifier si les données utilisateur existent déjà dans Firestore
        const userRef = firestoreDoc(getFirestore(), "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // Si l'utilisateur existe dans Firebase Auth mais pas dans Firestore,
          // créer un document utilisateur minimal
          await setDoc(userRef, {
            displayName: result.user.displayName || '',
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isActivated: true,
            isBetaTester: true
          });
        } else {
          // Mettre à jour la date de dernière connexion
          await updateDoc(userRef, { lastLogin: serverTimestamp() });
        }
        
        // Compléter la connexion
        completeSignIn(result.user);
      }
    } catch (error) {
      console.error("Error with GitHub Sign In:", error);
      
      let errorMessage = '';
      switch(error.code) {
        case 'auth/cancelled-popup-request':
        case 'auth/popup-closed-by-user':
          // L'utilisateur a fermé la popup, pas besoin d'afficher une erreur
          break;
        default:
          errorMessage = language === 'fr'
            ? "Une erreur est survenue lors de la connexion avec GitHub."
            : "An error occurred during GitHub sign in.";
          setLoginError(true);
          setLoginErrorMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setLoginError(true);
      setLoginErrorMessage(language === 'fr'
        ? "Veuillez saisir une adresse email valide."
        : "Please enter a valid email address.");
      return;
    }
    
    try {
      setIsLoading(true);
      setLoginError(false);
      
      await sendPasswordResetEmail(auth, resetEmail);
      setResetEmailSent(true);
      
    } catch (error) {
      setLoginError(true);
      // Handle specific errors
      switch (error.code) {
        case 'auth/user-not-found':
          setLoginErrorMessage(language === 'fr'
            ? "Aucun compte trouvé avec cette adresse email."
            : "No account found with this email address.");
          break;
        default:
          setLoginErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCtaClick = () => {
    // Si déjà connecté, rediriger vers l'app
    if (isLoggedIn) {
      window.location.href = 'https://app.mytekx.io';
      return;
    }
    
    // Sinon, ouvrir le modal de connexion
    handleLoginButtonClick();
  };

  // Fonction handleProfileClick supprimée - la page profile n'existe plus

  // Fonction pour compléter l'inscription après avoir rempli le formulaire
  const handleRegistrationComplete = async (profileData) => {
    // Ajout de logs de débogage
    console.log("Registration data received:", profileData);
    console.log("Temp user data:", tempUserData);
    
    if (!tempUserData) {
      console.error("Erreur: Aucune donnée utilisateur temporaire disponible");
      alert(language === 'fr' 
        ? "Erreur: Aucune donnée utilisateur temporaire disponible. Veuillez vous reconnecter." 
        : "Error: No temporary user data available. Please sign in again.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Validation améliorée des données
      const validationErrors = {};
      
      if (!profileData.displayName || profileData.displayName.trim() === '') {
        validationErrors.displayName = language === 'fr' 
          ? "Le nom d'utilisateur est requis" 
          : "Display name is required";
      }
      
      if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
        validationErrors.email = language === 'fr' 
          ? "Format d'email invalide" 
          : "Invalid email format";
      }
      
      // Vérifier si des erreurs de validation ont été trouvées
      if (Object.keys(validationErrors).length > 0) {
        console.warn("Validation errors:", validationErrors);
        const errorMessage = Object.values(validationErrors).join("\n");
        alert(errorMessage);
        setIsLoading(false);
        return;
      }
      
      // Structure de données commune pour localStorage et Firestore
      const now = new Date();
      const commonData = {
        displayName: profileData.displayName.trim(),
        email: tempUserData.email,
        photoURL: tempUserData.photoURL || null,
        occupation: profileData.occupation || "",
        organization: profileData.organization || null,
        fieldOfStudy: profileData.fieldOfStudy || null,
        country: profileData.country || "",
        bio: profileData.bio || null,
        isActivated: true,
        isBetaTester: true
      };
      
      // Version spécifique pour localStorage avec dates ISO
      const localStorageData = {
        ...commonData,
        createdAt: now.toISOString(),
        lastLogin: now.toISOString(),
        uid: tempUserData.uid // Stocker l'ID pour référence
      };
      
      // Version spécifique pour Firestore avec serverTimestamp
      const firestoreData = {
        ...commonData,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };
      
      // ÉTAPE 1: Sauvegarder dans localStorage pour un accès immédiat
      console.log("Saving user data to localStorage for instant access");
      localStorage.setItem('userProfileData', JSON.stringify(localStorageData));
      localStorage.setItem('userEmail', tempUserData.email);
      localStorage.setItem('displayName', profileData.displayName);
      localStorage.setItem('hasBetaAccess', 'true');
      
      // ÉTAPE 2: Mettre à jour l'interface utilisateur immédiatement
      setUser({
        ...tempUserData,
        displayName: profileData.displayName
      });
      
      setIsLoggedIn(true);
      setHasBetaAccess(true);
      
      // ÉTAPE 3: Rediriger immédiatement vers l'application
      console.log("Redirecting to main application immediately");
      setShowRegistrationForm(false);
      onGetStarted();
      
      // ÉTAPE 5: Tentative d'enregistrement dans Firestore en arrière-plan
      try {
        console.log("Tentative directe d'écriture dans Firestore...");
        
        // Données très basiques pour test initial
        const basicData = {
          displayName: profileData.displayName,
          email: tempUserData.email,
          createdAt: new Date().toISOString(),
          testField: "Test direct write"
        };
        
        try {
          // Écrire directement sans vérification préalable
          const userRef = firestoreDoc(getFirestore(), "users", tempUserData.uid);
          console.log("Tentative d'écriture sur: users/" + tempUserData.uid);
          
          await setDoc(userRef, basicData);
          console.log("SUCCÈS: Écriture directe réussie!");
          
          // Écrire les données complètes ensuite
          await setDoc(userRef, {
            displayName: profileData.displayName.trim(),
            email: tempUserData.email,
            photoURL: tempUserData.photoURL || null,
            occupation: profileData.occupation || "",
            organization: profileData.organization || null,
            fieldOfStudy: profileData.fieldOfStudy || null,
            country: profileData.country || "",
            bio: profileData.bio || null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            isActivated: true,
            isBetaTester: true
          }, { merge: true });
          
          console.log("User data saved successfully to Firestore!");
        } catch (directWriteError) {
          console.error("Erreur d'écriture directe:", directWriteError);
          
          // Si l'erreur est une erreur de permissions, suggérer les règles
          if (directWriteError.code === 'permission-denied') {
            console.error("ERREUR CRITIQUE: Permission refusée lors de l'écriture. Vérifiez les règles de sécurité Firestore.");
            console.log("Utilisez ces règles:");
            console.log(`
              rules_version = '2';
              service cloud.firestore {
                match /databases/{database}/documents {
                  match /{document=**} {
                    allow read, write: if true;  // TEMPORAIRE: À ne pas utiliser en production!
                  }
                }
              }
            `);
          }
          
          // Essayer la méthode précédente avec vérification
          try {
            // Vérifier d'abord si Firestore est accessible
            const accessCheck = await checkFirestoreAccess();
            
            if (!accessCheck.success) {
              console.warn("Firestore access check failed, data saved to localStorage only:", accessCheck);
              // Planifier une tentative de synchronisation ultérieure si nécessaire
              return;
            }
            
            // Enregistrer les données dans Firestore
            console.log("Tentative d'écriture après vérification...");
            
            // Données simplifiées pour Firestore
            const simpleFirestoreData = {
              displayName: profileData.displayName.trim(),
              email: tempUserData.email,
              lastUpdate: new Date().toISOString(),
              source: "registration_form"
            };
            
            // Écrire les données minimales d'abord
            const userRef = firestoreDoc(getFirestore(), "users", tempUserData.uid);
            await setDoc(userRef, simpleFirestoreData, { merge: true });
            
            console.log("Écriture des données minimales réussie!");
            
            // Si ça fonctionne, essayer avec les données complètes
            await setDoc(userRef, {
              ...firestoreData,
              lastSync: new Date().toISOString()
            }, { merge: true });
            
            console.log("User data saved successfully to Firestore via alternative method!");
          } catch (backupMethodError) {
            console.error("Même la méthode alternative a échoué:", backupMethodError);
            // Continuer l'exécution, l'utilisateur a déjà été redirigé
          }
        }
      } catch (firestoreError) {
        console.error("Background Firestore save failed:", firestoreError);
        console.error("Error code:", firestoreError.code);
        console.error("Error message:", firestoreError.message);
      }
      
    } catch (error) {
      console.error("Error in registration process:", error);
      // L'utilisateur a déjà été redirigé, donc ne pas interrompre l'expérience
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour annuler l'inscription et fermer le formulaire
  const handleRegistrationCancel = () => {
    // Fermer le formulaire d'inscription
    setShowRegistrationForm(false);
    
    // Si l'utilisateur a déjà été créé, nous le considérons comme connecté
    // mais sans les informations supplémentaires
    if (tempUserData) {
      setUser(tempUserData);
      setIsLoggedIn(true);
      
      // Sauvegarder dans localStorage si "se souvenir de moi" est coché
      if (rememberMe) {
        localStorage.setItem('userEmail', tempUserData.email);
        localStorage.setItem('isLoggedIn', 'true');
      }
      
      // Vérifier si l'utilisateur a déjà accès à la beta
      const storedBetaAccess = localStorage.getItem('hasBetaAccess');
      if (storedBetaAccess === 'true') {
        setHasBetaAccess(true);
        // Démarrer l'application directement
        window.location.href = 'https://app.mytekx.io';
      } else {
        // Rediriger vers l'app qui gère la vérification beta
        window.location.href = 'https://app.mytekx.io';
      }
    }
  };
  
  // Fonction utilitaire pour compléter la connexion (utilisée pour les utilisateurs existants)
  const completeSignIn = (user) => {
    console.log("Completing sign in for user:", user);
    
    setUser(user);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    
    // Rediriger directement vers l'app principale
    setTimeout(() => {
      window.location.href = 'https://app.mytekx.io';
    }, 500);
  };

  // Si showProfilePage est vrai, nous ne devrions pas afficher la landing page
  if (showProfilePage) {
    return null;
  }

  // Si showStudentSolution est vrai, afficher la page étudiante
  if (showStudentSolution) {
    return <StudentSolution onBack={() => setShowStudentSolution(false)} />;
  }

  // Si showTeacherSolution est vrai, afficher la page enseignante
  if (showTeacherSolution) {
    return <TeacherSolution onBack={() => setShowTeacherSolution(false)} />;
  }

  // Si showResearcherSolution est vrai, afficher la page chercheur
  if (showResearcherSolution) {
    return <ResearcherSolution onBack={() => setShowResearcherSolution(false)} />;
  }

  // Si showInstitutionSolution est vrai, afficher la page institution
  if (showInstitutionSolution) {
    return <InstitutionSolution onBack={() => setShowInstitutionSolution(false)} />;
  }

  // Si showPreview est défini, afficher la prévisualisation correspondante
  if (showPreview === 'forum') {
    return <ForumPreview onBack={() => setShowPreview(null)} />;
  }
  
  if (showPreview === 'ai') {
    return <AIPreview onBack={() => setShowPreview(null)} />;
  }
  
  if (showPreview === 'mobile') {
    return <MobilePreview onBack={() => setShowPreview(null)} />;
  }

  // Fonction pour gérer le changement de période de facturation
  const handleBillingPeriodChange = (period) => {
    setActiveBillingPeriod(period);
  };

  return (
    <div className="futuristic-container">
      {/* Bouton de toggle mode sombre */}
      <button 
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        {isDarkMode ? <SunMediumIcon size={20} /> : <MoonIcon size={20} />}
      </button>

      {/* Header avec navigation */}
      <header className="header-container">
        <div className="logo">
          <span className="logo-icon">ΘΞ</span>
          <span className="logo-text">MyTekX</span>
        </div>
        
        <nav className="nav-links">
          <div className="nav-dropdown">
            <a 
              href="#solutions" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setShowSolutionsMenu(!showSolutionsMenu);
              }}
            >
              {solutions} 
              <ChevronDownIcon 
                className={`nav-icon ${showSolutionsMenu ? 'rotate-up' : ''}`}
                size={20} 
              />
            </a>
            {showSolutionsMenu && (
              <div className="dropdown-content">
                {solutionsMenu.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.href} 
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSolutionsMenu(false);
                      if (item.onClick) {
                        item.onClick();
                      } else if (item.href) {
                        document.querySelector(item.href).scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="dropdown-icon">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#pricing" className="nav-link">{pricing}</a>
          <a href="#upcoming-section" className="nav-link">{language === 'fr' ? 'À venir' : 'Coming Soon'}</a>
          <a href="#affiliation" className="nav-link">{affiliation}</a>
        </nav>
        
        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <span 
                className="username-display"
                title={t('connected')}
              >
                {user ? (user.displayName || user.email) : (localStorage.getItem('userEmail') || t('defaultUsername'))}
                <span className="beta-badge">BETA</span>
              </span>
              <button 
                className="logout-button"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <button 
              className="login-button"
              onClick={handleLoginButtonClick}
            >
              {login}
              <span className="beta-badge">BETA</span>
            </button>
          )}
        </div>
      </header>
      
      {/* Éléments de fond */}
      <div className="bg-grid"></div>
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="floating-particles"></div>
      <div className="bg-logo">ΘΞ</div>
      
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          {titleMain}<br />
          <span><span className="logo-accent">ΘΞ</span> {titleHighlight}</span>
        </h1>
        <p className="hero-subtitle">
          {subtitle}
        </p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={handleCtaClick}>
            {t('getStarted')}
            <FaRocket className="button-icon" />
            <span className="beta-tag">{t('betaBadge', { defaultValue: 'BÊTA' })}</span>
          </button>
        </div>
        
        
      </section>

      {/* Features Section */}
      <section className="features-section" id="solutions">
        <h2 className="section-title">{featuresTitle}</h2>
        
        {/* Solutions spécifiques */}
        <div className="solutions-targets">
          <div id="solutions-students" className="solution-target">
            <div className="solution-icon"><FaUserGraduate /></div>
            <h3 className="solution-title">{language === 'fr' ? 'Pour les étudiants' : 'For students'}</h3>
            <p className="solution-description">
              {language === 'fr' 
                ? "Transformez vos notes de cours en documents structurés, gagnez du temps dans vos révisions et améliorez votre compréhension grâce à nos outils d'organisation intelligente."
                : "Transform your lecture notes into structured documents, save time in your revision process, and improve your understanding with our intelligent organization tools."}
            </p>
          </div>
          
          <div id="solutions-teachers" className="solution-target">
            <div className="solution-icon"><FaUniversity /></div>
            <h3 className="solution-title">{language === 'fr' ? 'Pour les enseignants' : 'For teachers'}</h3>
            <p className="solution-description">
              {language === 'fr' 
                ? "Créez rapidement des supports pédagogiques de qualité, convertissez vos présentations en polycopiés complets et assurez une cohérence parfaite entre vos documents."
                : "Quickly create high-quality educational materials, convert your presentations into comprehensive handouts, and ensure perfect consistency between your documents."}
            </p>
          </div>
          
          <div id="solutions-researchers" className="solution-target">
            <div className="solution-icon"><FaSearch /></div>
            <h3 className="solution-title">{language === 'fr' ? 'Pour les chercheurs' : 'For researchers'}</h3>
            <p className="solution-description">
              {language === 'fr' 
                ? "Standardisez vos documents de recherche, intégrez facilement des équations complexes et publiez plus efficacement avec nos outils spécialisés."
                : "Standardize your research documents, easily integrate complex equations, and publish more efficiently with our specialized tools."}
            </p>
          </div>
          
          <div id="solutions-institutions" className="solution-target">
            <div className="solution-icon"><FaAward /></div>
            <h3 className="solution-title">{language === 'fr' ? 'Pour les institutions' : 'For institutions'}</h3>
            <p className="solution-description">
              {language === 'fr' 
                ? "Solution complète pour les établissements d'enseignement, avec gestion centralisée des documents et intégration avec vos systèmes existants."
                : "Complete solution for educational institutions, with centralized document management and integration with your existing systems."}
            </p>
          </div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
      
      {/* Document Counter Section */}
      <section className="counter-section">
        <div className="counter-content">
          <div className="counter-value">{docCount.toLocaleString()}</div>
          <div className="counter-label">{docCounter}</div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">{howItWorks}</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card"
            >
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Demonstration Section */}
      <section className="demo-section">
        <h2 className="section-title">{demoTitle}</h2>
        <p className="demo-subtitle">{demoSubtitle}</p>
        
        <div className="demo-container">
          <div className="demo-card">
            <div className="demo-label">{beforeLabel}</div>
            <div className="demo-image before-image"></div>
          </div>
          
          <div className="demo-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="demo-card">
            <div className="demo-label">{afterLabel}</div>
            <div className="demo-image after-image"></div>
          </div>
        </div>
        
        <button 
          className="demo-cta-button"
          onClick={handleCtaClick}
        >
          {startNow}
        </button>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-title">
          <h2>{t('pricingTitle')}</h2>
          <p className="section-subtitle">{t('pricingSubtitle')}</p>
        </div>
        
        <div className="pricing-tags">
          <span 
            className={`pricing-tag ${activeBillingPeriod === 'monthly' ? 'active' : ''}`}
            onClick={() => handleBillingPeriodChange('monthly')}
          >
            {t('monthly')}
          </span>
          <span 
            className={`pricing-tag ${activeBillingPeriod === 'yearly' ? 'active' : ''}`}
            onClick={() => handleBillingPeriodChange('yearly')}
          >
            {t('yearly')} <span className="save-badge">-20%</span>
          </span>
        </div>
        
        <div className="pricing-container landing-pricing-container">
          {/* Free Plan */}
          <div className="pricing-card freemium">
            <div className="badge-icon purple">🟢</div>
            <h3 className="pricing-title">{t('freePlan')}</h3>
            <div className="pricing-price">
              0€ <span className="pricing-period">/ toujours</span>
            </div>
            <p className="pricing-objective">{t('freePlanObjective')}</p>
            
            <ul className="pricing-features">
              <li className="feature-included">5 documents maximum à vie</li>
              <li className="feature-included">20 pages par document</li>
              <li className="feature-included">Modèle IA basique</li>
              <li className="feature-included">Filigrane MyTekX</li>
              <li className="feature-excluded">Pas de contenu spécial</li>
              <li className="feature-excluded">Pas de contenu visuel</li>
            </ul>
            
            {/* Bouton temporairement supprimé - pas de système de paiement
            <button 
              className="pricing-cta-button"
              onClick={() => handlePlanClick('free')}
            >
              {t('startFree')}
            </button>
            */}
          </div>

          {/* Standard Plan */}
          <div className="pricing-card student">
            <div className="badge-icon blue">🔵</div>
            <h3 className="pricing-title">{t('studentPlan')}</h3>
            <div className="pricing-price">
              {activeBillingPeriod === 'monthly' ? '7.99€' : '6.39€'} <span className="pricing-period">/ {t('month')}</span>
              {activeBillingPeriod === 'yearly' && (
                <div style={{fontSize: '0.8rem', opacity: 0.8, marginTop: '5px'}}>
                  {t('billedAnnually')} 76.68€
                </div>
              )}
            </div>
            <p className="pricing-objective">{t('studentPlanObjective')}</p>
            
            <ul className="pricing-features">
              <li className="feature-included">15 documents par mois</li>
              <li className="feature-included">50 pages par document</li>
              <li className="feature-included">Modèle IA standard</li>
              <li className="feature-included">Sans filigrane</li>
              <li className="feature-included">2 contenus spéciaux maximum</li>
              <li className="feature-included">Crédits supplémentaires disponibles</li>
              <li className="feature-excluded">Pas de contenu visuel</li>
            </ul>
            
            {/* Bouton temporairement supprimé - pas de système de paiement
            <button 
              className="pricing-cta-button"
              onClick={() => handlePlanClick('standard')}
            >
              {t('getPremium')}
            </button>
            */}
          </div>

          {/* Premium Plan - Most Popular */}
          <div className="pricing-card pro">
            <div className="popular-badge">
              <span>{t('mostPopular')}</span>
            </div>
            <div className="badge-icon orange">🟣</div>
            <h3 className="pricing-title">{t('proPlan')}</h3>
            <div className="pricing-price">
              {activeBillingPeriod === 'monthly' ? '19.99€' : '15.99€'} <span className="pricing-period">/ {t('month')}</span>
              {activeBillingPeriod === 'yearly' && (
                <div style={{fontSize: '0.8rem', opacity: 0.8, marginTop: '5px'}}>
                  {t('billedAnnually')} 191.88€
                </div>
              )}
            </div>
            <p className="pricing-objective">{t('proPlanObjective')}</p>
            
            <ul className="pricing-features">
              <li className="feature-included"><strong>30 documents par mois</strong></li>
              <li className="feature-included"><strong>70 pages par document</strong></li>
              <li className="feature-included">Modèle IA premium</li>
              <li className="feature-included">Sans filigrane</li>
              <li className="feature-included">Contenus spéciaux illimités</li>
              <li className="feature-included">Contenu visuel autorisé</li>
              <li className="feature-included">Crédits avec réduction 20%</li>
            </ul>
            
            {/* Bouton temporairement supprimé - pas de système de paiement
            <button 
              className="pricing-cta-button"
              onClick={() => handlePlanClick('premium')}
            >
              {t('goProNow')}
            </button>
            */}
          </div>

          {/* Pro Plan */}
          <div className="pricing-card team">
            <div className="badge-icon red">🟠</div>
            <h3 className="pricing-title">{t('teamPlan')}</h3>
            <div className="pricing-price">
              <span className="custom-quote">{t('customQuote')}</span>
            </div>
            <p className="pricing-objective">{t('teamPlanObjective')}</p>
            
            <ul className="pricing-features">
              <li className="feature-included">Documents et pages illimités</li>
              <li className="feature-included">Traitement MyTekX illimité + humain</li>
              <li className="feature-included">Révision humaine</li>
              <li className="feature-included">Modèle IA le plus avancé</li>
              <li className="feature-included">Support prioritaire 24/7</li>
              <li className="feature-included">API personnalisée</li>
              <li className="feature-included">Contenu visuel avancé</li>
            </ul>
            
            {/* Bouton temporairement supprimé - pas de système de paiement
            <button 
              className="pricing-cta-button contact-us"
              onClick={() => window.location.href = 'mailto:contact@slide2latex.com'}
            >
              {t('contactUs')}
            </button>
            */}
          </div>
        </div>

        <div className="pricing-guarantee">
          <div className="guarantee-badge">
            <FaShieldAlt /> {t('satisfactionGuarantee')}
          </div>
          <p>{t('moneyBackGuarantee')}</p>
        </div>

        <div className="pricing-faq">
          <h3>{t('commonQuestions')}</h3>
          <div className="pricing-questions">
            <details className="pricing-question">
              <summary>{t('pricingQuestion1')}</summary>
              <p>{t('pricingAnswer1')}</p>
            </details>
            <details className="pricing-question">
              <summary>{t('pricingQuestion2')}</summary>
              <p>{t('pricingAnswer2')}</p>
            </details>
            <details className="pricing-question">
              <summary>{t('pricingQuestion3')}</summary>
              <p>{t('pricingAnswer3')}</p>
            </details>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">{testimonialsTitle}</h2>
        
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Upcoming Features Section */}
      <section className="upcoming-section" id="upcoming-section">
        <h2 className="section-title">
          {language === 'fr' ? 'Nouveautés à venir' : 'Coming Soon'}
        </h2>
        <div className="upcoming-container">
          <div className="upcoming-card" onClick={() => setSelectedFeature('forum')}>
            <div className="upcoming-icon">
              <FaUsers />
            </div>
            <h3 className="upcoming-title">
              {language === 'fr' ? 'MyTekX Community' : 'MyTekX Community'}
            </h3>
            <p className="upcoming-description">
              {language === 'fr' 
                ? 'Un espace collaboratif où vous pourrez publier vos productions, recevoir des commentaires, noter les travaux des autres utilisateurs et construire ensemble une communauté d\'excellence académique.'
                : 'A collaborative space where you can publish your work, receive feedback, rate other users\' content, and build together a community of academic excellence.'}
            </p>
            <div className="upcoming-timeline">
              <FaRocket className="timeline-icon" />
              <span className="timeline-text">
                {language === 'fr' ? 'Lancement prévu : T3 2025' : 'Expected launch: Q3 2025'}
              </span>
            </div>
          </div>

          <div className="upcoming-card" onClick={() => setSelectedFeature('ai')}>
            <div className="upcoming-icon">
              <FaBrain />
            </div>
            <h3 className="upcoming-title">
              {language === 'fr' ? 'IA Collaborative' : 'Collaborative AI'}
            </h3>
            <p className="upcoming-description">
              {language === 'fr'
                ? 'Améliorez vos documents avec notre IA qui apprend de la communauté. Suggestions intelligentes basées sur les meilleures pratiques et modèles de documents les plus appréciés.'
                : 'Enhance your documents with our AI that learns from the community. Smart suggestions based on best practices and most appreciated document templates.'}
            </p>
            <div className="upcoming-timeline">
              <FaRocket className="timeline-icon" />
              <span className="timeline-text">
                {language === 'fr' ? 'Lancement prévu : T4 2025' : 'Expected launch: Q4 2025'}
              </span>
            </div>
          </div>
          
          <div className="upcoming-card" onClick={() => setSelectedFeature('mobile')}>
            <div className="upcoming-icon">
              <FaMobileAlt />
            </div>
            <h3 className="upcoming-title">
              {language === 'fr' ? 'Application Mobile' : 'Mobile App'}
            </h3>
            <p className="upcoming-description">
              {language === 'fr'
                ? 'Accédez à vos documents, consultez le forum et recevez des notifications où que vous soyez. Conversion de photos de tableaux ou notes manuscrites directement depuis votre smartphone.'
                : 'Access your documents, check the forum, and receive notifications wherever you are. Convert photos of whiteboards or handwritten notes directly from your smartphone.'}
            </p>
            <div className="upcoming-timeline">
              <FaRocket className="timeline-icon" />
              <span className="timeline-text">
                {language === 'fr' ? 'Lancement prévu : T1 2026' : 'Expected launch: Q1 2026'}
              </span>
            </div>
          </div>
          
          <div className="upcoming-card" onClick={() => setSelectedFeature('editor')}>
            <div className="upcoming-icon">
              <FaFileAlt />
            </div>
            <h3 className="upcoming-title">
              {language === 'fr' ? 'Édition de Document' : 'Document Editing'}
            </h3>
            <p className="upcoming-description">
              {language === 'fr'
                ? 'Modifiez vos documents LaTeX directement dans MyTekX avec notre éditeur intégré. Ajoutez, supprimez ou réorganisez le contenu, modifiez les formules et visualisez les changements en temps réel.'
                : 'Edit your LaTeX documents directly in MyTekX with our integrated editor. Add, delete or reorganize content, modify formulas and visualize changes in real-time.'}
            </p>
            <div className="upcoming-timeline">
              <FaRocket className="timeline-icon" />
              <span className="timeline-text">
                {language === 'fr' ? 'Lancement prévu : T2 2026' : 'Expected launch: Q2 2026'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="feature-detail-modal" onClick={(e) => {
          if (e.target.classList.contains('feature-detail-modal')) {
            setSelectedFeature(null);
          }
        }}>
          <div className="feature-detail-content">
            <button className="close-feature-detail" onClick={() => setSelectedFeature(null)}>
              ✕
            </button>
            
            {selectedFeature === 'forum' && (
              <div className="feature-detail">
                <div className="feature-detail-header">
                  <div className="feature-detail-icon">
                    <FaUsers />
                  </div>
                  <h2>{language === 'fr' ? 'MyTekX Community' : 'MyTekX Community'}</h2>
                </div>
                
                <div className="feature-launch-badge">
                  <FaRocket className="badge-icon" />
                  <span>{language === 'fr' ? 'Lancement prévu : T3 2025' : 'Expected launch: Q3 2025'}</span>
                </div>
                
                <div className="feature-detail-body">
                  <p className="feature-intro">
                    {language === 'fr' 
                      ? "MyTekX Community va transformer votre expérience d'apprentissage en créant une communauté d'entraide et de partage de connaissances."
                      : "MyTekX Community will transform your learning experience by creating a community for mutual support and knowledge sharing."}
                  </p>
                  
                  <h3>{language === 'fr' ? 'Fonctionnalités principales' : 'Main Features'}</h3>
                  <ul className="feature-list">
                    <li>
                      <strong>{language === 'fr' ? 'Partage de documents' : 'Document Sharing'}</strong>
                      <p>{language === 'fr' 
                        ? 'Publiez vos meilleurs documents LaTeX et recevez des commentaires de la communauté pour les améliorer.'
                        : 'Share your best LaTeX documents and receive feedback from the community to improve them.'}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Système de notation' : 'Rating System'}</strong>
                      <p>{language === 'fr' 
                        ? 'Évaluez les documents partagés et découvrez les contenus les mieux notés par la communauté.'
                        : 'Rate shared documents and discover content with the highest community ratings.'}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Groupes d\'étude' : 'Study Groups'}</strong>
                      <p>{language === 'fr' 
                        ? 'Créez ou rejoignez des groupes d\'étude par discipline, cours ou projet pour collaborer efficacement.'
                        : 'Create or join study groups by discipline, course, or project to collaborate effectively.'}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Questions & Réponses' : 'Q&A Section'}</strong>
                      <p>{language === 'fr' 
                        ? 'Posez des questions sur des concepts complexes et obtenez des réponses d\'experts de la communauté.'
                        : 'Ask questions about complex concepts and get answers from community experts.'}
                      </p>
                    </li>
                  </ul>
                  
               
                  
                  <h3>{language === 'fr' ? 'Pourquoi nous développons cette fonctionnalité' : 'Why We\'re Developing This Feature'}</h3>
                  <p>
                    {language === 'fr' 
                      ? 'Nous croyons que l\'apprentissage est plus efficace lorsqu\'il est collaboratif. MyTekX Community permettra non seulement de trouver des réponses à vos questions, mais aussi de construire un réseau d\'entraide académique qui valorise le partage des connaissances.'
                      : 'We believe that learning is more effective when it\'s collaborative. The MyTekX Forum will not only help you find answers to your questions but also build an academic support network that values knowledge sharing.'}
                  </p>
                  
                  <div className="feature-signup">
                    <p>
                      {language === 'fr' 
                        ? 'Intéressé(e) par un accès anticipé à cette fonctionnalité ?'
                        : 'Interested in early access to this feature?'}
                    </p>
                    <div className="feature-buttons">
                      <button className="feature-notify-button">
                        {language === 'fr' ? 'M\'avertir au lancement' : 'Notify me at launch'}
                      </button>
                      <button 
                        className="feature-preview-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(null);
                          const previewType = 'forum';
                          if (typeof onShowPreview === 'function') {
                            onShowPreview(previewType);
                          } else {
                            // Fallback si la prop onShowPreview n'est pas fournie
                            setShowPreview(previewType);
                          }
                        }}
                      >
                        {language === 'fr' ? 'Visualiser la preview' : 'View preview'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedFeature === 'ai' && (
              <div className="feature-detail">
                <div className="feature-detail-header">
                  <div className="feature-detail-icon">
                    <FaBrain />
                  </div>
                  <h2>{language === 'fr' ? 'IA Collaborative' : 'Collaborative AI'}</h2>
                </div>
                
                <div className="feature-launch-badge">
                  <FaRocket className="badge-icon" />
                  <span>{language === 'fr' ? 'Lancement prévu : T4 2025' : 'Expected launch: Q4 2025'}</span>
                </div>
                
                <div className="feature-detail-body">
                  <p className="feature-intro">
                    {language === 'fr' 
                      ? "Notre IA Collaborative va révolutionner la façon dont vous créez et améliorez vos documents académiques en apprenant des meilleures pratiques de toute la communauté."
                      : "Our Collaborative AI will revolutionize how you create and improve your academic documents by learning from best practices across the entire community."}
                  </p>
                  
                  <h3>{language === 'fr' ? 'Fonctionnalités principales' : 'Main Features'}</h3>
                  <ul className="feature-list">
                    <li>
                      <strong>{language === 'fr' ? 'Suggestions intelligentes' : 'Smart Suggestions'}</strong>
                      <p>{language === 'fr' 
                        ? "Recevez des recommandations contextuelles pour améliorer la structure, le style et la clarté de vos documents."
                        : "Receive contextual recommendations to improve the structure, style, and clarity of your documents."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Analyse comparative' : 'Comparative Analysis'}</strong>
                      <p>{language === 'fr' 
                        ? "Comparez automatiquement vos documents avec des exemples hautement notés dans des domaines similaires."
                        : "Automatically compare your documents with highly-rated examples in similar fields."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Complétion avancée' : 'Advanced Completion'}</strong>
                      <p>{language === 'fr' 
                        ? "Notre IA peut vous aider à développer vos idées, compléter des sections, et suggérer des définitions ou exemples pertinents."
                        : "Our AI can help you develop your ideas, complete sections, and suggest relevant definitions or examples."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Personnalisation' : 'Personalization'}</strong>
                      <p>{language === 'fr' 
                        ? "L'IA s'adapte à votre style d'écriture et à vos préférences au fil du temps."
                        : "The AI adapts to your writing style and preferences over time."}
                      </p>
                    </li>
                  </ul>
                  
                  
                  <h3>{language === 'fr' ? 'Comment ça fonctionne' : 'How It Works'}</h3>
                  <p>
                    {language === 'fr' 
                      ? "Notre système d'IA analyse anonymement les documents les plus appréciés et les plus efficaces de notre communauté pour identifier les modèles qui fonctionnent bien. Ces insights sont ensuite utilisés pour vous offrir des suggestions pertinentes lors de la création ou de la modification de vos propres documents."
                      : "Our AI system anonymously analyzes the most appreciated and effective documents in our community to identify patterns that work well. These insights are then used to offer you relevant suggestions when creating or editing your own documents."}
                  </p>
                  
                  <div className="feature-signup">
                    <p>
                      {language === 'fr' 
                        ? "Voulez-vous participer au programme bêta de l'IA Collaborative ?"
                        : "Would you like to participate in the Collaborative AI beta program?"}
                    </p>
                    <div className="feature-buttons">
                      <button className="feature-notify-button">
                        {language === 'fr' ? "Rejoindre la liste d'attente" : "Join the waitlist"}
                      </button>
                      <button 
                        className="feature-preview-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(null);
                          const previewType = 'ai';
                          if (typeof onShowPreview === 'function') {
                            onShowPreview(previewType);
                          } else {
                            // Fallback si la prop onShowPreview n'est pas fournie
                            setShowPreview(previewType);
                          }
                        }}
                      >
                        {language === 'fr' ? 'Visualiser la preview' : 'View preview'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedFeature === 'mobile' && (
              <div className="feature-detail">
                <div className="feature-detail-header">
                  <div className="feature-detail-icon">
                    <FaMobileAlt />
                  </div>
                  <h2>{language === 'fr' ? 'Application Mobile' : 'Mobile App'}</h2>
                </div>
                
                <div className="feature-launch-badge">
                  <FaRocket className="badge-icon" />
                  <span>{language === 'fr' ? 'Lancement prévu : T1 2026' : 'Expected launch: Q1 2026'}</span>
                </div>
                
                <div className="feature-detail-body">
                  <p className="feature-intro">
                    {language === 'fr' 
                      ? "L'application mobile MyTekX vous permettra d'accéder à tous vos documents et fonctionnalités où que vous soyez, avec des fonctionnalités spécifiquement conçues pour l'utilisation mobile."
                      : "The MyTekX mobile app will allow you to access all your documents and features wherever you are, with functionality specifically designed for mobile use."}
                  </p>
                  
                  <h3>{language === 'fr' ? 'Fonctionnalités principales' : 'Main Features'}</h3>
                  <ul className="feature-list">
                    <li>
                      <strong>{language === 'fr' ? 'Capture d\'images' : 'Image Capture'}</strong>
                      <p>{language === 'fr' 
                        ? "Prenez des photos de tableaux blancs, de notes manuscrites ou de slides et convertissez-les instantanément en documents LaTeX."
                        : "Take photos of whiteboards, handwritten notes, or slides and instantly convert them to LaTeX documents."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Accès hors ligne' : 'Offline Access'}</strong>
                      <p>{language === 'fr' 
                        ? "Consultez et modifiez vos documents même sans connexion internet, avec synchronisation automatique lorsque vous êtes de nouveau en ligne."
                        : "View and edit your documents even without an internet connection, with automatic synchronization when you're back online."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Notifications' : 'Notifications'}</strong>
                      <p>{language === 'fr' 
                        ? "Recevez des alertes pour les commentaires sur vos documents, les réponses à vos questions sur le forum, et les conversions terminées."
                        : "Receive alerts for comments on your documents, answers to your forum questions, and completed conversions."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Mode lecture optimisé' : 'Optimized Reading Mode'}</strong>
                      <p>{language === 'fr' 
                        ? "Interface de lecture adaptée aux écrans mobiles avec zoom intelligent sur les formules et autres éléments importants."
                        : "Reading interface adapted to mobile screens with smart zooming on formulas and other important elements."}
                      </p>
                    </li>
                  </ul>
                  
               
                  
                  <h3>{language === 'fr' ? 'Plateformes supportées' : 'Supported Platforms'}</h3>
                  <p>
                    {language === 'fr' 
                      ? "L'application sera disponible sur iOS et Android, avec une interface utilisateur native optimisée pour chaque plateforme tout en conservant une expérience cohérente avec la version web."
                      : "The app will be available on iOS and Android, with a native user interface optimized for each platform while maintaining a consistent experience with the web version."}
                  </p>
                  
                  <div className="feature-signup">
                    <p>
                      {language === 'fr' 
                        ? "Souhaitez-vous être parmi les premiers testeurs de l'application mobile ?"
                        : "Would you like to be among the first testers of the mobile app?"}
                    </p>
                    <div className="feature-buttons">
                      <button className="feature-notify-button">
                        {language === 'fr' ? "M'inscrire pour la bêta" : 'Sign up for beta'}
                      </button>
                      <button 
                        className="feature-preview-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(null);
                          const previewType = 'mobile';
                          if (typeof onShowPreview === 'function') {
                            onShowPreview(previewType);
                          } else {
                            // Fallback si la prop onShowPreview n'est pas fournie
                            setShowPreview(previewType);
                          }
                        }}
                      >
                        {language === 'fr' ? 'Visualiser la preview' : 'View preview'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedFeature === 'editor' && (
              <div className="feature-detail">
                <div className="feature-detail-header">
                  <div className="feature-detail-icon">
                    <FaFileAlt />
                  </div>
                  <h2>{language === 'fr' ? 'Édition de Document' : 'Document Editing'}</h2>
                </div>
                
                <div className="feature-launch-badge">
                  <FaRocket className="badge-icon" />
                  <span>{language === 'fr' ? 'Lancement prévu : T2 2026' : 'Expected launch: Q2 2026'}</span>
                </div>
                
                <div className="feature-detail-body">
                  <p className="feature-intro">
                    {language === 'fr' 
                      ? "Notre éditeur intégré vous permettra de modifier vos documents LaTeX directement dans MyTekX, avec un environnement complet qui combine puissance d'édition et simplicité d'utilisation."
                      : "Our integrated editor will allow you to modify your LaTeX documents directly in MyTekX, with a complete environment that combines editing power and ease of use."}
                  </p>
                  
                  <h3>{language === 'fr' ? 'Fonctionnalités principales' : 'Main Features'}</h3>
                  <ul className="feature-list">
                    <li>
                      <strong>{language === 'fr' ? 'Éditeur WYSIWYG' : 'WYSIWYG Editor'}</strong>
                      <p>{language === 'fr' 
                        ? "Interface intuitive montrant directement le rendu final tout en permettant l'accès au code LaTeX sous-jacent."
                        : "Intuitive interface showing the final rendering directly while allowing access to the underlying LaTeX code."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Éditeur de formules interactif' : 'Interactive Formula Editor'}</strong>
                      <p>{language === 'fr' 
                        ? "Créez et modifiez des équations complexes avec un éditeur visuel et une prévisualisation en temps réel."
                        : "Create and edit complex equations with a visual editor and real-time preview."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Collaboration en temps réel' : 'Real-time Collaboration'}</strong>
                      <p>{language === 'fr' 
                        ? "Travaillez simultanément sur le même document avec vos collaborateurs, avec suivi des modifications et chat intégré."
                        : "Work simultaneously on the same document with your collaborators, with change tracking and integrated chat."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Bibliothèque de modèles' : 'Template Library'}</strong>
                      <p>{language === 'fr' 
                        ? "Accédez à une collection de modèles professionnels pour différents types de documents académiques."
                        : "Access a collection of professional templates for different types of academic documents."}
                      </p>
                    </li>
                    <li>
                      <strong>{language === 'fr' ? 'Gestion des versions' : 'Version Management'}</strong>
                      <p>{language === 'fr' 
                        ? "Gardez trace de l'historique complet de vos modifications avec la possibilité de restaurer des versions antérieures."
                        : "Keep track of the complete history of your changes with the ability to restore previous versions."}
                      </p>
                    </li>
                  </ul>
                  
           
                  <h3>{language === 'fr' ? 'Intégration avec les autres fonctionnalités' : 'Integration with Other Features'}</h3>
                  <p>
                    {language === 'fr' 
                      ? "L'éditeur de document sera étroitement intégré à notre IA Collaborative pour vous offrir des suggestions en temps réel pendant que vous rédigez. Il fonctionnera également parfaitement avec l'application mobile, vous permettant de commencer l'édition sur un appareil et de continuer sur un autre."
                      : "The document editor will be tightly integrated with our Collaborative AI to offer you real-time suggestions as you write. It will also work seamlessly with the mobile app, allowing you to start editing on one device and continue on another."}
                  </p>
                  
                  <div className="feature-signup">
                    <p>
                      {language === 'fr' 
                        ? 'Intéressé(e) par l\'édition de documents directement dans MyTekX ?'
                        : 'Interested in editing documents directly in MyTekX?'}
                    </p>
                    <div className="feature-buttons">
                      <button className="feature-notify-button">
                        {language === 'fr' ? 'Me prévenir au lancement' : 'Notify me at launch'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Affiliation Section */}
      <section className="affiliation-section" id="affiliation">
        <h2 className="section-title">{affiliation}</h2>
        <div className="affiliation-content">
          <div className="affiliation-left">
            <h3 className="affiliation-tagline">{affiliationTagline}</h3>
            <p className="affiliation-description" dangerouslySetInnerHTML={{ __html: 
              language === 'fr' ? 
                `Notre programme d'affiliation vous permet de gagner des commissions attractives pour chaque nouvel abonnement que vous nous amenez. Recevez jusqu'à <span class="highlight">30% du montant</span> de chaque abonnement parrainé pendant toute sa durée de vie.` 
                : 
                `Our affiliate program lets you earn attractive commissions for each new subscription you bring us. Receive up to <span class="highlight">30% of the amount</span> of each sponsored subscription throughout its lifetime.`
            }} />
            <div className="affiliation-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaMoneyBillWave className="icon-benefit" />
                </div>
                <div className="benefit-text">{benefitCommission}</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaSync className="icon-benefit" />
                </div>
                <div className="benefit-text">{benefitTracking}</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaGraduationCap className="icon-benefit" />
                </div>
                <div className="benefit-text">{benefitMaterial}</div>
              </div>
            </div>
          </div>
          
          <div className="affiliation-right">
            <div className="affiliation-signup">
              <p className="affiliation-signup-subtitle">
                {affiliationSignupSubtitle}
              </p>
              <div className="affiliation-form">
                <input 
                  type="email" 
                  placeholder={language === 'fr' ? "Votre adresse email" : "Your email address"} 
                  className="affiliation-input" 
                />
                <button className="affiliation-button">
                  {language === 'fr' ? "Me notifier" : "Notify me"}
                </button>
              </div>
              <div className="affiliation-stats">
                <div className="stats-icon">
                  <FaUsers className="icon-stats" />
                </div>
                <div className="stats-text">{affiliationStats}</div>
              </div>
              <div className="affiliation-launch">
                <div className="launch-icon">
                  <FaRocket className="icon-launch" />
                </div>
                <div className="launch-text">{affiliationLaunch}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <h2 className="section-title">{faqTitle}</h2>
        <p className="section-subtitle">
          {language === 'fr' ? t('faqSubtitle') : t('faqSubtitle')}
        </p>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <span className="final-cta-subtitle">{t('finalCtaSubtitle')}</span>
          <h2 className="final-cta-title">{t('finalCtaTitle')}</h2>
          <p className="final-cta-description">{t('finalCtaDescription')}</p>
          
          <div className="final-cta-buttons">
            <button 
              className="final-cta-button primary"
              onClick={handleCtaClick}
            >
              {t('finalCtaTryButton')}
            </button>
            <button 
              className="final-cta-button secondary"
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
            >
              {t('finalCtaLearnButton')}
            </button>
          </div>
        </div>
        
        <div className="floating-cta-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">ΘΞ</span>
            <span className="logo-text">MyTekX</span>
          </div>
          
          <p className="footer-slogan">{footer}</p>
          
          <div className="footer-sections">
            <div className="footer-section">
              <h3 className="footer-section-title">{t('footerNavigation')}</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">{t('footerHome')}</a>
                <a href="#pricing" className="footer-link">{pricing}</a>
                <a href="#affiliation" className="footer-link">{affiliation}</a>
                <a href="#faq" className="footer-link">{faqTitle}</a>
              </div>
            </div>
            
            <div className="footer-section footer-section-disabled">
              <h3 className="footer-section-title">{t('footerResources')}</h3>
              <p className="footer-coming-soon">{t('comingSoon')}</p>
              <div className="footer-links footer-links-disabled">
                <span className="footer-link footer-link-disabled">{t('footerBlog')}</span>
                <span className="footer-link footer-link-disabled">{t('footerTutorials')}</span>
                <span className="footer-link footer-link-disabled">{t('footerSupport')}</span>
                <span className="footer-link footer-link-disabled">{t('footerDocumentation')}</span>
              </div>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title">{t('footerContact')}</h3>
              <div className="footer-links">
                <a href="mailto:contact@mytekx.io" className="footer-link">contact@mytekx.io</a>
                <a href="#" className="footer-link">{t('footerContactUs')}</a>
              </div>
              
              <div className="footer-social">
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
                <a href="#" className="social-icon"><FaGithub /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} MyTekX {t('footerRights')}
            </div>
            
            <div className="footer-legal-links">
              <button 
                className="privacy-policy-link"
                onClick={() => setShowPrivacyPolicy(true)}
              >
                {t('privacyPolicy')}
              </button>
              <span className="footer-separator">•</span>
              <button 
                className="privacy-policy-link"
                onClick={() => setShowTermsOfService(true)}
              >
                {t('termsOfService')}
              </button>
              <span className="footer-separator">•</span>
              <button 
                className="privacy-policy-link"
                onClick={() => setShowLegalNotice(true)}
              >
                {t('legalNotice')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="modal-overlay" onClick={() => setShowPrivacyPolicy(false)}>
          <div className="privacy-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowPrivacyPolicy(false)}>✕</button>
            <div className="privacy-policy-content">
              <div className="policy-header">
                <h2>{t('privacyPolicy')}</h2>
                <div className="policy-decoration"></div>
              </div>
              <p className="policy-date">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
              
              <div className="policy-section">
                <h3>1. {t('whoWeAre')}</h3>
                <p>{t('privacyPolicyIntro')}</p>
              </div>
              
              <div className="policy-section">
                <h3>2. {t('dataCollected')}</h3>
                <p>{t('dataCollectedIntro')}</p>
                <ul>
                  <li>{t('dataItem1')}</li>
                  <li>{t('dataItem2')}</li>
                  <li>{t('dataItem3')}</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>3. {t('howWeUseData')}</h3>
                <p>{t('dataUsageDescription')}</p>
              </div>
              
              <div className="policy-section">
                <h3>4. {t('dataSharing')}</h3>
                <p>{t('dataSharingPolicy')}</p>
              </div>
              
              <div className="policy-section">
                <h3>5. {t('dataSecurity')}</h3>
                <p>{t('dataSecurityDescription')}</p>
              </div>
              
              <div className="policy-section">
                <h3>6. {t('userRights')}</h3>
                <p>{t('userRightsDescription')}</p>
                <p>{t('contactForRights')}</p>
              </div>
              
              <div className="policy-section">
                <h3>7. {t('cookies')}</h3>
                <p>{t('cookiesDescription')}</p>
              </div>
              
              <div className="policy-section">
                <h3>8. {t('policyChanges')}</h3>
                <p>{t('policyChangesDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsOfService && (
        <div className="modal-overlay" onClick={() => setShowTermsOfService(false)}>
          <div className="privacy-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowTermsOfService(false)}>✕</button>
            <div className="privacy-policy-content">
              <h2> Conditions d'utilisation – MyTekX</h2>
              <p className="policy-date"><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString()}</p>
              
              <p>Bienvenue sur MyTekX. En utilisant notre plateforme, vous acceptez les présentes conditions d'utilisation. Veuillez les lire attentivement.</p>
              
              <div className="policy-section">
                <h3>1. Objet du service</h3>
                <p>MyTekX est une plateforme en ligne qui permet de convertir des documents pédagogiques (PDF, slides, etc.) en fichiers structurés (LaTeX, DOCX, etc.), enrichis avec des explications et des illustrations grâce à l'intelligence artificielle.</p>
              </div>
              
              <div className="policy-section">
                <h3>2. Compte utilisateur</h3>
                <ul>
                  <li>Vous devez avoir plus de 13 ans pour utiliser MyTekX.</li>
                  <li>Vous êtes responsable de toute activité réalisée depuis votre compte.</li>
                  <li>Vous vous engagez à fournir des informations exactes et à ne pas usurper l'identité d'autrui.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>3. Utilisation des contenus</h3>
                <ul>
                  <li>Vous conservez la propriété des fichiers que vous soumettez.</li>
                  <li>En les envoyant, vous nous accordez le droit <strong>temporaire</strong> de les analyser pour produire le document converti.</li>
                  <li>Vous vous engagez à ne pas utiliser la plateforme pour des contenus illégaux, violents, discriminatoires ou protégés par des droits d'auteur sans autorisation.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>4. Utilisation de l'IA</h3>
                <ul>
                  <li>Les documents générés peuvent contenir des erreurs.</li>
                  <li>Vous êtes seul responsable de leur vérification avant utilisation académique ou professionnelle.</li>
                  <li>MyTekX n'est pas responsable d'un usage incorrect des résultats générés.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>5. Données personnelles</h3>
                <ul>
                  <li>MyTekX respecte la confidentialité de vos données (voir notre Politique de confidentialité).</li>
                  <li>Vos documents ne sont <strong>pas conservés</strong> au-delà de leur traitement, sauf mention contraire ou demande explicite.</li>
                  <li>Les interactions avec l'IA peuvent être enregistrées de manière anonyme pour améliorer nos services.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>6. Modification du service</h3>
                <ul>
                  <li>Nous pouvons à tout moment modifier ou suspendre certaines fonctionnalités de la plateforme.</li>
                  <li>Nous nous réservons le droit de refuser l'accès à tout utilisateur qui ne respecte pas ces conditions.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>7. Responsabilité</h3>
                <ul>
                  <li>MyTekX ne garantit pas un fonctionnement sans erreur ou interruption.</li>
                  <li>En cas de dommage indirect lié à l'usage de notre plateforme, notre responsabilité ne pourra être engagée.</li>
                </ul>
              </div>
              
              <div className="policy-section">
                <h3>8. Droit applicable</h3>
                <p>Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux de Paris seront compétents.</p>
              </div>
              
              <div className="policy-section">
                <h3>9. Contact</h3>
                <p>Pour toute question : <a href="mailto:contact@mytekx.io">contact@mytekx.io</a></p>
              </div>
              
              <div className="policy-footer">
                <p>MyTekX - Tous droits réservés.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Notice Modal */}
      {showLegalNotice && (
        <div className="modal-overlay" onClick={() => setShowLegalNotice(false)}>
          <div className="privacy-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowLegalNotice(false)}>✕</button>
            <div className="privacy-policy-content">
              <h2>Contact & Mentions légales</h2>
              
              <div className="policy-section">
                <h3>Éditeur du site</h3>
                <p>
                  MyTekX – une plateforme de conversion pédagogique augmentée par IA<br />
                  Responsable de la publication : Mathias Goldmann<br />
                  Email : <a href="mailtio">contact@mytekx.io</a>
                </p>
              </div>
              
              <div className="policy-section">
                <h3>Hébergement</h3>
                <p>
                  Vercel Inc.<br />
                  440 N Barranca Ave #4133<br />
                  Covina, CA 91723<br />
                  USA
                </p>
              </div>
              
              <div className="policy-section">
                <h3>Propriété intellectuelle</h3>
                <p>
                  Tous les contenus générés et outils proposés par MyTekX sont protégés par le droit d'auteur.<br />
                  Toute reproduction ou utilisation non autorisée est strictement interdite.
                </p>
              </div>
              
              <div className="policy-section">
                <h3>Données personnelles</h3>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification ou de suppression de vos données.<br /> 
                  Pour toute demande : <a href="mailto:rgpd@mytekx.com">rgpd@mytekx.com</a> (ou via le formulaire de contact).
                </p>
              </div>
              
              <div className="policy-section">
                <h3>Conditions d'utilisation</h3>
                <p>
                  L'utilisation de ce site est soumise aux <button onClick={(e) => {
                    e.preventDefault();
                    setShowLegalNotice(false);
                    setShowTermsOfService(true);
                  }} className="inline-link">conditions d'utilisation</button>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beta Modal - Désactivé car l'app principale gère maintenant la vérification beta */}
      {false && (
        <div className="beta-modal">
          <div className="beta-modal-content">
            <span className="close-button" onClick={() => setShowBetaModal(false)}>
              <FaTimes />
            </span>
            <h2><FaLock className="lock-icon" /> Accès Bêta Restreint</h2>
            <p className="beta-description">
              {language === 'fr' 
                ? "MyTekX est actuellement en version bêta fermée. Veuillez entrer le code d'accès pour continuer vers la page de connexion."
                : "MyTekX is currently in closed beta. Please enter the access code to continue to the login page."}
            </p>
            <div className="code-input-container">
              <input
                type="text"
                placeholder={language === 'fr' ? "Code d'accès bêta" : "Beta access code"}
                value={betaCode}
                onChange={(e) => setBetaCode(e.target.value.toUpperCase())}
                className={codeError ? "error" : ""}
                onKeyDown={(e) => e.key === 'Enter' && handleBetaCodeSubmit()}
              />
            </div>
            {codeError && (
              <p className="error-message">
                {language === 'fr' 
                  ? "Code d'accès invalide. Veuillez réessayer."
                  : "Invalid access code. Please try again."}
              </p>
            )}
            <button onClick={handleBetaCodeSubmit}>
              {language === 'fr' ? "Continuer vers la connexion" : "Continue to login"}
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <span className="close-button" onClick={() => {
              setShowLoginModal(false);
              setLoginError(false);
              setShowForgotPassword(false);
              setResetEmailSent(false);
            }}>
              <FaTimes />
            </span>
            
            {showForgotPassword ? (
              // Password Reset Form
              <div className="reset-password-container">
                <h2>
                  <span className="logo-icon" style={{ fontSize: '1.2rem', marginRight: '10px' }}>ΘΞ</span>
                  {language === 'fr' ? "Réinitialiser votre mot de passe" : "Reset your password"}
                </h2>
                
                {resetEmailSent ? (
                  <div className="reset-success">
                    <p>
                      {language === 'fr' 
                        ? "Un email de réinitialisation a été envoyé à " 
                        : "A password reset email has been sent to "}
                      <strong>{resetEmail}</strong>
                    </p>
                    <button 
                      className="back-to-login" 
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetEmailSent(false);
                        setResetEmail('');
                      }}
                    >
                      {language === 'fr' ? "Retour à la connexion" : "Back to login"}
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="reset-description">
                      {language === 'fr' 
                        ? "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe." 
                        : "Enter your email address and we'll send you a link to reset your password."}
                    </p>
                    
                    <div className="form-group">
                      <label htmlFor="reset-email">{language === 'fr' ? "Adresse email" : "Email address"}</label>
                      <input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          setLoginError(false);
                        }}
                        placeholder={language === 'fr' ? "Votre adresse email" : "Your email address"}
                        className={loginError ? "error" : ""}
                      />
                    </div>
                    
                    {loginError && (
                      <p className="error-message">
                        {loginErrorMessage}
                      </p>
                    )}
                    
                    <div className="reset-actions">
                      <button 
                        className="back-button" 
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmail('');
                          setLoginError(false);
                        }}
                      >
                        {language === 'fr' ? "Retour" : "Back"}
                      </button>
                      
                      <button 
                        className="reset-button" 
                        onClick={handleForgotPassword}
                        disabled={isLoading}
                      >
                        {isLoading 
                          ? (language === 'fr' ? "Envoi en cours..." : "Sending...") 
                          : (language === 'fr' ? "Envoyer le lien" : "Send reset link")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Regular Login/Signup Form
              <>
                <h2>
                  <span className="logo-icon" style={{ fontSize: '1.2rem', marginRight: '10px' }}>ΘΞ</span>
                  {isSignUp 
                    ? (language === 'fr' ? "Créer un compte" : "Create Account") 
                    : (language === 'fr' ? "Connexion" : "Log In")}
                </h2>
                
                {/* Social login buttons */}
                <div className="social-login">
                  <button 
                    className="social-button google" 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <FaGoogle />
                    {language === 'fr' ? "Continuer avec Google" : "Continue with Google"}
                  </button>
                  <button 
                    className="social-button github" 
                    onClick={handleGithubSignIn}
                    disabled={isLoading}
                  >
                    <FaGithub />
                    {language === 'fr' ? "Continuer avec GitHub" : "Continue with GitHub"}
                  </button>
                </div>
                
                <div className="separator">
                  <span>{language === 'fr' ? "ou" : "or"}</span>
                </div>
                
                {/* Email/Password form */}
                <div className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">{language === 'fr' ? "Adresse email" : "Email address"}</label>
                    <input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setLoginError(false);
                      }}
                      placeholder={language === 'fr' ? "Votre adresse email" : "Your email address"}
                      className={loginError ? "error" : ""}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">{language === 'fr' ? "Mot de passe" : "Password"}</label>
                    <input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError(false);
                      }}
                      placeholder={language === 'fr' ? "Votre mot de passe" : "Your password"}
                      className={loginError ? "error" : ""}
                      onKeyDown={(e) => e.key === 'Enter' && (isSignUp ? handleSignUp() : handleLogin())}
                      disabled={isLoading}
                    />
                  </div>
                  
                  {loginError && (
                    <p className="error-message">
                      {loginErrorMessage}
                    </p>
                  )}
                  
                  <div className="form-row">
                    <div className="remember-me">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        disabled={isLoading}
                      />
                      <label htmlFor="remember">{language === 'fr' ? "Se souvenir de moi" : "Remember me"}</label>
                    </div>
                    
                    <a 
                      href="#" 
                      className="forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                        setLoginError(false);
                      }}
                    >
                      {language === 'fr' ? "Mot de passe oublié ?" : "Forgot password?"}
                    </a>
                  </div>
                  
                  <button 
                    className="login-submit" 
                    onClick={isSignUp ? handleSignUp : handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? (language === 'fr' ? "Chargement..." : "Loading...")
                      : (isSignUp 
                          ? (language === 'fr' ? "Créer un compte" : "Sign Up") 
                          : (language === 'fr' ? "Se connecter" : "Log In"))}
                  </button>
                </div>
                
                <div className="signup-prompt">
                  {isSignUp 
                    ? (language === 'fr' ? "Déjà un compte ? " : "Already have an account? ")
                    : (language === 'fr' ? "Pas encore de compte ? " : "Don't have an account? ")}
                  <button 
                    className="toggle-signup"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setLoginError(false);
                    }}
                    disabled={isLoading}
                  >
                    {isSignUp 
                      ? (language === 'fr' ? "Se connecter" : "Log In") 
                      : (language === 'fr' ? "Créer un compte" : "Sign Up")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Formulaire d'inscription */}
      {showRegistrationForm && (
        <RegistrationForm 
          onComplete={handleRegistrationComplete}
          onCancel={handleRegistrationCancel}
          userData={tempUserData}
        />
      )}
    </div>
  );
}

function FeatureCard({ emoji, title, description }) {
  // Vérifier si c'est la carte de collaboration
  const isCollaboration = title.includes("Collaboration") || title.includes("Real-time");
  
  // Mapper les icônes en fonction de l'emoji
  const getIconComponent = (emoji) => {
    switch(emoji) {
      case "✨":
        return <FaStar className="feature-icon-svg" />;
      case "🔍":
        return <FaSearch className="feature-icon-svg" />;
      case "📄":
        return <FaFileAlt className="feature-icon-svg" />;
      case "🌐":
        return <FaGlobe className="feature-icon-svg" />;
      case "📝":
        return <FaEdit className="feature-icon-svg" />;
      case "👥":
        return <FaUsers className="feature-icon-svg" />;
      default:
        return <FaStar className="feature-icon-svg" />;
    }
  };
  
  return (
    <div className={`feature-card ${isCollaboration ? 'coming-soon' : ''}`}>
      {isCollaboration && <div className="coming-soon-badge">{title.includes("Collaboration") ? "À venir" : "Coming soon"}</div>}
      <div className="feature-icon">
        {getIconComponent(emoji)}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
        <div className="faq-icon">{isOpen ? '−' : '+'}</div>
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
} 