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
  setDarkMode: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  isPopup: false,
  setIsPopup: () => {},
  presetObj: {},
  setPresetObj: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
