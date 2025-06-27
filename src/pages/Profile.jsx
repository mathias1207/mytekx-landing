import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaArrowLeft } from 'react-icons/fa';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft />
              <span>Retour au Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Profil utilisateur</h1>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              {/* Avatar */}
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {(currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentUser?.displayName || 'Utilisateur'}
                </h2>
                <p className="text-gray-600">{currentUser?.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Membre depuis le {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations du compte</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Email</dt>
                    <dd className="text-sm text-gray-900">{currentUser?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Nom d'affichage</dt>
                    <dd className="text-sm text-gray-900">
                      {currentUser?.displayName || 'Non défini'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Statut de vérification</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        currentUser?.emailVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {currentUser?.emailVerified ? 'Email vérifié' : 'Email non vérifié'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Dernière connexion</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(currentUser?.metadata?.lastSignInTime).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200">
                    <div>
                      <p className="font-medium text-gray-900">Modifier le profil</p>
                      <p className="text-sm text-gray-600">Changer votre nom et vos informations</p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200">
                    <div>
                      <p className="font-medium text-gray-900">Changer le mot de passe</p>
                      <p className="text-sm text-gray-600">Mettre à jour votre mot de passe</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200">
                    <div>
                      <p className="font-medium text-gray-900">Préférences de notifications</p>
                      <p className="text-sm text-gray-600">Gérer vos notifications</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-lg transition duration-200">
                    <div>
                      <p className="font-medium text-red-900">Supprimer le compte</p>
                      <p className="text-sm text-red-600">Supprimer définitivement votre compte</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 