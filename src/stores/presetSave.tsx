import { db, auth } from '../config/firebase/firebaseConf';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

let uid: string;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.email ?? '';
    // ...
  } else {
    // ...
  }
});
const save = async (
  name: string,
  rounds: number,
  rMinutes: number,
  rSeconds: number,
  sets: number,
  cdMinutes: number,
  cdSeconds: number,
  pMinutes: number,
  pSeconds: number
) => {
  //const presetName: string = name + uid;
  try {
    await updateDoc(doc(db, 'users', uid), {
      presets: arrayUnion({
        name: name,
        rounds: rounds,
        rMinutes: rMinutes,
        rSeconds: rSeconds,
        sets: sets,
        cdMinutes: cdMinutes,
        cdSeconds: cdSeconds,
        pMinutes: pMinutes,
        pSeconds: pSeconds
      })
    });
  } catch (error) {
    alert('User not logged in.');
  }
};

export { save };
