import './App.css';

import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import useGaTracker from 'hooks/useGaTracker';
import theme from 'mui-theme/theme';
import Index from 'pages/index';
import NotFoundPage from 'pages/404';
import AdWords from './components/AdWords/AdWords';

const App = () => {
  useGaTracker();

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Index />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        <AdWords />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
