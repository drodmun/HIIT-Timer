import { db } from 'config/firebase/firebaseConf';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { HIITConfiguration } from '../types/CounterConfig';

const save = async (uid: string, name: string, hiitConfiguration: HIITConfiguration) =>
  await updateDoc(doc(db, 'users', uid), {
    presets: arrayUnion({
      name,
      hiitConfiguration
    })
  }).catch((e) => {
    console.error(e);
    alert('An error occurred while saving.');
  });

export { save };
