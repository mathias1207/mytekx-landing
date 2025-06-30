import React from 'react';
import './LegalPages.css';

export default function TermsOfUse({ language = 'fr' }) {
  const content = {
    fr: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : 15 janvier 2025",
      sections: [
        {
          title: "1. Acceptance des conditions",
          content: `En accédant et en utilisant MyTekX.io, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.

**Société :** MyTekX
**Contact :** contact@mytekx.io`
        },
        {
          title: "2. Description du service",
          content: `MyTekX est une plateforme SaaS qui utilise l'intelligence artificielle pour convertir des documents PDF en code LaTeX structuré. Nos services incluent :

• Conversion automatique PDF vers LaTeX
• Personnalisation des documents générés
• Options pédagogiques avancées
• Gestion de comptes utilisateurs
• Support technique`
        },
        {
          title: "3. Inscription et compte",
          content: `**Éligibilité :** Vous devez avoir au moins 13 ans pour utiliser MyTekX.

**Informations exactes :** Vous vous engagez à fournir des informations exactes lors de l'inscription.

**Sécurité du compte :** Vous êtes responsable de la sécurité de votre mot de passe et de toutes les activités sur votre compte.

**Un compte par personne :** Chaque utilisateur ne peut créer qu'un seul compte personnel.`
        },
        {
          title: "4. Plans et facturation",
          content: `**Plans disponibles :**
• Standard : 7,99€/mois
• Premium : 19,99€/mois  
• Pro : Sur devis pour les institutions

**Facturation :** Les frais sont facturés mensuellement à l'avance.

**Remboursements :** Remboursement possible dans les 14 jours suivant la souscription initiale.

**Modifications de prix :** Nous nous réservons le droit de modifier nos tarifs avec un préavis de 30 jours.`
        },
        {
          title: "5. Utilisation acceptable",
          content: `**Utilisations autorisées :**
• Conversion de vos propres documents PDF
• Utilisation à des fins éducatives et professionnelles
• Partage des documents générés selon vos droits

**Utilisations interdites :**
• Conversion de documents protégés par des droits d'auteur sans autorisation
• Utilisation pour des activités illégales
• Tentatives de contournement des limitations techniques
• Partage de votre compte avec d'autres personnes
• Reverse engineering de nos algorithmes IA`
        },
        {
          title: "6. Propriété intellectuelle",
          content: `**Vos contenus :** Vous conservez tous les droits sur vos documents PDF originaux et les documents LaTeX générés.

**Notre plateforme :** MyTekX détient tous les droits sur la plateforme, les algorithmes IA et la technologie.

**Licence d'utilisation :** Nous vous accordons une licence limitée, non exclusive pour utiliser notre service.

**Respect des droits tiers :** Vous devez respecter les droits de propriété intellectuelle des tiers.`
        },
        {
          title: "7. Données et confidentialité",
          content: `**Protection des données :** Vos données sont protégées selon notre Politique de Confidentialité.

**Fichiers temporaires :** Les fichiers PDF sont automatiquement supprimés après traitement (24h maximum).

**Amélioration du service :** Nous pouvons utiliser des données anonymisées pour améliorer nos algorithmes IA.

**Sauvegarde :** Vous êtes responsable de sauvegarder vos documents générés.`
        },
        {
          title: "8. Limitations et exclusions",
          content: `**Limitation de responsabilité :** Notre responsabilité est limitée au montant payé pour le service au cours des 12 derniers mois.

**Exclusions :** Nous ne sommes pas responsables des dommages indirects, perte de données, ou interruption d'activité.

**Service "tel quel" :** Le service est fourni en l'état, sans garantie de fonctionnement parfait.

**Force majeure :** Nous ne sommes pas responsables des défaillances dues à des événements hors de notre contrôle.`
        },
        {
          title: "9. Suspension et résiliation",
          content: `**Résiliation par vous :** Vous pouvez annuler votre abonnement à tout moment depuis votre compte.

**Suspension par nous :** Nous pouvons suspendre votre compte en cas de violation de ces conditions.

**Effet de la résiliation :** À la résiliation, votre accès au service sera interrompu et vos données pourront être supprimées après 30 jours.

**Sauvegarde :** Il est de votre responsabilité de sauvegarder vos données avant la résiliation.`
        },
        {
          title: "10. Modifications et divers",
          content: `**Modifications des conditions :** Nous pouvons modifier ces conditions avec un préavis de 30 jours.

**Droit applicable :** Ces conditions sont régies par le droit français.

**Juridiction :** Tout litige sera soumis aux tribunaux français compétents.

**Divisibilité :** Si une clause est jugée invalide, les autres restent en vigueur.

**Contact :** Pour toute question : contact@mytekx.io`
        }
      ]
    },
    en: {
      title: "Terms of Use",
      lastUpdated: "Last updated: January 15, 2025",
      sections: [
        {
          title: "1. Acceptance of terms",
          content: `By accessing and using MyTekX.io, you agree to be bound by these terms of use. If you do not accept these terms, please do not use our service.

**Company:** MyTekX
**Contact:** contact@mytekx.io`
        },
        {
          title: "2. Service description",
          content: `MyTekX is a SaaS platform that uses artificial intelligence to convert PDF documents into structured LaTeX code. Our services include:

• Automatic PDF to LaTeX conversion
• Customization of generated documents
• Advanced pedagogical options
• User account management
• Technical support`
        },
        {
          title: "3. Registration and account",
          content: `**Eligibility:** You must be at least 13 years old to use MyTekX.

**Accurate information:** You agree to provide accurate information during registration.

**Account security:** You are responsible for the security of your password and all activities on your account.

**One account per person:** Each user can only create one personal account.`
        },
        {
          title: "4. Plans and billing",
          content: `**Available plans:**
• Standard: €7.99/month
• Premium: €19.99/month
• Pro: Custom quote for institutions

**Billing:** Fees are billed monthly in advance.

**Refunds:** Refund possible within 14 days of initial subscription.

**Price changes:** We reserve the right to modify our prices with 30 days notice.`
        },
        {
          title: "5. Acceptable use",
          content: `**Authorized uses:**
• Conversion of your own PDF documents
• Use for educational and professional purposes
• Sharing generated documents according to your rights

**Prohibited uses:**
• Conversion of copyrighted documents without authorization
• Use for illegal activities
• Attempts to circumvent technical limitations
• Sharing your account with other people
• Reverse engineering of our AI algorithms`
        },
        {
          title: "6. Intellectual property",
          content: `**Your content:** You retain all rights to your original PDF documents and generated LaTeX documents.

**Our platform:** MyTekX owns all rights to the platform, AI algorithms and technology.

**License to use:** We grant you a limited, non-exclusive license to use our service.

**Respect for third party rights:** You must respect the intellectual property rights of third parties.`
        },
        {
          title: "7. Data and privacy",
          content: `**Data protection:** Your data is protected according to our Privacy Policy.

**Temporary files:** PDF files are automatically deleted after processing (24h maximum).

**Service improvement:** We may use anonymized data to improve our AI algorithms.

**Backup:** You are responsible for backing up your generated documents.`
        },
        {
          title: "8. Limitations and exclusions",
          content: `**Limitation of liability:** Our liability is limited to the amount paid for the service in the last 12 months.

**Exclusions:** We are not responsible for indirect damages, data loss, or business interruption.

**Service "as is":** The service is provided as is, without guarantee of perfect operation.

**Force majeure:** We are not responsible for failures due to events beyond our control.`
        },
        {
          title: "9. Suspension and termination",
          content: `**Termination by you:** You can cancel your subscription at any time from your account.

**Suspension by us:** We may suspend your account in case of violation of these terms.

**Effect of termination:** Upon termination, your access to the service will be interrupted and your data may be deleted after 30 days.

**Backup:** It is your responsibility to backup your data before termination.`
        },
        {
          title: "10. Modifications and miscellaneous",
          content: `**Terms modifications:** We may modify these terms with 30 days notice.

**Applicable law:** These terms are governed by French law.

**Jurisdiction:** Any dispute will be submitted to competent French courts.

**Severability:** If a clause is deemed invalid, the others remain in force.

**Contact:** For any questions: contact@mytekx.io`
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