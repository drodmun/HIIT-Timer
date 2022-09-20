import Button from 'components/Button/Button';
import Switch from '@mui/material/Switch';
import { useGlobalContext } from 'globalStateContext';
import { useEffect, useCallback } from 'react';
const ToggleButton = () => {
  const { darkMode, setDarkMode } = useGlobalContext();
  const handleClick = useCallback(() => setDarkMode(!darkMode), [darkMode, setDarkMode]);

  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode.toString());
  }, [darkMode]);

  return (
    <Button onClick={handleClick} sx={{ textTransform: 'none' }} size='x-large'>
      Dark Mode <Switch color='error' checked={!darkMode} />
    </Button>
  );
};

export default ToggleButton;
