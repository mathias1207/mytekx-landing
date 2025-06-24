import { useState, useEffect, useRef } from 'react';

// URL du backend, à ajuster selon votre configuration
const BACKEND_URL = 'http://localhost:8000';

/**
 * Hook pour gérer le suivi de progression d'un traitement en arrière-plan
 * @param {string} fileId - Identifiant du fichier à suivre
 * @param {function} onComplete - Fonction à exécuter lorsque le traitement est terminé
 * @param {number} pollingInterval - Intervalle de vérification en ms (défaut: 2000ms)
 */
export default function useBackendProgress(fileId, onComplete, pollingInterval = 2000) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  
  // Utiliser useRef pour conserver une référence à l'intervalle
  const intervalRef = useRef(null);

  // Fonction utilitaire pour effectuer un fetch avec timeout
  const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  // Fonction pour arrêter le polling
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPolling(false);
    }
  };

  // Fonction pour vérifier la progression
  const checkProgress = async () => {
    if (!fileId) return;
    
    try {
      const response = await fetchWithTimeout(
        `${BACKEND_URL}/progress/${fileId}`,
        {},
        5000 // 5 secondes timeout
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      
      setProgress(data.percent || 0);
      setStatus(data.status || '');
      
      // Si le traitement est terminé
      if (data.percent >= 100) {
        setIsComplete(true);
        stopPolling();
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error('Error checking progress:', error);
      setError(error.message || 'Failed to fetch progress');
    }
  };

  // Démarrer/arrêter le polling quand fileId change
  useEffect(() => {
    // Si pas de fileId, ne rien faire
    if (!fileId) {
      stopPolling();
      return;
    }
    
    // Réinitialiser l'état
    setProgress(0);
    setStatus('');
    setIsComplete(false);
    setError(null);
    
    // Faire une première vérification immédiate
    checkProgress();
    
    // Démarrer l'intervalle
    setIsPolling(true);
    intervalRef.current = setInterval(checkProgress, pollingInterval);
    
    // Nettoyer quand le composant est démonté ou quand fileId change
    return () => {
      stopPolling();
    };
  }, [fileId, pollingInterval]);

  return { 
    progress, 
    status, 
    isPolling, 
    isComplete, 
    error,
    stopPolling // expose la fonction pour arrêter le polling explicitement
  };
} 