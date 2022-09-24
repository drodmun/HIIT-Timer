import { memo, ReactNode } from 'react';

import { Dialog as MUIDialog, DialogTitle, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Container from 'components/Container/Container';
import { useGlobalContext } from 'globalStateContext';
const Dialog = ({ onClose, title, content }: { onClose: () => void; title: string; content: ReactNode }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { darkMode } = useGlobalContext();
  return (
    <MUIDialog key='settings_popup' fullScreen={fullScreen} maxWidth='md' fullWidth open={true}>
      <Container isSecondary={darkMode} isPopup={true}>
        <DialogTitle>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography
              variant='h4'
              component='span'
              color={darkMode ? '#0d174d' : 'white'}
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              {title}
            </Typography>
            <IconButton aria-label='close' color='secondary' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </Container>
    </MUIDialog>
  );
};

export default memo(Dialog);
