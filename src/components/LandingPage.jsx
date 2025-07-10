import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import AnimatedBackground from './AnimatedBackground';
import { FileTextIcon } from './ui/file-text';
import { SquareActivityIcon } from './ui/square-activity';
import { SmartphoneChargingIcon } from './ui/smartphone-charging';
import { PrecisionTargetIcon } from './ui/precision-target';
import { SparklesIcon } from './ui/sparkles';
import { FilePenLineIcon } from './ui/file-pen-line';
import { GalleryVerticalEndIcon } from './ui/gallery-vertical-end';
import { DownloadIcon } from './ui/download';
import { RocketIcon } from './ui/rocket';
import { FileStackIcon } from './ui/file-stack';
import { ChartLineIcon } from './ui/chart-line';
import { CircleHelpIcon } from './ui/circle-help';
import { UserIcon } from './ui/user';
import { PrecisionLightbulbIcon } from './ui/precision-lightbulb';
import { PrecisionCameraIcon } from './ui/precision-camera';
import { SettingsGearIcon } from './ui/settings-gear';

export default function LandingPage({ onShowPreview, onShowSolution, onShowFAQ, onShowCookiePolicy, onShowPrivacyPolicy, onShowTermsOfUse, onShowAbout, language = 'fr', onLanguageChange }) {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const [showBlogTooltip, setShowBlogTooltip] = useState(false);
  const [showGuidesTooltip, setShowGuidesTooltip] = useState(false);
  const [pricingPeriod, setPricingPeriod] = useState('monthly');
  const dropdownTimeoutRef = useRef(null);
  const plansDropdownTimeoutRef = useRef(null);

  // Fonction pour accéder à l'application (page de connexion)
  const handleAccessApp = () => {
    window.location.href = 'https://app.mytekx.io';
  };

  // Définir les prix de base (mensuels)
  const basePrices = {
    fr: {
      basic: 4.99,
      standard: 7.99,
      premium: 19.99
    },
    en: {
      basic: 4.99,
      standard: 7.99,
      premium: 19.99
    }
  };

  // Calculer les prix selon la période
  const calculatePrice = (basePrice, period) => {
    if (period === 'yearly') {
      return (basePrice * 0.8).toFixed(2); // 20% de réduction
    }
    return basePrice.toFixed(2);
  };

  // Fonction pour formater les prix selon la langue
  const formatPrice = (price) => {
    if (language === 'fr') {
      return `${price}€`;
    }
    return `$${price}`;
  };

  // Fonction pour obtenir le texte de période
  const getPeriodText = () => {
    if (pricingPeriod === 'yearly') {
      return language === 'fr' ? '/mois' : '/mo';
    }
    return language === 'fr' ? '/mois' : '/mo';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      if (plansDropdownTimeoutRef.current) {
        clearTimeout(plansDropdownTimeoutRef.current);
      }
    };
  }, []);

  const content = {
    fr: {
      // Navigation
      plans: "PLANS",
      solutions: "SOLUTIONS", 
      faq: "FAQ",
      about: "À PROPOS",
      contact: "CONTACT",
      accessApp: "ACCÉDER À L'APP",
      
      // Solutions dropdown
      studentsTitle: "Étudiants",
      studentsDesc: "Optimisez vos études",
      teachersTitle: "Enseignants", 
      teachersDesc: "Créez des supports exceptionnels",
      researchersTitle: "Chercheurs",
      researchersDesc: "Accélérez vos publications",
      institutionsTitle: "Institutions",
      institutionsDesc: "Solutions à grande échelle",
      
      // Plans dropdown
      basicPlanTitle: "Basic",
      basicPlanDesc: "4.99€ - Plan d'entrée idéal",
      standardPlanTitle: "Standard",
      standardPlanDesc: "7.99€ - Plan idéal pour étudiants",
      premiumPlanTitle: "Premium",
      premiumPlanDesc: "19.99€ - Fonctionnalités avancées",
      proPlanTitle: "Pro",
      proPlanDesc: "Sur devis - Solutions personnalisées",
      
      // Hero section
      recognized: "RECONNU COMME LE MEILLEUR CONVERTISSEUR IA SLIDES-LATEX",
      heroTitle1: "Transformez automatiquement,",
      heroTitle2: "Structurez proprement,",
      heroTitle3: "Téléchargez instantanément",
      startNowBtn: "Commencez maintenant",
      scrollText: "Défiler",
      
      // Features section
      featuresTagline: "EFFICACITÉ, ÉVOLUTIVITÉ ET AGILITÉ",
      featuresTitle: "Capacités inégalées de conversion IA",
      feature1Name: "CONVERSION",
      feature2Name: "TRAITEMENT",
      feature3Name: "ANALYSE",
      feature4Name: "PRÉCISION",
      mainFeatureTitle: "Système de conversion intelligent",
      mainFeatureDescription: "Insights alimentés par l'IA qui prédisent les besoins des utilisateurs et offrent des expériences personnalisées de conversion PDF vers LaTeX.",
      
      // App Interface section
      appTagline: "TRANSFORMEZ VOS PRÉSENTATIONS EN LATEX",
      appTitle: "Interface Intuitive pour Conversion Automatique",
      appDescription: "MyTekX offre une plateforme complète de conversion alimentée par l'IA, transformant vos slides PDF en code LaTeX structuré et prêt à utiliser.",
      appFeatureTitle: "Conversion Intelligente Automatisée",
      appFeatureDescription: "Algorithmes d'IA avancés qui analysent, structurent et convertissent vos présentations avec une précision exceptionnelle.",
      
      // Customization section
      customizationTagline: "PERSONNALISEZ VOTRE DOCUMENT LATEX",
      customizationTitle: "Options Avancées de Personnalisation",
      customizationDescription: "Enrichissez vos documents avec des éléments pédagogiques, visuels et structurels pour créer des ressources d'apprentissage complètes.",
      
      // Pedagogical elements
      pedagogicalTitle: "Éléments pédagogiques",
      intuitionsTitle: "Inclure des intuitions",
      intuitionsDesc: "Ajoutez des explications intuitives pour faciliter la compréhension des concepts.",
      keyPointsTitle: "Inclure les points clés",
      keyPointsDesc: "Résumez les points essentiels avec formules et définitions importantes.",
      simplifiedTitle: "Inclure des explications simplifiées",
      simplifiedDesc: "Expliquez les concepts de manière accessible avec des analogies.",
      
      // Summaries
      summariesTitle: "Résumés et aperçus",
      summaryTitle: "Inclure des fiches de résumé",
      summaryDesc: "Créez des synthèses des concepts principaux de chaque section.",
      recapTitle: "Inclure une page de récapitulatif final",
      recapDesc: "Ajoutez un résumé complet des points clés du document entier.",
      
      // Visual elements
      visualTitle: "Éléments visuels",
      illustrationsTitle: "Inclure les descriptions d'illustrations",
      illustrationsDesc: "Générez des descriptions détaillées des éléments visuels.",
      graphsTitle: "Inclure les graphiques",
      graphsDesc: "Intégrez les graphiques et diagrammes dans le document.",
      shapesTitle: "Inclure les formes géométriques",
      shapesDesc: "Reproduisez les formes avec du code LaTeX/TikZ.",
      imagesTitle: "Extraire et inclure les images réelles",
      imagesDesc: "Extrayez et intégrez les images originales.",
      
      // Other features
      otherTitle: "Autres fonctionnalités",
      definitionsTitle: "Inclure les définitions",
      definitionsDesc: "Ajoutez les définitions clés de chaque section.",
      highlighterTitle: "Mode Surligneur IA",
      highlighterDesc: "Mettez en évidence automatiquement les éléments importants.",
      
      // Show more button
      showMore: "Voir plus",
      showLess: "Voir moins",
      
      // Examples section
      examplesTagline: "DÉCOUVREZ LA PUISSANCE DE MYTEKX",
      examplesTitle: "Exemples de Conversion en Action",
      examplesDescription: "Voyez comment MyTekX transforme vos présentations PDF en documents LaTeX structurés et professionnels.",
      beforeTitle: "Avant : Slide PDF",
      afterTitle: "Après : Document LaTeX",
      conversionNote: "Conversion automatique avec IA avancée",
      moreExamples: "Retrouvez plus d'exemples sur",
      driveLink: "Google Drive",
      
      // CTA Section
      ctaTagline: "REJOIGNEZ L'AVENTURE MYTEKX",
      ctaTitle: "Transformez Votre Façon de Créer des Documents",
      ctaDescription: "Rejoignez des dixaines d'utilisateurs qui révolutionnent déjà leur workflow avec MyTekX.",
      ctaButton: "Commencer Maintenant",
      
      // Pricing Section
      pricingTitle: "Plans Individuels",
      pricingMonthly: "MENSUEL",
      pricingYearly: "ANNUEL (ÉCONOMISEZ 20%)",
      pricingPeriod: "/mois",
      
      basicPlan: "Basic",
      basicPrice: "4,99€",
      basicIncludes: "Inclut",
      basicFeature1: "1 contenu spécial maximum",
      basicFeature2: "30 pages par mois",
      basicFeature3: "Conversion PDF vers LaTeX",
      basicDownload: "Commencer",
      basicOthers: "Gratuit",
      
      standardPlan: "Standard",
      standardPrice: "7,99€",
      standardEverything: "Tout du Basic, plus",
      standardFeature1: "2 contenus spéciaux maximum",
      standardFeature2: "100 pages par mois",
      standardFeature3: "Options pédagogiques avancées",
      standardFeature4: "Support prioritaire",
      standardFeature5: "Personnalisation des documents",
      standardGetPlan: "Obtenir Standard",
      standardMoreInfo: "Plus d'infos",
      
      premiumPlan: "Premium",
      premiumPrice: "19,99€",
      premiumEverything: "Tout du Standard, plus",
      premiumFeature1: "Contenus spéciaux illimités",
      premiumFeature2: "400 pages par mois",
      premiumFeature3: "Export multiple formats",
      premiumFeature4: "Intégrations avancées",
      premiumGetPlan: "Obtenir Premium",
      
      proPlan: "Pro",
      proPrice: "Sur devis",
      proEverything: "Solutions personnalisées",
      proFeature1: "Volume illimité",
      proFeature2: "Intégrations API",
      proFeature3: "Support dédié",
      proFeature4: "Déploiement sur site",
      proGetPlan: "Nous contacter",
      
      // Footer
      footerPlans: "Plans",
      footerSolutions: "Solutions", 
      footerSupport: "Support",
      footerCompany: "Entreprise",
      footerLegals: "Légal",
      footerBasic: "Basic",
      footerStandard: "Standard",
      footerPremium: "Premium",
      footerPro: "Pro",
      footerStudents: "Étudiants",
      footerTeachers: "Enseignants",
      footerResearchers: "Chercheurs",
      footerInstitutions: "Institutions",
      footerFaq: "FAQ",
      footerGuides: "Guides",
      footerExamples: "Exemples",
      footerAbout: "À Propos",
      footerContact: "Contact",
      footerBlog: "Blog",
      footerCookie: "Politique de Cookies",
      footerPrivacy: "Politique de Confidentialité",
      footerTerms: "Conditions d'Utilisation",
      footerConclusion: "Révolutionnez Votre Workflow.",
      footerCredit: "Design & Dev by",
      comingSoon: "Bientôt disponible",
    },
    en: {
      // Navigation
      plans: "PLANS",
      solutions: "SOLUTIONS",
      faq: "FAQ",
      about: "ABOUT", 
      contact: "CONTACT",
      accessApp: "ACCESS APP",
      
      // Solutions dropdown
      studentsTitle: "Students",
      studentsDesc: "Optimize your studies",
      teachersTitle: "Teachers", 
      teachersDesc: "Create exceptional materials",
      researchersTitle: "Researchers",
      researchersDesc: "Accelerate your publications",
      institutionsTitle: "Institutions",
      institutionsDesc: "Large-scale solutions",
      
      // Plans dropdown
      basicPlanTitle: "Basic",
      basicPlanDesc: "$4.99 - Perfect entry plan",
      standardPlanTitle: "Standard",
      standardPlanDesc: "$7.99 - Best plan for students",
      premiumPlanTitle: "Premium",
      premiumPlanDesc: "$19.99 - Advanced features",
      proPlanTitle: "Pro",
      proPlanDesc: "Custom Quote - Personalized solutions",
      
      // Hero section
      recognized: "RECOGNIZED AS THE BEST SLIDES-TO-LATEX AI CONVERTER",
      heroTitle1: "Transform automatically",
      heroTitle2: "Structure them properly",
      heroTitle3: "Download instantly",
      startNowBtn: "Get Started Now",
      scrollText: "Scroll",
      
      // Features section
      featuresTagline: "EFFICIENCY, SCALABILITY, AND AGILITY",
      featuresTitle: "Unparalleled AI Conversion Capabilities",
      feature1Name: "CONVERSION",
      feature2Name: "PROCESSING",
      feature3Name: "ANALYSIS",
      feature4Name: "PRECISION",
      mainFeatureTitle: "Intelligent Conversion System",
      mainFeatureDescription: "AI-powered insights that predict user needs and drive personalized PDF to LaTeX conversion experiences.",
      
      // App Interface section
      appTagline: "TRANSFORM YOUR PRESENTATIONS TO LATEX",
      appTitle: "Intuitive Interface for Automatic Conversion",
      appDescription: "MyTekX provides a comprehensive AI-powered conversion platform, transforming your PDF slides into structured, ready-to-use LaTeX code.",
      appFeatureTitle: "Automated Intelligent Conversion",
      appFeatureDescription: "Advanced AI algorithms that analyze, structure, and convert your presentations with exceptional precision.",
      
      // Customization section
      customizationTagline: "CUSTOMIZE YOUR LATEX DOCUMENT",
      customizationTitle: "Advanced Customization Options",
      customizationDescription: "Enhance your documents with pedagogical, visual, and structural elements to create comprehensive learning resources.",
      
      // Pedagogical elements
      pedagogicalTitle: "Pedagogical elements",
      intuitionsTitle: "Include intuitions",
      intuitionsDesc: "Add intuitive explanations to facilitate concept understanding.",
      keyPointsTitle: "Include key points",
      keyPointsDesc: "Summarize essential points with important formulas and definitions.",
      simplifiedTitle: "Include simplified explanations",
      simplifiedDesc: "Explain concepts accessibly using analogies.",
      
      // Summaries
      summariesTitle: "Summaries and Overviews",
      summaryTitle: "Include summary sheets",
      summaryDesc: "Create syntheses of main concepts from each section.",
      recapTitle: "Include final recap page",
      recapDesc: "Add a complete summary of key points from the entire document.",
      
      // Visual elements
      visualTitle: "Visual elements",
      illustrationsTitle: "Include illustrations descriptions",
      illustrationsDesc: "Generate detailed descriptions of visual elements.",
      graphsTitle: "Include graphs",
      graphsDesc: "Integrate graphs and diagrams into the document.",
      shapesTitle: "Include geometric shapes",
      shapesDesc: "Reproduce shapes using LaTeX/TikZ code.",
      imagesTitle: "Extract and include real images",
      imagesDesc: "Extract and integrate original images.",
      
      // Other features
      otherTitle: "Other features",
      definitionsTitle: "Include definitions",
      definitionsDesc: "Add key definitions from each section.",
      highlighterTitle: "AI Highlighter Mode",
      highlighterDesc: "Automatically highlight important elements.",
      
      // Show more button
      showMore: "Show more",
      showLess: "Show less",
      
      // Examples section
      examplesTagline: "DISCOVER THE POWER OF MYTEKX",
      examplesTitle: "Conversion Examples in Action",
      examplesDescription: "See how MyTekX transforms your PDF presentations into structured and professional LaTeX documents.",
      beforeTitle: "Before: PDF Slide",
      afterTitle: "After: LaTeX Document",
      conversionNote: "Automatic conversion with advanced AI",
      moreExamples: "Find more examples on",
      driveLink: "Google Drive",
      
      // CTA Section
      ctaTagline: "JOIN THE MYTEKX ADVENTURE",
      ctaTitle: "Transform Your Document Creation Process",
      ctaDescription: "Join thousands of users already revolutionizing their workflow with MyTekX.",
      ctaButton: "Get Started Now",
      
      // Pricing Section
      pricingTitle: "Individual Plans",
      pricingMonthly: "MONTHLY",
      pricingYearly: "YEARLY (SAVE 20%)",
      pricingPeriod: "/mo",
      
      basicPlan: "Basic",
      basicPrice: "$4.99",
      basicIncludes: "Includes",
      basicFeature1: "1 special content maximum",
      basicFeature2: "30 pages per month",
      basicFeature3: "PDF to LaTeX conversion",
      basicDownload: "Get Started",
      basicOthers: "Free",
      
      standardPlan: "Standard",
      standardPrice: "$7.99",
      standardEverything: "Everything in Basic, plus",
      standardFeature1: "2 special contents maximum",
      standardFeature2: "100 pages per month",
      standardFeature3: "Advanced pedagogical options",
      standardFeature4: "Priority support",
      standardFeature5: "Document customization",
      standardGetPlan: "Get Standard",
      standardMoreInfo: "More info",
      
      premiumPlan: "Premium",
      premiumPrice: "$19.99",
      premiumEverything: "Everything in Standard, plus",
      premiumFeature1: "Unlimited special contents",
      premiumFeature2: "400 pages per month",
      premiumFeature3: "Multiple export formats",
      premiumFeature4: "Advanced integrations",
      premiumGetPlan: "Get Premium",
      
      proPlan: "Pro",
      proPrice: "Custom Quote",
      proEverything: "Personalized solutions",
      proFeature1: "Unlimited volume",
      proFeature2: "API integrations",
      proFeature3: "Dedicated support",
      proFeature4: "On-site deployment",
      proGetPlan: "Contact us",
      
      // Footer
      footerPlans: "Plans",
      footerSolutions: "Solutions",
      footerSupport: "Support", 
      footerCompany: "Company",
      footerLegals: "Legal",
      footerBasic: "Basic",
      footerStandard: "Standard",
      footerPremium: "Premium",
      footerPro: "Pro",
      footerStudents: "Students",
      footerTeachers: "Teachers",
      footerResearchers: "Researchers",
      footerInstitutions: "Institutions",
      footerFaq: "FAQ",
      footerGuides: "Guides",
      footerExamples: "Examples",
      footerAbout: "About",
      footerContact: "Contact",
      footerBlog: "Blog",
      footerCookie: "Cookie Policy",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms of Use",
      footerConclusion: "Revolutionize Your Workflow.",
      footerCredit: "Design & Dev by",
      comingSoon: "Coming soon",
    }
  };

  const t = content[language];

  return (
    <div className="hero-container">
      {/* Bandeau d'avertissement bêta défilant */}
      <div className="beta-warning-banner">
        <div className="beta-warning-content">
          <span className="beta-warning-text">
            {language === 'fr' ? 
              '🚧 VERSION BÊTA - Cette version est encore en développement. Certaines fonctionnalités peuvent être instables. Nous travaillons activement à l\'améliorer. Merci de votre patience ! 🚧' : 
              '🚧 BETA VERSION - This version is still in development. Some features may be unstable. We are actively working to improve it. Thank you for your patience! 🚧'
            }
          </span>
        </div>
      </div>
      
      <AnimatedBackground />
      <header className="hero-header">
        <div className="logo">
          <span className="theta-xi">ΘΞ</span>
          <span className="mytekx">MYTEKX.io</span>
        </div>
        
        <nav className="hero-nav">
          <ul>
            <li 
              className="nav-dropdown"
              onMouseEnter={() => {
                if (plansDropdownTimeoutRef.current) {
                  clearTimeout(plansDropdownTimeoutRef.current);
                }
                setShowPlansDropdown(true);
              }}
              onMouseLeave={() => {
                plansDropdownTimeoutRef.current = setTimeout(() => {
                  setShowPlansDropdown(false);
                }, 100);
              }}
            >
              {t.plans} <span>+</span>
                             {showPlansDropdown && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => {
                    if (plansDropdownTimeoutRef.current) {
                      clearTimeout(plansDropdownTimeoutRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    plansDropdownTimeoutRef.current = setTimeout(() => {
                      setShowPlansDropdown(false);
                    }, 100);
                  }}
                >
                  <div className="dropdown-item">
                    <div className="dropdown-title">{t.basicPlanTitle}</div>
                    <div className="dropdown-desc">{t.basicPlanDesc}</div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-title">{t.standardPlanTitle}</div>
                    <div className="dropdown-desc">{t.standardPlanDesc}</div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-title">{t.premiumPlanTitle}</div>
                    <div className="dropdown-desc">{t.premiumPlanDesc}</div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-title">{t.proPlanTitle}</div>
                    <div className="dropdown-desc">{t.proPlanDesc}</div>
                  </div>
                </div>
              )}
            </li>
            <li 
              className="nav-dropdown"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) {
                  clearTimeout(dropdownTimeoutRef.current);
                }
                setShowSolutionsDropdown(true);
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => {
                  setShowSolutionsDropdown(false);
                }, 100);
              }}
            >
              {t.solutions} <span>+</span>
              {showSolutionsDropdown && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setShowSolutionsDropdown(false);
                    }, 100);
                  }}
                >
                  <div className="dropdown-item" onClick={() => onShowSolution && onShowSolution('student')}>
                    <div className="dropdown-title">{t.studentsTitle}</div>
                    <div className="dropdown-desc">{t.studentsDesc}</div>
                  </div>
                  <div className="dropdown-item" onClick={() => onShowSolution && onShowSolution('teacher')}>
                    <div className="dropdown-title">{t.teachersTitle}</div>
                    <div className="dropdown-desc">{t.teachersDesc}</div>
                  </div>
                  <div className="dropdown-item" onClick={() => onShowSolution && onShowSolution('researcher')}>
                    <div className="dropdown-title">{t.researchersTitle}</div>
                    <div className="dropdown-desc">{t.researchersDesc}</div>
                  </div>
                  <div className="dropdown-item" onClick={() => onShowSolution && onShowSolution('institution')}>
                    <div className="dropdown-title">{t.institutionsTitle}</div>
                    <div className="dropdown-desc">{t.institutionsDesc}</div>
                  </div>
                </div>
              )}
            </li>
            <li onClick={onShowFAQ} style={{ cursor: 'pointer' }}>{t.faq}</li>
            <li onClick={onShowAbout} style={{ cursor: 'pointer' }}>{t.about}</li>
            <li 
              onClick={() => window.open('mailto:contact@mytekx.io?subject=Contact%20MyTekX', '_blank')} 
              style={{ cursor: 'pointer' }}
            >
              {t.contact}
            </li>
          </ul>
        </nav>
        
        <div className="hero-actions">
          {/* Bouton principal pour accéder à l'application */}
          <button 
            className="btn-app-access"
            onClick={handleAccessApp}
          >
            {t.accessApp}
          </button>
        </div>
      </header>

      <main className="hero-main">
        <p className="tagline">{t.recognized}</p>
        <h1 className="hero-title">
          {t.heroTitle1}<br />
          {t.heroTitle2}<br />
          {t.heroTitle3}
        </h1>
        <div className="hero-buttons">
          <button 
            className="btn-blue"
            onClick={handleAccessApp}
          >
            {t.startNowBtn} <span>&rarr;</span>
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">{t.scrollText}</span>
          <div className="scroll-arrow"></div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="features-container">
          <div className="features-header">
            <p className="features-tagline">{t.featuresTagline}</p>
            <h2 className="features-title">{t.featuresTitle}</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card pink">
              <div className="feature-icon">
                <FileTextIcon size={32} />
              </div>
              <h3 className="feature-name">{t.feature1Name}</h3>
            </div>
            
            <div className="feature-card yellow">
              <div className="feature-icon">
                <SmartphoneChargingIcon size={32} />
              </div>
              <h3 className="feature-name">{t.feature2Name}</h3>
            </div>
            
            <div className="feature-card green">
              <div className="feature-icon">
                <SquareActivityIcon size={32} />
              </div>
              <h3 className="feature-name">{t.feature3Name}</h3>
            </div>
            
            <div className="feature-card blue">
              <div className="feature-icon">
                <PrecisionTargetIcon size={32} />
              </div>
              <h3 className="feature-name">{t.feature4Name}</h3>
            </div>
          </div>

          <div className="main-feature-card">
            <div className="main-feature-content">
              <h3 className="main-feature-title">{t.mainFeatureTitle}</h3>
              <p className="main-feature-description">{t.mainFeatureDescription}</p>
            </div>
            <div className="main-feature-visual">
              <div className="mockup-container">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="mockup-content">
                  <div className="conversion-flow">
                    <div className="flow-step">
                      <div className="step-icon">
                        <FileTextIcon size={24} />
                      </div>
                      <span>PDF</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step">
                      <div className="step-icon">
                        <SparklesIcon size={24} />
                      </div>
                      <span>{language === 'en' ? 'AI' : 'IA'}</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step">
                      <div className="step-icon">
                        <FilePenLineIcon size={24} />
                      </div>
                      <span>LaTeX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Interface Section */}
      <section className="app-interface-section">
        <div className="app-interface-container">
          <div className="app-interface-content">
            <div className="app-interface-text">
              <p className="app-interface-tagline">{t.appTagline}</p>
              <h2 className="app-interface-title">{t.appTitle}</h2>
              <p className="app-interface-description">{t.appDescription}</p>
              
              <div className="app-feature-card">
                <h3 className="app-feature-title">{t.appFeatureTitle}</h3>
                <p className="app-feature-description">{t.appFeatureDescription}</p>
              </div>
            </div>
            
            <div className="app-interface-visual">
              <div className="app-mockup">
                <div className="app-mockup-header">
                  <div className="app-logo">
                    <span className="theta-xi">ΘΞ</span>
                  </div>
                  <div className="app-nav-tabs">
                    <div className="app-tab active">General</div>
                    <div className="app-tab">Languages</div>
                    <div className="app-tab">Layout</div>
                    <div className="app-tab">Content</div>
                    <div className="app-tab">AI</div>
                  </div>
                </div>
                
                <div className="app-mockup-content">
                  <div className="app-sidebar">
                    <div className="sidebar-icons">
                      <div className="sidebar-icon active">
                        <RocketIcon size={20} />
                      </div>
                      <div className="sidebar-icon">
                        <ChartLineIcon size={20} />
                      </div>
                      <div className="sidebar-icon">
                        <FileStackIcon size={20} />
                      </div>
                      <div className="sidebar-icon">
                        <CircleHelpIcon size={20} />
                      </div>
                      <div className="sidebar-icon">
                        <UserIcon size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="app-main-content">
                    <div className="upload-section">
                      <h3>• PDF File</h3>
                      <div className="upload-area">
                        <div className="upload-icon">
                          <DownloadIcon size={32} />
                        </div>
                        <span>Importer un fichier PDF ou glisser</span>
                      </div>
                    </div>
                    
                    <div className="document-title-section">
                      <h3>• Document Title</h3>
                      <div className="input-field"></div>
                    </div>
                    
                    <div className="document-type-section">
                      <h3>• What type of document would you like to convert?</h3>
                      <div className="document-options">
                        <div className="document-option selected">
                          <div className="option-icon">
                            <GalleryVerticalEndIcon size={20} />
                          </div>
                          <div className="option-content">
                            <div className="option-title">Slides</div>
                            <div className="option-subtitle">Presentations, slides, and lecture notes</div>
                          </div>
                          <div className="option-check">✓</div>
                        </div>
                        <div className="document-option">
                          <div className="option-icon">
                            <FileTextIcon size={20} />
                          </div>
                          <div className="option-content">
                            <div className="option-title">Text document</div>
                            <div className="option-subtitle">Articles, reports, and text documents</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="generate-button">
                      <button className="btn-generate">
                        <RocketIcon size={18} />
                        Generate document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Options Section */}
      <section className="customization-section">
        <div className="customization-container">
          <div className="customization-header">
            <p className="customization-tagline">{t.customizationTagline}</p>
            <h2 className="customization-title">{t.customizationTitle}</h2>
            <p className="customization-description">{t.customizationDescription}</p>
          </div>
          
          <div className="customization-grid">
            {/* Pedagogical Elements */}
            <div className="customization-category">
              <div className="category-header">
                <div className="category-icon">
                  <PrecisionLightbulbIcon size={24} />
                </div>
                <h3 className="category-title">{t.pedagogicalTitle}</h3>
              </div>
              <div className="category-options">
                <div className="option-item">
                  <div className="option-info">
                    <h4 className="option-title">{t.intuitionsTitle}</h4>
                    <p className="option-description">{t.intuitionsDesc}</p>
                  </div>
                  <div className="option-toggle active"></div>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h4 className="option-title">{t.keyPointsTitle}</h4>
                    <p className="option-description">{t.keyPointsDesc}</p>
                  </div>
                  <div className="option-toggle active"></div>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h4 className="option-title">{t.simplifiedTitle}</h4>
                    <p className="option-description">{t.simplifiedDesc}</p>
                  </div>
                  <div className="option-toggle active"></div>
                </div>
              </div>
            </div>

            {/* Summaries and Overviews */}
            <div className="customization-category">
              <div className="category-header">
                <div className="category-icon">
                  <FileTextIcon size={24} />
                </div>
                <h3 className="category-title">{t.summariesTitle}</h3>
              </div>
              <div className="category-options">
                <div className="option-item">
                  <div className="option-info">
                    <h4 className="option-title">{t.summaryTitle}</h4>
                    <p className="option-description">{t.summaryDesc}</p>
                  </div>
                  <div className="option-toggle active"></div>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h4 className="option-title">{t.recapTitle}</h4>
                    <p className="option-description">{t.recapDesc}</p>
                  </div>
                  <div className="option-toggle active"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Show More Button */}
          <div className="show-more-container">
            <button 
              className="show-more-btn"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
            >
              {showMoreOptions ? t.showLess : t.showMore}
              <span className={`show-more-icon ${showMoreOptions ? 'rotated' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {/* Additional Options (Hidden by default) */}
          <div className={`additional-options ${showMoreOptions ? 'visible' : ''}`}>
            <div className="customization-grid">
              {/* Visual Elements */}
              <div className="customization-category">
                <div className="category-header">
                  <div className="category-icon">
                    <PrecisionCameraIcon size={24} />
                  </div>
                  <h3 className="category-title">{t.visualTitle}</h3>
                </div>
                <div className="category-options">
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.illustrationsTitle}</h4>
                      <p className="option-description">{t.illustrationsDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.graphsTitle}</h4>
                      <p className="option-description">{t.graphsDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.shapesTitle}</h4>
                      <p className="option-description">{t.shapesDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.imagesTitle}</h4>
                      <p className="option-description">{t.imagesDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                </div>
              </div>

              {/* Other Features */}
              <div className="customization-category">
                <div className="category-header">
                  <div className="category-icon">
                    <SettingsGearIcon size={24} />
                  </div>
                  <h3 className="category-title">{t.otherTitle}</h3>
                </div>
                <div className="category-options">
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.definitionsTitle}</h4>
                      <p className="option-description">{t.definitionsDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                  <div className="option-item">
                    <div className="option-info">
                      <h4 className="option-title">{t.highlighterTitle}</h4>
                      <p className="option-description">{t.highlighterDesc}</p>
                    </div>
                    <div className="option-toggle active"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="examples-section">
        <div className="examples-container">
          <div className="examples-header">
            <p className="examples-tagline">{t.examplesTagline}</p>
            <h2 className="examples-title">{t.examplesTitle}</h2>
            <p className="examples-description">{t.examplesDescription}</p>
            <p className="examples-more-link">
              {t.moreExamples} <a href="https://drive.google.com/drive/folders/1TomrIGAcNX446yJmndwGIx3LLHVgHFc6" target="_blank" rel="noopener noreferrer" className="drive-link">{t.driveLink}</a>
            </p>
          </div>
          
          <div className="examples-showcase">
            <div className="example-comparison">
              <div className="example-item before">
                <div className="example-label">
                  <h3 className="example-title">{t.beforeTitle}</h3>
                  <div className="example-badge">PDF</div>
                </div>
                <div className="example-image-container">
                  <img 
                    src="/assets/brainslide.png" 
                    alt="Slide PDF original"
                    className="example-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FileTextIcon size={32} />
                      <span>Présentation originale</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="conversion-arrow">
                <div className="arrow-container">
                  <RocketIcon size={24} />
                  <div className="arrow-line"></div>
                  <span className="conversion-text">{t.conversionNote}</span>
                </div>
              </div>

              <div className="example-item after">
                <div className="example-label">
                  <h3 className="example-title">{t.afterTitle}</h3>
                  <div className="example-badge latex">LaTeX</div>
                </div>
                <div className="example-image-container">
                  <img 
                    src="/assets/brainlatex.png" 
                    alt="Document LaTeX généré"
                    className="example-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FilePenLineIcon size={32} />
                      <span>Document structuré</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="examples-features">
              <div className="feature-highlight">
                <SparklesIcon size={20} />
                <span>Conversion IA intelligente</span>
              </div>
              <div className="feature-highlight">
                <PrecisionTargetIcon size={20} />
                <span>Formatage précis</span>
              </div>
              <div className="feature-highlight">
                <DownloadIcon size={20} />
                <span>Prêt à utiliser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <p className="cta-tagline">{t.ctaTagline}</p>
            <h2 className="cta-title">{t.ctaTitle}</h2>
            <p className="cta-description">{t.ctaDescription}</p>
            <button className="cta-button" onClick={handleAccessApp}>
              {t.ctaButton}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-header">
            <h2 className="pricing-title">{t.pricingTitle}</h2>
            <div className="pricing-toggle">
              <button 
                className={`pricing-toggle-btn ${pricingPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setPricingPeriod('monthly')}
              >
                {t.pricingMonthly}
              </button>
              <button 
                className={`pricing-toggle-btn ${pricingPeriod === 'yearly' ? 'active' : ''}`}
                onClick={() => setPricingPeriod('yearly')}
              >
                {t.pricingYearly}
              </button>
            </div>
          </div>

          <div className="pricing-cards">
            {/* Basic Plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3 className="pricing-card-title">{t.basicPlan}</h3>
                <div className="pricing-card-price">
                  <span className="price-amount">{formatPrice(calculatePrice(basePrices[language].basic, pricingPeriod))}</span>
                  <span className="price-period">{getPeriodText()}</span>
                </div>
              </div>
              <div className="pricing-card-body">
                <p className="pricing-card-subtitle">{t.basicIncludes}</p>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.basicFeature1}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.basicFeature2}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.basicFeature3}
                  </li>
                </ul>
              </div>
              <div className="pricing-card-footer">
                <button className="pricing-btn-secondary" onClick={handleAccessApp}>
                  {t.basicDownload}
                </button>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="pricing-card pricing-card-featured">
              <div className="pricing-card-header">
                <h3 className="pricing-card-title">{t.standardPlan}</h3>
                <div className="pricing-card-price">
                  <span className="price-amount">{formatPrice(calculatePrice(basePrices[language].standard, pricingPeriod))}</span>
                  <span className="price-period">{getPeriodText()}</span>
                </div>
              </div>
              <div className="pricing-card-body">
                <p className="pricing-card-subtitle">{t.standardEverything}</p>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.standardFeature1}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.standardFeature2}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.standardFeature3}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.standardFeature4}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.standardFeature5}
                  </li>
                </ul>
              </div>
              <div className="pricing-card-footer">
                <button className="pricing-btn-primary" onClick={handleAccessApp}>{t.standardGetPlan}</button>
                <button className="pricing-btn-link" onClick={handleAccessApp}>{t.standardMoreInfo} ↗</button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3 className="pricing-card-title">{t.premiumPlan}</h3>
                <div className="pricing-card-price">
                  <span className="price-amount">{formatPrice(calculatePrice(basePrices[language].premium, pricingPeriod))}</span>
                  <span className="price-period">{getPeriodText()}</span>
                </div>
              </div>
              <div className="pricing-card-body">
                <p className="pricing-card-subtitle">{t.premiumEverything}</p>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.premiumFeature1}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.premiumFeature2}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.premiumFeature3}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.premiumFeature4}
                  </li>
                </ul>
              </div>
              <div className="pricing-card-footer">
                <button className="pricing-btn-secondary" onClick={handleAccessApp}>{t.premiumGetPlan}</button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3 className="pricing-card-title">{t.proPlan}</h3>
                <div className="pricing-card-price">
                  <span className="price-amount">{t.proPrice}</span>
                </div>
              </div>
              <div className="pricing-card-body">
                <p className="pricing-card-subtitle">{t.proEverything}</p>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.proFeature1}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.proFeature2}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.proFeature3}
                  </li>
                  <li className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {t.proFeature4}
                  </li>
                </ul>
              </div>
              <div className="pricing-card-footer">
                <button className="pricing-btn-secondary" onClick={() => window.open('mailto:contact@mytekx.io?subject=Devis%20Plan%20Pro', '_blank')}>
                  {t.proGetPlan}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-title">{t.footerPlans}</h3>
              <ul className="footer-links">
                <li className="footer-link">{t.footerBasic}</li>
                <li className="footer-link">{t.footerStandard}</li>
                <li className="footer-link">{t.footerPremium}</li>
                <li className="footer-link">{t.footerPro}</li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{t.footerSolutions}</h3>
              <ul className="footer-links">
                <li className="footer-link">{t.footerStudents}</li>
                <li className="footer-link">{t.footerTeachers}</li>
                <li className="footer-link">{t.footerResearchers}</li>
                <li className="footer-link">{t.footerInstitutions}</li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{t.footerSupport}</h3>
              <ul className="footer-links">
                <li className="footer-link" onClick={onShowFAQ}>{t.footerFaq}</li>
                <li 
                  className="footer-link footer-link-with-tooltip"
                  onMouseEnter={() => setShowGuidesTooltip(true)}
                  onMouseLeave={() => setShowGuidesTooltip(false)}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  {t.footerGuides}
                  {showGuidesTooltip && (
                    <div className="footer-tooltip">
                      {t.comingSoon}
                    </div>
                  )}
                </li>
                <li className="footer-link">
                  <a href="https://drive.google.com/drive/folders/1TomrIGAcNX446yJmndwGIx3LLHVgHFc6" target="_blank" rel="noopener noreferrer" className="footer-external-link">
                    {t.footerExamples}
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title highlight">{t.footerCompany}</h3>
              <ul className="footer-links">
                <li 
                  className="footer-link highlight" 
                  onClick={onShowAbout} 
                  style={{ cursor: 'pointer' }}
                >
                  {t.footerAbout}
                </li>
                <li 
                  className="footer-link"
                  onClick={() => window.open('mailto:contact@mytekx.io?subject=Contact%20MyTekX', '_blank')} 
                  style={{ cursor: 'pointer' }}
                >
                  {t.footerContact}
                </li>
                <li 
                  className="footer-link footer-link-with-tooltip"
                  onMouseEnter={() => setShowBlogTooltip(true)}
                  onMouseLeave={() => setShowBlogTooltip(false)}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  {t.footerBlog}
                  {showBlogTooltip && (
                    <div className="footer-tooltip">
                      {t.comingSoon}
                    </div>
                  )}
                </li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">{t.footerLegals}</h3>
              <ul className="footer-links">
                <li className="footer-link" onClick={onShowCookiePolicy} style={{ cursor: 'pointer' }}>{t.footerCookie}</li>
                <li className="footer-link" onClick={onShowPrivacyPolicy} style={{ cursor: 'pointer' }}>{t.footerPrivacy}</li>
                <li className="footer-link" onClick={onShowTermsOfUse} style={{ cursor: 'pointer' }}>{t.footerTerms}</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-conclusion">
              <h2 className="footer-conclusion-text">{t.footerConclusion}</h2>
            </div>
            
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">ΘΞ</span>
                <span className="footer-logo-text">mytekx.io</span>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="footer-language-toggle">
              <button 
                className={`footer-lang-btn ${language === 'fr' ? 'active' : ''}`}
                onClick={() => onLanguageChange && onLanguageChange('fr')}
              >
                FR
              </button>
              <button 
                className={`footer-lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => onLanguageChange && onLanguageChange('en')}
              >
                EN
              </button>
            </div>
            
            <div className="footer-credit">
              <span>{t.footerCredit} MyTekX</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 