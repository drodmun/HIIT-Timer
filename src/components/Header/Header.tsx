import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Drawer, IconButton, Link, List, ListItem, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import { useGlobalContext } from 'globalStateContext';
import { auth } from '../../firebase/firebaseConf';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const container = window !== undefined ? () => window.document.body : undefined;
const Header = ({ hideMenu }: { hideMenu?: boolean }): JSX.Element => {
  const [uid, setUid] = useState<string | null>('no');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { darkMode } = useGlobalContext();
  const handleDrawerToggle = useCallback(() => setMobileOpen((pMobileOpen) => !pMobileOpen), [setMobileOpen]);

  // This variable will save the event for later use.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.email);
      } else {
        setUid('nonexisting');
      }
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log(deferredPrompt, 'PWA3');
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

  const navItemsLogged = useMemo(() => (uid == 'nonexisting' ? ['Login', 'Signup'] : ['Logout']), [uid]);
  const navItemsMobile = useMemo(() => (uid == 'nonexisting' ? ['Login', 'Signup'] : ['Logout']), [uid]);

  const renderDrawer = useMemo(
    () => (
      <>
        <Box onClick={handleDrawerToggle}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: theme.spacing(1) }}>
            <IconButton aria-label='delete' size='large'>
              <ArrowBackIosNewIcon sx={{ color: !darkMode ? 'white' : '#0d174d' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Logo />
            </Box>
          </Box>

          <List>
            <Divider />
            {!hideMenu &&
              navItemsMobile.map((item, index) => (
                <>
                  <ListItem key={`navItemsMobile_${item}`}>
                    <Link
                      key={item}
                      href={`/${item}`}
                      style={{
                        textDecoration: 'none',
                        width: '100%',
                        color: !darkMode ? 'white' : '#0d174d',
                        padding: theme.spacing(2)
                      }}
                    >
                      <Typography variant='h4' component='span'>
                        {item}
                      </Typography>
                    </Link>
                  </ListItem>

                  {!hideMenu && index !== navItemsMobile.length && <Divider />}
                </>
              ))}
          </List>
        </Box>

        {!isPWAInstalled && (
          <Button
            onClick={installApp}
            sx={{ textTransform: 'none', fontWeight: 'bold', margin: theme.spacing(2) }}
            size='x-large'
          >
            Get APP
          </Button>
        )}
      </>
    ),
    [darkMode, handleDrawerToggle, installApp, isPWAInstalled, navItemsMobile, hideMenu, theme]
  );

  return (
    <>
      <AppBar component='nav' sx={{ minHeight: { md: 120, lg: 160 }, background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mt: 1, display: { md: 'none' }, color: darkMode ? 'black' : 'white' }}
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
                      sx={{ marginLeft: theme.spacing(2), color: darkMode ? 'black' : 'white' }}
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

            <Box sx={{ display: { xs: 'none', md: 'block' }, margin: theme.spacing() }}>
              {!hideMenu &&
                navItemsLogged.map((item) => (
                  <Link key={item} href={`/${item}`} style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{ color: darkMode ? 'black' : '#fff', width: 150 }}
                      variant='text'
                      onClick={() => {
                        if (item === 'Logout') {
                          signOut(auth)
                            .then(() => {
                              // Sign-out successful.
                              setUid('nonexisting');
                              console.log('Sign-out successful.');
                            })
                            .catch((error) => {
                              // An error happened.
                              console.log(error, 'fail');
                            });
                          //set to live auth instead of state
                        }
                      }}
                    >
                      <Typography variant='h6' sx={{ flexGrow: 1, display: 'block', textTransform: 'none' }}>
                        {item}
                      </Typography>
                    </Button>
                  </Link>
                ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            id: 'paperDrawer',
            sx: {
              boxSizing: 'border-box',
              width: 320,
              backgroundColor: darkMode ? 'white' : '#0d174d',
              color: darkMode ? 'black' : 'white',
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
