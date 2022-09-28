import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useTheme } from '@mui/material';
import { hiitConfigurationAtom, isPausedAtom, isRunningAtom } from 'stores/timers';
import Button from '../Button/Button';
import { useCallback } from 'react';
import { useGlobalContext } from 'globalStateContext';

const Actions = () => {
  const theme = useTheme();
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);
  const toggleIsPaused = () => setIsPaused((pIsPaused) => !pIsPaused);

  const [isPaused, setIsPaused] = useRecoilState(isPausedAtom);
  const resetHIITConfiguration = useResetRecoilState(hiitConfigurationAtom);

  const [isRunning, setIsRunning] = useRecoilState(isRunningAtom);
  const toggleRunning = useCallback(() => setIsRunning((pIsRunning) => !pIsRunning), [setIsRunning]);

  const handleOnReset = useCallback(() => resetHIITConfiguration(), [resetHIITConfiguration]);

  const handleOnStart = useCallback(() => toggleRunning(), [toggleRunning]);
  const { darkMode } = useGlobalContext();

  return (
    <div
      style={{ margin: '20px 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
    >
      {!isRunning ? (
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
        >
          Reset
        </Button>
      ) : (
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
          onClick={toggleIsPaused}
          variant='outlined'
        >
          {!isPaused ? 'Pause' : 'Continue'}
        </Button>
      )}

      <Button
        fullWidth
        size='large'
        variant='outlined'
        onClick={!isRunning ? handleOnStart : toggleRunning}
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
