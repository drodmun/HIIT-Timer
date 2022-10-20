import { memo, useMemo } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, Tooltip, useTheme } from '@mui/material';

type ButtonProps = Pick<MUIButtonProps, Exclude<keyof MUIButtonProps, 'size'>> & {
  size?: 'small' | 'medium' | 'large' | 'x-large';
  disabledMessage?: string;
};
const Button = ({ sx, size, variant, fullWidth, disabled, disabledMessage, ...rest }: ButtonProps) => {
  const theme = useTheme();

  const renderButton = useMemo(
    () => (
      <MUIButton
        disabled={disabled}
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
          '&.Mui-disabled': {
            color: theme.palette.grey.A200,
            borderColor: theme.palette.grey.A200,
            background: theme.palette.grey.A400,
            opacity: theme.palette.action.disabledOpacity,
            ...((variant ?? 'contained') === 'text' && {
              background: 'inherit',
              color: '#ffffff'
            })
          },
          ...sx
        }}
        {...rest}
      />
    ),
    [disabled, fullWidth, rest, size, sx, theme, variant]
  );

  return disabled ? (
    <Tooltip title={disabledMessage ?? ''}>
      <span>{renderButton}</span>
    </Tooltip>
  ) : (
    renderButton
  );
};

export default memo(Button);
