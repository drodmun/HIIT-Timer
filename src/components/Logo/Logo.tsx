import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useGlobalContext } from 'darkModeContext';
const Logo = (): JSX.Element => {
  const { darkMode} = useGlobalContext()
  return (
  <Typography variant='h4' component='h1' sx={{ fontFamily: 'Arial', display: 'flex' }}>
    <Box sx={{ color: '#11c1f4' }}>HIIT</Box> &nbsp;<Box sx={{ color:darkMode?'#000000':'#fff' }}>timer</Box>
  </Typography>
);
}

export default memo(Logo);
