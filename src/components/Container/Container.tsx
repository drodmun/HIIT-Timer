import { memo, ReactNode } from 'react';

import GenericBackgroundMobile from 'assets/images/background/generic-background-mobile.webp';
import GenericSecondaryBackgroundMobile from 'assets/images/background/login-background.webp';

const Container = ({
  isSecondary,
  isPopup,
  style,
  children
}: {
  isSecondary?: boolean;
  isPopup?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}) => (
  <div
    style={{
      height: `${isPopup ? 'max-content' : '100vh'}`,
      background: `url('${isSecondary ? GenericSecondaryBackgroundMobile : GenericBackgroundMobile}')`,
      backgroundSize: isSecondary ? '100% 100%' : 'cover',
      backgroundColor: `${isSecondary ? '#ffffff' : '#0d174d'}`,
      ...style
    }}
  >
    {children}
  </div>
);

export default memo(Container);
