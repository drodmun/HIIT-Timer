import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button, Grid, Step, StepButton, StepContent, StepLabel, Stepper, Typography } from "@mui/material";

import FieldInput from "@components/TimersManager/TimerSetter/FieldInput/FieldInput";
import { countersConfigSetAtom } from "@src/stores/timers";
import { CounterConfig } from "@src/types/CounterConfig";

const steps: {
  label: string;
  description?: string;
  example?: string;
  field: "rounds" | "sets" | "cooldowns" | "prep" | "countdown";
}[] = [
  {
    label: "How many ROUNDs?",
    description: "Number of sets to apply",
    example: "2 rounds of a set 2 of 30s would be 30s * 2s (sets) * 2s (rounds) = 120s (02:00)",
    field: "rounds"
  },
  {
    label: "How many SETs",
    description: `Number of timers (including cooldown and preparation times) to repeat`,
    example: "2 sets or timers of 30s with a cooldown of 15s and preparation of 5s = 100s (01:40)",
    field: "sets"
  },
  {
    label: "With COOLDOWN?",
    description: `Time to rest between countdowns`,
    field: "cooldowns"
  },
  {
    label: "With PREP?",
    description: `Time to prepare before countdowns`,
    field: "prep"
  },
  {
    label: "FINALLY, THE COUNTDOWN!!",
    field: "countdown"
  }
];

const SetsConfigurator = ({ onFinish }: { onFinish: () => void }) => {
  const setCountersConfig = useSetRecoilState(countersConfigSetAtom);

  const [activeStep, setActiveStep] = useState(0);

  const [rounds, setRounds] = useState(1);
  const [sets, setSets] = useState(1);

  const [cdMinutes, setCdMinutes] = useState(0);
  const [cdSeconds, setCdSeconds] = useState(0);

  const [pMinutes, setPMinutes] = useState(0);
  const [pSeconds, setPSeconds] = useState(0);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleOnInput =
    (min = 0, max = 59) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      (e.target.value = Math.max(min, Math.min(Number(e.target.value), max)).toString());
  const handleOnChange = (setter: Dispatch<SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) =>
    setter(Number(e.target.value));

  const handleOnLess =
    (setter: Dispatch<SetStateAction<number>>, min = 0, max = 59) =>
    () =>
      setter((prev) => Number(Math.max(min, Math.min(prev - 1, max))));
  const handleOnMore =
    (setter: Dispatch<SetStateAction<number>>, min = 0, max = 59) =>
    () =>
      setter((prev) => Number(Math.max(min, Math.min(prev + 1, max))));

  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      const countersConfig: CounterConfig[] = [];
      const hasCooldown = !!cdMinutes || !!cdSeconds;
      const hasPreparation = !!pMinutes || !!pSeconds;
      for (let round = 1; round <= rounds; round++) {
        for (let set = 1; set <= sets; set++) {
          if (hasPreparation)
            countersConfig.push({ round, set, minutes: pMinutes, seconds: pSeconds, type: "preparation" });

          countersConfig.push({ round, set, minutes, seconds, type: "countdown" });

          if (hasCooldown)
            countersConfig.push({ round, set, minutes: cdMinutes, seconds: cdSeconds, type: "cooldown" });
        }
      }

      setCountersConfig(countersConfig);
      onFinish();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step: number) => () => setActiveStep(step);

  const renderContent = useCallback(
    (field: typeof steps[number]["field"]) => {
      switch (field) {
        case "rounds":
          return (
            <FieldInput
              label="Rounds (1 - 99)"
              value={rounds}
              onLess={handleOnLess(setRounds, 1, 99)}
              onMore={handleOnMore(setRounds, 1, 99)}
              onInput={handleOnInput(1, 99)}
              onChange={handleOnChange(setRounds)}
            />
          );
        case "sets":
          return (
            <FieldInput
              label="Sets (1 - 99)"
              value={sets}
              onLess={handleOnLess(setSets, 1, 99)}
              onMore={handleOnMore(setSets, 1, 99)}
              onInput={handleOnInput(1, 99)}
              onChange={handleOnChange(setSets)}
            />
          );
        case "cooldowns":
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 16
              }}
            >
              <FieldInput
                label="Minutes"
                value={cdMinutes}
                onLess={handleOnLess(setCdMinutes)}
                onMore={handleOnMore(setCdMinutes)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setCdMinutes)}
              />

              <Typography variant="h3" component="div" style={{ margin: 16 }}>
                :
              </Typography>

              <FieldInput
                label="Seconds"
                value={cdSeconds}
                onLess={handleOnLess(setCdSeconds)}
                onMore={handleOnMore(setCdSeconds)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setCdSeconds)}
              />
            </div>
          );
        case "prep":
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 16
              }}
            >
              <FieldInput
                label="Minutes"
                value={pMinutes}
                onLess={handleOnLess(setPMinutes)}
                onMore={handleOnMore(setPMinutes)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setPMinutes)}
              />

              <Typography variant="h3" component="div" style={{ margin: 16 }}>
                :
              </Typography>

              <FieldInput
                label="Seconds"
                value={pSeconds}
                onLess={handleOnLess(setPSeconds)}
                onMore={handleOnMore(setPSeconds)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setPSeconds)}
              />
            </div>
          );
        case "countdown":
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 16
              }}
            >
              <FieldInput
                label="Minutes"
                value={minutes}
                onLess={handleOnLess(setMinutes)}
                onMore={handleOnMore(setMinutes)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setMinutes)}
              />

              <Typography variant="h3" component="div" style={{ margin: 16 }}>
                :
              </Typography>

              <FieldInput
                label="Seconds"
                value={seconds}
                onLess={handleOnLess(setSeconds)}
                onMore={handleOnMore(setSeconds)}
                onInput={handleOnInput()}
                onChange={handleOnChange(setSeconds)}
              />
            </div>
          );
      }
    },
    [cdMinutes, cdSeconds, minutes, pMinutes, pSeconds, rounds, seconds, sets]
  );

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} style={{ margin: 64, marginTop: 0 }}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepButton onClick={handleStep(index)}>
                <StepLabel>
                  <Typography variant="h6" component="span">
                    {step.label}
                  </Typography>
                </StepLabel>
              </StepButton>
              <StepContent>
                <>
                  {!!step?.description && <Typography>{step.description}</Typography>}

                  {!!step?.example && <Typography>ie: {step.example}</Typography>}

                  {renderContent(step.field)}

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={index === steps.length - 1 && !minutes && !seconds}
                      >
                        {index === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                      {!!index && (
                        <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
  );
};

export default SetsConfigurator;
