import { memo, useCallback, useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import empty from 'assets/images/emptybox.svg';
import { HIITConfiguration, HIITSet } from 'types';

import Dialog from 'components/Dialog/Dialog';
import HIITSetPreview from 'components/HIITSetPreview/HIITSetPreview';
import CommonUtils from '../utils/CommonUtils';
import { useSetRecoilState } from 'recoil';
import { hiitConfigurationAtom } from '../stores/timers';
import Button from '../components/Button/Button';
import { useUIConfig, useDarkMode } from 'hooks';
import { useHIITSets } from 'hooks/useFirebaseDB';

const MySets = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const { isLightMode } = useDarkMode();
  const { isMobileOrSmall, executeFinalAction } = useUIConfig();

  const { getSavedSets } = useHIITSets();
  const { data: sets } = getSavedSets();

  const setHIITConfiguration = useSetRecoilState(hiitConfigurationAtom);

  const [expanded, setExpanded] = useState<number | false>(false);
  const handlePanelChange = (panelID: number) => (_: unknown, isExpanded: boolean) =>
    setExpanded(isExpanded && panelID);

  const descFromSet = (set: HIITSet) => {
    const { hiitConfiguration: hiit } = set;
    const rounds = hiit.rounds || hiit.counters.filter((c) => c.set === 1 && c.type === 'countdown').length;
    const roundStr = `${rounds} round${rounds > 1 ? 's' : ''}`;
    const sets = hiit.sets || hiit.counters.filter((c) => c.round === 1 && c.type === 'countdown').length;
    const setStr = `${sets} set${sets > 1 ? 's' : ''}`;

    const countersInFirstSet = hiit.counters.filter((c) => c.round === 1 && c.set === 1);
    const accInitialValue =
      countersInFirstSet.length === 1 ? countersInFirstSet[0].seconds + countersInFirstSet[0].minutes * 60 : 0;
    const totalTimeInSeconds =
      countersInFirstSet.reduce((acc, c) => acc + c.seconds + c.minutes * 60, 0) * sets * rounds;

    return [roundStr, setStr]
      .join(', ')
      .concat(` (total of ${CommonUtils.toHHMMSS(totalTimeInSeconds || accInitialValue)})`);
  };

  const loadHIITConfiguration = useCallback(
    (hiit: HIITConfiguration) => () => setHIITConfiguration(hiit),
    [setHIITConfiguration]
  );

  const isEmpty = useMemo(() => !sets?.length, [sets]);

  return (
    <Dialog
      onClose={onClose}
      title='Saved Sets'
      content={
        <Box
          sx={{
            minHeight: 500,
            pl: 2,
            pr: 2,
            pt: 4,
            pb: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: !isEmpty ? 'flex-start' : 'center',
            alignItems: !isEmpty ? 'stretch' : 'center'
          }}
        >
          {!isEmpty ? (
            <>
              {sets.map((set, index) => (
                <Accordion
                  key={`accordion_set_${index}_${set.name}`}
                  sx={{
                    bgcolor: 'transparent',
                    mb: 0.5
                  }}
                  expanded={expanded === index}
                  onChange={handlePanelChange(index)}
                  TransitionProps={{ unmountOnExit: true }}
                  elevation={0}
                  disableGutters={true}
                >
                  <AccordionSummary
                    sx={{
                      border: `1px solid ${isLightMode ? '#0d174d' : theme.palette.background.paper}`,
                      borderRadius: 1
                    }}
                    expandIcon={<ExpandMoreIcon sx={{ color: isLightMode ? '#0d174d' : '#fafafa' }} />}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0, color: isLightMode ? '#0d174d' : '#fafafa' }}>
                      {set.name}
                    </Typography>
                    <Typography sx={{ color: isLightMode ? '#0d174d' : '#fafafa' }}>{descFromSet(set)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <HIITSetPreview hiitConfiguration={set.hiitConfiguration} />

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        mt: 2
                      }}
                    >
                      <Button
                        style={{ width: 120 }}
                        onClick={executeFinalAction(loadHIITConfiguration(set.hiitConfiguration))}
                      >
                        Load
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            <>
              {' '}
              <Typography variant={isMobileOrSmall ? 'h3' : 'h2'} component='span' color='secondary'>
                <strong>No SETs saved yet!</strong>
              </Typography>
              <br />
              <img width={(isMobileOrSmall && '50%') || ''} src={empty} alt='No results' loading='lazy' />
            </>
          )}
        </Box>
      }
    />
  );
};

export default memo(MySets);
