import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import { useGlobalContext } from 'globalStateContext';
import { auth } from '../../firebase/firebaseConf';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

let uid: string | null = 'nonexisting';
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.email;
  }
});

//const navItemsLarge = ['Login', 'Signup'];
//const navItemsLargeLoggedIn = ['Logout'];
let navItemsLogged: string[] = [];
if (uid !== 'nonexisting') {
  navItemsLogged = ['Logout'];
} else {
  navItemsLogged = ['Login', 'Signup'];
}
const navItemsMobile = ['Login', 'SignUp'];
const container = window !== undefined ? () => window.document.body : undefined;

const Header = (): JSX.Element => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode } = useGlobalContext();
  const handleDrawerToggle = useCallback(() => setMobileOpen((pMobileOpen) => !pMobileOpen), [setMobileOpen]);
  const { loggedIn, setLoggedIn } = useGlobalContext();

  const drawer = useMemo(
    () => (
      <Box onClick={handleDrawerToggle}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: theme.spacing(1) }}>
          <Box>
            <IconButton aria-label='delete' size='large'>
              <ArrowBackIosNewIcon sx={{ color: darkMode ? 'black' : 'black' }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo />
          </Box>
        </Box>
        <List>
          <Divider />
          {navItemsMobile.map((item, index) => (
            <div key={item}>
              <ListItem>
                <Link key={item} to={`/${item}`} style={{ textDecoration: 'none' }}>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </Link>
              </ListItem>
              {index !== navItemsMobile.length && <Divider />}
            </div>
          ))}
        </List>
      </Box>
    ),
    [handleDrawerToggle, theme]
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
            sx={{ mr: 2, display: { md: 'none' }, color: darkMode ? 'black' : 'white' }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              fg: 1,
              m: `${theme.spacing(4)} ${theme.spacing(6)}`,
              width: '100%',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Logo />
                  <Typography
                    variant='body1'
                    sx={{ marginLeft: theme.spacing(2), color: darkMode ? 'black' : 'white' }}
                  >
                    works better as App
                  </Typography>
                </Box>
                <Button sx={{ textTransform: 'none', fontWeight: 'bold' }} size='x-large'>
                  Get APP
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' }, margin: theme.spacing() }}>
              {navItemsLogged.map((item) => (
                <Link key={item} to={`/${item}`} style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{ color: darkMode ? 'black' : '#fff', padding: theme.spacing(4), width: 150 }}
                    variant='text'
                    onClick={() => {
                      if (item === 'Logout') {
                        signOut(auth)
                          .then(() => {
                            // Sign-out successful.
                            console.log('Sign-out successful.');
                          })
                          .catch((error) => {
                            // An error happened.
                            console.log(error, 'fail');
                          });
                        setLoggedIn(false);
                        console.log(loggedIn);
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
            sx: {
              boxSizing: 'border-box',
              width: '100%',
              backgroundColor: darkMode ? 'white' : '#0d174d',
              color: darkMode ? 'black' : 'white'
            }
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default memo(Header);
