import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import './App.css';
import { useLanguage } from './contexts/LanguageContext';
// Importer les icônes
import { FaGlobe, FaArrowLeft } from 'react-icons/fa';
import { auth } from './firebase/firebaseConfig'; 