import { memo, useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Snackbar, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { doc, onSnapshot } from 'firebase/firestore';
import { HIITConfiguration, HIITSet } from 'types';
import { db } from 'config/firebase/firebaseConf';
import { useFirebaseAuth } from 'config/contexts';

import Dialog from 'components/Dialog/Dialog';
import Alert from '../components/Alert/Alert';
import HIITSetPreview from 'components/HIITSetPreview/HIITSetPreview';
import CommonUtils from '../utils/CommonUtils';
import { useSetRecoilState } from 'recoil';
import { hiitConfigurationAtom } from '../stores/timers';
import Button from '../components/Button/Button';
import { useUIConfig, useDarkMode } from 'hooks';

const MySets = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const { isLightMode } = useDarkMode();
  const { user } = useFirebaseAuth();
  const { executeFinalAction } = useUIConfig();

  const setHIITConfiguration = useSetRecoilState(hiitConfigurationAtom);

  const [loadSuccess, setLoadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const toggleOpenAlert = useCallback(() => setOpenAlert((pOpenAlert) => !pOpenAlert), [setOpenAlert]);

  const [sets, setSets] = useState<HIITSet[]>([]);

  const [expanded, setExpanded] = useState<number | false>(false);
  const handlePanelChange = (panelID: number) => (_: unknown, isExpanded: boolean) =>
    setExpanded(isExpanded && panelID);

  useEffect(() => {
    if (!!user?.email) {
      onSnapshot(doc(db, 'users', user?.email), (doc) => {
        const data = doc.data();
        try {
          if (!!data?.presets.length) {
            setErrorMessage('Preset loaded successfully!');
            setOpenAlert(true);
            setLoadSuccess(true);

            setSets(data.presets as HIITSet[]);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            setErrorMessage('No such preset!');
            setLoadSuccess(false);
            setOpenAlert(true);
          }
        } catch {
          console.log('No such document!');
          setErrorMessage('No such preset!');
          setLoadSuccess(false);
          setOpenAlert(true);
        }
      });
    }
  }, [user?.email]);

  const descFromSet = (set: HIITSet) => {
    const { hiitConfiguration: hiit } = set;
    const rounds = hiit.rounds + ' round' + (hiit.rounds > 1 ? 's' : '');
    const sets = hiit.sets + ' set' + (hiit.sets > 1 ? 's' : '');

    const totalTimeInSeconds =
      hiit.counters
        .filter((c) => c.round === 1 && c.set === 1)
        .reduce((acc, c) => acc + c.seconds + c.minutes * 60, 0) *
      hiit.sets *
      hiit.rounds;

    return [rounds, sets].join(', ').concat(` (total of ${CommonUtils.toHHMMSS(totalTimeInSeconds)})`);
  };

  const loadHIITConfiguration = useCallback(
    (hiit: HIITConfiguration) => () => setHIITConfiguration(hiit),
    [setHIITConfiguration]
  );

  return (
    <Dialog
      onClose={onClose}
      title='Saved Sets'
      content={
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pt: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}
        >
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

          <Snackbar open={openAlert} autoHideDuration={6000} onClose={toggleOpenAlert}>
            <Alert onClose={toggleOpenAlert} severity={loadSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      }
    />
  );
};

export default memo(MySets);
