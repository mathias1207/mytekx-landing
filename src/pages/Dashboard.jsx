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
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MyTekX</h1>
              <span className="ml-2 text-sm text-gray-500">Dashboard</span>
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
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-200"
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {currentUser?.displayName || 'Utilisateur'} !
          </h2>
          <p className="text-gray-600">
            Voici votre tableau de bord personnel MyTekX. Explorez vos fonctionnalités.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <FaFileAlt className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projets</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <FaChartBar className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collaborations</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <FaUser className="text-purple-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analyses</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
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

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Activité récente</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune activité récente à afficher.</p>
              <p className="text-sm text-gray-400 mt-2">
                Commencez par utiliser MyTekX pour voir votre activité ici.
              </p>
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