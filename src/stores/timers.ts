import { atom, selector } from 'recoil';
import { CounterConfig, PresetType } from 'types/CounterConfig';

export const minutesAtom = atom({
  key: 'minutesAtom', // unique ID (with respect to other atoms/selectors)
  default: 0 // default value (aka initial value)
});

export const secondsAtom = atom({
  key: 'secondsAtom', // unique ID (with respect to other atoms/selectors)
  default: 30 // default value (aka initial value)
});

export const isTimerSetSelector = selector({
  key: 'isTimerSetSelector',
  get: ({ get }) => !!get(minutesAtom) || !!get(secondsAtom)
});

export const isRunningAtom = atom({
  key: 'isRunningAtom', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

export const countersConfigSetAtom = atom<CounterConfig[]>({
  key: 'countersConfigSetAtom', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const addCounterSelector = selector<CounterConfig>({
  key: 'addCounterSelector',
  get: () => ({} as CounterConfig),
  set: ({ get, set }, config) =>
    set(countersConfigSetAtom, [
      ...(!('minutes' in config) ? ([] as CounterConfig[]) : get(countersConfigSetAtom)),
      { minutes: get(minutesAtom), seconds: get(secondsAtom), type: 'countdown' } as CounterConfig
    ])
});

export const isPlaySoundAtom = atom({
  key: 'isPlaySoundAtom', // unique ID (with respect to other atoms/selectors)
  default: true // default value (aka initial value)
});

export const DefaultPreset = {
  rounds: 2,
  rMinutes: 1,
  rSeconds: 0,
  sets: 9,
  cdMinutes: 0,
  cdSeconds: 30,
  pMinutes: 0,
  pSeconds: 20,
  countDownMinutes: 0,
  countDownSeconds: 40
} as const;
export const presetAtom = atom<PresetType>({
  key: 'presetAtom',
  default: DefaultPreset
});
