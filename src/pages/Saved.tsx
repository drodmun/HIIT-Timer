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
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConf';
import { auth } from '../firebase/firebaseConf';
import { onAuthStateChanged } from 'firebase/auth';
const Save = ({ onClose }: { onClose: () => void }) => {
  //get from firebase here
  let uid: string;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    } else {
    }
  });
  const { presetObj } = useGlobalContext();
  const [label, setLabel] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [modal1, setModal1] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  const toggleModal1 = () => setModal1(!modal1);
  const setCountersConfig = useSetRecoilState(countersConfigSetAtom);

  //let docRef = doc(db, 'presets', label);
  let presetData = presetObj;

  const retrievePreset = async () => {
    onSnapshot(doc(db, 'users', uid), (doc) => {
      const data: any = doc.data();
      if (data.presets.length) {
        presetData = data;
        const len: number = presetData.presets.length;
        let preset;
        for (let i = 0; i < len; i++) {
          if (presetData.presets[i].name == label) {
            preset = presetData.presets[i];
            console.log(preset);
            break;
          }
        }
        const countersConfig: CounterConfig[] = [];
        const hasCooldown = !!preset.cdMinutes || !!preset.cdSeconds;
        const hasPreparation = !!preset.pMinutes || !!preset.pSeconds;
        for (let round = 1; round <= preset.rounds; round++) {
          for (let set = 1; set <= preset.sets; set++) {
            if (hasPreparation)
              countersConfig.push({
                round,
                set,
                minutes: preset.pMinutes,
                seconds: preset.pSeconds,
                type: 'preparation'
              });

            countersConfig.push({
              round,
              set,
              minutes: preset.rMinutes,
              seconds: preset.rSeconds,
              type: 'countdown'
            });

            if (hasCooldown)
              countersConfig.push({
                round,
                set,
                minutes: preset.cdMinutes,
                seconds: preset.cdSeconds,
                type: 'cooldown'
              });
          }
        }
        setCountersConfig(countersConfig);
        console.log(countersConfig);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  };

  function LoadPreset() {
    retrievePreset();
    //onFinish();
  }

  function handleSave() {
    save(
      label,
      presetObj.rounds,
      presetObj.rMinutes,
      presetObj.rSeconds,
      presetObj.sets,
      presetObj.cdMinutes,
      presetObj.cdSeconds,
      presetObj.pMinutes,
      presetObj.pSeconds
    );
    toggleModal();
    setLabel('');
    //alert here
  }

  function handleLoad() {
    LoadPreset();
    toggleModal1();
    setLabel('');
    //alert here
  }
  return (
    <Dialog
      onClose={onClose}
      title=''
      content={
        <div className='text-center pb-5'>
          <Grid item xs={12}>
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
  );
};

export default memo(Save);
