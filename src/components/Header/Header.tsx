import { memo, useCallback, useMemo, useState } from 'react';

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

const navItemsLarge = ['Login', 'Sign Up'];
const navItemsMobile = ['Login / Sign Up', 'Settings', 'Dark/Light Mode', 'Feedback'];
const container = window !== undefined ? () => window.document.body : undefined;

const Header = (): JSX.Element => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => setMobileOpen((pMobileOpen) => !pMobileOpen), [setMobileOpen]);

  const drawer = useMemo(
    () => (
      <Box onClick={handleDrawerToggle}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: theme.spacing(1) }}>
          <Box>
            <IconButton aria-label='delete' size='large'>
              <ArrowBackIosNewIcon sx={{ color: 'white' }} />
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
                <ListItemButton sx={{ textAlign: 'left' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
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
            sx={{ mr: 2, display: { md: 'none' } }}
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
                  <Typography variant='body1' sx={{ marginLeft: theme.spacing(2) }}>
                    works better as App
                  </Typography>
                </Box>
                <Button
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  size='x-large'
                  disabled
                  disabledMessage='Coming soon...'
                >
                  Get APP
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' }, margin: theme.spacing() }}>
              {navItemsLarge.map((item) => (
                <Button
                  key={item}
                  sx={{ color: '#fff', padding: theme.spacing(4), width: 150 }}
                  variant='text'
                  disabled
                  disabledMessage='Coming soon...'
                >
                  <Typography variant='h6' sx={{ flexGrow: 1, display: 'block', textTransform: 'none' }}>
                    {item}
                  </Typography>
                </Button>
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
            sx: { boxSizing: 'border-box', width: '100%', backgroundColor: '#0d174d', color: '#FFFFFF' }
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
