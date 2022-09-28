import { memo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import useSound from 'use-sound';

import { Fab } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { isPlaySoundAtom } from 'stores/timers';
import beep from '../../assets/sounds/beep.mp3';

const ConfigHeader = () => {
  //const theme = useTheme();
  const [isPlaySound, setIsPlaySound] = useRecoilState(isPlaySoundAtom);
  const [play] = useSound(beep);

  const handleClick = useCallback(() => {
    setIsPlaySound(!isPlaySound);
    play();
  }, [isPlaySound, play, setIsPlaySound]);

  return (
    <div style={{ zIndex: '1200' }}>
      <Fab
        size='small'
        aria-label='sound'
        onClick={handleClick}
        sx={{ color: '#ffffff', background: 'linear-gradient(90deg, #FF5FF4 20%, #11C1F4 70%)' }}
      >
        {isPlaySound ? <VolumeUpOutlinedIcon /> : <VolumeOffIcon />}
      </Fab>
    </div>
  );
};

export default memo(ConfigHeader);
