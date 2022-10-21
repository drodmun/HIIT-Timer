import { memo, useCallback, useState } from 'react';
import { Divider as MUIDivider, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { Comment, DarkMode, Info, LightMode, Logout, Settings, Tune } from '@mui/icons-material';

import { useDarkMode, useFirebaseAuth, useUIConfig } from 'hooks';
import Divider from 'components/Divider/Divider';
import { PossibleDialogType } from 'types/UIConfig';

const MenuOptions = () => {
  const { isLightMode, toggleDarkMode } = useDarkMode();
  const { toggleSetOpenDialog, executeFinalAction } = useUIConfig();
  const { logout } = useFirebaseAuth();

  const [openSubMenu, setOpenSubMenu] = useState<PossibleDialogType>('none');
  const toggleSetOpenSubMenu = (subMenu: typeof openSubMenu) => () =>
    setOpenSubMenu((pSubmenu) => (pSubmenu === subMenu ? 'none' : subMenu));

  const renderMenuItem = useCallback(
    (name: string, icon: JSX.Element, action: () => void, isSubmenu = false) => (
      <>
        {isSubmenu && <MUIDivider sx={{ borderColor: '#666', margin: '0 !important' }} />}
        <MenuItem sx={{ width: '100%' }} onClick={action}>
          <ListItemIcon sx={{ ml: isSubmenu ? 2 : 0 }}>{icon}</ListItemIcon>
          <Typography variant='h6' component='span' sx={{ fontWeight: 300, color: isLightMode ? 'black' : '#fff' }}>
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
      {renderMenuItem(
        'My Sets',
        <Tune sx={{ color: 'secondary.main' }} />,
        executeFinalAction(toggleSetOpenDialog('My Sets'))
      )}

      <Divider />

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
      {renderMenuItem(
        'Feedback',
        <Comment sx={{ color: 'primary.main' }} />,
        executeFinalAction(toggleSetOpenDialog('Feedback'))
      )}
      {renderMenuItem(
        'About',
        <Info sx={{ color: 'primary.main' }} />,
        executeFinalAction(toggleSetOpenDialog('About'))
      )}

      <Divider />

      {renderMenuItem('Logout', <Logout sx={{ color: 'secondary.main' }} />, executeFinalAction(logout))}
    </>
  );
};

export default memo(MenuOptions);
