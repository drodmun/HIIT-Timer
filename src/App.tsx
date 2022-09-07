import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import useGaTracker from 'hooks/useGaTracker';
import LoginPage from 'components/LoginPage/LoginPage';
import SignUpPage from 'components/SignupPage/SignUpPage';
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
          <Route path='Login' element={<LoginPage />} />
          <Route path='Signup' element={<SignUpPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <AdWords />
      </RecoilRoot>
     
    </ThemeProvider>
  );
};

export default App;
