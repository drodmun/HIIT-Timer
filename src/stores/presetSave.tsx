import {  db } from '../firebase/firebaseConf'
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase/firebaseConf'

let uid:string;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const save = async (name:string,rounds:number,rMinutes:number,rSeconds:number,sets:number,cdMinutes:number,cdSeconds:number,pMinutes:number,pSeconds:number) => {
    let presetName:string = `${name}${uid}`
    try {
        await setDoc(doc(db, "presets",presetName), {
            rounds: rounds,
            rMinutes: rMinutes,
            rSeconds: rSeconds,
            sets: sets,
            cdMinutes: cdMinutes,
            cdSeconds: cdSeconds,
            pMinutes: pMinutes,
            pSeconds: pSeconds,
        });

    } catch (error) {
        console.log(error);
    }
}
export { save }