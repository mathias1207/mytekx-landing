import React from 'react';
import './LegalPages.css';

export default function CookiePolicy({ language = 'fr' }) {
  const content = {
    fr: {
      title: "Politique de Cookies",
      lastUpdated: "Dernière mise à jour : 15 janvier 2025",
      sections: [
        {
          title: "1. Qu'est-ce qu'un cookie ?",
          content: `Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Les cookies nous permettent de reconnaître votre navigateur et de capturer et retenir certaines informations pour améliorer votre expérience sur MyTekX.io.`
        },
        {
          title: "2. Types de cookies utilisés",
          content: `**Cookies essentiels :** Nécessaires au fonctionnement de base du site (authentification, sécurité, préférences de langue).

**Cookies analytiques :** Nous aident à comprendre comment vous utilisez notre site pour améliorer nos services (Google Analytics).

**Cookies de performance :** Permettent d'optimiser les fonctionnalités et la vitesse de notre plateforme.

**Cookies de préférences :** Mémorisent vos choix et personnalisent votre expérience utilisateur.`
        },
        {
          title: "3. Finalités d'utilisation",
          content: `• Assurer le bon fonctionnement de la plateforme MyTekX
• Maintenir votre session utilisateur connectée
• Analyser l'utilisation du site pour l'améliorer
• Personnaliser votre expérience utilisateur
• Mesurer les performances de nos services IA`
        },
        {
          title: "4. Durée de conservation",
          content: `**Cookies de session :** Supprimés automatiquement à la fermeture de votre navigateur.

**Cookies persistants :** Conservés selon les durées suivantes :
• Cookies de préférences : 12 mois
• Cookies analytiques : 24 mois
• Cookies d'authentification : 30 jours`
        },
        {
          title: "5. Gestion des cookies",
          content: `Vous pouvez contrôler et gérer les cookies de plusieurs façons :

**Paramètres du navigateur :** Configurez votre navigateur pour refuser les cookies ou vous alerter lors de leur envoi.

**Outils de choix :** Utilisez nos paramètres de confidentialité pour choisir quels cookies accepter.

**Suppression :** Supprimez les cookies existants via les paramètres de votre navigateur.

Note : La désactivation de certains cookies peut affecter le fonctionnement de MyTekX.`
        },
        {
          title: "6. Cookies tiers",
          content: `Notre site peut contenir des cookies de services tiers :
• Google Analytics (analyse d'audience)
• Services de sécurité et protection anti-fraude
• Intégrations de paiement sécurisé

Ces services ont leurs propres politiques de cookies que nous vous encourageons à consulter.`
        },
        {
          title: "7. Contact",
          content: `Pour toute question concernant notre utilisation des cookies, contactez-nous à :
Email : contact@mytekx.io
Adresse : MyTekX, France`
        }
      ]
    },
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: January 15, 2025",
      sections: [
        {
          title: "1. What is a cookie?",
          content: `A cookie is a small text file stored on your device when you visit a website. Cookies allow us to recognize your browser and capture and retain certain information to improve your experience on MyTekX.io.`
        },
        {
          title: "2. Types of cookies used",
          content: `**Essential cookies:** Necessary for basic site functionality (authentication, security, language preferences).

**Analytics cookies:** Help us understand how you use our site to improve our services (Google Analytics).

**Performance cookies:** Allow optimization of features and speed of our platform.

**Preference cookies:** Remember your choices and personalize your user experience.`
        },
        {
          title: "3. Purposes of use",
          content: `• Ensure proper functioning of the MyTekX platform
• Maintain your logged-in user session
• Analyze site usage to improve it
• Personalize your user experience
• Measure the performance of our AI services`
        },
        {
          title: "4. Retention period",
          content: `**Session cookies:** Automatically deleted when you close your browser.

**Persistent cookies:** Retained for the following periods:
• Preference cookies: 12 months
• Analytics cookies: 24 months
• Authentication cookies: 30 days`
        },
        {
          title: "5. Cookie management",
          content: `You can control and manage cookies in several ways:

**Browser settings:** Configure your browser to refuse cookies or alert you when they are sent.

**Choice tools:** Use our privacy settings to choose which cookies to accept.

**Deletion:** Delete existing cookies through your browser settings.

Note: Disabling certain cookies may affect the functionality of MyTekX.`
        },
        {
          title: "6. Third-party cookies",
          content: `Our site may contain cookies from third-party services:
• Google Analytics (audience analysis)
• Security and anti-fraud protection services
• Secure payment integrations

These services have their own cookie policies that we encourage you to review.`
        },
        {
          title: "7. Contact",
          content: `For any questions regarding our use of cookies, contact us at:
Email: contact@mytekx.io
Address: MyTekX, France`
        }
      ]
    }
  };

  const data = content[language];

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1 className="legal-title">{data.title}</h1>
          <p className="legal-updated">{data.lastUpdated}</p>
        </div>

        <div className="legal-content">
          {data.sections.map((section, index) => (
            <div key={index} className="legal-section">
              <h2 className="legal-section-title">{section.title}</h2>
              <div 
                className="legal-section-content"
                dangerouslySetInnerHTML={{
                  __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 