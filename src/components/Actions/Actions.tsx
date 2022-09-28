import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useTheme } from '@mui/material';
import { hiitConfigurationAtom, isRunningAtom } from 'stores/timers';
import Button from '../Button/Button';
import { useCallback } from 'react';
import { useGlobalContext } from 'globalStateContext';
import useSound from 'use-sound';
import eyeOfTheTiger from '../../assets/sounds/eyeofTheTIger.mp3';

const Actions = () => {
  const theme = useTheme();
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);
  const resetHIITConfiguration = useResetRecoilState(hiitConfigurationAtom);
  const [isRunning, setIsRunning] = useRecoilState(isRunningAtom);
  const toggleTuning = useCallback(() => setIsRunning((pIsRunning) => !pIsRunning), [setIsRunning]);
  const [play, { stop }] = useSound(eyeOfTheTiger, { volume: 0.4 });

  const handleOnReset = useCallback(() => {
    resetHIITConfiguration();
    stop();
  }, [resetHIITConfiguration, stop]);

  const handleOnStart = useCallback(() => toggleTuning(), [toggleTuning]);
  const { darkMode } = useGlobalContext();

  isRunning ? play() : stop();

  return (
    <div
      style={{ margin: '20px 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
    >
      <Button
        sx={{
          margin: `0 ${theme.spacing(2)}`,
          borderLeftColor: '#FF5FF4',
          borderBottomColor: '#FF5FF4',
          color: darkMode ? '11c1f4' : '#ffffff',
          '&:hover': {
            color: darkMode ? 'black' : '#ffffff'
          }
        }}
        fullWidth
        size='large'
        onClick={handleOnReset}
        variant='outlined'
        disabled={isRunning}
      >
        Reset
      </Button>

      <Button
        fullWidth
        size='large'
        variant='outlined'
        onClick={!isRunning ? handleOnStart : toggleTuning}
        disabled={!isRunning && !hiitConfiguration}
        sx={{
          margin: `0 ${theme.spacing(2)}`,
          backgroundColor: darkMode ? 'black' : '#ffffff',
          border: 0,
          color: darkMode ? '#ffffff' : '#0d174d',
          '&:hover': {
            color: darkMode ? '#0d174d' : '#ffffff',
            borderColor: '#ffffff',
            backgroundColor: '#11c1f4'
          }
        }}
      >
        {!isRunning ? 'Start' : 'Stop'}
      </Button>
    </div>
  );
};

export default Actions;
