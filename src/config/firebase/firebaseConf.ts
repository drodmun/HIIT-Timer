import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, Auth } from 'firebase/auth';
import config from './config';
import { Firestore, getFirestore } from 'firebase/firestore';

const app = initializeApp(config.firebase);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
