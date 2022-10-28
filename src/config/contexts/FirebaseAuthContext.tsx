import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useSnackbar } from 'notistack';

import { auth, facebookProvider, googleProvider } from 'config/firebase/firebaseConf';
import { User } from 'types/User';

type ContextState = {
  user: User | null;
  signup: (email: string, password: string, action: () => void) => void;
  login: (email: string, password: string, action: () => void) => void;
  facebookLogin: (action?: () => void) => void;
  googleLogin: (action?: () => void) => void;
  logout: () => void;
};

const FirebaseAuthContext = createContext<ContextState>({} as ContextState);

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    // noinspection UnnecessaryLocalVariableJS
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u as User));
    return unsubscribe;
  }, []);

  const signup = (email: string, password: string, action?: () => void) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then(/*createUser*/ action)
      .catch((e) => {
        const snackbarKey = enqueueSnackbar(e.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          onClick: () => closeSnackbar(snackbarKey)
        });
      });

  const login = (email: string, password: string, action?: () => void) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(action)
      .catch((e) => {
        const snackbarKey = enqueueSnackbar(e.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          onClick: () => closeSnackbar(snackbarKey)
        });
      });

  const externalProvider = (provider: FacebookAuthProvider | GoogleAuthProvider, action?: () => void) => {
    signInWithPopup(auth, provider)
      .then(action)
      .catch((e) => {
        const snackbarKey = enqueueSnackbar(e.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          onClick: () => closeSnackbar(snackbarKey)
        });
      });
  };

  const facebookLogin = (action?: () => void) => externalProvider(facebookProvider, action);
  const googleLogin = (action?: () => void) => externalProvider(googleProvider, action);

  const logout = () => signOut(auth);

  return (
    <FirebaseAuthContext.Provider value={{ user, signup, login, facebookLogin, googleLogin, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export { FirebaseAuthProvider, useFirebaseAuth };
