import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ShowCounter from 'components/TimersManager/ShowCounter/ShowCounter';
import TimerSetter from 'components/TimersManager/TimerSetter/TimerSetter';
import Actions from 'components/Actions/Actions';
import { countersConfigSetAtom, isRunningAtom } from 'stores/timers';
import { CounterConfig } from 'types/CounterConfig';
import ConfigHeader from '../ConfigHeader/ConfigHeader';

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);

  const SetMessage = useMemo(() => {
    const rounds =
      countersConfigSet?.reduce((a, b) => ((a.round || 0) > (b.round || 0) ? a : b), {} as CounterConfig)?.round || 0;
    const sets =
      countersConfigSet?.reduce((a, b) => ((a.set || 0) > (b.set || 0) ? a : b), {} as CounterConfig)?.set || 0;

    return (
      <>
        <Typography variant='h4' component='span'>
          <AccessAlarmIcon /> {` ROUND${rounds > 1 ? 's' : ''}: ${rounds}`}
        </Typography>
        <Typography variant='h4' component='span'>
          <AccessAlarmIcon /> {` SET${sets > 1 ? 's' : ''}: ${sets}`}
        </Typography>
        <Typography variant='h4' component='span'>{`Are you READY?`}</Typography>
      </>
    );
  }, [countersConfigSet]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexGrow: 1
      }}
    >
      <ConfigHeader />

      {isRunning ? (
        <ShowCounter />
      ) : !countersConfigSet.length || !countersConfigSet[0].round ? (
        <TimerSetter />
      ) : (
        SetMessage
      )}

      <Actions />
    </div>
  );
};

export default TimerManager;
