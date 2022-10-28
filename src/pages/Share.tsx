import { memo, useState, useCallback } from 'react';
import { Box, TextField } from '@mui/material';

import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useDarkMode, useHIITSets } from 'hooks';

const Share = ({ onClose }: { onClose: () => void }) => {
  const { isLightMode } = useDarkMode();
  const { shareSet } = useHIITSets();

  const [label, setLabel] = useState<string>('');
  const [shareToUser, setShareToUser] = useState<string>('');

  const handleShare = useCallback(() => {
    if (!!shareToUser.trim() && !!label.trim()) {
      shareSet(label, shareToUser);
    }
  }, [label, shareSet, shareToUser]);

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
          {/* change handleSave */}
          <TextField
            InputProps={{
              sx: { color: isLightMode ? '#0d174d' : 'background.paper', borderColor: 'primary.main' }
            }}
            InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
            type='text'
            variant='outlined'
            label='Preset Name'
            required
            fullWidth
            value={label}
            autoFocus={true}
            onChange={(e) => setLabel(e.target.value)}
            focused
          />
          <div className='py-2'></div>
          <TextField
            InputProps={{
              sx: { color: isLightMode ? '#0d174d' : 'background.paper', borderColor: 'primary.main' }
            }}
            InputLabelProps={{ style: { fontSize: 25 } }} // font size of input label
            type='text'
            variant='outlined'
            label='Share To'
            required
            fullWidth
            value={shareToUser}
            autoFocus={true}
            onChange={(e) => setShareToUser(e.target.value)}
            focused
          />
          <div className='px-5 pt-3'>
            <Button
              sx={{ textTransform: 'none' }}
              size='x-large'
              onClick={handleShare}
              disabled={!shareToUser.trim() && !label.trim()}
            >
              Share
            </Button>
          </div>
        </Box>
      }
    />
  );
};

export default memo(Share);
