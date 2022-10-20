import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from 'hooks/useLocalStorage';

type ContextState = { isLightMode:boolean, toggleDarkMode: () => void };

const DarkModeContext = createContext<ContextState>({} as ContextState);

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  // Similar to useState but first arg is key to the value in local storage.
  const [isLightMode, setLightMode] = useLocalStorage<boolean>("isLightMode", false);
  const toggleDarkMode = () => setLightMode(prevLightMode=> !prevLightMode);

  return <DarkModeContext.Provider value={{ isLightMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode doesn\'t work');
  }
  return context;
};

export { DarkModeProvider, useDarkMode };
