import { memo } from 'react';
import { Link, Typography } from '@mui/material';
import { useDarkMode } from 'hooks';
const Footer = () => {
  const { isLightMode } = useDarkMode();
  return (
    <div
      style={{
        position: 'absolute',
        top: '25%',
        left: 0,
        float: 'left',
        transform: 'rotate(90deg)',
        transformOrigin: '0 100%'
      }}
    >
      <Typography sx={{ wordWrap: 'nowrap', color: isLightMode ? '#000000' : '#ffffff' }}>
        By
        <Link href='https://github.com/drodmun' underline='none'>
          &nbsp; Damian Rodriguez (drodmun)&nbsp;
        </Link>
        &copy;2021
      </Typography>
    </div>
  );
};

export default memo(Footer);
