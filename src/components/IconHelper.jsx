import React from 'react';

// Table de correspondance simplifiée qui utilise juste le nom sans préfixe
export const simpleIconMap = {
  // Intuition
  'Lightbulb': '💡',
  'ThoughtBubble': '💭',
  'Brain': '🧠',
  'Compass': '🧭',
  'Magic': '✨',
  
  // À retenir
  'Bookmark': '🔖',
  'Check': '✓',
  'Star': '⭐',
  'Exclamation': '❗',
  'Memory': '🧠',
  
  // Vulgarisation
  'Comment': '💬',
  'InfoCircle': 'ℹ️',
  'QuestionCircle': '❓',
  'Glasses': '👓',
  'HandPointRight': '👉',
  
  // Récap
  'ClipboardList': '📋',
  'ListAlt': '📄',
  'Tasks': '✓',
  'FileAlt': '📝',
  'ChartBar': '📊',
};

// Extraire le nom de l'icône à partir du code FontAwesome
export const extractIconName = (code) => {
  if (!code) return '';
  
  // Supprimer les backslashes et le préfixe "fa"
  // Par exemple, transformer '\faLightbulb' en 'Lightbulb'
  const clean = code.replace(/^\\*fa/i, '');
  return clean;
};

// Composant dédié pour afficher une icône
export const IconDisplay = ({ iconCode }) => {
  if (!iconCode) return <>•</>;
  
  // Obtenir le nom de l'icône
  const iconName = extractIconName(iconCode);
  
  // Obtenir l'emoji correspondant au nom
  const iconEmoji = simpleIconMap[iconName] || '•';
  
  return <>{iconEmoji}</>;
};

// Fonction utilitaire pour obtenir l'affichage d'une icône sous forme de chaîne
export const getIconDisplay = (iconCode) => {
  if (!iconCode) return '•';

  // Obtenir le nom de l'icône
  const iconName = extractIconName(iconCode);
  
  // Retourner l'emoji correspondant ou un point par défaut
  return simpleIconMap[iconName] || '•';
};

// Version compatible avec l'ancien iconMap pour éviter les erreurs
export const iconMap = {};
Object.keys(simpleIconMap).forEach(key => {
  // Créer des entrées pour différentes variations de syntaxe
  iconMap[`\\fa${key}`] = simpleIconMap[key];
  iconMap[`\\\\fa${key}`] = simpleIconMap[key];
  iconMap[`fa${key}`] = simpleIconMap[key];
});

export default IconDisplay;
