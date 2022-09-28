import { atom } from 'recoil';
import { HIITConfiguration } from 'types/CounterConfig';

export const isRunningAtom = atom({
  key: 'isRunningAtom', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

export const isPlaySoundAtom = atom({
  key: 'isPlaySoundAtom', // unique ID (with respect to other atoms/selectors)
  default: true // default value (aka initial value)
});

export const DefaultHIITConfiguration: HIITConfiguration = {
  rounds: 0,
  sets: 0,
  counters: [{ round: 1, set: 1, minutes: 0, seconds: 30, type: 'countdown' }]
};
export const hiitConfigurationAtom = atom<HIITConfiguration>({
  key: 'hiitConfigurationAtom',
  default: DefaultHIITConfiguration
});
