import React, { useState } from 'react';
import { FaBook, FaPlay, FaFileAlt, FaLightbulb, FaQuestionCircle, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import './GuideSection.css';

const GuideSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const guideCategories = [
    {
      id: 'getting-started',
      title: t('guideGettingStartedTitle'),
      icon: <FaPlay />,
      description: t('guideGettingStartedDesc')
    },
    {
      id: 'conversion',
      title: t('guideConversionTitle'),
      icon: <FaFileAlt />,
      description: t('guideConversionDesc')
    },
    {
      id: 'tips',
      title: t('guideTipsTitle'),
      icon: <FaLightbulb />,
      description: t('guideTipsDesc')
    },
    {
      id: 'faq',
      title: t('guideFaqTitle'),
      icon: <FaQuestionCircle />,
      description: t('guideFaqDesc')
    }
  ];

  const guideContent = {
    'getting-started': [
      {
        title: t('guideWelcomeTitle'),
        content: t('guideWelcomeContent'),
        steps: [
          t('guideWelcomeStep1'),
          t('guideWelcomeStep2'),
          t('guideWelcomeStep3'),
          t('guideWelcomeStep4')
        ]
      },
      {
        title: t('guideSupportedFilesTitle'),
        content: t('guideSupportedFilesContent'),
        steps: [
          t('guideSupportedFilesStep1'),
          t('guideSupportedFilesStep2'),
          t('guideSupportedFilesStep3'),
          t('guideSupportedFilesStep4')
        ]
      }
    ],
    'conversion': [
      {
        title: t('guideConversionProcessTitle'),
        content: t('guideConversionProcessContent'),
        steps: [
          t('guideConversionProcessStep1'),
          t('guideConversionProcessStep2'),
          t('guideConversionProcessStep3'),
          t('guideConversionProcessStep4'),
          t('guideConversionProcessStep5')
        ]
      },
      {
        title: t('guideOutputOptionsTitle'),
        content: t('guideOutputOptionsContent'),
        steps: [
          t('guideOutputOptionsStep1'),
          t('guideOutputOptionsStep2'),
          t('guideOutputOptionsStep3')
        ]
      }
    ],
    'tips': [
      {
        title: t('guideOptimizationTitle'),
        content: t('guideOptimizationContent'),
        steps: [
          t('guideOptimizationStep1'),
          t('guideOptimizationStep2'),
          t('guideOptimizationStep3'),
          t('guideOptimizationStep4'),
          t('guideOptimizationStep5')
        ]
      },
      {
        title: t('guideTablesTitle'),
        content: t('guideTablesContent'),
        steps: [
          t('guideTablesStep1'),
          t('guideTablesStep2'),
          t('guideTablesStep3'),
          t('guideTablesStep4')
        ]
      }
    ],
    'faq': [
      {
        title: t('guideFaqQuestionsTitle'),
        content: t('guideFaqQuestionsContent'),
        steps: [
          t('guideFaqQuestion1'),
          t('guideFaqQuestion2'),
          t('guideFaqQuestion3'),
          t('guideFaqQuestion4'),
          t('guideFaqQuestion5')
        ]
      }
    ]
  };

  return (
    <div className="guide-section">
      <div className="guide-header">
        <FaBook className="guide-icon" />
        <div>
          <h1>{t('guideTitle')}</h1>
          <p>{t('guideSubtitle')}</p>
        </div>
      </div>

      <div className="guide-layout">
        {/* Sidebar des catégories */}
        <div className="guide-sidebar">
          {guideCategories.map((category) => (
            <div
              key={category.id}
              className={`guide-category ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <FaChevronRight className="category-arrow" />
            </div>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="guide-content">
          {guideContent[activeCategory]?.map((section, index) => (
            <div key={index} className="guide-card">
              <h2>{section.title}</h2>
              <p className="guide-description">{section.content}</p>
              <div className="guide-steps">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="guide-step">
                    <div className="step-number">{stepIndex + 1}</div>
                    <div className="step-content">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideSection;