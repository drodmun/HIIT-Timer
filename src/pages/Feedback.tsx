import { memo, useState } from 'react';
import { TextField, Snackbar, Box } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { db } from 'config/firebase/firebaseConf';
import { collection, addDoc } from 'firebase/firestore';
import { useDarkMode, useFirebaseAuth } from 'hooks';
import Alert from '../components/Alert/Alert';

const Feedback = ({ onClose }: { onClose: () => void }) => {
  const { isLightMode } = useDarkMode();
  const { user } = useFirebaseAuth();

  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState<string>('');

  const sendFeedback = async () => {
    if (!!user?.email) {
      try {
        await addDoc(collection(db, 'feedback'), {
          feedback: feedback,
          user: user.email
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
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pt: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <TextField
            InputProps={{
              sx: { color: isLightMode ? 'black' : 'white', borderColor: 'primary.main' }
            }}
            InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
            type='text'
            variant='outlined'
            label='Feedback'
            color='primary'
            required
            multiline
            rows={6}
            fullWidth
            value={feedback ?? 'Feedback'}
            autoFocus={true}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className='px-5 pt-3'>
            <Button
              sx={{ textTransform: 'none' }}
              size='x-large'
              onClick={sendFeedback}
              disabled={feedback.trim().length < 5}
            >
              Submit
            </Button>
          </div>

          <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
            <Alert
              onClose={() => setOpenAlert(false)}
              severity={loadSuccess ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      }
    />
  );
};

export default memo(Feedback);
