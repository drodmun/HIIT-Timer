import Button from 'components/Button/Button';
import Switch from '@mui/material/Switch';

import { useGlobalContext } from 'darkModeContext';
export default function ToggleButton(){
   
    const { darkMode, setDarkMode } = useGlobalContext()
    function handleClick(){
        setDarkMode(!darkMode)
    }

    return (
        <Button  onClick={handleClick} sx={{ textTransform: 'none' }} size='x-large'>
            Dark Mode <Switch color="error" checked={!darkMode}/>
          </Button>
    )
}