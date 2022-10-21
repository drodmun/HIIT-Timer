/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memo, MouseEvent, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { User } from 'firebase/auth';
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
      if (!!user && user.displayName !== 'Guest') {
        if (!isMobileOrSmall && !!anchor?.current) setMenuAnchor(anchor?.current);
      } else {
        navigate('/login');
      }
    },
    [navigate, isMobileOrSmall, setMenuAnchor, user]
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
            {`${user.displayName!.split(' ')[0][0]}${user.displayName!.split(' ')[1]?.[0]}`}
          </Typography>
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            variant={!isMobileOrSmall ? 'h6' : 'h4'}
            component='span'
            sx={{ color: isLightMode ? 'black' : 'white' }}
          >
            {user.displayName}
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
