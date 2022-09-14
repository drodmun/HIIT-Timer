import { memo } from 'react';
import { Grid } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useGlobalContext } from '../globalStateContext';
import { save } from '../stores/presetSave';
import { CounterConfig } from '../types/CounterConfig';
import { useSetRecoilState } from 'recoil';
import { countersConfigSetAtom } from '../stores/timers';
import { Modal, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConf';
import { auth } from '../firebase/firebaseConf'
import { onAuthStateChanged } from "firebase/auth";



//import ClassIcon from '@mui/icons-material/Class';
const Save = ({ onClose }: { onClose: () => void }) => {
  //get from firebase here

  let uid: string;
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

  const { presetObj } = useGlobalContext();

  const [label, setLabel] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false);
  const [modal1, setModal1] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  const toggleModal1 = () => setModal1(!modal1);
  const setCountersConfig = useSetRecoilState(countersConfigSetAtom);

  //let docRef = doc(db, "presets", label);
  let presetData = presetObj

  const retrievePreset = async () => {
    const docSnap = await getDoc(doc(db, "presets", `${label}${uid}`));
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      presetData = docSnap.data();
      console.log(presetData)
      const countersConfig: CounterConfig[] = [];
      const hasCooldown = !!presetData.cdMinutes || !!presetData.cdSeconds;
      const hasPreparation = !!presetData.pMinutes || !!presetData.pSeconds;
      for (let round = 1; round <= presetData.rounds; round++) {
        for (let set = 1; set <= presetData.sets; set++) {
          if (hasPreparation)
            countersConfig.push({ round, set, minutes: presetData.pMinutes, seconds: presetData.pSeconds, type: 'preparation' });

          countersConfig.push({ round, set, minutes: presetData.rMinutes, seconds: presetData.rSeconds, type: 'countdown' });

          if (hasCooldown)
            countersConfig.push({ round, set, minutes: presetData.cdMinutes, seconds: presetData.cdSeconds, type: 'cooldown' });
        }
      }
      setCountersConfig(countersConfig);
      console.log(countersConfig)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");

    };
  }
  function LoadPreset() {
    retrievePreset()
    //onFinish();
  }



  function handleSave() {
    save(label, presetObj.rounds, presetObj.rMinutes, presetObj.rSeconds,
      presetObj.sets, presetObj.cdMinutes, presetObj.cdSeconds, presetObj.pMinutes, presetObj.pSeconds)
    toggleModal()
    setLabel('')
    //alert here
  }
  function handleLoad() {
    LoadPreset()
    toggleModal1()
    setLabel('')
    //alert here
  }
  return (

    <Dialog
      onClose={onClose}
      title=''
      content={

        <div className='text-center pb-5'>


          <Grid item xs={12} >
            {/* change handleSave */}
            <Button sx={{ textTransform: 'none' }} size='x-large' onClick={toggleModal}>
              Save preset
            </Button>
            <Button sx={{ textTransform: 'none' }} size='x-large' onClick={toggleModal1}>
              Load preset
            </Button>

            <Modal
              open={modal}
              onClose={toggleModal}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Paper
                sx={{
                  position: 'absolute' as const,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: 24,
                  p: 4
                }}
              >
                <TextField
                  type='text'
                  variant='outlined'
                  label='Preset Name'
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />

                <div className='pt-4'>
                  <Button sx={{ textTransform: 'none' }} size='large' onClick={handleSave}>
                    Save
                  </Button>
                </div>

              </Paper>
            </Modal>
            <Modal
              open={modal1}
              onClose={toggleModal1}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Paper
                sx={{
                  position: 'absolute' as const,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: 24,
                  p: 4
                }}
              >
                <TextField
                  type='text'
                  variant='outlined'
                  label='Preset Name'
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />

                <div className='pt-4'>
                  <Button sx={{ textTransform: 'none' }} size='large' onClick={handleLoad}>
                    Load
                  </Button>
                </div>

              </Paper>
            </Modal>
          </Grid>

        </div>

      }
    />

  )
}


export default memo(Save);
