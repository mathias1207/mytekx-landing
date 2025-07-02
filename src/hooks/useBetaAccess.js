import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getIdToken } from 'firebase/auth';

export const useBetaAccess = () => {
  const [showBetaGate, setShowBetaGate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentUser, loading } = useAuth();

  // Vérifier si l'utilisateur a un accès beta
  const checkBetaAccess = useCallback(() => {
    if (!currentUser) return false;
    
    const storedAccess = localStorage.getItem(`betaAccess_${currentUser.uid}`);
    return storedAccess === 'true';
  }, [currentUser]);

  // Fonction pour rediriger vers l'app avec authentification
  const redirectToAppWithAuth = useCallback(async () => {
    if (!currentUser) {
      console.error('❌ No user to authenticate');
      return;
    }

    try {
      console.log('🔑 Getting Firebase ID token...');
      const idToken = await getIdToken(currentUser);
      
      // Créer l'URL avec le token
      const appUrl = new URL('https://app.mytekx.io');
      appUrl.searchParams.set('authToken', idToken);
      appUrl.searchParams.set('authSource', 'landing');
      
      console.log('🚀 Redirecting to app with auth token');
      window.location.href = appUrl.toString();
    } catch (error) {
      console.error('❌ Error getting auth token:', error);
      // Fallback vers redirection simple
      window.location.href = 'https://app.mytekx.io';
    }
  }, [currentUser]);

  // Fonction pour accéder à l'app avec vérification beta
  const accessApp = useCallback(() => {
    console.log('🔍 accessApp called with:', {
      currentUser: currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
      loading,
      timestamp: new Date().toISOString()
    });
    
    // Si l'authentification est en cours, attendre
    if (loading) {
      console.log('⏳ Auth still loading, setting processing state...');
      setIsProcessing(true);
      return;
    }

    if (!currentUser) {
      console.warn('❌ User not authenticated - redirecting to login');
      // Au lieu de simplement abandonner, rediriger vers la page de connexion
      window.location.href = '/login';
      return;
    }

    setIsProcessing(false);
    console.log('✅ User authenticated, checking beta access...');

    if (checkBetaAccess()) {
      // L'utilisateur a déjà un accès beta, rediriger avec token d'authentification
      console.log('🚀 User has beta access, redirecting to app with auth token');
      redirectToAppWithAuth();
    } else {
      // Afficher le modal de demande de code beta
      console.log('🔐 No beta access, showing beta gate');
      setShowBetaGate(true);
    }
  }, [currentUser, loading, checkBetaAccess, redirectToAppWithAuth]);

  // Effet pour gérer le cas où l'utilisateur se connecte pendant que l'accès est en cours de traitement
  useEffect(() => {
    if (isProcessing && !loading && currentUser) {
      console.log('Auth completed while processing, continuing with accessApp');
      setIsProcessing(false);
      accessApp();
    }
  }, [isProcessing, loading, currentUser, accessApp]);

  // Fonction appelée quand le code beta est validé
  const onBetaSuccess = useCallback(() => {
    setShowBetaGate(false);
    // Petite animation avant redirection
    setTimeout(() => {
      redirectToAppWithAuth();
    }, 500);
  }, [redirectToAppWithAuth]);

  // Fonction pour fermer le modal beta
  const closeBetaGate = useCallback(() => {
    setShowBetaGate(false);
    setIsProcessing(false);
  }, []);

  return {
    showBetaGate,
    accessApp,
    onBetaSuccess,
    closeBetaGate,
    checkBetaAccess: checkBetaAccess(),
    isProcessing
  };
}; 