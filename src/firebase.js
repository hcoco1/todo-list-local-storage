// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQtMHHPCKGmQ_LIMs75msN-jngQFNWr2Q",
  authDomain: "audits-dacc8.firebaseapp.com",
  projectId: "audits-dacc8",
  storageBucket: "audits-dacc8.appspot.com",
  messagingSenderId: "660538798075",
  appId: "1:660538798075:web:c372e07f20f2e71903255e",
  measurementId: "G-94KMSNCNKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Optionally initialize other services here
const db = getFirestore(app);

// If you're using Firebase Analytics
const analytics = getAnalytics(app);

// Export the Firebase app and any other services that you've initialized
export { app, db, analytics };
