import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from '@mui/material';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import Index from 'pages/index';
import NotFoundPage from 'pages/404';

import theme from 'mui-theme/theme';
import { DarkModeProvider, FirebaseAuthProvider } from 'config/contexts';
import { useGaTracker } from 'hooks';

const App = () => {
  useGaTracker();

  return (
    <ThemeProvider theme={theme}>
      <FirebaseAuthProvider>
        <DarkModeProvider>
          <RecoilRoot>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='Login' element={<LoginPage />} />
              <Route path='Logout' element={<Navigate replace to='/' />} />
              <Route path='Signup' element={<SignUpPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </RecoilRoot>
        </DarkModeProvider>
      </FirebaseAuthProvider>
    </ThemeProvider>
  );
};
export default App;
