import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { Typography } from '@mui/material';

import FieldInput from 'components/TimersManager/TimerSetter/FieldInput/FieldInput';
import { hiitConfigurationAtom } from 'stores/timers';
import { useDarkMode } from 'hooks';

const TimerSetter = () => {
  const { isLightMode } = useDarkMode();

  const [hiitConfiguration, setHIITConfiguration] = useRecoilState(hiitConfigurationAtom);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) =>
    (e.target.value = Math.max(0, Math.min(Number(e.target.value), 59)).toString());
  const handleOnChange = (type: 'min' | 'sec') => (e: ChangeEvent<HTMLInputElement>) =>
    handleChange(Number(e.target.value), type);

  const valueFromType = (type: 'min' | 'sec'): number =>
    hiitConfiguration.counters[0][type === 'min' ? 'minutes' : 'seconds'];

  const handleOnLess = (type: 'min' | 'sec') => () =>
    handleChange(Number(Math.max(0, Math.min(valueFromType(type) - 1, 59))), type);
  const handleOnTenLess = (type: 'min' | 'sec') => () =>
    handleChange(Number(Math.max(0, Math.min(valueFromType(type) - 10, 59))), type);
  const handleOnMore = (type: 'min' | 'sec') => () =>
    handleChange(Number(Math.max(0, Math.min(valueFromType(type) + 1, 59))), type);
  const handleOnTenMore = (type: 'min' | 'sec') => () =>
    handleChange(Number(Math.max(0, Math.min(valueFromType(type) + 10, 59))), type);

  const handleChange = (n: number, type: 'min' | 'sec') =>
    setHIITConfiguration((pHIITConf) => ({
      ...pHIITConf,
      counters: [
        {
          round: 1,
          set: 1,
          type: 'countdown',
          minutes: type === 'min' ? n : pHIITConf.counters[0].minutes,
          seconds: type === 'sec' ? n : pHIITConf.counters[0].seconds
        }
      ]
    }));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 300,
        margin: '16px 16px 0'
      }}
    >
      <FieldInput
        label='Minutes'
        value={valueFromType('min')}
        onLess={handleOnLess('min')}
        onTenLess={handleOnTenLess('min')}
        onMore={handleOnMore('min')}
        onTenMore={handleOnTenMore('min')}
        onInput={handleOnInput}
        onChange={handleOnChange('min')}
      />

      <Typography variant='h1' component='div' style={{ margin: 16, color: isLightMode ? 'black' : '#ffffff' }}>
        :
      </Typography>

      <FieldInput
        label='Seconds'
        value={valueFromType('sec')}
        onLess={handleOnLess('sec')}
        onTenLess={handleOnTenLess('sec')}
        onMore={handleOnMore('sec')}
        onTenMore={handleOnTenMore('sec')}
        onInput={handleOnInput}
        onChange={handleOnChange('sec')}
      />
    </div>
  );
};

export default TimerSetter;
