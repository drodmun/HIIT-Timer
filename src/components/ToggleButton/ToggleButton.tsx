import Button from 'components/Button/Button';
import Switch from '@mui/material/Switch';
import { useGlobalContext } from 'globalStateContext';
import { useEffect } from 'react';
export default function ToggleButton() {
  const { darkMode, setDarkMode } = useGlobalContext();
  function handleClick() {
    setDarkMode(!darkMode);
  }
  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode.toString());
  }, [darkMode]);
  return (
    <Button onClick={handleClick} sx={{ textTransform: 'none' }} size='x-large'>
      Dark Mode <Switch color='error' checked={!darkMode} />
    </Button>
  );
}
