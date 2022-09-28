import { memo, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { Grid, TextField, Snackbar } from '@mui/material';

import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { sharePreset } from '../stores/presetShare';
import { presetAtom } from '../stores/timers';
import Alert from '../components/Alert/Alert';

const Share = ({ onClose }: { onClose: () => void }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const [label, setLabel] = useState<string>('');
  const [shareToUser, setShareToUser] = useState<string>('');

  const preset = useRecoilValue(presetAtom);

  //let docRef = doc(db, 'presets', label);
  //const presetData = presetObj;
  const handleShare = useCallback(() => {
    if (!!shareToUser.trim() && !!label.trim()) {
      sharePreset(
        shareToUser,
        label,
        1,
        preset.rMinutes,
        preset.rSeconds,
        1,
        preset.cdMinutes,
        preset.cdSeconds,
        preset.pMinutes,
        preset.pSeconds,
        preset.countDownMinutes,
        preset.countDownSeconds
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
    preset.cdMinutes,
    preset.cdSeconds,
    preset.countDownMinutes,
    preset.countDownSeconds,
    preset.pMinutes,
    preset.pSeconds,
    preset.rMinutes,
    preset.rSeconds,
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
