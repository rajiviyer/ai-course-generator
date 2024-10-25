// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-8959f.firebaseapp.com",
  projectId: "ai-course-generator-8959f",
  storageBucket: "ai-course-generator-8959f.appspot.com",
  messagingSenderId: "136706022354",
  appId: "1:136706022354:web:4edeb0161f8943857b060b",
  measurementId: "G-RRE52THWG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);
