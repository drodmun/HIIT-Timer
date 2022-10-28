import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material';

import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import Index from 'pages/index';
import NotFoundPage from 'pages/404';

import theme from 'mui-theme/theme';
import { DarkModeProvider, FirebaseAuthProvider } from 'config/contexts';
import { useGaTracker } from 'hooks';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  useGaTracker();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider preventDuplicate maxSnack={3} autoHideDuration={3500}>
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
        </SnackbarProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
