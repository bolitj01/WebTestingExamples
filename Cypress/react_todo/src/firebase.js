// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe64o1N6lKe0OBEmkaeVdvfQ17xiAtUn8",
  authDomain: "cs537webdev.firebaseapp.com",
  projectId: "cs537webdev",
  storageBucket: "cs537webdev.firebasestorage.app",
  messagingSenderId: "701934891132",
  appId: "1:701934891132:web:4b07f60303cb4c82bc19f9",
  measurementId: "G-Z4KSMWVK59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase initialized");
export const db = getFirestore(app);