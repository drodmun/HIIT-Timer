import { useRecoilState } from 'recoil';

import { openDialogAtom } from 'stores/ui-config';
import { PossibleDialogType } from 'types/UIConfig';

interface useUIConfigType {
  openDialog: PossibleDialogType;
  toggleSetOpenDialog: (dialog: PossibleDialogType) => () => void;
}

export const useUIConfig = (): useUIConfigType => {
  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = (dialog: typeof openDialog) => () => setOpenDialog(dialog);

  return { openDialog, toggleSetOpenDialog };
};
