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

const Actions = () => {
  const theme = useTheme();
  const isTimerSet = useRecoilValue(isTimerSetSelector);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);
  const resetCountersConfigSet = useResetRecoilState(countersConfigSetAtom);
  const addCounterConfig = useSetRecoilState(addCounterSelector);

  const [isRunning, setIsRunning] = useRecoilState(isRunningAtom);
  const toggleTuning = () => setIsRunning((pIsRunning) => !pIsRunning);

  const resetMinutes = useResetRecoilState(minutesAtom);
  const resetSeconds = useResetRecoilState(secondsAtom);
  const handleOnReset = () => {
    resetCountersConfigSet();
    resetMinutes();
    resetSeconds();
  };

  const handleOnStart = () => {
    if (!countersConfigSet.length) addCounterConfig({} as CounterConfig);
    toggleTuning();
  };

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
          '&.Mui-disabled': {
            color: theme.palette.grey.A200,
            borderColor: theme.palette.grey.A200,
            backgroundColor: theme.palette.grey[50],
            opacity: 0.4
          },
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
