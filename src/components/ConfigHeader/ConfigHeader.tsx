import { memo } from 'react';
import { useRecoilState } from 'recoil';
import { Fab } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { isPlaySoundAtom } from 'stores/timers';
import useSound from 'use-sound';
import boopSfx from '../../assets/sounds/beep.mp3';
const ConfigHeader = () => {
  //const theme = useTheme();
  const [isPlaySound, setIsPlaySound] = useRecoilState(isPlaySoundAtom);
  const [play] = useSound(boopSfx);
  function handleClick() {
    setIsPlaySound(!isPlaySound);
    play();
  }
  return (
    // <Box
    //   sx={{
    //     width: '100%',
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    //     position: { xs: 'absolute', md: 'relative' },
    //     top: { xs: theme.spacing(1), md: 'auto' },
    //     right: { xs: theme.spacing(1), md: 'auto' },
    //     cursror: 'pointer'
    //   }}
    // >
    <div style={{ zIndex: '1200', paddingTop: '70px' }}>
      <Fab
        size='small'
        aria-label='sound'
        onClick={handleClick}
        sx={{ color: '#ffffff', background: 'linear-gradient(90deg, #FF5FF4 20%, #11C1F4 70%)' }}
      >
        {isPlaySound ? <VolumeUpOutlinedIcon /> : <VolumeOffIcon />}
      </Fab>
    </div>
    // </Box>
  );
};

export default memo(ConfigHeader);
