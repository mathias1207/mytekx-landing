import React from 'react';
import BackButton from './BackButton';
import './About.css';

export default function About({ onBack, language = 'en' }) {
  const content = {
    fr: {
      title: "À propos de MyTekX",
      subtitle: "L'histoire d'une passion pour LaTeX",
      
      foundationTitle: "La genèse du projet",
      foundationText: `Tout a commencé par une frustration simple : j'adorais LaTeX et je voulais travailler mes cours sur ce magnifique système de composition typographique, mais convertir manuellement mes slides PDF était un processus long et fastidieux.
      
      En tant qu'étudiant en informatique au Technion - Israel Institute of Technology, j'ai été immédiatement séduit par l'élégance et la précision de LaTeX. Chaque formule mathématique, chaque structure de document, chaque détail typographique - tout était parfait. Mais il y avait un problème : mes professeurs partageaient leurs cours en PDF slides, et passer du format PDF slides au code LaTeX structuré représentait des heures de travail manuel.`,
      
      visionTitle: "La vision",
      visionText: `C'est là qu'est née l'idée de MyTekX : pourquoi ne pas utiliser l'intelligence artificielle pour automatiser cette conversion ? Pourquoi ne pas permettre à tous les étudiants, enseignants et chercheurs de bénéficier de la beauté de LaTeX sans les contraintes de la conversion manuelle ?
      
      MyTekX est né de cette passion personnelle pour LaTeX et du désir de démocratiser son usage. Aujourd'hui, notre plateforme permet à des dixaines d'utilisateurs de transformer instantanément leurs documents PDF en code LaTeX propre et structuré.`,
      
      missionTitle: "Notre mission",
      missionText: `Rendre LaTeX accessible à tous, éliminer les barrières techniques et permettre à chacun de créer des documents d'une qualité professionnelle exceptionnelle. Car au final, LaTeX n'est pas juste un outil - c'est un art de la typographie numérique.`,
      
      founderTitle: "Le fondateur",
      founderName: "Mathias Goldmann",
      founderDescription: "Étudiant en informatique au Technion - Israel Institute of Technology, passionné de LaTeX et de technologies innovantes",
      
      contactTitle: "Restons en contact",
      contactText: "Une question ? Une suggestion ? N'hésitez pas à me contacter directement.",
      contactButton: "Me contacter"
    },
    en: {
      title: "About MyTekX",
      subtitle: "The story of a passion for LaTeX",
      
      foundationTitle: "The genesis of the project",
      foundationText: `It all started with a simple frustration: I loved LaTeX and wanted to work on my courses using this beautiful typesetting system, but manually converting my PDF slides was a long and tedious process.
      
      As a computer science student at Technion - Israel Institute of Technology, I was immediately seduced by the elegance and precision of LaTeX. Every mathematical formula, every document structure, every typographical detail - everything was perfect. But there was a problem: my professors shared their courses in PDF slides format, and going from PDF slides to structured LaTeX code represented hours of manual work.`,
      
      visionTitle: "The vision", 
      visionText: `That's where the idea for MyTekX was born: why not use artificial intelligence to automate this conversion? Why not allow all students, teachers and researchers to benefit from the beauty of LaTeX without the constraints of manual conversion?
      
      MyTekX was born from this personal passion for LaTeX and the desire to democratize its use. Today, our platform allows tens of users to instantly transform their PDF documents into clean and structured LaTeX code.`,
      
      missionTitle: "Our mission",
      missionText: `Make LaTeX accessible to everyone, eliminate technical barriers and allow everyone to create documents of exceptional professional quality. Because ultimately, LaTeX is not just a tool - it's an art of digital typography.`,
      
      founderTitle: "The founder",
      founderName: "Mathias Goldmann", 
      founderDescription: "Computer Science student at Technion - Israel Institute of Technology, passionate about LaTeX and innovative technologies",
      
      contactTitle: "Let's stay in touch",
      contactText: "A question? A suggestion? Don't hesitate to contact me directly.",
      contactButton: "Contact me"
    }
  };

  const data = content[language];

  return (
    <div className="about-page">      
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">{data.title}</h1>
          <p className="about-subtitle">{data.subtitle}</p>
        </div>

        <div className="about-content">
          {/* Section genèse */}
          <section className="about-section">
            <h2 className="section-title">{data.foundationTitle}</h2>
            <div className="section-content">
              {data.foundationText.split('\n      \n      ').map((paragraph, index) => (
                <p key={index} className="section-paragraph">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section vision */}
          <section className="about-section">
            <h2 className="section-title">{data.visionTitle}</h2>
            <div className="section-content">
              {data.visionText.split('\n      \n      ').map((paragraph, index) => (
                <p key={index} className="section-paragraph">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section mission */}
          <section className="about-section mission">
            <h2 className="section-title">{data.missionTitle}</h2>
            <div className="section-content">
              <p className="section-paragraph mission-text">{data.missionText}</p>
            </div>
          </section>

          {/* Section fondateur */}
          <section className="about-section founder">
            <h2 className="section-title">{data.founderTitle}</h2>
            <div className="founder-content">
              <div className="founder-info">
                <h3 className="founder-name">{data.founderName}</h3>
                <p className="founder-description">{data.founderDescription}</p>
              </div>
              <div className="founder-portrait">
                {/* Placeholder pour le portrait - à remplacer par la vraie photo */}
                <div className="portrait-placeholder">
                  <div className="portrait-icon">MG</div>
                  <p className="portrait-text">Portrait à venir</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section contact */}
          <section className="about-section contact">
            <h2 className="section-title">{data.contactTitle}</h2>
            <div className="contact-content">
              <p className="section-paragraph">{data.contactText}</p>
              <button 
                className="contact-button"
                onClick={() => window.open('mailto:contact@mytekx.io?subject=Contact%20from%20About%20Page', '_blank')}
              >
                {data.contactButton}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 