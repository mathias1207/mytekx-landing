import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FaSearch, FaClock, FaChartLine, FaUsers, 
  FaBook, FaLightbulb, FaCheck, FaArrowLeft,
  FaFileAlt, FaExchangeAlt, FaBrain, FaClipboardCheck,
  FaGraduationCap, FaUniversity, FaGlobe
} from 'react-icons/fa';
import './ResearcherSolution.css';

export default function ResearcherSolution({ onBack }) {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "MyTekX pour les chercheurs",
      subtitle: "Optimisez la rédaction et le partage de vos travaux de recherche",
      mainBenefits: [
        {
          icon: <FaClock />,
          title: "Gain de temps",
          description: "Convertissez rapidement vos présentations en articles de recherche structurés"
        },
        {
          icon: <FaFileAlt />,
          title: "Format académique",
          description: "Générez automatiquement des documents conformes aux standards académiques"
        },
        {
          icon: <FaGlobe />,
          title: "Collaboration internationale",
          description: "Facilitez le partage et la collaboration avec vos collègues chercheurs"
        },
        {
          icon: <FaBrain />,
          title: "Intelligence artificielle",
          description: "Bénéficiez d'une assistance IA pour améliorer la clarté de vos publications"
        }
      ],
      features: [
        {
          icon: <FaSearch />,
          title: "Analyse bibliographique",
          description: "Gérez efficacement vos références et citations avec une intégration BibTeX"
        },
        {
          icon: <FaExchangeAlt />,
          title: "Export multi-format",
          description: "Exportez vos travaux en LaTeX, PDF, ou formats spécifiques aux journaux"
        },
        {
          icon: <FaChartLine />,
          title: "Visualisation de données",
          description: "Intégrez et formatez automatiquement vos graphiques et tableaux"
        },
        {
          icon: <FaUsers />,
          title: "Révision collaborative",
          description: "Facilitez la révision par les pairs et le travail d'équipe"
        }
      ],
      useCases: [
        {
          title: "Publications académiques",
          description: "Transformez vos présentations en articles prêts pour la soumission"
        },
        {
          title: "Conférences scientifiques",
          description: "Préparez rapidement des supports adaptés aux conférences"
        },
        {
          title: "Thèses et mémoires",
          description: "Structurez et formatez efficacement vos travaux de recherche"
        }
      ],
      cta: {
        title: "Prêt à révolutionner votre processus de publication ?",
        subtitle: "Rejoignez les chercheurs qui utilisent déjà MyTekX",
        button: "Commencer gratuitement"
      }
    },
    en: {
      title: "MyTekX for Researchers",
      subtitle: "Optimize the writing and sharing of your research work",
      mainBenefits: [
        {
          icon: <FaClock />,
          title: "Time saving",
          description: "Quickly convert your presentations into structured research papers"
        },
        {
          icon: <FaFileAlt />,
          title: "Academic format",
          description: "Automatically generate documents compliant with academic standards"
        },
        {
          icon: <FaGlobe />,
          title: "International collaboration",
          description: "Facilitate sharing and collaboration with fellow researchers"
        },
        {
          icon: <FaBrain />,
          title: "Artificial Intelligence",
          description: "Benefit from AI assistance to improve your publications' clarity"
        }
      ],
      features: [
        {
          icon: <FaSearch />,
          title: "Bibliographic analysis",
          description: "Efficiently manage your references and citations with BibTeX integration"
        },
        {
          icon: <FaExchangeAlt />,
          title: "Multi-format export",
          description: "Export your work in LaTeX, PDF, or journal-specific formats"
        },
        {
          icon: <FaChartLine />,
          title: "Data visualization",
          description: "Automatically integrate and format your graphs and tables"
        },
        {
          icon: <FaUsers />,
          title: "Collaborative review",
          description: "Facilitate peer review and team collaboration"
        }
      ],
      useCases: [
        {
          title: "Academic publications",
          description: "Transform your presentations into submission-ready papers"
        },
        {
          title: "Scientific conferences",
          description: "Quickly prepare conference-ready materials"
        },
        {
          title: "Theses and dissertations",
          description: "Efficiently structure and format your research work"
        }
      ],
      cta: {
        title: "Ready to revolutionize your publication process?",
        subtitle: "Join researchers already using MyTekX",
        button: "Start for free"
      }
    }
  };

  const currentContent = content[language] || content.fr;

  return (
    <div className="researcher-solution">
        <div className="fixed-back-button">
        <button className="back-icon" onClick={onBack}>
            <FaArrowLeft />
        </button>
        </div>

      <div className="researcher-hero">
        <h1>{currentContent.title}</h1>
        <p className="hero-subtitle">{currentContent.subtitle}</p>
      </div>

      <div className="main-benefits">
        {currentContent.mainBenefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="researcher-features">
        <h2>{language === 'fr' ? 'Fonctionnalités principales' : 'Key features'}</h2>
        <div className="features-grid">
          {currentContent.features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="use-cases">
        <h2>{language === 'fr' ? 'Cas d\'utilisation' : 'Use cases'}</h2>
        <div className="use-cases-grid">
          {currentContent.useCases.map((useCase, index) => (
            <div key={index} className="use-case-card">
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="researcher-cta">
        <h2>{currentContent.cta.title}</h2>
        <p>{currentContent.cta.subtitle}</p>
        <button className="cta-button">{currentContent.cta.button}</button>
      </div>
    </div>
  );
} 