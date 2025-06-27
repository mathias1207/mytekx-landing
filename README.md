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
│   └── Profile.jsx            # Page de profil utilisateur
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

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**MyTekX Team** - 2024
