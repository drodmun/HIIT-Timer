import { useRecoilValue } from 'recoil';
import { Grid, useTheme, Box } from '@mui/material';

import TimersManager from 'components/TimersManager/TimersManager';
import SetsConfigurator from 'pages/SetsConfigurator';
import Container from 'components/Container/Container';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Button from 'components/Button/Button';
import SideMenu from '../components/SideMenu/SideMenu';

import { isRunningAtom } from 'stores/timers';
import { useUIConfig } from 'hooks/useUIConfig';
import About from './About';
import Settings from './Settings'
import { MyGlobalContext } from 'GlobalContext';
import { useState } from 'react';
const Index = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const isRunning = useRecoilValue(isRunningAtom);
  const { openDialog, toggleSetOpenDialog } = useUIConfig();

  return (
    <MyGlobalContext.Provider value= {{ darkMode, setDarkMode }}>
    <Container isSecondary={darkMode}>
      <Header />
      <Grid
        container
        spacing={0}
        alignItems='center'
        justifyContent='center'
        style={{
          display: 'flex',
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          
        }}
      >
        <Grid item xs={12} lg={8}>
          <Box
            id='BOXXXXXXXXX'
            sx={{
              padding: { xs: theme.spacing(4), lg: theme.spacing(8) },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent'
              
            }}
          >
            <TimersManager />

            {!isRunning && (
              <Button sx={{ textTransform: 'none' }} size='x-large' onClick={toggleSetOpenDialog('Configurator')}>
                Need a set?
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <SideMenu />

      {openDialog === 'Configurator' && <SetsConfigurator onFinish={toggleSetOpenDialog('none')} />}
      {openDialog === 'About' && <About onClose={toggleSetOpenDialog('none')} />}
      {openDialog === 'Settings' && <Settings onClose={toggleSetOpenDialog('none')} />}
      <Footer />
    </Container>
    </MyGlobalContext.Provider>
  );
};

export default Index;
