import { atom } from 'recoil';

import { PossibleDialogType } from 'types/UIConfig';

export const openDialogAtom = atom<PossibleDialogType>({
  key: 'openDialogAtom', // unique ID (with respect to other atoms/selectors)
  default: 'none' // default value (aka initial value)
});

export const isHasChangesAtom = atom<boolean>({
  key: 'isHasChangesAtom',
  default: false
});
