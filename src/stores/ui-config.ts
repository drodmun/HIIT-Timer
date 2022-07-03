import { atom } from 'recoil';

export const openDialogAtom = atom<'none' | 'Configurator' | 'About' | 'Save' | 'Share' | 'Feedback' | 'Settings'>({
  key: 'openDialogAtom', // unique ID (with respect to other atoms/selectors)
  default: 'none' // default value (aka initial value)
});
