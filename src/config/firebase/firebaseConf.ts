import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from './config';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);
