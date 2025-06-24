import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FaUniversity, FaClock, FaChartLine, FaUsers, 
  FaBook, FaLightbulb, FaCheck, FaArrowLeft,
  FaFileAlt, FaExchangeAlt, FaBrain, FaClipboardCheck,
  FaGraduationCap, FaBuilding, FaGlobe, FaHandshake,
  FaChalkboardTeacher, FaPrint, FaLock, FaRegFileAlt
} from 'react-icons/fa';
import './InstitutionSolution.css';

export default function InstitutionSolution({ onBack }) {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "MyTekX pour les institutions",
      subtitle: "Solution complète pour les établissements académiques et les entreprises",
      mainBenefits: [
        {
          icon: <FaUniversity />,
          title: "Gestion centralisée",
          description: "Centralisez et standardisez tous vos documents pédagogiques et professionnels"
        },
        {
          icon: <FaBuilding />,
          title: "Solution entreprise",
          description: "Adaptée aux besoins des entreprises pour la transformation de présentations en documents exploitables"
        },
        {
          icon: <FaHandshake />,
          title: "Collaboration efficace",
          description: "Facilitez le partage et la collaboration entre départements et équipes"
        },
        {
          icon: <FaLock />,
          title: "Sécurité renforcée",
          description: "Protection des données et conformité aux normes de sécurité institutionnelles"
        }
      ],
      features: [
        {
          icon: <FaPrint />,
          title: "Conversion optimisée",
          description: "Transformez automatiquement vos présentations en documents formatés pour l'impression et la diffusion"
        },
        {
          icon: <FaRegFileAlt />,
          title: "Formats adaptables",
          description: "Exportez en différents formats selon vos besoins : rapports, supports de cours, documentation"
        },
        {
          icon: <FaChartLine />,
          title: "Analyse et rapports",
          description: "Suivez l'utilisation et générez des rapports d'activité détaillés"
        },
        {
          icon: <FaUsers />,
          title: "Gestion des accès",
          description: "Contrôlez finement les droits d'accès et les permissions par rôle"
        }
      ],
      useCases: [
        {
          title: "Établissements d'enseignement",
          description: "Gérez efficacement les supports de cours, polycopiés et ressources pédagogiques à grande échelle"
        },
        {
          title: "Entreprises et formations",
          description: "Convertissez vos présentations professionnelles en documents structurés pour une meilleure diffusion"
        },
        {
          title: "Conférences et séminaires",
          description: "Facilitez le partage des présentations sous forme de documents imprimables et annotables"
        },
        {
          title: "Rapports et documentation",
          description: "Transformez rapidement vos slides en rapports professionnels et documentation technique"
        }
      ],
      benefits: [
        {
          title: "Gain de temps considérable",
          description: "Automatisez la conversion de centaines de documents en quelques clics"
        },
        {
          title: "Cohérence garantie",
          description: "Assurez une présentation uniforme pour tous vos documents institutionnels"
        },
        {
          title: "Économies d'échelle",
          description: "Réduisez les coûts de production et de gestion des documents"
        },
        {
          title: "Support dédié",
          description: "Bénéficiez d'un accompagnement personnalisé et d'une assistance prioritaire"
        }
      ],
      cta: {
        title: "Prêt à transformer votre gestion documentaire ?",
        subtitle: "Rejoignez les institutions qui font confiance à MyTekX",
        button: "Demander une démo"
      }
    },
    en: {
      title: "MyTekX for Institutions",
      subtitle: "Complete solution for academic institutions and businesses",
      mainBenefits: [
        {
          icon: <FaUniversity />,
          title: "Centralized Management",
          description: "Centralize and standardize all your educational and professional documents"
        },
        {
          icon: <FaBuilding />,
          title: "Enterprise Solution",
          description: "Adapted to business needs for transforming presentations into usable documents"
        },
        {
          icon: <FaHandshake />,
          title: "Efficient Collaboration",
          description: "Facilitate sharing and collaboration between departments and teams"
        },
        {
          icon: <FaLock />,
          title: "Enhanced Security",
          description: "Data protection and compliance with institutional security standards"
        }
      ],
      features: [
        {
          icon: <FaPrint />,
          title: "Optimized Conversion",
          description: "Automatically transform your presentations into formatted documents for printing and distribution"
        },
        {
          icon: <FaRegFileAlt />,
          title: "Adaptable Formats",
          description: "Export in different formats according to your needs: reports, course materials, documentation"
        },
        {
          icon: <FaChartLine />,
          title: "Analysis and Reports",
          description: "Track usage and generate detailed activity reports"
        },
        {
          icon: <FaUsers />,
          title: "Access Management",
          description: "Finely control access rights and role-based permissions"
        }
      ],
      useCases: [
        {
          title: "Educational Institutions",
          description: "Efficiently manage course materials, handouts, and educational resources at scale"
        },
        {
          title: "Business and Training",
          description: "Convert your professional presentations into structured documents for better distribution"
        },
        {
          title: "Conferences and Seminars",
          description: "Facilitate sharing presentations as printable and annotatable documents"
        },
        {
          title: "Reports and Documentation",
          description: "Quickly transform your slides into professional reports and technical documentation"
        }
      ],
      benefits: [
        {
          title: "Significant Time Savings",
          description: "Automate the conversion of hundreds of documents in just a few clicks"
        },
        {
          title: "Guaranteed Consistency",
          description: "Ensure uniform presentation for all your institutional documents"
        },
        {
          title: "Economies of Scale",
          description: "Reduce document production and management costs"
        },
        {
          title: "Dedicated Support",
          description: "Benefit from personalized guidance and priority assistance"
        }
      ],
      cta: {
        title: "Ready to transform your document management?",
        subtitle: "Join institutions that trust MyTekX",
        button: "Request a Demo"
      }
    }
  };

  const currentContent = content[language] || content.fr;

  return (
    <div className="institution-solution">
        <div className="fixed-back-button">
        <button className="back-icon" onClick={onBack}>
            <FaArrowLeft />
        </button>
        </div>

      <div className="institution-hero">
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

      <div className="institution-features">
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

      <div className="benefits-section">
        <h2>{language === 'fr' ? 'Avantages institutionnels' : 'Institutional Benefits'}</h2>
        <div className="benefits-grid">
          {currentContent.benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="institution-cta">
        <h2>{currentContent.cta.title}</h2>
        <p>{currentContent.cta.subtitle}</p>
        <button className="cta-button">{currentContent.cta.button}</button>
      </div>
    </div>
  );
} 