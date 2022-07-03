import { memo } from 'react';
import { Divider as MUIDivider } from '@mui/material';

const Divider = (): JSX.Element => (
  <MUIDivider
    sx={{
      background: 'linear-gradient(90deg, #FF5FF4 20%, #11C1F4 70%)'
    }}
    style={{
      border: 'none',
      height: 2,
      margin: 0
    }}
  />
);

export default memo(Divider);
