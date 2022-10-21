import { initializeApp } from 'firebase/app';

import { getAuth, FacebookAuthProvider, GoogleAuthProvider, Auth } from 'firebase/auth';
import config from './config';
import { Firestore, getFirestore, collection } from 'firebase/firestore';

const app = initializeApp(config.firebase);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

const feedbackRef = collection(db, 'feedback');
const usersRef = collection(db, 'users');

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, feedbackRef, usersRef, googleProvider, facebookProvider };
