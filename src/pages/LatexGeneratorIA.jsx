import React, { useEffect, useState } from 'react';

const LatexGeneratorIA = () => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    document.title = language === 'fr' 
      ? 'Générateur LaTeX par IA | MyTekX' 
      : 'AI-powered LaTeX Generator | MyTekX';

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'fr' 
          ? 'Générez automatiquement vos documents LaTeX grâce à l\'intelligence artificielle de MyTekX. Conversion rapide, équations, tableaux et figures supportés.'
          : 'Automatically generate your LaTeX documents with MyTekX artificial intelligence. Fast conversion, equations, tables and figures supported.'
      );
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.mytekx.io/generateur-document-latex';

    // JSON-LD Schema
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Générateur LaTeX par IA – MyTekX",
      "operatingSystem": "All",
      "applicationCategory": "ProductivityApplication",
      "url": "https://www.mytekx.io/generateur-document-latex",
      "logo": "https://www.mytekx.io/favicon.svg",
      "featureList": [
        "Conversion LaTeX automatique via intelligence artificielle",
        "Support Equations, Tables, Figures",
        "Export PDF et .tex"
      ],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "EUR" 
      },
      "publisher": { 
        "@type": "Organization", 
        "name": "MyTekX" 
      }
    });
    document.head.appendChild(jsonLdScript);

    return () => {
      if (document.head.contains(jsonLdScript)) {
        document.head.removeChild(jsonLdScript);
      }
    };
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const content = language === 'fr' ? {
    title: "Générateur de documents LaTeX propulsé par l'intelligence artificielle",
    subtitle: "Transformez vos idées en documents LaTeX professionnels en quelques clics grâce à notre IA avancée",
    cta: "Essayer le générateur",
    nav: { home: "Accueil", features: "Fonctionnalités", faq: "FAQ" },
    sections: {
      why: {
        title: "Pourquoi choisir LaTeX ?",
        content: "LaTeX est le standard de référence pour la création de documents académiques et scientifiques de haute qualité. Contrairement aux traitements de texte classiques, LaTeX garantit une typographie parfaite, une gestion automatique des références et une cohérence visuelle irréprochable. Notre générateur LaTeX par IA démocratise l'accès à cette technologie puissante en éliminant la courbe d'apprentissage traditionnellement associée à LaTeX."
      },
      how: {
        title: "Fonctionnement de notre IA",
        content: "Notre intelligence artificielle analyse votre contenu source et génère automatiquement le code LaTeX correspondant. L'IA reconnaît les structures documentaires (titres, paragraphes, listes), les éléments mathématiques (équations, formules), les tableaux et les figures. Elle applique automatiquement les bonnes pratiques de formatage LaTeX pour produire un code propre et optimisé."
      },
      tutorial: {
        title: "Tutoriel pas-à-pas",
        steps: [
          "Uploadez votre document source (PDF, DOCX, ou texte)",
          "Sélectionnez vos préférences de formatage",
          "L'IA analyse et convertit automatiquement votre contenu",
          "Téléchargez votre fichier .tex et le PDF généré",
          "Modifiez si nécessaire avec votre éditeur LaTeX favori"
        ]
      },
      comparison: {
        title: "Comparaison avec Overleaf et Pandoc",
        content: "Contrairement à Overleaf qui nécessite de connaître LaTeX, ou Pandoc qui demande des configurations complexes, notre générateur IA offre une approche intuitive. Vous obtenez la puissance de LaTeX sans la complexité technique, tout en conservant la possibilité d'éditer manuellement le code généré."
      },
      faq: {
        title: "Questions fréquemment posées",
        items: [
          {
            q: "Quels types de documents puis-je convertir ?",
            a: "Notre IA supporte les PDF, documents Word, présentations PowerPoint et fichiers texte. Elle est particulièrement efficace avec les documents académiques, articles scientifiques et thèses."
          },
          {
            q: "La qualité du LaTeX généré est-elle professionnelle ?",
            a: "Oui, notre IA produit du code LaTeX propre et optimisé, suivant les meilleures pratiques. Le résultat est comparable à ce qu'écrirait un expert LaTeX."
          },
          {
            q: "Puis-je modifier le code LaTeX après génération ?",
            a: "Absolument ! Le fichier .tex généré est entièrement modifiable. Vous pouvez l'ouvrir dans n'importe quel éditeur LaTeX (TeXstudio, Overleaf, etc.)"
          },
          {
            q: "L'outil gère-t-il les équations mathématiques complexes ?",
            a: "Notre IA excelle dans la reconnaissance et conversion d'équations mathématiques, y compris les formules complexes avec matrices, intégrales et notations spécialisées."
          }
        ]
      }
    }
  } : {
    title: "AI-powered LaTeX Document Generator",
    subtitle: "Transform your ideas into professional LaTeX documents in just a few clicks with our advanced AI",
    cta: "Try the generator",
    nav: { home: "Home", features: "Features", faq: "FAQ" },
    sections: {
      why: {
        title: "Why choose LaTeX?",
        content: "LaTeX is the reference standard for creating high-quality academic and scientific documents. Unlike traditional word processors, LaTeX guarantees perfect typography, automatic reference management, and impeccable visual consistency. Our AI LaTeX generator democratizes access to this powerful technology by eliminating the learning curve traditionally associated with LaTeX."
      },
      how: {
        title: "How our AI works",
        content: "Our artificial intelligence analyzes your source content and automatically generates the corresponding LaTeX code. The AI recognizes document structures (titles, paragraphs, lists), mathematical elements (equations, formulas), tables and figures. It automatically applies LaTeX formatting best practices to produce clean and optimized code."
      },
      tutorial: {
        title: "Step-by-step tutorial",
        steps: [
          "Upload your source document (PDF, DOCX, or text)",
          "Select your formatting preferences",
          "AI analyzes and automatically converts your content",
          "Download your .tex file and generated PDF",
          "Edit if necessary with your favorite LaTeX editor"
        ]
      },
      comparison: {
        title: "Comparison with Overleaf and Pandoc",
        content: "Unlike Overleaf which requires LaTeX knowledge, or Pandoc which demands complex configurations, our AI generator offers an intuitive approach. You get the power of LaTeX without technical complexity, while retaining the ability to manually edit the generated code."
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "What types of documents can I convert?",
            a: "Our AI supports PDFs, Word documents, PowerPoint presentations and text files. It is particularly effective with academic documents, scientific articles and theses."
          },
          {
            q: "Is the generated LaTeX quality professional?",
            a: "Yes, our AI produces clean and optimized LaTeX code, following best practices. The result is comparable to what a LaTeX expert would write."
          },
          {
            q: "Can I modify the LaTeX code after generation?",
            a: "Absolutely! The generated .tex file is fully editable. You can open it in any LaTeX editor (TeXstudio, Overleaf, etc.)"
          },
          {
            q: "Does the tool handle complex mathematical equations?",
            a: "Our AI excels at recognizing and converting mathematical equations, including complex formulas with matrices, integrals and specialized notations."
          }
        ]
      }
    }
  };

  const handleCTA = () => {
          window.open('https://app.mytekx.io', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header avec navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ΘΞ
              </div>
              <span className="text-xl font-semibold text-gray-900">MyTekX</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                {content.nav.home}
              </a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                {content.nav.features}
              </a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                {content.nav.faq}
              </a>
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
              >
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
          <button 
            onClick={handleCTA}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            {content.cta} →
          </button>
        </div>
      </section>

      {/* Image illustrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <img 
            src="/assets/latex-ia-preview.svg" 
            alt="Interface du générateur LaTeX par intelligence artificielle MyTekX"
            className="mx-auto rounded-lg shadow-2xl max-w-4xl w-full"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='24' fill='%236b7280'%3EInterface IA LaTeX Generator%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </section>

      {/* Section Pourquoi LaTeX */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.sections.why.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.sections.why.content}
          </p>
        </div>
      </section>

      {/* Section Fonctionnement IA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.sections.how.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {content.sections.how.content}
          </p>
          
          <div className="text-center">
            <img 
              src="/assets/ia-latex-process.svg" 
              alt="Processus de conversion IA vers LaTeX montrant l'analyse automatique des documents"
              className="mx-auto rounded-lg shadow-lg max-w-2xl w-full"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg width='600' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='18' fill='%23374151'%3EProcessus IA → LaTeX%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </section>

      {/* Tutoriel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {content.sections.tutorial.title}
          </h2>
          <div className="space-y-6">
            {content.sections.tutorial.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.sections.comparison.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.sections.comparison.content}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {content.sections.faq.title}
          </h2>
          <div className="space-y-6">
            {content.sections.faq.items.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.q}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' 
              ? 'Prêt à générer vos documents LaTeX ?' 
              : 'Ready to generate your LaTeX documents?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'fr' 
              ? 'Rejoignez des dixaines d\'utilisateurs qui font confiance à notre IA'
              : 'Join thousands of users who trust our AI'}
          </p>
          <button 
            onClick={handleCTA}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            {content.cta} →
          </button>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ΘΞ
            </div>
            <span className="text-xl font-semibold">MyTekX</span>
          </div>
          <p className="text-gray-400">
            © 2024 MyTekX. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LatexGeneratorIA; 