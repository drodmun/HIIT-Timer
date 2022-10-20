import { memo, useCallback, useState } from 'react';
import { Divider as MUIDivider, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { Comment, DarkMode, Info, LightMode, Logout, Settings } from '@mui/icons-material';

import { useDarkMode, useFirebaseAuth, useUIConfig } from 'hooks';
import Divider from 'components/Divider/Divider';
import { PossibleDialogType } from 'types/UIConfig';

const MenuOptions = () => {
  const { isLightMode, toggleDarkMode } = useDarkMode();
  const { toggleSetOpenDialog } = useUIConfig();
  const { logout } = useFirebaseAuth();

  const [openSubMenu, setOpenSubMenu] = useState<PossibleDialogType>('none');
  const toggleSetOpenSubMenu = (subMenu: typeof openSubMenu) => () =>
    setOpenSubMenu((pSubmenu) => (pSubmenu === subMenu ? 'none' : subMenu));

  const renderMenuItem = useCallback(
    (name: string, icon: JSX.Element, action: () => void, isSubmenu = false) => (
      <>
        {isSubmenu && <MUIDivider sx={{ borderColor: '#666', margin: '0 !important' }} />}
        <MenuItem sx={{ color: isLightMode ? 'black' : '#fff' }} onClick={action}>
          <ListItemIcon sx={{ ml: isSubmenu ? 2 : 0 }}>{icon}</ListItemIcon>
          <Typography variant='h6' sx={{ flexGrow: 1, display: 'block', textTransform: 'none' }}>
            {name}
          </Typography>
        </MenuItem>
      </>
    ),
    [isLightMode]
  );

  const renderSubmenuItem = useCallback(
    (name: string, icon: JSX.Element, action: () => void) => renderMenuItem(name, icon, action, true),
    [renderMenuItem]
  );

  return (
    <>
      {renderMenuItem('Settings', <Settings sx={{ color: 'primary.main' }} />, toggleSetOpenSubMenu('Settings'))}
      {openSubMenu === 'Settings' && (
        <>
          {renderSubmenuItem(
            `${!isLightMode ? 'Light' : 'Dark'} mode`,
            !isLightMode ? <LightMode sx={{ color: 'primary.main' }} /> : <DarkMode sx={{ color: 'primary.main' }} />,
            toggleDarkMode
          )}
        </>
      )}
      {renderMenuItem('Feedback', <Comment sx={{ color: 'primary.main' }} />, toggleSetOpenDialog('Feedback'))}
      {renderMenuItem('About', <Info sx={{ color: 'primary.main' }} />, toggleSetOpenDialog('About'))}

      <Divider />

      {renderMenuItem('Logout', <Logout sx={{ color: 'secondary.main' }} />, logout)}
    </>
  );
};

export default memo(MenuOptions);
