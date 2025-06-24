/**
 * Conseils et astuces affichés pendant le chargement
 * Organisés par langue (fr/en)
 */

export const tips = {
  fr: [
    "LaTeX a été créé en 1984 par Leslie Lamport.",
    "LaTeX est utilisé par plus de 80% des mathématiciens.",
    "Le nom 'LaTeX' vient de 'Lamport TeX'.",
    "LaTeX est particulièrement apprécié pour sa gestion des formules mathématiques.",
    "LaTeX est un logiciel libre et gratuit.",
    "LaTeX est utilisé par les plus grandes universités du monde.",
    "LaTeX permet de générer des bibliographies automatiquement avec BibTeX.",
    "La plupart des publications scientifiques sont rédigées en LaTeX.",
    "Il existe plus de 5000 packages pour LaTeX, chacun offrant des fonctionnalités supplémentaires.",
    "LaTeX peut générer des documents dans n'importe quelle langue.",
    "LaTeX permet de créer des présentations, des posters, des CV, et même des livres entiers.",
    "TeX, le système sur lequel LaTeX est basé, a été créé par Donald Knuth en 1978.",
    "LaTeX est prononcé 'La-tek' et non 'La-teks'.",
    "Les mathématiciens préfèrent LaTeX car il permet d'écrire des équations complexes facilement.",
    "LaTeX sépare le contenu de la mise en page, vous permettant de vous concentrer sur votre texte.",
    "LaTeX produit des documents avec une typographie professionnelle.",
    "Dapix utilise l'IA pour structurer vos contenus en LaTeX de manière optimale.",
    "Un document LaTeX est un simple fichier texte, ce qui le rend très portable.",
    "Vous pouvez compiler votre LaTeX en ligne sur des plateformes comme Overleaf.",
    "Les numéros de section, figures et références sont automatiquement gérés dans LaTeX."
  ],
  en: [
    "LaTeX was created in 1984 by Leslie Lamport.",
    "LaTeX is used by more than 80% of mathematicians worldwide.",
    "The name 'LaTeX' comes from 'Lamport TeX'.",
    "LaTeX is particularly appreciated for its handling of mathematical formulas.",
    "LaTeX is free and open-source software.",
    "LaTeX is used by the world's top universities.",
    "LaTeX can automatically generate bibliographies with BibTeX.",
    "Most scientific publications are written in LaTeX.",
    "There are more than 5,000 packages for LaTeX, each offering additional features.",
    "LaTeX can generate documents in any language.",
    "LaTeX can create presentations, posters, CVs, and even entire books.",
    "TeX, the system on which LaTeX is based, was created by Donald Knuth in 1978.",
    "LaTeX is pronounced 'Lay-tek' not 'Lay-teks'.",
    "Mathematicians prefer LaTeX because it makes writing complex equations easy.",
    "LaTeX separates content from layout, allowing you to focus on your text.",
    "LaTeX produces documents with professional typography.",
    "Dapix uses AI to optimally structure your content in LaTeX.",
    "A LaTeX document is a simple text file, making it very portable.",
    "You can compile your LaTeX online on platforms like Overleaf.",
    "Section numbers, figures, and references are automatically managed in LaTeX."
  ]
};

/**
 * Récupérer un conseil aléatoire dans la langue spécifiée
 * @param {string} language - Code de langue ('fr' ou 'en')
 * @returns {string} Un conseil aléatoire
 */
export function getRandomTip(language = 'fr') {
  const langTips = tips[language] || tips.fr;
  const randomIndex = Math.floor(Math.random() * langTips.length);
  return langTips[randomIndex];
}

export default tips; 