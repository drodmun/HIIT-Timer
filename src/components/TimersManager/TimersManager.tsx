import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';
import ShowCounter from 'components/TimersManager/ShowCounter/ShowCounter';
import TimerSetter from 'components/TimersManager/TimerSetter/TimerSetter';
import Actions from 'components/Actions/Actions';
import { countersConfigSetAtom, isRunningAtom } from 'stores/timers';
import ConfigHeader from '../ConfigHeader/ConfigHeader';
import pushUp from '../../assets/images/icons8-pushups.gif';
import timerSand from '../../assets/images/icons8-sand-timer.gif';
import { useGlobalContext } from '../../globalStateContext';

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);
  const { presetObj } = useGlobalContext();
  const SetMessage = useMemo(() => {
    return (
      <>
        <div className='d-flex flex-column rounded-5 px-5 py-2' style={{ backgroundColor: 'white' }}>
          <Typography variant='h4' component='span' style={{ fontWeight: 'bold' }}>
            <img src='https://img.icons8.com/external-filled-outline-icons-maxicons/85/000000/external-exercise-fitness-filled-outline-filled-outline-icons-maxicons.png' />
            {`  ${presetObj.pMinutes}:${presetObj.pSeconds} Prep `}
          </Typography>

          <Typography variant='h4' component='span' style={{ fontWeight: 'bold' }}>
            <img src={pushUp} alt={'pushupgif'} height='85px' />
            {` ${presetObj.sets} Sets`}
          </Typography>

          <Typography variant='h4' component='span' style={{ fontWeight: 'bold' }}>
            <img src={timerSand} alt={'timerSand'} height='85px' />
            {` ${presetObj.cdMinutes}:${presetObj.cdSeconds} Cooldown`}
          </Typography>
        </div>
      </>
    );
  }, [presetObj]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'center',
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
// const SetMessage = useMemo(() => {
//   const rounds =
//     countersConfigSet?.reduce((a, b) => ((a.round || 0) > (b.round || 0) ? a : b), {} as CounterConfig)?.round || 0;
//   const sets =
//     countersConfigSet?.reduce((a, b) => ((a.set || 0) > (b.set || 0) ? a : b), {} as CounterConfig)?.set || 0;
//   return (
//     <>
//       <Typography variant='h4' component='span'>
//         <AccessAlarmIcon /> {` ROUND${rounds > 1 ? 's' : ''}: ${rounds}`}
//       </Typography>
//       <Typography variant='h4' component='span'>
//         <AccessAlarmIcon /> {` SET${sets > 1 ? 's' : ''}: ${sets}`}
//       </Typography>
//       <Typography variant='h4' component='span'>{`Are you READY?`}</Typography>
//     </>
//   );
// }, [countersConfigSet]);
