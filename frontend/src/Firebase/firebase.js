// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-oJ7rrNxh9FSK2uX-NNfgj2yy__215E",
  authDomain: "clgassgnment.firebaseapp.com",
  projectId: "clgassgnment",
  storageBucket: "clgassgnment.firebasestorage.app",
  messagingSenderId: "914710906635",
  appId: "1:914710906635:web:57e662e200ae46c0f0840e",
  measurementId: "G-VVLJEL6K4P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
