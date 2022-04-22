import ShowCounter from "@components/TimersManager/ShowCounter/ShowCounter";
import TimerSetter from "@components/TimersManager/TimerSetter/TimerSetter";
import Actions from "@components/Actions/Actions";
import { useRecoilValue } from "recoil";
import { countersConfigSetAtom, isRunningAtom } from "@src/stores/timers";
import { useMemo } from "react";
import { CounterConfig } from "@src/types/CounterConfig";
import { Typography } from "@mui/material";

const TimerManager = () => {
  const isRunning = useRecoilValue(isRunningAtom);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);

  const SetMessage = useMemo(() => {
    const rounds =
      countersConfigSet?.reduce((a, b) => ((a.round || 0) > (b.round || 0) ? a : b), {} as CounterConfig)?.round || 0;
    const sets =
      countersConfigSet?.reduce((a, b) => ((a.set || 0) > (b.set || 0) ? a : b), {} as CounterConfig)?.set || 0;
    return (
      <>
        <Typography variant="h4" component="span">{`${rounds} ROUND${rounds > 1 ? "s" : ""}...`}</Typography>
        <Typography variant="h4" component="span">{`${sets} SET${sets > 1 ? "s" : ""}...`}</Typography>
        <Typography variant="h4" component="span">{`Are you READY?`}</Typography>
      </>
    );
  }, [countersConfigSet]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexGrow: 1
      }}
    >
      {isRunning ? (
        <ShowCounter />
      ) : !countersConfigSet.length || !countersConfigSet[0].round ? (
        <TimerSetter />
      ) : (
        SetMessage
      )}

      <Actions />
    </div>
  );
};

export default TimerManager;
