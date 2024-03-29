import { ChangeEvent, Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Grid,
  Step,
  StepButton,
  StepConnector,
  stepConnectorClasses,
  StepContent,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import FieldInput from 'components/TimersManager/TimerSetter/FieldInput/FieldInput';
import { hiitConfigurationAtom } from 'stores/timers';
import { SetCounter } from 'types/CounterConfig';

import Dialog from 'components/Dialog/Dialog';
import Button from 'components/Button/Button';
import { useDarkMode } from 'hooks';

const steps: {
  label: string;
  description?: string;
  example?: string;
  field: 'rounds' | 'between-rounds' | 'sets' | 'cooldowns' | 'prep' | 'countdown';
}[] = [
  {
    label: 'How many ROUNDs?',
    description: 'Number of sets to apply',
    example: '2 rounds of a set 2 of 30s would be 30s * 2s (sets) * 2s (rounds) = 120s (02:00)',
    field: 'rounds'
  },
  {
    label: 'Rest between ROUNDs!',
    description: 'Once a round is done, take a break!',
    field: 'between-rounds'
  },
  {
    label: 'How many SETs',
    description: `Number of timers (including cooldown and preparation times) to repeat`,
    example: '2 sets or timers of 30s with a cooldown of 15s and preparation of 5s = 100s (01:40)',
    field: 'sets'
  },
  {
    label: 'With COOLDOWN?',
    description: `Time to rest between countdowns`,
    field: 'cooldowns'
  },
  {
    label: 'With PREP?',
    description: `Time to prepare before countdowns`,
    field: 'prep'
  },
  {
    label: 'FINALLY, THE COUNTDOWN!!',
    field: 'countdown'
  }
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.line}`]: {
    minHeight: theme.spacing(2)
  }
}));

const SetsConfigurator = ({ onFinish }: { onFinish: () => void }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const setHIITConfiguration = useSetRecoilState(hiitConfigurationAtom);

  const [activeStep, setActiveStep] = useState(0);

  const [rounds, setRounds] = useState(1);
  //Rest minutes, seconds
  const [rMinutes, setRMinutes] = useState(0);
  const [rSeconds, setRSeconds] = useState(0);

  const [sets, setSets] = useState(1);
  //cooldown minutes, seconds
  const [cdMinutes, setCdMinutes] = useState(0);
  const [cdSeconds, setCdSeconds] = useState(0);
  //prep minutes, seconds
  const [pMinutes, setPMinutes] = useState(0);
  const [pSeconds, setPSeconds] = useState(0);

  //countdown minutes, seconds
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { isLightMode } = useDarkMode();

  const handleOnInput =
    (min = 0, max = 59) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      (e.target.value = Math.max(min, Math.min(Number(e.target.value), max)).toString());
  const handleOnChange = (setter: Dispatch<SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) =>
    setter(Number(e.target.value));

  const handleOnValueChange = (setter: Dispatch<SetStateAction<number>>, value: number) => () =>
    setter((prev) => Number(Math.max(0, Math.min(prev + value, 59))));

  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      const counters = [] as SetCounter[];

      const hasRoundRest = !!rMinutes || !!rSeconds;
      const hasCooldown = !!cdMinutes || !!cdSeconds;
      const hasPreparation = !!pMinutes || !!pSeconds;
      for (let round = 1; round <= rounds; round++) {
        for (let set = 1; set <= sets; set++) {
          if (hasPreparation) counters.push({ round, set, minutes: pMinutes, seconds: pSeconds, type: 'preparation' });
          counters.push({ round, set, minutes, seconds, type: 'countdown' });
          if (hasCooldown) counters.push({ round, set, minutes: cdMinutes, seconds: cdSeconds, type: 'cooldown' });
        }

        if (hasRoundRest) counters.push({ round, set: sets, minutes: rMinutes, seconds: rSeconds, type: 'round-rest' });
      }

      setHIITConfiguration({ rounds, sets, counters });
      onFinish();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step: number) => () => setActiveStep(step);

  const renderFieldInput = useCallback(
    (setter: Dispatch<SetStateAction<number>>, value: number, label: string, isTime = false) => (
      <FieldInput
        label={label}
        value={value}
        onLess={handleOnValueChange(setter, -1)}
        onTenLess={handleOnValueChange(setter, -10)}
        onMore={handleOnValueChange(setter, 1)}
        onTenMore={handleOnValueChange(setter, 10)}
        onInput={isTime ? handleOnInput() : handleOnInput(1, 99)}
        onChange={handleOnChange(setter)}
        onSecondView
      />
    ),
    []
  );

  const renderContent = useCallback(
    (field: typeof steps[number]['field']) => {
      switch (field) {
        case 'rounds':
          return renderFieldInput(setRounds, rounds, 'Rounds (1 - 99)', false);
        case 'between-rounds':
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16
              }}
            >
              {renderFieldInput(setRMinutes, rMinutes, 'Minutes', true)}

              <Typography variant='h3' component='div' style={{ margin: 16, color: isLightMode ? 'black' : 'white' }}>
                :
              </Typography>

              {renderFieldInput(setRSeconds, rSeconds, 'Seconds', true)}
            </div>
          );
        case 'sets':
          return renderFieldInput(setSets, sets, 'Sets (1 - 99)', false);
        case 'cooldowns':
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16
              }}
            >
              {renderFieldInput(setCdMinutes, cdMinutes, 'Minutes', true)}

              <Typography variant='h3' component='div' style={{ margin: 16, color: isLightMode ? 'black' : 'white' }}>
                :
              </Typography>

              {renderFieldInput(setCdSeconds, cdSeconds, 'Seconds', true)}
            </div>
          );
        case 'prep':
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16
              }}
            >
              {renderFieldInput(setPMinutes, pMinutes, 'Minutes', true)}

              <Typography variant='h3' component='div' style={{ margin: 16, color: isLightMode ? 'black' : 'white' }}>
                :
              </Typography>

              {renderFieldInput(setPSeconds, pSeconds, 'Seconds', true)}
            </div>
          );
        case 'countdown':
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16
              }}
            >
              {renderFieldInput(setMinutes, minutes, 'Minutes', true)}

              <Typography variant='h3' component='div' style={{ margin: 16, color: isLightMode ? 'black' : 'white' }}>
                :
              </Typography>

              {renderFieldInput(setSeconds, seconds, 'Seconds', true)}
            </div>
          );
      }
    },
    [
      cdMinutes,
      cdSeconds,
      isLightMode,
      minutes,
      pMinutes,
      pSeconds,
      rMinutes,
      rSeconds,
      renderFieldInput,
      rounds,
      seconds,
      sets
    ]
  );

  return (
    <Dialog
      isScrollable
      onClose={onFinish}
      title='Configure ROUNDS/SETS'
      content={
        <Grid container spacing={0} sx={{ overflow: 'auto' }}>
          <Grid item xs={12} sx={{ p: fullScreen ? 2 : 8, pt: 0, m: 0 }}>
            <Stepper nonLinear activeStep={activeStep} orientation='vertical' connector={<QontoConnector />}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton onClick={handleStep(index)}>
                    <StepLabel>
                      <Typography variant='h6' component='span' style={{ color: isLightMode ? 'black' : 'white' }}>
                        {step.label}
                      </Typography>
                    </StepLabel>
                  </StepButton>
                  <StepContent>
                    <>
                      {!!step?.description && (
                        <Typography style={{ color: isLightMode ? 'black' : 'white' }}>{step.description}</Typography>
                      )}

                      {!!step?.example && (
                        <Typography style={{ color: isLightMode ? 'black' : 'white' }}>ie: {step.example}</Typography>
                      )}

                      {renderContent(step.field)}

                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            size='large'
                            variant='contained'
                            color='secondary'
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1, borderRadius: 4 }}
                            disabled={index === steps.length - 1 && !minutes && !seconds}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                          {!!index && (
                            <Button
                              size='large'
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{
                                mt: 1,
                                mr: 1,
                                borderRadius: 4,

                                background: '#ffffff',
                                border: 0,
                                color: '#0d174d',
                                '&:hover': {
                                  background: '#0d174d',
                                  color: '#ffffff',
                                  borderColor: '#ffffff'
                                }
                              }}
                            >
                              Back
                            </Button>
                          )}
                        </div>
                      </Box>
                    </>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      }
    />
  );
};

export default memo(SetsConfigurator);
