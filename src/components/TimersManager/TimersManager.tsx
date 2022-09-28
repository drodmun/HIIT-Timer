import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import ProgressBar from 'react-bootstrap/ProgressBar';

import ShowCounter from 'components/TimersManager/ShowCounter/ShowCounter';
import TimerSetter from 'components/TimersManager/TimerSetter/TimerSetter';
import Actions from 'components/Actions/Actions';
import { hiitConfigurationAtom, isRunningAtom } from 'stores/timers';
import ConfigHeader from '../ConfigHeader/ConfigHeader';
import { Divider, Tooltip } from '@mui/material';

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);

  const colorByType2 = (type: 'countdown' | 'cooldown' | 'preparation' | 'round-rest' | 'set-rest') => {
    switch (type) {
      case 'preparation':
        return 'warning';
      case 'countdown':
        return 'success';
      case 'cooldown':
      case 'round-rest':
      case 'set-rest':
        return 'info';
    }
  };
  const totalTimePerSet = useMemo(
    () =>
      hiitConfiguration.counters
        .filter((ccs) => ccs.round === 1 && ccs.set === 1 && ccs.type !== 'round-rest')
        .reduce((a, b) => a + b.seconds + b.minutes * 60, 0),
    [hiitConfiguration]
  );
  const numberOfRounds = useMemo(
    () => hiitConfiguration.counters.filter((ccs) => ccs.set === 1 && ccs.type === 'countdown').length,
    [hiitConfiguration]
  );
  const numberOfSets = useMemo(
    () => hiitConfiguration.counters.filter((ccs) => ccs.round === 1 && ccs.type === 'countdown').length,
    [hiitConfiguration]
  );

  const toHHMMSS = useCallback((s: number) => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s - hours * 3600) / 60);
    const seconds = s - hours * 3600 - minutes * 60;

    let hoursText: string = hours.toString();
    let minutesText: string = minutes.toString();
    let secondsText: string = seconds.toString();

    if (!!hours || !!minutes) {
      if (hours < 10) hoursText = `0${hours}`;
      if (minutes < 10) {
        minutesText = `0${minutes}`;
      }
      if (seconds < 10) {
        secondsText = `0${seconds}`;
      }

      return `${!!hours ? `${hoursText}:` : ''}${minutesText}:${secondsText}`;
    } else {
      return `${seconds}s`;
    }
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
      ) : !hiitConfiguration.rounds ? (
        <TimerSetter />
      ) : (
        <div style={{ width: 350, height: 350, overflowY: 'scroll', overflowX: 'hidden' }}>
          {[...Array(numberOfRounds)].map((_, i) => (
            <div key={`round_${i}`} id={`round_${i}`} style={{ color: 'white' }}>
              <strong>{`Round ${i + 1} / ${numberOfRounds}`}</strong>
              {[...Array(numberOfSets)].map((_, j) =>
                hiitConfiguration.counters.filter(
                  (ccs) => ccs.round === i + 1 && ccs.set === j + 1 && ccs.type !== 'round-rest'
                ).length === 1 ? (
                  <ProgressBar animated variant='success' now={100} label='COUNTDOWN' />
                ) : (
                  <>
                    <div
                      key={`round_${i}_set_${j}`}
                      id={`round_${i}_set_${j}`}
                      style={{ width: '90%', margin: `${3}px auto` }}
                    >
                      {j > 0 && <Divider />}
                      <ProgressBar striped style={{ display: 'flex', flexDirection: 'row' }}>
                        {hiitConfiguration.counters
                          .filter((ccs) => ccs.round === i + 1 && ccs.set === j + 1 && ccs.type !== 'round-rest')
                          .map((ccs, index) => (
                            <ProgressBar
                              key={`ProgressBar_round_${i}_set_${j}_${index}`}
                              variant={colorByType2(ccs.type)}
                              now={((ccs.seconds + ccs.minutes * 60) * 100) / totalTimePerSet}
                              animated
                              label={
                                <Tooltip
                                  title={ccs.type.replace('preparation', 'prep').toUpperCase()}
                                  placement='top'
                                  style={{ width: '100%' }}
                                  arrow
                                >
                                  <strong>{`${toHHMMSS(ccs.seconds + ccs.minutes * 60)}`}</strong>
                                </Tooltip>
                              }
                            />
                          ))}
                      </ProgressBar>
                    </div>

                    {i + 1 < numberOfRounds &&
                      hiitConfiguration.counters
                        .filter((ccs) => ccs.round === i + 1 && ccs.set === j + 1 && ccs.type === 'round-rest')
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
                )
              )}
            </div>
          ))}
        </div>
      )}

      <Actions />
    </div>
  );
};

export default TimerManager;
