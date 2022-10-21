import { useRecoilValue } from 'recoil';

import ShowCounter from 'components/TimersManager/ShowCounter/ShowCounter';
import TimerSetter from 'components/TimersManager/TimerSetter/TimerSetter';
import Actions from 'components/Actions/Actions';
import { hiitConfigurationAtom, isRunningAtom } from 'stores/timers';
import ConfigHeader from '../ConfigHeader/ConfigHeader';
import { Box } from '@mui/material';
import HIITSetPreview from '../HIITSetPreview/HIITSetPreview';

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);

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
        <Box sx={{ width: 350, height: 350, mt: 1 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <HIITSetPreview hiitConfiguration={hiitConfiguration} />
          </Box>
        </Box>
      )}

      <Actions />
    </div>
  );
};

export default TimerManager;
