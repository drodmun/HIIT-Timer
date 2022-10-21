/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memo, MouseEvent, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { User } from 'types';
import { useDarkMode, useUIConfig } from 'hooks';
import AccountMenu from '../AccountMenu/AccountMenu';

const UserProfile = ({ user }: { user: User }) => {
  const theme = useTheme();

  const anchor = useRef<HTMLElement>(null);
  const { isLightMode } = useDarkMode();
  const navigate = useNavigate();
  const { isMobileOrSmall, setMenuAnchor } = useUIConfig();

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!!user && user.name !== 'Guest') {
        if (!isMobileOrSmall && !!anchor?.current) setMenuAnchor(anchor?.current);
      } else {
        navigate('/login');
      }
    },
    [navigate, isMobileOrSmall, setMenuAnchor, user]
  );

  const initialsForAvatar = useMemo(
    () => `${user.name?.split(' ')[0][0]}${user.name?.split(' ')[1]?.[0] ?? ''}`,
    [user.name]
  );

  return (
    <>
      <Box
        id='profile-container'
        ref={anchor}
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: { xs: 2, md: 0 },
          cursor: 'pointer'
        }}
        onClick={handleOpen}
      >
        <Avatar
          src={user.photoURL!}
          sx={{
            width: { xs: 74, md: 64 },
            height: { xs: 74, md: 64 },
            mr: 2,
            bgcolor: theme.palette.primary.main,
            border: `2px solid ${theme.palette.secondary[isLightMode ? 'light' : 'main']}`
          }}
        >
          <Typography
            variant='h4'
            component='span'
            sx={{ color: isLightMode ? '#0d174d' : 'white', fontWeight: '500' }}
          >
            {initialsForAvatar}
          </Typography>
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            variant={!isMobileOrSmall ? 'h6' : 'h4'}
            component='span'
            sx={{ color: isLightMode ? 'black' : 'white' }}
          >
            {user.name}
            <Typography variant={!isMobileOrSmall ? 'subtitle1' : 'h4'} component='p' color='primary'>
              {user.email}
            </Typography>
          </Typography>
        </Box>
      </Box>

      <AccountMenu />
    </>
  );
};

export default memo(UserProfile);
