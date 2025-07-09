import React from 'react';
import BackButton from './BackButton';
import './LegalPages.css';

export default function PrivacyPolicy({ onBack, language = 'fr' }) {
  const content = {
    fr: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : 15 janvier 2025",
      sections: [
        {
          title: "1. Informations générales",
          content: `MyTekX s'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre plateforme de conversion PDF vers LaTeX alimentée par IA.

**Responsable du traitement :** MyTekX
**Contact :** contact@mytekx.io`
        },
        {
          title: "2. Données collectées",
          content: `**Données d'inscription :**
• Nom et prénom
• Adresse email
• Mot de passe (chiffré)
• Type d'utilisateur (étudiant, enseignant, chercheur, institution)

**Données d'utilisation :**
• Fichiers PDF téléchargés pour conversion
• Documents LaTeX générés
• Historique des conversions
• Statistiques d'utilisation
• Logs de sécurité

**Données techniques :**
• Adresse IP
• Type de navigateur
• Système d'exploitation
• Cookies et données de session`
        },
        {
          title: "3. Finalités du traitement",
          content: `Nous utilisons vos données pour :
• Fournir nos services de conversion IA
• Créer et gérer votre compte utilisateur
• Améliorer nos algorithmes d'IA
• Assurer la sécurité de la plateforme
• Vous contacter concernant votre compte
• Analyser l'utilisation pour améliorer nos services
• Respecter nos obligations légales`
        },
        {
          title: "4. Base légale",
          content: `Le traitement de vos données est basé sur :
• **Exécution du contrat :** Fourniture des services MyTekX
• **Intérêt légitime :** Amélioration des services et sécurité
• **Consentement :** Cookies non essentiels et communications marketing
• **Obligation légale :** Conservation pour conformité fiscale et comptable`
        },
        {
          title: "5. Conservation des données",
          content: `**Données de compte :** Conservées tant que votre compte est actif + 3 ans après suppression

**Documents traités :** 
• Fichiers PDF : Supprimés après traitement (24h maximum)
• Documents LaTeX : Conservés dans votre compte selon votre plan
• Historique : 2 ans maximum

**Données de facturation :** 10 ans (obligation légale)

**Logs de sécurité :** 1 an maximum`
        },
        {
          title: "6. Partage des données",
          content: `Nous ne vendons jamais vos données. Nous pouvons partager vos informations uniquement avec :

**Prestataires de services :**
• Hébergement cloud sécurisé
• Services de paiement (cryptés)
• Outils d'analyse (données anonymisées)

**Obligations légales :**
• Autorités compétentes si requis par la loi
• Protection de nos droits légitimes`
        },
        {
          title: "7. Sécurité",
          content: `Nous mettons en place des mesures de sécurité robustes :
• Chiffrement SSL/TLS pour toutes les communications
• Chiffrement des données sensibles en base
• Authentification sécurisée
• Surveillance continue des accès
• Sauvegrades régulières et sécurisées
• Tests de sécurité périodiques`
        },
        {
          title: "8. Vos droits",
          content: `Conformément au RGPD, vous disposez des droits suivants :
• **Accès :** Obtenir une copie de vos données
• **Rectification :** Corriger vos données inexactes
• **Effacement :** Supprimer vos données sous conditions
• **Limitation :** Limiter le traitement de vos données
• **Portabilité :** Récupérer vos données dans un format structuré
• **Opposition :** Vous opposer au traitement basé sur l'intérêt légitime

Pour exercer ces droits, contactez-nous à contact@mytekx.io`
        },
        {
          title: "9. Transferts internationaux",
          content: `Vos données sont principalement traitées en Union Européenne. En cas de transfert vers des pays tiers, nous garantissons un niveau de protection adéquat par :
• Clauses contractuelles types de la Commission européenne
• Certifications de sécurité appropriées
• Décisions d'adéquation de la Commission européenne`
        },
        {
          title: "10. Contact et réclamations",
          content: `**Contact :** contact@mytekx.io

**Réclamations :** Vous pouvez déposer une réclamation auprès de la CNIL (France) ou de l'autorité de protection des données de votre pays.

**Modifications :** Cette politique peut être mise à jour. Nous vous informerons des changements significatifs.`
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 15, 2025",
      sections: [
        {
          title: "1. General information",
          content: `MyTekX is committed to protecting your privacy. This policy explains how we collect, use and protect your personal data when you use our AI-powered PDF to LaTeX conversion platform.

**Data Controller:** MyTekX
**Contact:** contact@mytekx.io`
        },
        {
          title: "2. Data collected",
          content: `**Registration data:**
• First and last name
• Email address
• Password (encrypted)
• User type (student, teacher, researcher, institution)

**Usage data:**
• PDF files uploaded for conversion
• Generated LaTeX documents
• Conversion history
• Usage statistics
• Security logs

**Technical data:**
• IP address
• Browser type
• Operating system
• Cookies and session data`
        },
        {
          title: "3. Processing purposes",
          content: `We use your data to:
• Provide our AI conversion services
• Create and manage your user account
• Improve our AI algorithms
• Ensure platform security
• Contact you regarding your account
• Analyze usage to improve our services
• Comply with our legal obligations`
        },
        {
          title: "4. Legal basis",
          content: `The processing of your data is based on:
• **Contract performance:** Provision of MyTekX services
• **Legitimate interest:** Service improvement and security
• **Consent:** Non-essential cookies and marketing communications
• **Legal obligation:** Retention for tax and accounting compliance`
        },
        {
          title: "5. Data retention",
          content: `**Account data:** Retained while your account is active + 3 years after deletion

**Processed documents:**
• PDF files: Deleted after processing (24h maximum)
• LaTeX documents: Retained in your account according to your plan
• History: 2 years maximum

**Billing data:** 10 years (legal obligation)

**Security logs:** 1 year maximum`
        },
        {
          title: "6. Data sharing",
          content: `We never sell your data. We may share your information only with:

**Service providers:**
• Secure cloud hosting
• Payment services (encrypted)
• Analytics tools (anonymized data)

**Legal obligations:**
• Competent authorities if required by law
• Protection of our legitimate rights`
        },
        {
          title: "7. Security",
          content: `We implement robust security measures:
• SSL/TLS encryption for all communications
• Encryption of sensitive data in database
• Secure authentication
• Continuous access monitoring
• Regular and secure backups
• Periodic security testing`
        },
        {
          title: "8. Your rights",
          content: `In accordance with GDPR, you have the following rights:
• **Access:** Obtain a copy of your data
• **Rectification:** Correct your inaccurate data
• **Erasure:** Delete your data under conditions
• **Restriction:** Limit the processing of your data
• **Portability:** Retrieve your data in a structured format
• **Objection:** Object to processing based on legitimate interest

To exercise these rights, contact us at contact@mytekx.io`
        },
        {
          title: "9. International transfers",
          content: `Your data is primarily processed in the European Union. In case of transfer to third countries, we guarantee an adequate level of protection through:
• Standard contractual clauses of the European Commission
• Appropriate security certifications
• Adequacy decisions of the European Commission`
        },
        {
          title: "10. Contact and complaints",
          content: `**Contact:** contact@mytekx.io

**Complaints:** You can file a complaint with CNIL (France) or the data protection authority of your country.

**Modifications:** This policy may be updated. We will inform you of significant changes.`
        }
      ]
    }
  };

  const data = content[language];

  return (
    <div className="legal-page">
      <div className="legal-container">
        <BackButton onBack={onBack} />
        
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