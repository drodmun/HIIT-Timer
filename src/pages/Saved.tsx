import { memo, useState, useCallback } from 'react';
import { Grid, TextField, useTheme } from '@mui/material';

import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';

import { useDarkMode, useHIITSets } from 'hooks';

const Save = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const { isLightMode } = useDarkMode();
  const { isSetAlreadySaved, saveSet } = useHIITSets();

  const [label, setLabel] = useState<string>('');

  const handleSave = useCallback(() => saveSet(label), [label, saveSet]);

  return (
    <Dialog
      onClose={onClose}
      title="Set's name"
      isModal
      content={
        <div className='text-center pb-5' style={{ minWidth: 350 }}>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                sx: { color: isLightMode ? '#0d174d' : 'background.paper', borderColor: 'primary.main' }
              }}
              InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
              type='text'
              variant='outlined'
              label='Preset Name'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              autoFocus={true}
              focused
            />

            <div className='pt-4'>
              <Button
                sx={{
                  width: 100,
                  margin: `0 ${theme.spacing(2)}`,
                  borderLeftColor: '#FF5FF4',
                  borderBottomColor: '#FF5FF4',
                  color: isLightMode ? '11c1f4' : '#ffffff',
                  '&:hover': {
                    color: isLightMode ? 'black' : '#ffffff'
                  }
                }}
                size='large'
                onClick={onClose}
                variant='outlined'
              >
                Cancel
              </Button>
              <Button
                size='large'
                sx={{
                  width: 100,
                  margin: `0 ${theme.spacing(2)}`,
                  backgroundColor: isLightMode ? 'black' : '#ffffff',
                  border: 0,
                  color: isLightMode ? '#ffffff' : '#0d174d',
                  '&:hover': {
                    color: isLightMode ? '#0d174d' : '#ffffff',
                    borderColor: '#ffffff',
                    backgroundColor: '#11c1f4'
                  }
                }}
                disabled={isSetAlreadySaved}
                onClick={handleSave}
                variant='outlined'
              >
                Save
              </Button>
            </div>
          </Grid>
        </div>
      }
    />
  );
};

export default memo(Save);
