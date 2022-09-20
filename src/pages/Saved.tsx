import { memo, useCallback } from 'react';
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
import { db, auth } from '../config/firebase/firebaseConf';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Save = ({ onClose }: { onClose: () => void }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const { presetObj, setPresetObj } = useGlobalContext();
  const [label, setLabel] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = useCallback(() => setModal((pModal) => !pModal), [setModal]);
  const [modal1, setModal1] = useState<boolean>(false);
  const toggleModal1 = useCallback(() => setModal1((pModal1) => !pModal1), [setModal1]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const setCountersConfig = useSetRecoilState(countersConfigSetAtom);

  //get user from firebase here
  let uid: string | null;
  const current_user = auth.currentUser;
  if (current_user) {
    uid = current_user.email;
  } else {
    uid = null;
  }
  //let docRef = doc(db, 'presets', label);
  let presetData = presetObj;
  const retrievePreset = async () => {
    await onSnapshot(doc(db, 'users', uid ?? ''), (doc) => {
      const data = doc.data();
      try {
        if (!!data?.presets.length) {
          presetData = data;
          const len: number = presetData.presets.length;
          let preset;
          for (let i = 0; i < len; i++) {
            if (presetData.presets[i].name == label) {
              preset = presetData.presets[i];
              setPresetObj({
                rounds: preset.rounds,
                rMinutes: preset.rMinutes,
                rSeconds: preset.rSeconds,
                sets: preset.sets,
                cdMinutes: preset.cdMinutes,
                cdSeconds: preset.cdSeconds,
                pMinutes: preset.pMinutes,
                pSeconds: preset.pSeconds,
                countDownMinutes: preset.countDownMinutes,
                countDownSeconds: preset.countDownSeconds
              });
              break;
            }
          }
          setErrorMessage('Preset loaded successfully!');
          setOpenAlert(true);
          setloadSuccess(true);
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
                minutes: preset.countDownMinutes,
                seconds: preset.countDownSeconds,
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
          setErrorMessage('No such preset!');
          setloadSuccess(false);
          setOpenAlert(true);
        }
      } catch {
        console.log('No such document!');
        setErrorMessage('No such preset!');
        setloadSuccess(false);
        setOpenAlert(true);
      }
    });
  };

  const loadPreset = useCallback(() => {
    if (uid) {
      retrievePreset();
    } else {
      setErrorMessage('Please login to load presets!');
      setloadSuccess(false);
      setOpenAlert(true);
    }
    //onFinish();
  }, [retrievePreset, uid]);

  const handleSave = useCallback(() => {
    if (uid) {
      save(
        label,
        presetObj.rounds,
        presetObj.rMinutes,
        presetObj.rSeconds,
        presetObj.sets,
        presetObj.cdMinutes,
        presetObj.cdSeconds,
        presetObj.pMinutes,
        presetObj.pSeconds,
        presetObj.countDownMinutes,
        presetObj.countDownSeconds
      );
      toggleModal();
      setLabel('');
      setErrorMessage('Preset saved successfully!');
      setloadSuccess(true);
      setOpenAlert(true);
    } else {
      setErrorMessage('Please login to save presets!');
      setloadSuccess(false);
      setOpenAlert(true);
    }
  }, [
    label,
    presetObj.cdMinutes,
    presetObj.cdSeconds,
    presetObj.pMinutes,
    presetObj.pSeconds,
    presetObj.rMinutes,
    presetObj.rSeconds,
    presetObj.rounds,
    presetObj.sets,
    toggleModal,
    uid
  ]);

  const handleLoad = useCallback(() => {
    loadPreset();
    toggleModal1();
    setLabel('');
    //alert here
  }, [loadPreset, toggleModal1]);

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
            <br />
            <br />
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
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={() => {
              setOpenAlert(false);
            }}
          >
            <Alert
              onClose={() => setOpenAlert(false)}
              severity={loadSuccess ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      }
    />
  );
};

export default memo(Save);
