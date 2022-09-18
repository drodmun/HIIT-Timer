import { memo } from 'react';
import { Grid } from '@mui/material';
import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import ToggleButton from 'components/ToggleButton/ToggleButton';

const Settings = ({ onClose }: { onClose: () => void }) => (
  <Dialog
    onClose={onClose}
    title=''
    content={
      <div className='text-center'>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 32, paddingTop: 0 }}>
            <ToggleButton />
            <br />
            <br />
            <Button sx={{ textTransform: 'none' }} size='x-large'>
              Ringtones
            </Button>
          </Grid>
        </Grid>
      </div>
    }
  />
);
export default memo(Settings);
