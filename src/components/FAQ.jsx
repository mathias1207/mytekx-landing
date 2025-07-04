import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import BackButton from './BackButton';
import './FAQ.css';

export default function FAQ({ onBack, language = 'fr' }) {
  const [openQuestion, setOpenQuestion] = useState(null);

  const content = {
    fr: {
      title: "Questions Fréquemment Posées",
      subtitle: "Trouvez rapidement les réponses à vos questions",
      faqItems: [
        {
          question: "Qu'est-ce que MyTekX ?",
          answer: "MyTekX est une plateforme IA qui convertit automatiquement vos présentations PDF en documents LaTeX structurés et professionnels."
        },
        {
          question: "Comment fonctionne la conversion ?",
          answer: "Notre IA analyse votre PDF, identifie la structure et le contenu, puis génère du code LaTeX propre et bien formaté avec tous les éléments préservés."
        },
        {
          question: "Quels types de documents puis-je convertir ?",
          answer: "Vous pouvez convertir des présentations PowerPoint, des slides de cours, des documents techniques et tout fichier PDF contenant du texte et des images."
        },
        {
          question: "Les formules mathématiques sont-elles supportées ?",
          answer: "Oui, notre IA reconnaît et convertit automatiquement les formules mathématiques en notation LaTeX appropriée."
        },
        {
          question: "Puis-je personnaliser le document généré ?",
          answer: "Absolument ! Vous pouvez ajouter des éléments pédagogiques, des résumés, des illustrations et bien plus encore selon vos besoins."
        },
        {
          question: "Y a-t-il une limite sur la taille des fichiers ?",
          answer: "Les plans Standard et Premium permettent des fichiers jusqu'à 50MB. Le plan Pro n'a pas de limite de taille."
        },
        {
          question: "Puis-je essayer gratuitement ?",
          answer: "Oui, nous offrons un essai gratuit de 14 jours sans engagement pour tous nos plans."
        },
        {
          question: "Comment puis-je annuler mon abonnement ?",
          answer: "Vous pouvez annuler votre abonnement à tout moment depuis votre profil utilisateur. Aucun frais d'annulation."
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find quick answers to your questions",
      faqItems: [
        {
          question: "What is MyTekX?",
          answer: "MyTekX is an AI platform that automatically converts your PDF presentations into structured and professional LaTeX documents."
        },
        {
          question: "How does the conversion work?",
          answer: "Our AI analyzes your PDF, identifies structure and content, then generates clean and well-formatted LaTeX code with all elements preserved."
        },
        {
          question: "What types of documents can I convert?",
          answer: "You can convert PowerPoint presentations, course slides, technical documents, and any PDF file containing text and images."
        },
        {
          question: "Are mathematical formulas supported?",
          answer: "Yes, our AI recognizes and automatically converts mathematical formulas into appropriate LaTeX notation."
        },
        {
          question: "Can I customize the generated document?",
          answer: "Absolutely! You can add pedagogical elements, summaries, illustrations, and much more according to your needs."
        },
        {
          question: "Is there a file size limit?",
          answer: "Standard and Premium plans allow files up to 50MB. The Pro plan has no size limit."
        },
        {
          question: "Can I try it for free?",
          answer: "Yes, we offer a 14-day free trial with no commitment for all our plans."
        },
        {
          question: "How can I cancel my subscription?",
          answer: "You can cancel your subscription at any time from your user profile. No cancellation fees."
        }
      ]
    }
  };

  const data = content[language];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <BackButton onBack={onBack} />
        
        <div className="faq-header">
          <h1 className="faq-title">{data.title}</h1>
          <p className="faq-subtitle">{data.subtitle}</p>
        </div>

        <div className="faq-content">
          {data.faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                <span>{item.question}</span>
                {openQuestion === index ? (
                  <FaChevronUp className="faq-icon" />
                ) : (
                  <FaChevronDown className="faq-icon" />
                )}
              </button>
              
              {openQuestion === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>Vous ne trouvez pas votre réponse ?</h3>
          <p>Contactez-nous à <a href="mailto:contact@mytekx.io">contact@mytekx.io</a></p>
        </div>
      </div>
    </div>
  );
} 