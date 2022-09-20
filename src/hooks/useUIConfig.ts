import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { openDialogAtom } from 'stores/ui-config';

export const useUIConfig = () => {
  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = useCallback((dialog: typeof openDialog) => () => setOpenDialog(dialog), [setOpenDialog]);

  return { openDialog, toggleSetOpenDialog };
};
