import { memo } from 'react';
import { Menu } from '@mui/material';
import { useDarkMode, useUIConfig } from 'hooks';
import MenuOptions from '../MenuOptions/MenuOptions';

const AccountMenu = () => {
  const { isLightMode } = useDarkMode();
  const { menuAnchor, removeAnchor } = useUIConfig();

  return (
    <Menu
      id='profile-menu'
      anchorEl={menuAnchor}
      open={!!menuAnchor}
      onClose={removeAnchor}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          backgroundColor: isLightMode ? 'background.paper' : '#0d174d',
          width: 190,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            backgroundColor: isLightMode ? 'background.paper' : '#0d174d',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuOptions />
    </Menu>
  );
};

export default memo(AccountMenu);
