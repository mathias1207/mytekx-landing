import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FaUniversity, FaClock, FaChalkboardTeacher, FaChartLine, 
  FaUsers, FaBook, FaLightbulb, FaCheck, FaArrowLeft,
  FaRocket, FaFileAlt, FaSearch, FaExchangeAlt, FaBrain,
  FaClipboardCheck, FaUserGraduate, FaChalkboard
} from 'react-icons/fa';
import './TeacherSolution.css';

export default function TeacherSolution({ onBack }) {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "MyTekX pour les enseignants",
      subtitle: "Optimisez la création et le partage de vos supports pédagogiques",
      mainBenefits: [
        {
          icon: <FaClock />,
          title: "Gagnez du temps",
          description: "Automatisez la conversion de vos supports de cours en documents structurés et exploitables"
        },
        {
          icon: <FaChalkboardTeacher />,
          title: "Enseignement personnalisé",
          description: "Adaptez facilement vos supports aux besoins spécifiques de chaque classe"
        },
        {
          icon: <FaChartLine />,
          title: "Suivi des progrès",
          description: "Analysez la progression et la compréhension de vos étudiants"
        },
        {
          icon: <FaUsers />,
          title: "Collaboration facilitée",
          description: "Partagez et collaborez efficacement avec vos collègues enseignants"
        }
      ],
      features: [
        {
          icon: <FaFileAlt />,
          title: "Conversion intelligente",
          description: "Transformez vos diapositives en documents structurés avec une mise en page professionnelle"
        },
        {
          icon: <FaBrain />,
          title: "Adaptation pédagogique",
          description: "Ajustez automatiquement le niveau de complexité selon votre public"
        },
        {
          icon: <FaClipboardCheck />,
          title: "Évaluation simplifiée",
          description: "Créez et gérez facilement des évaluations à partir de vos supports"
        },
        {
          icon: <FaExchangeAlt />,
          title: "Formats multiples",
          description: "Exportez vos documents dans différents formats (PDF, LaTeX, HTML, etc.)"
        }
      ],
      useCases: [
        {
          title: "Préparation des cours",
          description: "Gagnez du temps dans la création de vos supports pédagogiques"
        },
        {
          title: "Évaluation continue",
          description: "Suivez la progression de vos étudiants en temps réel"
        },
        {
          title: "Collaboration entre enseignants",
          description: "Partagez et améliorez vos supports avec vos collègues"
        }
      ],
      cta: {
        title: "Prêt à transformer votre enseignement ?",
        subtitle: "Rejoignez les enseignants qui utilisent déjà MyTekX",
        button: "Commencer gratuitement"
      }
    },
    en: {
      title: "MyTekX for Teachers",
      subtitle: "Optimize the creation and sharing of your teaching materials",
      mainBenefits: [
        {
          icon: <FaClock />,
          title: "Save time",
          description: "Automate the conversion of your course materials into structured and usable documents"
        },
        {
          icon: <FaChalkboardTeacher />,
          title: "Personalized teaching",
          description: "Easily adapt your materials to each class's specific needs"
        },
        {
          icon: <FaChartLine />,
          title: "Progress tracking",
          description: "Analyze your students' progression and understanding"
        },
        {
          icon: <FaUsers />,
          title: "Enhanced collaboration",
          description: "Share and collaborate efficiently with fellow teachers"
        }
      ],
      features: [
        {
          icon: <FaFileAlt />,
          title: "Smart conversion",
          description: "Transform your slides into structured documents with professional layout"
        },
        {
          icon: <FaBrain />,
          title: "Pedagogical adaptation",
          description: "Automatically adjust complexity levels according to your audience"
        },
        {
          icon: <FaClipboardCheck />,
          title: "Simplified assessment",
          description: "Create and manage assessments easily from your materials"
        },
        {
          icon: <FaExchangeAlt />,
          title: "Multiple formats",
          description: "Export your documents in various formats (PDF, LaTeX, HTML, etc.)"
        }
      ],
      useCases: [
        {
          title: "Course preparation",
          description: "Save time in creating your teaching materials"
        },
        {
          title: "Continuous assessment",
          description: "Track your students' progress in real-time"
        },
        {
          title: "Teacher collaboration",
          description: "Share and improve your materials with colleagues"
        }
      ],
      cta: {
        title: "Ready to transform your teaching?",
        subtitle: "Join teachers already using MyTekX",
        button: "Start for free"
      }
    }
  };

  const currentContent = content[language] || content.fr;

  return (
    <div className="teacher-solution">
        <div className="fixed-back-button">
        <button className="back-icon" onClick={onBack}>
            <FaArrowLeft />
        </button>
        </div>

      <div className="teacher-hero">
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

      <div className="teacher-features">
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

      <div className="teacher-cta">
        <h2>{currentContent.cta.title}</h2>
        <p>{currentContent.cta.subtitle}</p>
        <button className="cta-button">{currentContent.cta.button}</button>
      </div>
    </div>
  );
} 