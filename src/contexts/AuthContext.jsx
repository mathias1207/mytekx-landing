import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/init';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de nettoyage complet de l'authentification
  const clearAllAuthData = () => {
    console.log('🧹 Clearing all authentication data...');
    
    // Nettoyer tous les cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Nettoyer spécifiquement le cookie Firebase
    document.cookie = '__session=; path=/; domain=.mytekx.io; max-age=0; secure; sameSite=Lax';
    document.cookie = '__session=; path=/; domain=mytekx.io; max-age=0; secure; sameSite=Lax';
    document.cookie = '__session=; path=/; max-age=0; secure; sameSite=Lax';
    
    // Nettoyer tout le stockage
    localStorage.clear();
    sessionStorage.clear();
    
    // Nettoyer le cache d'indexedDB Firebase
    if ('indexedDB' in window) {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
    }
    
    console.log('✅ All auth data cleared');
  };

  // Fonction d'inscription par email/mot de passe
  const signUp = async (email, password, displayName) => {
    try {
      setError(null);
      setLoading(true);
      console.log('📝 Creating new user account...');
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil avec le nom d'affichage
      if (displayName) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }
      
      console.log('✅ User account created successfully');
      return result;
    } catch (error) {
      console.error('❌ Error creating account:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion par email/mot de passe
  const signIn = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      console.log('🔑 Signing in user...');
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ User signed in successfully');
      return result;
    } catch (error) {
      console.error('❌ Error signing in:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion via Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      console.log('🔑 Signing in with Google...');
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Google sign in successful');
      return result;
    } catch (error) {
      console.error('❌ Error signing in with Google:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion avec nettoyage des cookies
  const logout = async () => {
    try {
      setError(null);
      console.log('🔄 Logging out user from landing page...');
      
      // Déconnecter de Firebase
      await signOut(auth);
      
      // Nettoyage complet
      clearAllAuthData();
      
      console.log('✅ Logout completed from landing page');
      
      // Rafraîchir la page pour un état propre
      window.location.reload();
      
    } catch (error) {
      console.error('❌ Error during logout:', error);
      setError(getErrorMessage(error.code));
      // Même en cas d'erreur, nettoyer localement
      clearAllAuthData();
      throw error;
    }
  };

  // Fonction de réinitialisation du mot de passe
  const resetPassword = async (email) => {
    try {
      setError(null);
      console.log('📧 Sending password reset email...');
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent');
    } catch (error) {
      console.error('❌ Error sending password reset:', error);
      setError(getErrorMessage(error.code));
      throw error;
    }
  };

  // Fonction pour effacer les erreurs
  const clearError = () => {
    setError(null);
  };

  // Fonction pour obtenir des messages d'erreur lisibles
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cette adresse email.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée.';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/invalid-email':
        return 'Adresse email invalide.';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard.';
      case 'auth/popup-closed-by-user':
        return 'La fenêtre de connexion a été fermée.';
      case 'auth/cancelled-popup-request':
        return 'Connexion annulée.';
      default:
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  };

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    console.log('🚀 Landing AuthContext initializing...');
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔥 Landing Firebase auth state changed:', user?.email || 'null');
      
      if (user) {
        console.log('✅ User authenticated on landing:', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        });
        
        // Nettoyer les données d'auth potentiellement conflictuelles
        const existingUserEmail = localStorage.getItem('userEmail');
        if (existingUserEmail && existingUserEmail !== user.email) {
          console.log('🧹 Cleaning conflicting localStorage data');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('displayName');
          localStorage.removeItem('userProfileData');
        }
        
        // Stocker les nouvelles données
        localStorage.setItem('userEmail', user.email);
        if (user.displayName) {
          localStorage.setItem('displayName', user.displayName);
        }
        
        setCurrentUser(user);
      } else {
        console.log('❌ No authenticated user on landing');
        setCurrentUser(null);
        
        // Nettoyer localStorage quand pas d'utilisateur
        localStorage.removeItem('userEmail');
        localStorage.removeItem('displayName');
        localStorage.removeItem('userProfileData');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fonction de debug pour les problèmes d'auth
  window.debugLandingAuth = () => {
    console.log('🔍 Landing Auth Debug:', {
      'React currentUser': currentUser,
      'Firebase auth.currentUser': auth.currentUser,
      'Loading': loading,
      'Error': error,
      'localStorage userEmail': localStorage.getItem('userEmail'),
      'All cookies': document.cookie
    });
  };

  // Exposer la fonction de nettoyage pour le debug
  window.clearAllAuthDataLanding = clearAllAuthData;

  console.log('🎯 Landing AuthContext state:', {
    currentUser: currentUser?.email || 'null',
    loading,
    error: error || 'none'
  });

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    clearError,
    clearAllAuthData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 