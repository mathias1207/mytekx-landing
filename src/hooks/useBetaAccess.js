import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

  // Fonction pour rediriger vers l'app (Firebase cookies gèrent la synchronisation)
  const redirectToAppWithAuth = useCallback(async () => {
    if (!currentUser) {
      console.error('❌ No user to authenticate');
      return;
    }

    try {
      console.log('🔑 Redirecting to app - Firebase cookies will handle auth sync...');
      console.log('👤 Current user:', {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        emailVerified: currentUser.emailVerified
      });
      
      // Vérifier et synchroniser le statut beta
      const hasBetaAccess = checkBetaAccess();
      console.log('🔐 Beta access status:', hasBetaAccess);
      
      if (hasBetaAccess) {
        // Synchroniser l'accès beta pour l'app
        localStorage.setItem('hasBetaAccess', 'true');
        localStorage.setItem('betaTimestamp', new Date().getTime().toString());
        
        console.log('🔐 Beta access synchronized for app');
        
        // Passer le statut beta dans l'URL pour synchronisation immédiate
        const appUrl = new URL('https://app.mytekx.io');
        appUrl.searchParams.set('beta', 'validated');
        
        console.log('🚀 Redirecting to app with beta status...');
        window.location.href = appUrl.toString();
      } else {
        console.warn('⚠️ User does not have beta access');
        // Redirection simple sans paramètre beta
        console.log('🚀 Redirecting to app...');
        window.location.href = 'https://app.mytekx.io';
      }
      
    } catch (error) {
      console.error('❌ Error during redirect:', error);
      // Fallback vers redirection simple
      window.location.href = 'https://app.mytekx.io';
    }
  }, [currentUser, checkBetaAccess]);

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
      console.warn('❌ User not authenticated - need to login first');
      // Rediriger vers la page de connexion ou afficher un message
      setIsProcessing(false);
      // Vous pouvez personnaliser cette behavior selon vos besoins
      alert('Veuillez vous connecter pour accéder à l\'application');
      return;
    }

    setIsProcessing(false);
    console.log('✅ User authenticated, checking beta access...');

    if (checkBetaAccess()) {
      // L'utilisateur a déjà un accès beta, rediriger avec synchronisation
      console.log('🚀 User has beta access, redirecting to app');
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
    console.log('🎉 Beta code validated successfully');
    setShowBetaGate(false);
    
    // Petite animation avant redirection
    setTimeout(() => {
      redirectToAppWithAuth();
    }, 500);
  }, [redirectToAppWithAuth]);

  // Fonction pour fermer le modal beta
  const closeBetaGate = useCallback(() => {
    console.log('❌ Beta gate closed by user');
    setShowBetaGate(false);
    setIsProcessing(false);
  }, []);

  // Gérer la déconnexion forcée depuis l'app
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
      console.log('🔄 Logout parameter detected from app');
      // Nettoyer l'URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    
    if (urlParams.get('needsAuth') === 'true') {
      console.log('🔐 needsAuth parameter detected from app');
      alert('Votre session a expiré. Veuillez vous reconnecter.');
      // Nettoyer l'URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return {
    showBetaGate,
    accessApp,
    onBetaSuccess,
    closeBetaGate,
    checkBetaAccess: checkBetaAccess(),
    isProcessing,
    isAuthenticated: !!currentUser
  };
}; 