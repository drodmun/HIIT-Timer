import { memo } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, useTheme } from '@mui/material';

type ButtonProps = Pick<MUIButtonProps, Exclude<keyof MUIButtonProps, 'size'>> & {
  size?: 'small' | 'medium' | 'large' | 'x-large';
};
const Button = ({ sx, size, variant, fullWidth, ...rest }: ButtonProps) => {
  const theme = useTheme();
  return (
    <MUIButton
      size={size !== 'x-large' ? size : 'large'}
      variant={variant ?? 'contained'}
      fullWidth={fullWidth ?? false}
      sx={{
        borderRadius: 8,
        ...((variant ?? 'contained') === 'contained' && {
          background: 'linear-gradient(90deg, #FF5FF4 20%, #11C1F4 70%)',
          color: '#ffffff'
        }),
        ...(size === 'x-large' && {
          margin: theme.spacing(0.5),
          padding: '12px 64px',
          fontSize: theme.typography.pxToRem(19)
        }),
        '&:hover': {
          color: '#0d174d'
        },
        ...sx
      }}
      {...rest}
    />
  );
};

export default memo(Button);
