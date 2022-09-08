import { createContext, useContext } from "react"
export type GlobalContent = {
  darkMode: boolean
  setDarkMode:(c: boolean) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
    darkMode: false, // set a default value
    setDarkMode: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)