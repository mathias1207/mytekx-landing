import React from 'react';
import BackButton from './BackButton';
import './SolutionPage.css';

const SolutionPage = ({ onBack, solutionType = 'student', language = 'fr' }) => {
  const content = {
    fr: {
      student: {
        title: "Solutions pour Étudiants",
        subtitle: "Optimisez vos études avec MyTekX",
        description: "Transformez vos slides PDF en documents LaTeX structurés pour améliorer votre apprentissage et vos révisions."
      },
      teacher: {
        title: "Solutions pour Enseignants",
        subtitle: "Créez des supports exceptionnels",
        description: "Convertissez rapidement vos présentations en documents LaTeX professionnels pour vos cours et supports pédagogiques."
      },
      researcher: {
        title: "Solutions pour Chercheurs",
        subtitle: "Accélérez vos publications",
        description: "Transformez vos présentations de recherche en documents LaTeX prêts pour la publication académique."
      },
      institution: {
        title: "Solutions pour Institutions",
        subtitle: "Solutions à grande échelle",
        description: "Implémentez MyTekX dans votre établissement pour standardiser la création de documents LaTeX."
      }
    },
    en: {
      student: {
        title: "Student Solutions",
        subtitle: "Optimize your studies with MyTekX",
        description: "Transform your PDF slides into structured LaTeX documents to improve your learning and revision process."
      },
      teacher: {
        title: "Teacher Solutions",
        subtitle: "Create exceptional materials",
        description: "Quickly convert your presentations into professional LaTeX documents for your courses and educational materials."
      },
      researcher: {
        title: "Researcher Solutions",
        subtitle: "Accelerate your publications",
        description: "Transform your research presentations into publication-ready LaTeX documents."
      },
      institution: {
        title: "Institution Solutions",
        subtitle: "Large-scale solutions",
        description: "Implement MyTekX in your institution to standardize LaTeX document creation."
      }
    }
  };

  const solution = content[language][solutionType];

  return (
    <div className="solution-page">
      <div className="solution-container">
        <BackButton onBack={onBack} />
        
        <div className="solution-header">
          <h1 className="solution-title">{solution.title}</h1>
          <p className="solution-subtitle">{solution.subtitle}</p>
        </div>

        <div className="solution-content">
          <div className="solution-description">
            <p>{solution.description}</p>
          </div>

          <div className="solution-cta">
            <button 
              className="solution-button"
              onClick={() => window.location.href = 'https://app.mytekx.io'}
            >
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage; 