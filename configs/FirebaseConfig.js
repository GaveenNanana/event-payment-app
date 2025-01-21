// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw3RL6xA9vI2wQJHSjDMWsOM22nVTUCqE",
  authDomain: "event-payment-35c02.firebaseapp.com",
  projectId: "event-payment-35c02",
  storageBucket: "event-payment-35c02.firebasestorage.app",
  messagingSenderId: "1086113085981",
  appId: "1:1086113085981:web:ccc59dd17102a3c81b24f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);