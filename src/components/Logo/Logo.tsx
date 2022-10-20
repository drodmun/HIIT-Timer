import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useDarkMode } from 'hooks';
const Logo = ({ style }: { style?: React.CSSProperties }): JSX.Element => {
  const { isLightMode } = useDarkMode();
  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <div style={{ fontSize: '30px', ...style }}>
        <b style={{ color: '#11c1f4' }}>HIIT</b>
        <b style={{ color: isLightMode ? '#000000' : 'white' }}> timer</b>
      </div>
    </Link>
  );
};

export default memo(Logo);
