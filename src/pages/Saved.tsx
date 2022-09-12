import { memo } from 'react';
import { Grid } from '@mui/material';
import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useGlobalContext } from '../globalStateContext';
import { save } from '../stores/presetSave';
import { CounterConfig } from '../types/CounterConfig';
import { useSetRecoilState } from 'recoil';
import { countersConfigSetAtom } from '../stores/timers';

const Save = ({ onClose }: { onClose: () => void }) => {
  const {presetObj} = useGlobalContext();
  const setCountersConfig = useSetRecoilState(countersConfigSetAtom);

  function LoadPreset(){
    const countersConfig: CounterConfig[] = [];

      const hasCooldown = !!presetObj.cdMinutes || !!presetObj.cdSeconds;
      const hasPreparation = !!presetObj.pMinutes || !!presetObj.pSeconds;
      for (let round = 1; round <= presetObj.rounds; round++) {
        for (let set = 1; set <= presetObj.sets; set++) {
          if (hasPreparation)
            countersConfig.push({ round, set, minutes: presetObj.pMinutes, seconds: presetObj.pSeconds, type: 'preparation' });

          countersConfig.push({ round, set, minutes: presetObj.rMinutes, seconds: presetObj.rSeconds, type: 'countdown' });

          if (hasCooldown)
            countersConfig.push({ round, set, minutes: presetObj.cdMinutes, seconds: presetObj.cdSeconds, type: 'cooldown' });
        }
      }
      setCountersConfig(countersConfig);
      //onFinish();
  }
  return(
  <Dialog
    onClose={onClose}
    title='Settings'
    content={
      <div className='text-center'>
      <Grid container spacing={0} >
        <Grid item xs={12} style={{ padding: 32, paddingTop: 0 }} >
          <Button sx={{ textTransform: 'none' }} size='x-large' onClick={()=>{
            save('preset1',presetObj.rounds,presetObj.rMinutes,presetObj.rSeconds,
            presetObj.sets,presetObj.cdMinutes,presetObj.cdSeconds,presetObj.pMinutes,presetObj.pSeconds
          )
          }}>
            Save preset
          </Button>
          <Button sx={{ textTransform: 'none' }} size='x-large' onClick={LoadPreset}>
            Load preset
          </Button>
        </Grid>
      </Grid></div>
    }
  />)
}


export default memo(Save);
