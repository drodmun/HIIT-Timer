import { memo, useMemo } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Tooltip, useTheme } from '@mui/material';

import CommonUtils from 'utils/CommonUtils';
import { HIITConfiguration } from 'types';
import { ContentContainer } from '../ContentContainer/ContentContainer';
import { useDarkMode } from '../../config/contexts';

const HIITSetPreview = ({ hiitConfiguration }: { hiitConfiguration: HIITConfiguration }) => {
  const theme = useTheme();
  const { isLightMode } = useDarkMode();

  const numberOfRounds = useMemo(
    () => hiitConfiguration.counters.filter((ccs) => ccs.set === 1 && ccs.type === 'countdown').length,
    [hiitConfiguration]
  );
  const roundRest = useMemo(
    () => hiitConfiguration.counters.find((ccs) => ccs.round === 1 && ccs.type === 'round-rest'),
    [hiitConfiguration]
  );
  const roundRestAsHHMM = useMemo(
    () => (roundRest ? CommonUtils.toHHMMSS(roundRest.seconds + roundRest.minutes * 60) : ''),
    [roundRest]
  );

  const numberOfSets = useMemo(
    () => hiitConfiguration.counters.filter((ccs) => ccs.round === 1 && ccs.type === 'countdown').length,
    [hiitConfiguration]
  );
  const setRest = useMemo(
    () => hiitConfiguration.counters.find((ccs) => ccs.round === 1 && ccs.type === 'set-rest'),
    [hiitConfiguration]
  );
  const setRestAsHHMM = useMemo(
    () => (setRest ? CommonUtils.toHHMMSS(setRest.seconds + setRest.minutes * 60) : ''),
    [setRest]
  );

  const totalTimePerSet = useMemo(
    () =>
      hiitConfiguration.counters
        .filter((ccs) => ccs.round === 1 && ccs.set === 1 && ccs.type !== 'round-rest')
        .reduce((a, b) => a + b.seconds + b.minutes * 60, 0),
    [hiitConfiguration]
  );

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

  return (
    <ContentContainer
      customBorderColor={isLightMode ? '#0d174d' : theme.palette.background.paper}
      content={
        <ContentContainer
          customBorderColor={isLightMode ? '#0d174d' : theme.palette.background.paper}
          content={
            <ProgressBar striped style={{ display: 'flex', flexDirection: 'row' }}>
              {hiitConfiguration.counters
                .filter((ccs) => ccs.round === 1 && ccs.set === 1 && ccs.type !== 'round-rest')
                .map((ccs, index) => (
                  <ProgressBar
                    key={`ProgressBar_counter_${index}`}
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
                        <strong>{`${CommonUtils.toHHMMSS(ccs.seconds + ccs.minutes * 60)}`}</strong>
                      </Tooltip>
                    }
                  />
                ))}
            </ProgressBar>
          }
          title={`${numberOfSets} sets${!!setRest ? ` (${setRestAsHHMM}) rest between them` : ''}`}
        />
      }
      title={`${numberOfRounds} rounds${!!roundRest ? ` (${roundRestAsHHMM} rest between them)` : ''}`}
    />
  );
};

export default memo(HIITSetPreview);
