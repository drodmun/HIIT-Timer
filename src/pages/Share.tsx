import { memo, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { Grid, TextField, Snackbar } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useGlobalContext } from '../globalStateContext';
import { sharePreset } from '../stores/presetShare';
import { presetAtom } from '../stores/timers';
import Alert from '../components/Alert/Alert';

const Share = ({ onClose }: { onClose: () => void }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const { presetObj } = useGlobalContext();
  const [label, setLabel] = useState<string>('');
  const [shareToUser, setShareToUser] = useState<string>('');

  //let docRef = doc(db, 'presets', label);
  //const presetData = presetObj;
  const handleShare = useCallback(() => {
    if (!!shareToUser.trim() && !!label.trim()) {
      sharePreset(
        shareToUser,
        label,
        1,
        presetObj.rMinutes,
        presetObj.rSeconds,
        1,
        presetObj.cdMinutes,
        presetObj.cdSeconds,
        presetObj.pMinutes,
        presetObj.pSeconds,
        presetObj.countDownMinutes,
        presetObj.countDownSeconds
      ).then(() => {
        setOpenAlert(true);
        setloadSuccess(true);
        setLabel('');
      });
    } else {
      setloadSuccess(false);
      setOpenAlert(true);
    }
    //alert here
  }, [
    label,
    presetObj.cdMinutes,
    presetObj.cdSeconds,
    presetObj.countDownMinutes,
    presetObj.countDownSeconds,
    presetObj.pMinutes,
    presetObj.pSeconds,
    presetObj.rMinutes,
    presetObj.rSeconds,
    shareToUser
  ]);

  return (
    <Dialog
      onClose={onClose}
      title=''
      content={
        <div className='text-center pb-5'>
          <Grid>
            {/* change handleSave */}
            <TextField
              type='text'
              variant='outlined'
              label='Preset Name'
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <div className='py-2'></div>
            <TextField
              type='text'
              variant='outlined'
              label='Share To'
              required
              value={shareToUser}
              onChange={(e) => setShareToUser(e.target.value)}
            />
            <div className='px-5 pt-3'>
              <Button sx={{ textTransform: 'none' }} size='x-large' onClick={handleShare}>
                Share
              </Button>
            </div>
          </Grid>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
            <Alert
              onClose={() => setOpenAlert(false)}
              severity={loadSuccess ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {loadSuccess ? `Preset Shared.` : `User not found.`}
            </Alert>
          </Snackbar>
        </div>
      }
    />
  );
};

export default memo(Share);
