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
import { countersConfigSetAtom, isRunningAtom } from 'stores/timers';
import { useUIConfig } from 'hooks/useUIConfig';
import About from './About';
import Settings from './Settings';
import Saved from './Saved';
import Share from './Share';
import { Adsense } from '@ctrl/react-adsense';
import Feedback from './Feedback';

import { useIndexStyles } from './index.styles';
const Index = () => {
  const { container, containerBox, adsense } = useIndexStyles(useTheme());

  const isRunning = useRecoilValue(isRunningAtom);
  const countersConfigSet = useRecoilValue(countersConfigSetAtom);
  const { openDialog, toggleSetOpenDialog } = useUIConfig();
  const { darkMode } = useGlobalContext();

  return (
    <Container isSecondary={darkMode}>
      <Header />
      <Grid container spacing={0} alignItems='center' justifyContent='center' className={container}>
        <Grid item xs={12} lg={8}>
          <Box className={containerBox}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <TimersManager />

              {!isRunning && (!countersConfigSet.length || !countersConfigSet[0].round) && (
                <Box width='100%' padding='0 16px'>
                  <Button size='large' fullWidth onClick={toggleSetOpenDialog('Configurator')}>
                    Need a set?
                  </Button>
                </Box>
              )}
            </div>
          </Box>
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

      <div className={adsense}>
        <Adsense client='ca-pub-5863549596591756' slot='8341210551' layout='in-article' format='fluid' />
      </div>
    </Container>
  );
};

export default Index;
