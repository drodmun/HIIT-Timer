import { memo, useState } from 'react';
import { TextField, Box } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useDarkMode, useFeedback, useUIConfig } from 'hooks';

const Feedback = ({ onClose }: { onClose: () => void }) => {
  const { isLightMode } = useDarkMode();
  const { executeFinalAction } = useUIConfig();
  const { send: sendFeedback } = useFeedback();

  const [feedback, setFeedback] = useState<string>('');

  const handleSendFeedback = () => sendFeedback(feedback);

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
              sx: { color: isLightMode ? '#0d174d' : 'background.paper', borderColor: 'primary.main' }
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
            focused
          />
          <div className='px-5 pt-3'>
            <Button
              sx={{ textTransform: 'none' }}
              size='x-large'
              onClick={executeFinalAction(handleSendFeedback)}
              disabled={feedback.trim().length < 5}
            >
              Submit
            </Button>
          </div>
        </Box>
      }
    />
  );
};

export default memo(Feedback);
