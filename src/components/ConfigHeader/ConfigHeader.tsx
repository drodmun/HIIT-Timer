import { memo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Fab, useTheme } from '@mui/material';

import { VolumeUpOutlined, VolumeOff } from '@mui/icons-material';

import { isPlaySoundAtom } from 'stores/timers';

const ConfigHeader = () => {
  const theme = useTheme();
  const [isPlaySound, setIsPlaySound] = useRecoilState(isPlaySoundAtom);
  const togglePlaySound = useCallback(() => setIsPlaySound((pIsPlaySound) => !pIsPlaySound), [setIsPlaySound]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        position: { xs: 'absolute', md: 'relative' },
        top: { xs: theme.spacing(1), md: 'auto' },
        right: { xs: theme.spacing(1), md: 'auto' }
      }}
    >
      <Fab
        size='small'
        aria-label='sound'
        onClick={togglePlaySound}
        sx={{ color: '#ffffff', background: 'linear-gradient(90deg, #FF5FF4 20%, #11C1F4 70%)', zIndex: '99999' }}
      >
        {isPlaySound ? <VolumeUpOutlined /> : <VolumeOff />}
      </Fab>
    </Box>
  );
};

export default memo(ConfigHeader);
