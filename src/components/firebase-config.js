// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // If using Firebase Authentication
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcuSjW97mMvUMyDPu5qeHUeNVPCSf53-c",
  authDomain: "audits-e2cfa.firebaseapp.com",
  projectId: "audits-e2cfa",
  storageBucket: "audits-e2cfa.appspot.com",
  messagingSenderId: "106380544308",
  appId: "1:106380544308:web:1448cbe7ead6c69a7dfd61",
  measurementId: "G-7046Z8C3XE"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
const analytics = getAnalytics(app);




// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db, analytics };