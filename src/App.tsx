import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import useGaTracker from 'hooks/useGaTracker';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import theme from 'mui-theme/theme';
import Index from 'pages/index';
import NotFoundPage from 'pages/404';
import { Navigate } from 'react-router-dom';
import { MyGlobalContext } from 'globalStateContext';
import { Adsense } from '@ctrl/react-adsense';
import { useState } from 'react';
const App = () => {
  useGaTracker();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isPopup, setIsPopup] = useState<boolean>(true);
  const [presetObj, setPresetObj] = useState<object>({
    presetName: '',
    rounds: 0,
    rMinutes: 0,
    rSeconds: 0,
    sets: 0,
    cdMinutes: 0,
    cdSeconds: 0,
    pMinutes: 0,
    pSeconds: 0
  });
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <MyGlobalContext.Provider
          value={{ darkMode, setDarkMode, loggedIn, setLoggedIn, isPopup, setIsPopup, presetObj, setPresetObj }}
        >
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='Login' element={<LoginPage />} />
            <Route path='Logout' element={<Navigate replace to='/' />} />
            <Route path='Signup' element={<SignUpPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Adsense
            client="ca-pub-2028740631579572"
            slot="7259870550"
            style={{ display: 'block' }}
            layout="in-article"
            format="fluid"
          />
        </MyGlobalContext.Provider>
      </RecoilRoot>
    </ThemeProvider>
  );
};
export default App;
