import { db } from 'config/firebase/firebaseConf';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { HIITConfiguration } from '../types/CounterConfig';

const sharePreset = async (user: string, name: string, hiitConfiguration: HIITConfiguration) =>
  await updateDoc(doc(db, 'users', user), {
    presets: arrayUnion({
      name,
      hiitConfiguration
    })
  }).catch((e) => {
    console.error(e);
    alert('An error occurred while saving.');
  });

export { sharePreset };
