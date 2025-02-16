// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider }from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCydKKk1rfLlziI6F9L92aWd1QQ84GITd8",
  authDomain: "dentalconnect-6cfcd.firebaseapp.com",
  projectId: "dentalconnect-6cfcd",
  storageBucket: "dentalconnect-6cfcd.firebasestorage.app",
  messagingSenderId: "226249821364",
  appId: "1:226249821364:web:6a12d362935470c072dbe1",
  measurementId: "G-CC1V60CEB0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseGoogleProvider = new GoogleAuthProvider();