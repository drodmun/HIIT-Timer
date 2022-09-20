import { db, auth } from '../firebase/firebaseConf';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

let uid: any;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.email;
  } else {
    uid = null;
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
  pSeconds: number,
  countDownMinutes: number,
  countDownSeconds: number
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
        pSeconds: pSeconds,
        countDownMinutes: countDownMinutes,
        countDownSeconds: countDownSeconds
      })
    });
  } catch (error) {
    alert('An error occured while saving.');
  }
};

export { save };
