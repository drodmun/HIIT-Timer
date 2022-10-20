import isEqual from 'lodash.isequal';
import { useMemo } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { menuAnchorAtom, openDialogAtom } from 'stores/ui-config';
import { PossibleDialogType } from 'types/UIConfig';
import { DefaultHIITConfiguration, hiitConfigurationAtom } from '../stores/timers';
import { useMediaQuery, useTheme } from '@mui/material';

interface useUIConfigType {
  isMobileOrSmall: boolean;
  openDialog: PossibleDialogType;
  toggleSetOpenDialog: (dialog: PossibleDialogType) => () => void;
  isHasChanges: boolean;
  menuAnchor: HTMLElement | null;
  setMenuAnchor: SetterOrUpdater<HTMLElement | null>;
  removeAnchor: () => void;
}

export const useUIConfig = (): useUIConfigType => {
  const theme = useTheme();
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);

  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = (dialog: typeof openDialog) => () => setOpenDialog(dialog);

  const [menuAnchor, setMenuAnchor] = useRecoilState(menuAnchorAtom);
  const removeAnchor = useResetRecoilState(menuAnchorAtom);

  const isHasChanges = useMemo(() => !isEqual(hiitConfiguration, DefaultHIITConfiguration), [hiitConfiguration]);

  const isMobileOrSmall = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return {
    isMobileOrSmall,
    openDialog,
    toggleSetOpenDialog,
    isHasChanges,
    menuAnchor,
    setMenuAnchor,
    removeAnchor
  };
};
