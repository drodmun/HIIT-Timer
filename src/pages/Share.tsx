import { memo, useCallback } from 'react';
import { Grid } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useGlobalContext } from '../globalStateContext';
import { sharePreset } from '../stores/presetShare';
import { Modal, Paper, TextField } from '@mui/material';
import { useState } from 'react';
const Share = ({ onClose }: { onClose: () => void }) => {
  const { presetObj } = useGlobalContext();
  const [label, setLabel] = useState<string>('');
  const [shareToUser, setShareToUser] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = useCallback(() => setModal((prevModal) => !prevModal), [setModal]);

  //let docRef = doc(db, 'presets', label);
  //const presetData = presetObj;
  const handleShare = useCallback(() => {
    sharePreset(
      shareToUser,
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
    shareToUser,
    toggleModal
  ]);

  return (
    <Dialog
      onClose={onClose}
      title=''
      content={
        <div className='text-center pb-5'>
          <Grid>
            {/* change handleSave */}
            <Button sx={{ textTransform: 'none' }} size='x-large' onClick={toggleModal}>
              Share preset
            </Button>
            <div className='py-5'>
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
                  <div className='py-2'></div>
                  <TextField
                    type='text'
                    variant='outlined'
                    label='Share To'
                    value={shareToUser}
                    onChange={(e) => setShareToUser(e.target.value)}
                  />

                  <div className='px-5 pt-3'>
                    <Button sx={{ textTransform: 'none' }} size='large' onClick={handleShare}>
                      Share
                    </Button>
                  </div>
                </Paper>
              </Modal>
            </div>
          </Grid>
        </div>
      }
    />
  );
};

export default memo(Share);
