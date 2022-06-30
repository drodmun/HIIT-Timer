import { useState, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PaidIcon from '@mui/icons-material/Paid';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';

import { isPlaySoundAtom } from 'stores/timers';

const ConfigHeader = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [isPlaySound, setIsPlaySound] = useRecoilState(isPlaySoundAtom);
  const togglePlaySound = () => setIsPlaySound((pIsPlaySound) => !pIsPlaySound);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const toggleSetMenuAnchor = (open: boolean) => (event: MouseEvent<HTMLButtonElement> | Record<string, unknown>) =>
    setAnchorEl(open && 'currentTarget' in event ? (event.currentTarget as HTMLElement) : null);

  const [openSettings, setOpenSettings] = useState(false);
  const toggleSetOpenSettings = () => setOpenSettings((pOpenSettings) => !pOpenSettings);

  const handleMenuAbout = () => {
    toggleSetMenuAnchor(false);
    toggleSetOpenSettings();
  };

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label='sound' onClick={toggleSetMenuAnchor(true)}>
          <SettingsIcon />
        </IconButton>
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={toggleSetMenuAnchor(false)}>
          <MenuItem disabled>
            <ListItemIcon>
              <SaveIcon fontSize='small' />
            </ListItemIcon>
            Auto-save SETs
          </MenuItem>
          <MenuItem onClick={handleMenuAbout}>
            <ListItemIcon>
              <InfoIcon fontSize='small' />
            </ListItemIcon>
            About HIIT Timer
          </MenuItem>
        </Menu>

        <IconButton aria-label='sound' onClick={togglePlaySound}>
          {isPlaySound ? <VolumeUpOutlinedIcon /> : <VolumeOffIcon />}
        </IconButton>
      </div>

      <Dialog
        key='settings_popup'
        fullScreen={fullScreen}
        maxWidth='md'
        fullWidth
        open={openSettings}
        onClose={toggleSetOpenSettings}
      >
        <DialogTitle>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h4' component='span' color='secondary'>
              {' '}
            </Typography>
            <IconButton aria-label='close' color='primary' onClick={toggleSetOpenSettings}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>

        <Grid container spacing={0}>
          <Grid item xs={12} style={{ margin: fullScreen ? 32 : 64, marginTop: 0 }}>
            <Typography variant='h4' align='center' component='p' color='secondary'>
              HIIT Timer
            </Typography>

            <br />
            <Typography variant='body1' component='p'>
              Timer-set to use during your HIIT trainings, or sprints or... whatever you need!
            </Typography>
            <Typography variant='body1' component='p'>
              Please don&apost;t hesitate to let me know suggestions, complaints... And if you enjoy it, feel free to
              <Link href='https://www.buymeacoffee.com/drodmun'> buy me a coffee </Link> to keep it up!
            </Typography>
            <br />
            <Typography variant='body1' component='p'>
              <Link
                href='https://www.buymeacoffee.com/drodmun'
                underline='none'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <CoffeeIcon style={{ marginRight: 8 }} /> Buy Me a Coffee
              </Link>
            </Typography>
            <br />
            <Typography variant='body1' component='p'>
              <Link
                href='hhttps://paypal.me/drodmun'
                underline='none'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <PaidIcon style={{ marginRight: 8 }} /> PayPal
              </Link>
            </Typography>
            <br />
            <Typography variant='body1' component='p'>
              Check more about this project:
            </Typography>
            <br />
            <Typography variant='body1' component='p'>
              <Link
                href='https://github.com/drodmun/HIIT-Timer'
                underline='none'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <GitHubIcon style={{ marginRight: 8 }} /> HIIT Timer in GitHUB
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ConfigHeader;
