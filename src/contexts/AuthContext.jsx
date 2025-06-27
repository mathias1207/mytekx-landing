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

  // Fonction d'inscription par email/mot de passe
  const signUp = async (email, password, displayName) => {
    try {
      setError(null);
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil avec le nom d'affichage
      if (displayName) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }
      
      return result;
    } catch (error) {
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
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
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(getErrorMessage(error.code));
      throw error;
    }
  };

  // Fonction de réinitialisation du mot de passe
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 