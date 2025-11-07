// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDPhyOyYi6AEFpPN76FAjb4zegfo8dOQ2A",
  authDomain: "mochocare-bb5a9.firebaseapp.com",
  projectId: "mochocare-bb5a9",
  storageBucket: "mochocare-bb5a9.appspot.com", 
  messagingSenderId: "690047935183",
  appId: "1:690047935183:web:1876833246e63d95a94dba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth with persistent login
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore with Expo Go fix
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
