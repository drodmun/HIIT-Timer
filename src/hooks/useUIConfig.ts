import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { isHasChangesAtom, openDialogAtom } from 'stores/ui-config';
import { PossibleDialogType } from 'types/UIConfig';
import { DefaultPreset, presetAtom } from '../stores/timers';

interface useUIConfigType {
  openDialog: PossibleDialogType;
  toggleSetOpenDialog: (dialog: PossibleDialogType) => () => void;
  isHasChanges: boolean;
  toggleSetIsHasChanges: () => void;
}

export const useUIConfig = (): useUIConfigType => {
  const preset = useRecoilValue(presetAtom);
  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = (dialog: typeof openDialog) => () => setOpenDialog(dialog);

  const [isHasChanges, setIsHasChanges] = useRecoilState(isHasChangesAtom);
  const toggleSetIsHasChanges = useCallback(
    () => setIsHasChanges((pIsHasChanges) => !pIsHasChanges),
    [setIsHasChanges]
  );
  useEffect(() => {
    console.log('#####', preset, DefaultPreset, preset == DefaultPreset, preset === DefaultPreset);
    if (preset != DefaultPreset) toggleSetIsHasChanges();
  }, [preset, toggleSetIsHasChanges]);

  return { openDialog, toggleSetOpenDialog, isHasChanges, toggleSetIsHasChanges };
};
