// src/firebase/init.js
import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  browserLocalPersistence,
  GoogleAuthProvider 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase unifiée (identique à l'app)
const firebaseConfig = {
  apiKey: "AIzaSyBTKbxp5OBRQzZp82MLtMb98vlzIoAgDdA",
  authDomain: "mytekx.io",
  projectId: "mytekx-5b59f",
  storageBucket: "mytekx-5b59f.firebasestorage.app",
  messagingSenderId: "679348202996",
  appId: "1:679348202996:web:bdba7a32bb00eb5ee09da1",
  measurementId: "G-DPXL33BJ4S"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with local persistence 
// (which works across domains when properly configured)
const auth = initializeAuth(app, {
  persistence: [browserLocalPersistence]
});

// Configuration Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Firestore et Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
export default app; 