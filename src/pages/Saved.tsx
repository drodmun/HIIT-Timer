import { memo, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Grid, Snackbar, Modal, Paper, TextField } from '@mui/material';

import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { save } from '../stores/presetSave';
import { hiitConfigurationAtom } from '../stores/timers';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConf';
import Alert from '../components/Alert/Alert';

const Save = ({ onClose }: { onClose: () => void }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [label, setLabel] = useState<string>('');

  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = useCallback(() => setModal((pModal) => !pModal), [setModal]);

  const [modal1, setModal1] = useState<boolean>(false);
  const toggleModal1 = useCallback(() => setModal1((pModal1) => !pModal1), [setModal1]);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [hiitConfiguration, setHIITConfiguration] = useRecoilState(hiitConfigurationAtom);

  //get user from firebase here
  let uid: string | null;
  const current_user = auth.currentUser;
  if (current_user) {
    uid = current_user.email;
  } else {
    uid = null;
  }

  const retrievePreset = useCallback(async () => {
    if (!!uid)
      await onSnapshot(doc(db, 'users', uid), (doc) => {
        const data = doc.data();
        try {
          if (!!data?.presets.length) {
            const presetData = data;
            const len: number = presetData.presets.length;
            let preset;
            for (let i = 0; i < len; i++) {
              if (presetData.presets[i].name == label) {
                preset = presetData.presets[i];
                setHIITConfiguration(preset);
                break;
              }
            }
            setErrorMessage('Preset loaded successfully!');
            setOpenAlert(true);
            setLoadSuccess(true);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            setErrorMessage('No such preset!');
            setLoadSuccess(false);
            setOpenAlert(true);
          }
        } catch {
          console.log('No such document!');
          setErrorMessage('No such preset!');
          setLoadSuccess(false);
          setOpenAlert(true);
        }
      });
  }, [label, setHIITConfiguration, uid]);

  const loadPreset = useCallback(() => {
    if (uid) {
      retrievePreset();
    } else {
      setErrorMessage('Please login to load presets!');
      setLoadSuccess(false);
      setOpenAlert(true);
    }
    //onFinish();
  }, [retrievePreset, uid]);

  const handleSave = useCallback(() => {
    if (!!uid) {
      save(uid, label, hiitConfiguration).then(() => {
        toggleModal();
        setLabel('');
        setErrorMessage('Preset saved successfully!');
        setLoadSuccess(true);
        setOpenAlert(true);
      });
    } else {
      setErrorMessage('Please login to save presets!');
      setLoadSuccess(false);
      setOpenAlert(true);
    }
  }, [hiitConfiguration, label, toggleModal, uid]);

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

          <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
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
