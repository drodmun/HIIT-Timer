import { db } from '../firebase/firebaseConf';
import { doc } from 'firebase/firestore';
import { updateDoc, arrayUnion } from 'firebase/firestore';

const sharePreset = async (
  user: string,
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
    await updateDoc(doc(db, 'users', user), {
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
    console.log(error);
  }
};

export { sharePreset };
