import { memo, ReactNode } from 'react';

import { Dialog as MUIDialog, DialogTitle, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useDarkMode } from 'hooks';
import Container from 'components/Container/Container';

const Dialog = ({
  onClose,
  title,
  content,
  isScrollable,
  isModal
}: {
  onClose: () => void;
  title: string;
  content: ReactNode;
  isScrollable?: boolean;
  isModal?: boolean;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { isLightMode } = useDarkMode();

  return (
    <MUIDialog fullScreen={!isModal && fullScreen} maxWidth='md' fullWidth={!isModal} open={true}>
      <Container isSecondary={isLightMode} isPopup={isModal} isScrollable={isScrollable}>
        <DialogTitle>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography
              variant='h4'
              component='span'
              color={isLightMode ? '#0d174d' : 'white'}
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              {title}
            </Typography>
            <IconButton aria-label='close' color='secondary' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>

        {content}
      </Container>
    </MUIDialog>
  );
};

export default memo(Dialog);
