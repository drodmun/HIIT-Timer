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

  const prep = useMemo(
    () =>
      `${presetObj.pMinutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${presetObj.pSeconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`,
    [presetObj]
  );

  const cooldown = useMemo(
    () =>
      `${presetObj.cdMinutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${presetObj.cdSeconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`,
    [presetObj]
  );
  const countdown = useMemo(
    () =>
      `${presetObj.countDownMinutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${presetObj.countDownSeconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`,
    [presetObj]
  );

  const icons = useMemo(() => [pushUp, timerSand, timerSand], []);
  const details = useMemo(() => ['Prep', 'Cooldown', 'Set Duration'], []);
  const detailValues = useMemo(() => [prep, cooldown, countdown], [cooldown, countdown, prep]);

  const SetMessage = useMemo(
    () => (
      <>
        <div className='d-flex flex-column rounded-4 px-3' style={{ backgroundColor: 'white' }}>
          <Typography variant='h5' component='span' style={{ fontWeight: 'bold', padding: '0px' }}>
            <img src={pushUp} alt={'pushupgif'} height='85px' />
            {` ${presetObj.sets.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })} Sets`}
          </Typography>
          {details.map((detail, index) => (
            <Typography key={`icon${index}`} variant='h5' component='span' style={{ fontWeight: 'bold' }}>
              <img src={icons[index]} alt={`icon${index}`} height='85px' />
              {`${detailValues[index]} ${detail} `}
            </Typography>
          ))}
        </div>
      </>
    ),
    [detailValues, details, icons, presetObj.sets]
  );

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
