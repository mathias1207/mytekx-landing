# MyTekX Landing Page

Page d'accueil officielle de MyTekX - Convertisseur de slides/documents vers LaTeX.

## Description

La landing page MyTekX présente le service de conversion de documents et dirige les utilisateurs vers l'application principale. Elle comprend :

- Présentation du service MyTekX
- Fonctionnalités principales
- Témoignages et cas d'usage
- Aperçus des différentes solutions (Étudiant, Enseignant, Chercheur, Institution)
- Redirections vers l'application principale

## Technologies utilisées

- **React 18** - Framework frontend
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Icons** - Icônes

## Installation

1. Cloner le repository
```bash
git clone <url-du-repo>
cd mytekx-landing
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer en mode développement
```bash
npm run dev
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## Structure du projet

```
src/
├── components/          # Composants React
├── previews/           # Aperçus des solutions
├── contexts/           # Contexts React (Language, Theme)
├── assets/             # Images et ressources statiques
├── styles/             # Fichiers de style
└── utils/              # Utilitaires
```

## Fonctionnalités

- **Multi-langue** : Support français/anglais
- **Thème sombre/clair** : Basculement entre les modes
- **Responsive** : Optimisé pour mobile et desktop
- **Animations** : Transitions fluides avec Framer Motion
- **Aperçus interactifs** : Prévisualisation des différentes solutions

## Déploiement

La landing page est optimisée pour être déployée sur :
- **Vercel** (recommandé)
- **Netlify**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

## Configuration

### Variables d'environnement

Créer un fichier `.env` avec :
```env
VITE_APP_URL=https://app.mytekx.io
VITE_API_URL=https://api.mytekx.io
```

### Liens vers l'application

La landing page redirige vers l'application principale via les boutons d'action.

## Licence

Propriétaire - MyTekX
