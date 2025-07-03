import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaTimes, FaSpinner, FaCheck } from 'react-icons/fa';

const BetaGate = ({ isOpen, onClose, onSuccess }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { currentUser } = useAuth();

  // Codes beta valides (dans un vrai projet, ceci serait dans une base de données)
  const validBetaCodes = [
    'BETA2024',
    'MYTEKX2024',
    'EARLY2024',
    'STUDENT2024',
    'TEACHER2024',
    'RESEARCH2024'
  ];

  useEffect(() => {
    if (isOpen) {
      // Vérifier si l'utilisateur a déjà un accès beta stocké
      const storedAccess = localStorage.getItem(`betaAccess_${currentUser?.uid}`);
      if (storedAccess === 'true') {
        onSuccess();
        return;
      }
      
      // Reset form when modal opens
      setBetaCode('');
      setError('');
      setIsValid(false);
    }
  }, [isOpen, currentUser, onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!betaCode.trim()) {
      setError('Veuillez saisir un code beta');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simuler une vérification côté serveur
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validBetaCodes.includes(betaCode.toUpperCase())) {
      setIsValid(true);
      
      // Stocker l'accès beta pour cet utilisateur (format landing)
      localStorage.setItem(`betaAccess_${currentUser?.uid}`, 'true');
      localStorage.setItem(`betaCode_${currentUser?.uid}`, betaCode.toUpperCase());
      
      // Stocker aussi dans le format attendu par l'app pour synchronisation
      localStorage.setItem('hasBetaAccess', 'true');
      localStorage.setItem('betaTimestamp', new Date().getTime().toString());
      
      console.log('✅ Beta access granted and synchronized for both landing and app');
      
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
      }, 1000);
    } else {
      setIsLoading(false);
      setError('Code beta invalide. Veuillez vérifier et réessayer.');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Accès Beta Requis</h2>
          {!isLoading && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Bienvenue {currentUser?.displayName || currentUser?.email} ! 
          </p>
          <p className="text-gray-600 mb-4">
            MyTekX est actuellement en phase beta privée. Veuillez saisir votre code d'accès pour continuer.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="betaCode" className="block text-sm font-medium text-gray-700 mb-2">
              Code Beta
            </label>
            <input
              id="betaCode"
              type="text"
              value={betaCode}
              onChange={(e) => setBetaCode(e.target.value)}
              placeholder="Saisissez votre code beta"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {isValid && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <p className="text-green-600 text-sm">Code validé ! Redirection en cours...</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isValid}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Vérification...
              </>
            ) : isValid ? (
              <>
                <FaCheck className="mr-2" />
                Validé
              </>
            ) : (
              'Valider le code'
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Vous n'avez pas de code beta ?{' '}
            <a 
              href="mailto:contact@mytekx.io?subject=Demande%20de%20code%20beta"
              className="text-blue-600 hover:text-blue-500"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaGate; 