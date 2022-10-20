import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from 'config/firebase/firebaseConf';

type ContextState = { user: User | null; logout: () => void };

const FirebaseAuthContext = createContext<ContextState>({} as ContextState);

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // noinspection UnnecessaryLocalVariableJS
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);
  // .then(() => {
  //   // Sign-out successful.
  //   setUser(null);
  //   console.log('Sign-out successful.');
  // })
  // .catch((error) => {
  //   // An error happened.
  //   console.log(error, 'fail');
  // });

  return <FirebaseAuthContext.Provider value={{ user, logout }}>{children}</FirebaseAuthContext.Provider>;
};

const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export { FirebaseAuthProvider, useFirebaseAuth };
