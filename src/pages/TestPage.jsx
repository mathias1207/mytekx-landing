import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Test Tailwind CSS
        </h1>
        <p className="text-gray-700 mb-4">
          Si vous voyez cette page avec :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Fond rouge</li>
          <li>Carte blanche centrée</li>
          <li>Titre bleu</li>
          <li>Ombre sur la carte</li>
        </ul>
        <p className="mt-4 font-semibold text-green-600">
          Alors Tailwind fonctionne parfaitement !
        </p>
        <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
          Bouton avec gradient
        </button>
      </div>
    </div>
  );
};

export default TestPage; 