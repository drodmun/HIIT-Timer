import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import ProgressBar from 'react-bootstrap/ProgressBar';

import ShowCounter from 'components/TimersManager/ShowCounter/ShowCounter';
import TimerSetter from 'components/TimersManager/TimerSetter/TimerSetter';
import Actions from 'components/Actions/Actions';
import { countersConfigSetAtom, isRunningAtom } from 'stores/timers';
import ConfigHeader from '../ConfigHeader/ConfigHeader';
import { Divider } from '@mui/material';

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);

  // const colorByType = (type: 'countdown' | 'cooldown' | 'preparation') => {
  //   switch (type) {
  //     case 'preparation':
  //       return '#9B5BF9';
  //     case 'countdown':
  //       return '#ffffff';
  //     case 'cooldown':
  //       return '#00FAFC';
  //   }
  // };
  const colorByType2 = (type: 'countdown' | 'cooldown' | 'preparation' | 'roundrest') => {
    switch (type) {
      case 'preparation':
        return 'warning';
      case 'countdown':
        return 'success';
      case 'cooldown':
      case 'roundrest':
        return 'info';
    }
  };
  const totalTimePerSet = useMemo(
    () =>
      countersConfigSet
        .filter((ccs) => ccs.round === 1 && ccs.set === 1)
        .reduce((a, b) => a + b.seconds + b.minutes * 60, 0),
    [countersConfigSet]
  );
  const numberOfRounds = useMemo(
    () => countersConfigSet.filter((ccs) => ccs.set === 1 && ccs.type === 'countdown').length,
    [countersConfigSet]
  );
  const numberOfSets = useMemo(
    () => countersConfigSet.filter((ccs) => ccs.round === 1 && ccs.type === 'countdown').length,
    [countersConfigSet]
  );

  const toHHMMSS = useCallback((s: number) => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s - hours * 3600) / 60);
    const seconds = s - hours * 3600 - minutes * 60;

    let hoursText: string = hours.toString();
    let minutesText: string = minutes.toString();
    let secondsText: string = seconds.toString();

    if (hours < 10) hoursText = `0${hours}`;
    if (minutes < 10) minutesText = `0${minutes}`;
    if (seconds < 10) secondsText = `0${seconds}`;

    return `${!!hours ? `${hoursText}:` : ''}${minutesText}:${secondsText}`;
  }, []);

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
        <div style={{ width: 350, height: 350, overflowY: 'scroll', overflowX: 'hidden' }}>
          {[...Array(numberOfRounds)].map((_, i) => (
            <div key={`round_${i}`} id={`round_${i}`} style={{ color: 'white' }}>
              <strong>{`Round ${i + 1} / ${numberOfRounds}`}</strong>
              {[...Array(numberOfSets)].map((_, j) => (
                <>
                  <div
                    key={`round_${i}_set_${j}`}
                    id={`round_${i}_set_${j}`}
                    style={{ width: '90%', margin: `${3}px auto` }}
                  >
                    {j > 0 && <Divider />}
                    <ProgressBar striped style={{ display: 'flex', flexDirection: 'row' }}>
                      {countersConfigSet
                        .filter((ccs) => ccs.round === i + 1 && ccs.set === j + 1 && ccs.type !== 'roundrest')
                        .map((ccs, index) => (
                          <ProgressBar
                            variant={colorByType2(ccs.type)}
                            now={((ccs.seconds + ccs.minutes * 60) * 100) / totalTimePerSet}
                            key={`ProgressBar_round_${i}_set_${j}_${index}`}
                            animated
                            label={
                              <strong>
                                {`${ccs.type.replace('preparation', 'prep').toUpperCase()} (${toHHMMSS(
                                  ccs.seconds + ccs.minutes * 60
                                )})`}
                              </strong>
                            }
                          />
                        ))}
                    </ProgressBar>
                  </div>

                  {i + 1 < numberOfRounds &&
                    countersConfigSet
                      .filter((ccs) => ccs.round === i + 1 && ccs.set === j + 1 && ccs.type === 'roundrest')
                      .map(() => (
                        <>
                          <br />
                          <ProgressBar
                            variant='info'
                            now={100}
                            label={<strong style={{ color: 'black' }}># ROUND {i + 1} REST #</strong>}
                          />
                          <br />
                        </>
                      ))}
                </>
              ))}
            </div>
          ))}
        </div>
      )}

      <Actions />
    </div>
  );
};

export default TimerManager;
