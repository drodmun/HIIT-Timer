import { atom, selector } from 'recoil';
import { CounterConfig } from 'types/CounterConfig';

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

export const addCounterSelector = selector({
  key: 'addCounterSelector',
  get: () => ({} as CounterConfig),
  set: ({ get, set }) =>
    set(countersConfigSetAtom, [
      ...get(countersConfigSetAtom),
      { minutes: get(minutesAtom), seconds: get(secondsAtom), type: 'countdown' } as CounterConfig
    ])
});

export const isPlaySoundAtom = atom({
  key: 'isPlaySoundAtom', // unique ID (with respect to other atoms/selectors)
  default: true // default value (aka initial value)
});
