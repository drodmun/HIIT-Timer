import { memo, ReactNode } from 'react';

import GenericBackgroundMobile from 'assets/images/background/generic-background-mobile.webp';
import GenericSecondaryBackgroundMobile from 'assets/images/background/login-background.webp';

const Container = ({ isSecondary, children }: { isSecondary?: boolean; children: ReactNode }) => (
  <div
    style={{
      height: `100${isSecondary ? 'vh' : 'vh'}`,
      background: `url('${isSecondary ? GenericSecondaryBackgroundMobile : GenericBackgroundMobile}')`,
      backgroundSize: isSecondary ? '100% 100%' : 'cover',
      backgroundColor: `${isSecondary ? '#ffffff' : '#0d174d'}`, /*060c29*/  // '#0d174d'
      
    }}
  >
    {children}
  </div>
);

export default memo(Container);
