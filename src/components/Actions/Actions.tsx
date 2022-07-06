import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useTheme } from '@mui/material';

import {
  addCounterSelector,
  countersConfigSetAtom,
  isRunningAtom,
  isTimerSetSelector,
  minutesAtom,
  secondsAtom
} from 'stores/timers';
import { CounterConfig } from 'types/CounterConfig';

import Button from '../Button/Button';
import { useCallback } from 'react';

const Actions = () => {
  const theme = useTheme();
  const isTimerSet = useRecoilValue(isTimerSetSelector);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);
  const resetCountersConfigSet = useResetRecoilState(countersConfigSetAtom);
  const addCounterConfig = useSetRecoilState(addCounterSelector);

  const [isRunning, setIsRunning] = useRecoilState(isRunningAtom);
  const toggleTuning = useCallback(() => setIsRunning((pIsRunning) => !pIsRunning), [setIsRunning]);

  const resetMinutes = useResetRecoilState(minutesAtom);
  const resetSeconds = useResetRecoilState(secondsAtom);
  const handleOnReset = useCallback(() => {
    resetCountersConfigSet();
    resetMinutes();
    resetSeconds();
  }, [resetCountersConfigSet, resetMinutes, resetSeconds]);

  const handleOnStart = useCallback(() => {
    if (countersConfigSet.length <= 1) addCounterConfig({} as CounterConfig);
    toggleTuning();
  }, [addCounterConfig, countersConfigSet.length, toggleTuning]);

  return (
    <div
      style={{ margin: '64px 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
    >
      <Button
        sx={{
          margin: `0 ${theme.spacing(2)}`,
          borderLeftColor: '#FF5FF4',
          borderBottomColor: '#FF5FF4',
          color: '#ffffff',
          '&:hover': {
            color: '#ffffff'
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
        disabled={!isRunning && !isTimerSet && !countersConfigSet.length}
        sx={{
          margin: `0 ${theme.spacing(2)}`,
          backgroundColor: '#ffffff',
          border: 0,
          color: '#0d174d',
          '&:hover': {
            color: '#ffffff',
            borderColor: '#ffffff'
          }
        }}
      >
        {!isRunning ? 'Start' : 'Stop'}
      </Button>
    </div>
  );
};

export default Actions;
