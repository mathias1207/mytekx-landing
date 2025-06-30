# MyTekX Landing - Authentification Firebase

Application de landing page pour MyTekX avec authentification Firebase complète.

## 🚀 Stack technique

- **React 18** - Bibliothèque UI
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **React Router DOM v6** - Routage
- **Firebase Auth** - Authentification
- **React Firebase Hooks** - Hooks Firebase

## 🔐 Fonctionnalités d'authentification

- ✅ Inscription/Connexion par email + mot de passe
- ✅ Connexion via Google OAuth
- ✅ Déconnexion
- ✅ Gestion des erreurs Firebase
- ✅ Routes protégées
- ✅ Redirection automatique selon l'état de connexion
- ✅ Interface utilisateur moderne et responsive

## 📁 Structure du projet

```
src/
├── components/
│   ├── ProtectedRoute.jsx     # Composant pour protéger les routes
│   └── ...                    # Autres composants existants
├── contexts/
│   ├── AuthContext.jsx        # Contexte d'authentification Firebase
│   ├── LanguageContext.jsx    # Contexte de langue existant
│   └── ThemeContext.jsx       # Contexte de thème existant
├── firebase/
│   └── init.js                # Configuration Firebase
├── pages/
│   ├── Login.jsx              # Page de connexion
│   ├── Register.jsx           # Page d'inscription
│   ├── Dashboard.jsx          # Tableau de bord utilisateur
│   ├── Profile.jsx            # Page de profil utilisateur
│   └── LatexGeneratorIA.jsx   # Page SEO générateur LaTeX
└── App.jsx                    # Routage principal avec authentification
```

## ⚙️ Installation et configuration

### 1. Installation des dépendances

```bash
cd mytekx-landing/landing
npm install
```

### 2. Configuration Firebase

#### A. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet ou utilisez un projet existant
3. Activez **Authentication** dans la console Firebase
4. Configurez les méthodes de connexion :
   - Email/Password
   - Google OAuth

#### B. Configurer les variables d'environnement

1. Copiez le fichier d'exemple :
```bash
cp env.example .env
```

2. Récupérez votre configuration Firebase :
   - Dans Firebase Console → Paramètres du projet → Vos applications
   - Cliquez sur l'icône Web `</>`
   - Copiez les valeurs de configuration

3. Remplissez le fichier `.env` :
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-projet-id
VITE_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123DEF
```

#### C. Configurer les domaines autorisés

Dans Firebase Console → Authentication → Settings → Authorized domains :
- Ajoutez `localhost` (pour le développement)
- Ajoutez `https://www.mytekx.io` (pour la production)

### 3. Démarrer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔄 Flux d'authentification

### Routes publiques
- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/generateur-document-latex` - Page SEO générateur LaTeX

### Routes protégées
- `/dashboard` - Tableau de bord (nécessite une connexion)
- `/profile` - Profil utilisateur (nécessite une connexion)

### Redirection automatique
- Si un utilisateur connecté visite `/login` ou `/register` → Redirection vers `/dashboard`
- Si un utilisateur non connecté visite une route protégée → Redirection vers `/login`
- Route `/app` → Redirection conditionnelle selon l'état de connexion

## 🛠️ Scripts disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour la production
npm run preview      # Prévisualiser le build de production
npm run lint         # Linter le code
```

## 📱 Fonctionnalités par page

### Page de connexion (`/login`)
- Formulaire email/mot de passe
- Connexion Google OAuth
- Gestion des erreurs Firebase
- Validation côté client
- Lien vers l'inscription

### Page d'inscription (`/register`)
- Formulaire complet (nom, email, mot de passe)
- Validation robuste côté client
- Connexion Google OAuth
- Gestion des erreurs Firebase
- Lien vers la connexion

### Dashboard (`/dashboard`)
- Interface d'accueil utilisateur
- Statistiques et cartes d'information
- Actions rapides
- Informations du compte
- Bouton de déconnexion

### Profil (`/profile`)
- Informations détaillées du compte
- Paramètres utilisateur
- Historique de connexion
- Options de gestion du compte

## 🎨 Interface utilisateur

- **Design moderne** avec Tailwind CSS
- **Responsive** sur tous les appareils
- **Animations** et transitions fluides
- **Messages d'erreur** clairs et informatifs
- **Indicateurs de chargement** pendant les opérations

## 🔒 Sécurité

- **Validation côté client** pour une meilleure UX
- **Gestion d'erreurs Firebase** avec messages en français
- **Routes protégées** avec redirection automatique
- **Tokens Firebase** gérés automatiquement
- **Configuration sécurisée** via variables d'environnement

## 🚀 Déploiement

### Vercel (recommandé)

1. Connectez votre repository à Vercel
2. Configurez les variables d'environnement dans Vercel :
   - Ajoutez toutes les variables `VITE_FIREBASE_*`
3. Déployez automatiquement

### Autres plateformes

L'application est compatible avec toutes les plateformes supportant Vite :
- Netlify
- Firebase Hosting
- GitHub Pages
- Heroku

## 📝 Notes importantes

- **Variables d'environnement** : Ne commitez jamais votre fichier `.env` avec de vraies clés
- **Domaines autorisés** : N'oubliez pas d'ajouter vos domaines de production dans Firebase
- **OAuth Google** : Configurez correctement les URI de redirection dans Google Console
- **Build production** : Testez toujours votre build de production avant le déploiement

## 🔍 SEO et Marketing

### Page Générateur LaTeX IA (`/generateur-document-latex`)

Cette page SEO dédiée optimise la visibilité sur les moteurs de recherche pour le générateur LaTeX par IA.

#### Fonctionnalités SEO implémentées :
- ✅ **Meta-tags optimisés** : title, description, keywords
- ✅ **Open Graph** et Twitter Cards pour le partage social
- ✅ **JSON-LD Schema** : Organization + SoftwareApplication
- ✅ **URL canonique** pour éviter le contenu dupliqué
- ✅ **Images optimisées** avec alt-text contenant "IA LaTeX"
- ✅ **Contenu riche** (≈900 mots) avec mots-clés ciblés
- ✅ **Structure Hn** sémantique (h1, h2, h3)
- ✅ **CTA** vers l'application principale
- ✅ **Sitemap.xml** et robots.txt mis à jour

#### Mots-clés ciblés :
- "générateur LaTeX"
- "LaTeX IA"
- "intelligence artificielle LaTeX"
- "conversion PDF LaTeX"
- "document académique"

#### Fichiers SEO créés/modifiés :
```
public/
├── robots.txt              # Directives pour les crawlers
├── sitemap.xml            # Plan du site
├── site.webmanifest       # Manifest PWA optimisé
└── assets/
    ├── latex-ia-preview.svg    # Image d'illustration
    └── ia-latex-process.svg    # Diagramme du processus
```

#### Comment ajouter d'autres pages SEO :

1. **Créer une nouvelle page** dans `src/pages/` :
```jsx
// src/pages/NouvellePage.jsx
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NouvellePage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Mise à jour du title
    document.title = 'Titre SEO | MyTekX';

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Description SEO optimisée');
    }

    // URL canonique
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.mytekx.io/nouvelle-page';

    // JSON-LD si nécessaire
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Titre de la page",
      "url": "https://www.mytekx.io/nouvelle-page"
    });
    document.head.appendChild(jsonLdScript);

    return () => {
      document.head.removeChild(jsonLdScript);
    };
  }, [language]);

  return (
    <div>
      <h1>Titre principal avec mots-clés</h1>
      {/* Contenu riche et optimisé */}
    </div>
  );
};

export default NouvellePage;
```

2. **Ajouter la route** dans `src/App.jsx` :
```jsx
import NouvellePage from './pages/NouvellePage';

// Dans le composant Routes :
<Route path="/nouvelle-page" element={<NouvellePage />} />
```

3. **Mettre à jour le sitemap** dans `public/sitemap.xml` :
```xml
<url>
  <loc>https://www.mytekx.io/nouvelle-page</loc>
  <lastmod>2024-01-15</lastmod>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

#### Bonnes pratiques SEO :
- **Contenu unique** : Éviter le contenu dupliqué
- **Mots-clés naturels** : Intégrer les mots-clés de manière naturelle
- **Images optimisées** : Alt-text descriptif avec mots-clés
- **Vitesse de chargement** : Optimiser les images et le code
- **Mobile-first** : Design responsive obligatoire
- **URLs propres** : Utiliser des URLs descriptives
- **Liens internes** : Créer des liens vers d'autres pages pertinentes

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**MyTekX Team** - 2024
