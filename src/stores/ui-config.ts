import { atom } from 'recoil';

import { PossibleDialogType } from 'types/UIConfig';

export const openDialogAtom = atom<PossibleDialogType>({
  key: 'openDialogAtom',
  default: 'none'
});
