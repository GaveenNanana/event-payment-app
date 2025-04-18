import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCw3RL6xA9vI2wQJHSjDMWsOM22nVTUCqE",
    authDomain: "event-payment-35c02.firebaseapp.com",
    projectId: "event-payment-35c02",
    storageBucket: "event-payment-35c02.firebasestorage.app",
    messagingSenderId: "1086113085981",
    appId: "1:1086113085981:web:febd39649874dfe11b24f4"
};

export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(firebase_app);
// export const firebase_auth = getAuth(firebase_app);
export const firebase_store = getFirestore(firebase_app);
export const firebase_storage = getStorage(firebase_app);