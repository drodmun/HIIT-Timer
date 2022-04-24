import { ChangeEvent } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { Typography } from "@mui/material";

import FieldInput from "@components/TimersManager/TimerSetter/FieldInput/FieldInput";
import { minutesAtom, secondsAtom } from "@src/stores/timers";

const TimerSetter = () => {
  const [mins, setMins] = useRecoilState(minutesAtom);
  const [secs, setSecs] = useRecoilState(secondsAtom);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) =>
    (e.target.value = Math.max(0, Math.min(Number(e.target.value), 59)).toString());
  const handleOnChange = (setter: SetterOrUpdater<number>) => (e: ChangeEvent<HTMLInputElement>) =>
    setter(Number(e.target.value));

  const handleOnLess = (setter: SetterOrUpdater<number>) => () =>
    setter((prev) => Number(Math.max(0, Math.min(prev - 1, 59))));
  const handleOnTenLess = (setter: SetterOrUpdater<number>) => () =>
    setter((prev) => Number(Math.max(0, Math.min(prev - 10, 59))));
  const handleOnMore = (setter: SetterOrUpdater<number>) => () =>
    setter((prev) => Number(Math.max(0, Math.min(prev + 1, 59))));
  const handleOnTenMore = (setter: SetterOrUpdater<number>) => () =>
    setter((prev) => Number(Math.max(0, Math.min(prev + 10, 59))));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300
      }}
    >
      <FieldInput
        label="Minutes"
        value={mins}
        onLess={handleOnLess(setMins)}
        onTenLess={handleOnTenLess(setMins)}
        onMore={handleOnMore(setMins)}
        onTenMore={handleOnTenMore(setMins)}
        onInput={handleOnInput}
        onChange={handleOnChange(setMins)}
      />

      <Typography variant="h2" component="div" style={{ margin: 16 }}>
        :
      </Typography>

      <FieldInput
        label="Seconds"
        value={secs}
        onLess={handleOnLess(setSecs)}
        onTenLess={handleOnTenLess(setSecs)}
        onMore={handleOnMore(setSecs)}
        onTenMore={handleOnTenMore(setSecs)}
        onInput={handleOnInput}
        onChange={handleOnChange(setSecs)}
      />
    </div>
  );
};

export default TimerSetter;
