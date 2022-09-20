import { useRecoilValue } from 'recoil';
import { Grid, useTheme, Box } from '@mui/material';
import TimersManager from 'components/TimersManager/TimersManager';
import SetsConfigurator from 'pages/SetsConfigurator';
import Container from 'components/Container/Container';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Button from 'components/Button/Button';
import SideMenu from '../components/SideMenu/SideMenu';
import { useGlobalContext } from 'globalStateContext';
import { isRunningAtom } from 'stores/timers';
import { useUIConfig } from 'hooks/useUIConfig';
import About from './About';
import Settings from './Settings';
import Saved from './Saved';
import Share from './Share';
import { Adsense } from '@ctrl/react-adsense';
import Feedback from './Feedback';
const Index = () => {
  const theme = useTheme();
  const isRunning = useRecoilValue(isRunningAtom);
  const { openDialog, toggleSetOpenDialog } = useUIConfig();
  const { darkMode } = useGlobalContext();

  return (
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
          overflow: 'hidden'
        }}
      >
        <Grid item xs={12} lg={8}>
          <Box
            id='BOXXXXXXXXX'
            sx={{
              padding: { xs: theme.spacing(4), lg: theme.spacing(8) },
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
          <div className='w-50' style={{ margin: '0 auto', zIndex: 900, height: '100px' }}>
            <Adsense client='ca-pub-5863549596591756' slot='8341210551' layout='in-article' format='fluid' />
          </div>
        </Grid>
      </Grid>

      <SideMenu />

      {openDialog === 'Configurator' && <SetsConfigurator onFinish={toggleSetOpenDialog('none')} />}
      {openDialog === 'About' && <About onClose={toggleSetOpenDialog('none')} />}
      {openDialog === 'Feedback' && <Feedback onClose={toggleSetOpenDialog('none')} />}
      {openDialog === 'Settings' && <Settings onClose={toggleSetOpenDialog('none')} />}
      {openDialog === 'Save' && <Saved onClose={toggleSetOpenDialog('none')} />}
      {openDialog === 'Share' && <Share onClose={toggleSetOpenDialog('none')} />}
      <Footer />
    </Container>
  );
};

export default Index;
