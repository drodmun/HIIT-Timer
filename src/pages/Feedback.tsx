import { memo } from 'react';
import { Grid } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import { db, auth } from '../firebase/firebaseConf';
import { collection, addDoc } from 'firebase/firestore';
import { useGlobalContext } from 'globalStateContext';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Feedback = ({ onClose }: { onClose: () => void }) => {
  const { darkMode } = useGlobalContext();
  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState<string>('');

  const current_user = auth.currentUser;
  let uid: string | null;
  if (current_user) {
    uid = current_user.email;
  } else {
    uid = null;
  }
  const sendFeedback = async () => {
    if (uid) {
      try {
        await addDoc(collection(db, 'feedback'), {
          feedback: feedback,
          user: uid
        });
        setOpenAlert(true);
        setLoadSuccess(true);
        setErrorMessage('Feedback sent!');
        //temporary
        setTimeout(onClose, 1000);
      } catch (error) {
        setLoadSuccess(false);
        setErrorMessage('User not logged in / Error sending feedback');
        setOpenAlert(true);
        setTimeout(onClose, 1000);
      }
    } else {
      setLoadSuccess(false);
      setErrorMessage('User not logged in / Error sending feedback');
      setOpenAlert(true);
      setTimeout(onClose, 1000);
    }
  };

  return (
    <Dialog
      onClose={onClose}
      title=''
      content={
        <div className='text-center pb-5 px-5'>
          <Grid>
            <TextField
              inputProps={{ style: { color: darkMode ? 'black' : 'white' } }}
              color='success'
              type='text'
              variant='filled'
              label='Feedback'
              required
              multiline
              rows={4}
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className='px-5 pt-3'>
              <Button sx={{ textTransform: 'none' }} size='x-large' onClick={sendFeedback}>
                Submit
              </Button>
            </div>
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

export default memo(Feedback);
