import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from 'globalStateContext';
const Logo = (): JSX.Element => {
  const { darkMode } = useGlobalContext();
  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <div style={{ fontSize: '30px' }}>
        <b style={{ color: '#11c1f4' }}>HIIT</b>
        <b style={{ color: darkMode ? '#000000' : 'white' }}> timer</b>
      </div>
    </Link>
  );
};

export default memo(Logo);
