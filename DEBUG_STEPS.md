# 🔧 Debug Étape par Étape

## 🎯 Objectif
Identifier exactement où le problème de synchronisation échoue.

## 📝 Étapes de debug

### 1. Test sur la Landing Page

1. **Ouvrir** `mytekx.io` en navigation privée
2. **Se connecter** normalement  
3. **Ouvrir DevTools** (F12) → Console
4. **Cliquer** sur "Commencez maintenant"
5. **Vérifier ces logs** dans la console :

```
🔑 Preparing user data for app sync...
👤 Current user data: { uid: "...", email: "...", ... }
💾 Auth data saved for app sync: { ... }
📝 localStorage authSyncData: { ... }
📝 localStorage tempAuthStatus: authenticated
🚀 Redirecting to app...
```

**❌ Si ces logs n'apparaissent pas :** Le problème est côté landing page.

### 2. Test Manuel dans la Console (Landing)

Dans la console de la landing page, exécuter :

```javascript
// Vérifier l'utilisateur connecté
console.log('Current user:', window.firebase?.auth()?.currentUser);

// Vérifier localStorage après connexion
console.log('localStorage authSyncData:', localStorage.getItem('authSyncData'));
console.log('localStorage tempAuthStatus:', localStorage.getItem('tempAuthStatus'));

// Forcer la création des données
const testData = {
  uid: 'test-uid',
  email: 'test@example.com', 
  displayName: 'Test User',
  syncTimestamp: Date.now(),
  fromLanding: true
};
localStorage.setItem('authSyncData', JSON.stringify(testData));
localStorage.setItem('tempAuthStatus', 'authenticated');
console.log('✅ Test data created manually');
```

### 3. Test sur l'Application

1. **Aller** sur `app.mytekx.io` APRÈS avoir fait l'étape 1 ou 2
2. **Ouvrir DevTools** → Console immédiatement
3. **Vérifier ces logs** :

```
🔍 Starting auth sync data processing...
📋 Raw localStorage data:
  - authSyncData: { ... }
  - tempAuthStatus: authenticated
🔑 Processing auth sync data from landing page...
📦 Parsed sync data: { ... }
⏱️ Data age: Xs (max: 300s)
✅ Valid sync data found, creating temporary user session
👤 Creating temp user: { ... }
🎯 Temporary user session created: email@example.com
🧹 Cleaned up localStorage
```

**❌ Si ces logs n'apparaissent pas :** Le problème est côté app.

### 4. Test Manuel dans la Console (App)

Dans la console de l'app, exécuter :

```javascript
// Vérifier localStorage
console.log('localStorage authSyncData:', localStorage.getItem('authSyncData'));
console.log('localStorage tempAuthStatus:', localStorage.getItem('tempAuthStatus'));

// Vérifier le contexte Auth
console.log('Auth context state:', {
  currentUser: window.authContext?.currentUser,
  loading: window.authContext?.loading,
  isTemporary: window.authContext?.isTemporary
});

// Forcer la création d'un utilisateur temporaire
const tempUser = {
  uid: 'debug-uid',
  email: 'debug@test.com',
  displayName: 'Debug User',
  isTemporary: true
};
console.log('🧪 Creating debug temp user');
// Cette partie nécessite d'accéder au state React - plus complexe
```

### 5. Vérification AccountSection

Si l'app reçoit bien les données mais AccountSection affiche "Non connecté" :

```javascript
// Dans la console de l'app
console.log('AccountSection check:');
console.log('- currentUser in context:', window.authContext?.currentUser);
console.log('- All React components state would need React DevTools');
```

## 🚨 Points de contrôle

### ✅ Checkpoint 1 : Landing Page
- [ ] Utilisateur connecté visible dans Firebase
- [ ] Logs de préparation des données
- [ ] localStorage contient authSyncData
- [ ] localStorage contient tempAuthStatus='authenticated'

### ✅ Checkpoint 2 : Navigation
- [ ] URL change vers app.mytekx.io
- [ ] localStorage toujours présent après navigation

### ✅ Checkpoint 3 : App Reception  
- [ ] Logs de traitement des données sync
- [ ] Données parsées correctement
- [ ] Utilisateur temporaire créé
- [ ] localStorage nettoyé

### ✅ Checkpoint 4 : React Context
- [ ] currentUser défini dans AuthContext
- [ ] isTemporary = true
- [ ] loading = false

### ✅ Checkpoint 5 : AccountSection
- [ ] currentUser reçu du contexte
- [ ] userData chargé
- [ ] Affichage correct

## 🎯 Actions selon les résultats

**Si échec Checkpoint 1 :** Problème d'authentification Firebase landing
**Si échec Checkpoint 2 :** Problème de sauvegarde localStorage 
**Si échec Checkpoint 3 :** Problème de lecture app
**Si échec Checkpoint 4 :** Problème React Context
**Si échec Checkpoint 5 :** Problème composant AccountSection

---
🔍 **Exécutez ces tests et reportez-moi les résultats !** 