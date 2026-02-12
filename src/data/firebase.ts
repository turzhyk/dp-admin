// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFnJ_3hDQllpCBLImYDFxNvnMi4Ib3k30",
  authDomain: "digital-printing-site.firebaseapp.com",
  projectId: "digital-printing-site",
  storageBucket: "digital-printing-site.firebasestorage.app",
  messagingSenderId: "164051394942",
  appId: "1:164051394942:web:363c97c00ce6857258932f",
  measurementId: "G-DD63BWYS73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);