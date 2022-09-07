import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" // New import
import config from './config';

// Initialize Firebase
const app = initializeApp(config.firebase);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);