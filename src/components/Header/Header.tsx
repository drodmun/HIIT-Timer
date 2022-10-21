import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Drawer, IconButton, Link, List, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useDarkMode, useUIConfig, useUser } from 'hooks';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import UserProfile from './UserProfile/UserProfile';
import MenuOptions from './MenuOptions/MenuOptions';
import { User } from 'types';

const container = window !== undefined ? () => window.document.body : undefined;
const Header = ({ hideMenu }: { hideMenu?: boolean }): JSX.Element => {
  const theme = useTheme();

  const { isLightMode } = useDarkMode();
  const { data: user } = useUser();
  const { openMobileDrawer, toggleSetOpenMobileDrawer } = useUIConfig();

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // This variable will save the event for later use.
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e as typeof deferredPrompt);
    });
  }, [deferredPrompt]);

  const installApp = useCallback(async () => {
    if (!!deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  }, [deferredPrompt]);

  const isPWAInstalled = useMemo(
    () =>
      (document.referrer.startsWith('android-app://')
        ? 'twa'
        : 'standalone' in window.navigator || window.matchMedia('(display-mode: standalone)').matches
        ? 'standalone'
        : 'browser') !== 'browser',
    []
  );

  const renderDrawer = useMemo(
    () => (
      <>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Logo />
              </Box>
            </Box>

            {!!user && (
              <>
                <Divider />
                <UserProfile user={user as User} />
              </>
            )}
          </Box>

          <List>
            <Divider />
            {!hideMenu && <MenuOptions />}
          </List>
        </Box>

        {!isPWAInstalled && (
          <Button onClick={installApp} sx={{ textTransform: 'none', fontWeight: 'bold', m: 2, mb: 2 }} size='x-large'>
            Get APP
          </Button>
        )}
      </>
    ),
    [user, hideMenu, isPWAInstalled, installApp]
  );

  return (
    <>
      <AppBar component='nav' sx={{ minHeight: { md: 120, lg: 160 }, background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleSetOpenMobileDrawer}
            sx={{ mr: 2, mt: 1, display: { md: 'none' }, color: isLightMode ? 'black' : 'white' }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              fg: 1,
              m: `${theme.spacing(4)} ${theme.spacing(6)}`,
              width: '100%',
              display: { xs: 'none', md: 'flex' },
              alignItems: !isPWAInstalled ? 'flex-start' : 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: !isPWAInstalled ? 'flex-end' : 'center'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: !isPWAInstalled ? 'baseline' : 'center' }}>
                  <Logo />
                  {!isPWAInstalled && (
                    <Typography
                      variant='body1'
                      sx={{ marginLeft: theme.spacing(2), color: isLightMode ? 'black' : 'white' }}
                    >
                      works better as App
                    </Typography>
                  )}
                </Box>
                {!isPWAInstalled && (
                  <Button
                    onClick={installApp}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    fullWidth
                    size='large'
                  >
                    Get APP
                  </Button>
                )}
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' }, m: 1 }}>
              {!hideMenu &&
                (!!user ? (
                  <UserProfile user={user as User} />
                ) : (
                  ['Login', 'Signup'].map((item) => (
                    <Link key={`navItems_${item}`} href={`/${item}`} style={{ textDecoration: 'none' }}>
                      <Button sx={{ color: isLightMode ? 'black' : '#fff', width: 150 }} variant='text'>
                        <Typography variant='h6' sx={{ flexGrow: 1, display: 'block', textTransform: 'none' }}>
                          {item}
                        </Typography>
                      </Button>
                    </Link>
                  ))
                ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={openMobileDrawer}
          onClose={toggleSetOpenMobileDrawer}
          PaperProps={{
            id: 'paperDrawer',
            sx: {
              boxSizing: 'border-box',
              width: 320,
              backgroundColor: isLightMode ? 'white' : '#0d174d',
              color: isLightMode ? 'black' : 'white',
              justifyContent: 'space-between'
            }
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'flex', md: 'none' }
          }}
        >
          {renderDrawer}
        </Drawer>
      </Box>
    </>
  );
};

export default memo(Header);
