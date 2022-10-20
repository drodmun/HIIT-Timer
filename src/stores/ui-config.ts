import { atom } from 'recoil';

import { PossibleDialogType } from 'types/UIConfig';

export const openMobileDrawerAtom = atom<boolean>({
  key: 'openMobileDrawerAtom',
  default: false
});

export const openDialogAtom = atom<PossibleDialogType>({
  key: 'openDialogAtom',
  default: 'none'
});

export const menuAnchorAtom = atom<HTMLElement | null>({
  key: 'menuAnchorAtom',
  default: null
});
