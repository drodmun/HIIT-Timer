import {  db } from '../firebase/firebaseConf'
import { addDoc, collection } from "firebase/firestore";

const save = async (name:string,rounds:number,rMinutes:number,rSeconds:number,sets:number,cdMinutes:number,cdSeconds:number,pMinutes:number,pSeconds:number) => {
    try {
        await addDoc(collection(db, "presets"), {
            
            presetName: name,
            rounds: rounds,
            rMinutes: rMinutes,
            rSeconds: rSeconds,
            sets: sets,
            cdMinutes: cdMinutes,
            cdSeconds: cdSeconds,
            pMinutes: pMinutes,
            pSeconds: pSeconds
        });

    } catch (error) {
        console.log(error);
    }
}
export { save }