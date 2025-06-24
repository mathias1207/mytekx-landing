// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTKbxp5OBRQzZp82MLtMb98vlzIoAgDdA",
    authDomain: "mytekx-5b59f.firebaseapp.com",
    projectId: "mytekx-5b59f",
    storageBucket: "mytekx-5b59f.firebasestorage.app",
    messagingSenderId: "679348202996",
    appId: "1:679348202996:web:bdba7a32bb00eb5ee09da1",
    measurementId: "G-DPXL33BJ4S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app; 