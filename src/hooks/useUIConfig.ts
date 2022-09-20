import { useRecoilState } from 'recoil';

import { openDialogAtom } from 'stores/ui-config';

export const useUIConfig = () => {
  const [openDialog, setOpenDialog] = useRecoilState(openDialogAtom);
  const toggleSetOpenDialog = (dialog: typeof openDialog) => () => setOpenDialog(dialog);

  return { openDialog, toggleSetOpenDialog };
};
