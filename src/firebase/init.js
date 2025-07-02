// src/firebase/init.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase avec variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Configuration de fallback si les variables d'environnement ne sont pas définies
const fallbackConfig = {
  apiKey: "AIzaSyBTKbxp5OBRQzZp82MLtMb98vlzIoAgDdA",
  authDomain: "mytekx-5b59f.firebaseapp.com",
  projectId: "mytekx-5b59f",
  storageBucket: "mytekx-5b59f.firebasestorage.app",
  messagingSenderId: "679348202996",
  appId: "1:679348202996:web:bdba7a32bb00eb5ee09da1",
  measurementId: "G-DPXL33BJ4S"
};

// Utilise la configuration env si disponible, sinon fallback
const finalConfig = firebaseConfig.apiKey ? firebaseConfig : fallbackConfig;

// Initialisation Firebase
const app = initializeApp(finalConfig);

// Services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Provider Google pour OAuth
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 