import { createContext, useContext } from 'react';

export type GlobalContent = {
  darkMode: boolean;
  setDarkMode: (c: boolean) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  darkMode: false,
  setDarkMode: (darkMode) => !darkMode
});

export const useGlobalContext = () => useContext(MyGlobalContext);
