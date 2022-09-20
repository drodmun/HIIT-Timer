import { memo } from 'react';
import { Link, Typography } from '@mui/material';
import { useGlobalContext } from 'globalStateContext';
import { useState, useEffect } from 'react';
const Footer = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [landscape, setLandscape] = useState(false);
  const { darkMode } = useGlobalContext();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (windowDimensions.height < 608) {
      setLandscape(true);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {landscape ? 'By' : 'Created and maintend by'}
        <Link href='https://github.com/drodmun' underline='none'>
          &nbsp; Damian Rodriguez (drodmun)&nbsp;
        </Link>
        &copy;2021
      </Typography>
    </div>
  );
};

export default memo(Footer);
