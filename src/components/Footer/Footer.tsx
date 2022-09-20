import { memo } from 'react';
import { Link, Typography } from '@mui/material';
import { useGlobalContext } from 'globalStateContext';
const Footer = () => {
  const { darkMode } = useGlobalContext();
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
      <Typography sx={{ wordWrap: 'nowrap', color: darkMode ? '#000000' : '#ffffff' }}>
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
