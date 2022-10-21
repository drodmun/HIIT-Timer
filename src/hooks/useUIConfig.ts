import isEqual from 'lodash.isequal';
import { useCallback, useMemo } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { menuAnchorAtom, openDialogAtom, openMobileDrawerAtom } from 'stores/ui-config';
import { PossibleDialogType } from 'types/UIConfig';
import { DefaultHIITConfiguration, hiitConfigurationAtom } from '../stores/timers';
import { useMediaQuery, useTheme } from '@mui/material';

interface useUIConfigType {
  isMobileOrSmall: boolean;
  openMobileDrawer: boolean;
  toggleSetOpenMobileDrawer: () => void;
  openDialog: PossibleDialogType;
  toggleSetOpenDialog: (dialog: PossibleDialogType) => () => void;
  menuAnchor: HTMLElement | null;
  setMenuAnchor: SetterOrUpdater<HTMLElement | null>;
  removeAnchor: () => void;
  executeFinalAction: (action: () => void) => () => void;
  isHasChanges: boolean;
}

export const useUIConfig = (): useUIConfigType => {
  const theme = useTheme();
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);

  const [openMobileDrawer, setOpenMobileDrawer] = useRecoilState(openMobileDrawerAtom);
  const toggleSetOpenMobileDrawer = useCallback(
    () => setOpenMobileDrawer((pOpenMobileDrawer) => !pOpenMobileDrawer),
    [setOpenMobileDrawer]
  );

  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = useCallback((dialog: typeof openDialog) => () => setOpenDialog(dialog), [setOpenDialog]);

  const [menuAnchor, setMenuAnchor] = useRecoilState(menuAnchorAtom);
  const removeAnchor = useResetRecoilState(menuAnchorAtom);

  const executeFinalAction = useCallback(
    (action: () => void) => () => {
      removeAnchor();
      openDialog !== 'none' && setOpenDialog('none');
      openMobileDrawer && setOpenMobileDrawer(false);
      action();
    },
    [openDialog, openMobileDrawer, removeAnchor, setOpenDialog, setOpenMobileDrawer]
  );

  const isHasChanges = useMemo(() => !isEqual(hiitConfiguration, DefaultHIITConfiguration), [hiitConfiguration]);

  const isMobileOrSmall = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return {
    isMobileOrSmall,
    openMobileDrawer,
    toggleSetOpenMobileDrawer,
    openDialog,
    toggleSetOpenDialog,
    menuAnchor,
    setMenuAnchor,
    removeAnchor,
    executeFinalAction,
    isHasChanges
  };
};
