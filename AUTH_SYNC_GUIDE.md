# Guide de Synchronisation d'Authentification

## 🔥 Problème identifié
L'utilisateur se connecte sur la landing page (`mytekx.io`) mais apparaît comme déconnecté sur l'application principale (`app.mytekx.io`).

## 🛠️ Solutions implémentées

### 1. Partage d'authDomain Firebase
**Modifié :** 
- `mytekx-landing/landing/src/firebase/init.js`
- `mytekx-app/app/src/components/firebase/firebaseConfig.js`

**Changement :** `authDomain` mis à `"mytekx.io"` au lieu de `"mytekx-5b59f.firebaseapp.com"`

### 2. Token d'authentification en URL
**Modifié :** `mytekx-landing/landing/src/hooks/useBetaAccess.js`

La landing page passe maintenant un token d'authentification Firebase lors de la redirection :
```
https://app.mytekx.io?authToken=FIREBASE_ID_TOKEN&authSource=landing
```

### 3. Détection de synchronisation
**Modifié :** `mytekx-app/app/src/contexts/AuthContext.jsx`

L'app détecte si l'utilisateur était connecté sur la landing et attend la synchronisation Firebase.

## 🔧 Configuration Firebase requise

### Étape 1 : Firebase Console
1. Aller dans Firebase Console → Authentication → Settings
2. Dans "Authorized domains", ajouter :
   - `mytekx.io`
   - `app.mytekx.io`

### Étape 2 : DNS Configuration
S'assurer que les enregistrements DNS pointent correctement :
```
mytekx.io → Landing page
app.mytekx.io → Application principale
```

### Étape 3 : Configuration SSL
Les deux domaines doivent avoir des certificats SSL valides pour que Firebase Auth fonctionne.

## 🧪 Test de la solution

1. **Ouvrir** `mytekx.io` (en navigation privée)
2. **Se connecter** sur la landing page
3. **Naviguer** vers l'application via les boutons de la landing
4. **Vérifier** que l'utilisateur apparaît connecté dans l'app

## 🔍 Debug & Logs

### Logs à surveiller dans la landing :
```
🔑 Getting Firebase ID token...
🚀 Redirecting to app with auth token
```

### Logs à surveiller dans l'app :
```
🔑 Processing auth token from landing page...
✅ Auth token received from landing, user should be authenticated automatically
Utilisateur connecté: [USER_UID]
```

## 🚨 Fallbacks en cas d'échec

Si la synchronisation automatique échoue :

1. **Message utilisateur :** "Redirection en cours..."
2. **Attente :** 3 secondes pour la sync Firebase
3. **Fallback :** Demander à l'utilisateur de se reconnecter

## 🔄 Solutions alternatives

### Option A : Single Sign-On (SSO)
Implémenter un système SSO avec JWT tokens partagés.

### Option B : Iframe de synchronisation
Utiliser un iframe caché pour synchroniser l'authentification.

### Option C : Redirection avec état
Stocker l'état d'authentification et rediriger avec paramètres.

## 📱 Test en production

1. **Déployer** les modifications sur les deux applications
2. **Tester** avec de vrais utilisateurs
3. **Monitorer** les logs de Firebase Auth
4. **Ajuster** selon les retours utilisateurs

---
**Note :** Cette solution utilise les ID tokens Firebase qui expirent après 1 heure. Pour une solution plus robuste en production, considérer l'implémentation d'un refresh token mechanism. 