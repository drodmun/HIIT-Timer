import { memo } from 'react';
import { Grid } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import { db } from '../firebase/firebaseConf';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConf';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Feedback = ({ onClose }: { onClose: () => void }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const current_user: any = auth.currentUser;
  let uid: any;
  if (current_user) {
    uid = current_user.email;
  } else {
    uid = null;
  }
  const sendFeedback = async () => {
    try {
      await addDoc(collection(db, 'feedback'), {
        feedback: feedback,
        user: uid
      });
      setOpenAlert(true);
    } catch (error) {
      alert('User not logged in.');
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
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={() => {
              setOpenAlert(false);
            }}
          >
            <Alert
              onClose={() => {
                setOpenAlert(false);
              }}
              severity='success'
              sx={{ width: '100%' }}
            >
              Feedback Submitted.
            </Alert>
          </Snackbar>
        </div>
      }
    />
  );
};

export default memo(Feedback);
