import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaHome, FaCog, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { useBetaAccess } from '../hooks/useBetaAccess';
import BetaGate from '../components/BetaGate';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { accessApp, showBetaGate, onBetaSuccess, closeBetaGate } = useBetaAccess();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const navigateToApp = () => {
    // Utiliser le système beta au lieu de rediriger directement
    accessApp();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center bg-white text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition duration-200"              >
                <FaHome />
                <span>Accueil</span>
              </button>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">MyTekX</h1>
                <span className="ml-2 text-sm text-gray-500">Dashboard</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-400" />
                <span className="text-sm text-gray-700">
                  {currentUser?.displayName || currentUser?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-blue-500 text-white space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-200"
              >
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Beta Warning */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Version Beta</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Cette version est en développement. Les données et statistiques affichées sont fictives et servent uniquement à des fins de démonstration.
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {currentUser?.displayName || 'Utilisateur'} !
          </h2>
          <p className="text-gray-600">
            Voici votre tableau de bord personnel MyTekX. Explorez vos fonctionnalités.
          </p>
        </div>

        {/* Stats Cards - Fictional Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 relative">
            <div className="absolute top-2 right-2">
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Fictif</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents convertis</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <FaFileAlt className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 relative">
            <div className="absolute top-2 right-2">
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Fictif</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temps économisé</p>
                <p className="text-2xl font-bold text-gray-900">6h</p>
              </div>
              <FaChartBar className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 relative">
            <div className="absolute top-2 right-2">
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Fictif</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Précision IA</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
              <FaUser className="text-purple-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 relative">
            <div className="absolute top-2 right-2">
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Fictif</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fonctionnalités</p>
                <p className="text-2xl font-bold text-gray-900">8/12</p>
              </div>
              <FaCog className="text-orange-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actions rapides */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={navigateToApp}
                  className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <FaHome className="text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Accéder à l'application</p>
                      <p className="text-sm text-gray-600">Utiliser MyTekX pour vos projets</p>
                    </div>
                  </div>
                  <span className="text-blue-500">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200">
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Nouveau document</p>
                      <p className="text-sm text-gray-600">Créer un nouveau projet</p>
                    </div>
                  </div>
                  <span className="text-gray-500">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200">
                  <div className="flex items-center space-x-3">
                    <FaCog className="text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Paramètres</p>
                      <p className="text-sm text-gray-600">Configurer votre compte</p>
                    </div>
                  </div>
                  <span className="text-gray-500">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Informations du compte */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Informations du compte</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {(currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {currentUser?.displayName || 'Utilisateur'}
                    </p>
                    <p className="text-sm text-gray-600">{currentUser?.email}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Statut du compte:</dt>
                      <dd className="text-green-600 font-medium">Actif</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Type de compte:</dt>
                      <dd className="text-gray-900">Gratuit</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Membre depuis:</dt>
                      <dd className="text-gray-900">
                        {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('fr-FR')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Fictional Data */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Activité récente (Fictive)</h3>
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Données de démonstration</span>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaFileAlt className="text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Cours de Mathématiques - Chapitre 5</p>
                  <p className="text-sm text-gray-600">Converti il y a 2 heures • 24 slides → LaTeX</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Terminé</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaFileAlt className="text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Présentation Physique Quantique</p>
                  <p className="text-sm text-gray-600">Converti il y a 1 jour • 18 slides → LaTeX</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Terminé</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaFileAlt className="text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Algorithmes et Structures de Données</p>
                  <p className="text-sm text-gray-600">Converti il y a 3 jours • 32 slides → LaTeX</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Terminé</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Beta Gate */}
      <BetaGate 
        isOpen={showBetaGate} 
        onClose={closeBetaGate} 
        onSuccess={onBetaSuccess} 
      />
    </div>
  );
};

export default Dashboard; 