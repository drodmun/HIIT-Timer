import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  addCounterSelector,
  countersConfigSetAtom,
  isRunningAtom,
  isTimerSetSelector,
  minutesAtom,
  secondsAtom
} from "@src/stores/timers";
import { CounterConfig } from "@src/types/CounterConfig";

const Actions = () => {
  const isTimerSet = useRecoilValue(isTimerSetSelector);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);
  const resetCountersConfigSet = useResetRecoilState(countersConfigSetAtom);
  const addCounterConfig = useSetRecoilState(addCounterSelector);

  const [isRunning, setIsRunning] = useRecoilState(isRunningAtom);
  const toggleTunning = () => setIsRunning((pIsRunning) => !pIsRunning);

  const resetMinutes = useResetRecoilState(minutesAtom);
  const resetSeconds = useResetRecoilState(secondsAtom);
  const handleOnReset = () => {
    resetCountersConfigSet();
    resetMinutes();
    resetSeconds();
  };

  const handleOnStart = () => {
    if (!countersConfigSet.length) addCounterConfig({} as CounterConfig);
    toggleTunning();
  };

  return (
    <div style={{ margin: "64px 0" }}>
      <Button
        style={{ maxWidth: "5em", maxHeight: "5em", minWidth: "5em", minHeight: "5em", margin: "0 16px" }}
        onClick={handleOnReset}
        variant="outlined"
        disabled={isRunning}
      >
        Reset
      </Button>

      <Button
        style={{ maxWidth: "5em", maxHeight: "5em", minWidth: "5em", minHeight: "5em", margin: "0 16px" }}
        variant="outlined"
        color="secondary"
        onClick={!isRunning ? handleOnStart : toggleTunning}
        disabled={!isRunning && !isTimerSet && !countersConfigSet.length}
      >
        {!isRunning ? "Start" : "Stop"}
      </Button>
    </div>
  );
};

export default Actions;
