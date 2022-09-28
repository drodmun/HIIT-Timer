import { atom } from 'recoil';
import { HIITConfiguration } from 'types/CounterConfig';

export const isRunningAtom = atom({
  key: 'isRunningAtom',
  default: false
});
export const isPausedAtom = atom({
  key: 'isPausedAtom',
  default: false
});

export const isPlaySoundAtom = atom({
  key: 'isPlaySoundAtom',
  default: true
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
