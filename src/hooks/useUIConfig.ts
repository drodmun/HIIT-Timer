import isEqual from 'lodash.isequal';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { openDialogAtom } from 'stores/ui-config';
import { PossibleDialogType } from 'types/UIConfig';
import { DefaultHIITConfiguration, hiitConfigurationAtom } from '../stores/timers';

interface useUIConfigType {
  openDialog: PossibleDialogType;
  toggleSetOpenDialog: (dialog: PossibleDialogType) => () => void;
  isHasChanges: boolean;
}

export const useUIConfig = (): useUIConfigType => {
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);
  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = (dialog: typeof openDialog) => () => setOpenDialog(dialog);

  const isHasChanges = useMemo(() => !isEqual(hiitConfiguration, DefaultHIITConfiguration), [hiitConfiguration]);

  return { openDialog, toggleSetOpenDialog, isHasChanges };
};
