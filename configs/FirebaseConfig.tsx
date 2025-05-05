// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWJQx5E86O4U8h8QOrXaxhx6YuieRx1lQ",
  authDomain: "mytrip-ai-travel-planner.firebaseapp.com",
  projectId: "mytrip-ai-travel-planner",
  storageBucket: "mytrip-ai-travel-planner.firebasestorage.app",
  messagingSenderId: "369422985499",
  appId: "1:369422985499:web:50460584e8d806c4b40bbe",
  measurementId: "G-W7NB84KXD5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);