import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from '@mui/material';
import useGaTracker from 'hooks/useGaTracker';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import theme from 'mui-theme/theme';
import Index from 'pages/index';
import NotFoundPage from 'pages/404';
import { MyGlobalContext } from 'globalStateContext';

const App = () => {
  useGaTracker();

  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('dark-mode') === 'true');

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <MyGlobalContext.Provider value={{ darkMode, setDarkMode }}>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='Login' element={<LoginPage />} />
            <Route path='Logout' element={<Navigate replace to='/' />} />
            <Route path='Signup' element={<SignUpPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </MyGlobalContext.Provider>
      </RecoilRoot>
    </ThemeProvider>
  );
};
export default App;
