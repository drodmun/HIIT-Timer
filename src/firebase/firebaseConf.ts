import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" // New import
import config from './config';
import {
    getFirestore,
    // query,
    // getDocs,
    //collection,
    // where,
     //addDoc,
  } from "firebase/firestore";
// Initialize Firebase
const app = initializeApp(config.firebase);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
