import { memo } from 'react';
import { Box, Typography } from '@mui/material';

const Logo = (): JSX.Element => (
  <Typography variant='h4' component='h1' sx={{ fontFamily: 'Arial', display: 'flex' }}>
    <Box sx={{ color: '#11c1f4' }}>HIIT</Box> &nbsp;<Box sx={{ color:'#000000' }}>timer</Box>
  </Typography>
);

export default memo(Logo);
