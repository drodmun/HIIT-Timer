import { createContext, useContext } from 'react';

export type GlobalContent = {
  darkMode: boolean;
  setDarkMode: (c: boolean) => void;
  loggedIn: boolean;
  setLoggedIn: (c: boolean) => void;
  isPopup: boolean;
  setIsPopup: (c: boolean) => void;
  presetObj: any;
  setPresetObj: (c: any) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  darkMode: false,
  setDarkMode: (darkMode) => !darkMode,
  loggedIn: false,
  setLoggedIn: (loggedIn) => !loggedIn,
  isPopup: false,
  setIsPopup: (isPopup) => !isPopup,
  presetObj: {},
  setPresetObj: () => null
});

export const useGlobalContext = () => useContext(MyGlobalContext);
