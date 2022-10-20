import { memo, useMemo } from 'react';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { BookmarkBorder, Share } from '@mui/icons-material';
import { useUIConfig } from 'hooks/useUIConfig';

const SideMenu = () => {
  const { openDialog, toggleSetOpenDialog, isHasChanges } = useUIConfig();

  const actions: {
    icon: JSX.Element;
    name: Omit<typeof openDialog, 'none'>;
    action?: ReturnType<typeof toggleSetOpenDialog>;
    disabled?: boolean;
  }[] = useMemo(
    () =>
      [
        { icon: <BookmarkBorder />, name: 'Save', action: toggleSetOpenDialog('Save'), disabled: !isHasChanges },
        { icon: <Share />, name: 'Share', action: toggleSetOpenDialog('Share') }
      ].reverse(),
    [isHasChanges, toggleSetOpenDialog]
  );

  return (
    <SpeedDial
      ariaLabel='SpeedDial'
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16
      }}
      icon={<SpeedDialIcon />}
      direction='up'
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name as string}
          icon={action.icon}
          tooltipTitle={
            <Box
              sx={{
                color: !('action' in action) || action.disabled ? 'grey.A200' : 'primary.main'
              }}
            >
              {action.name}
            </Box>
          }
          tooltipOpen
          onClick={action.action}
          FabProps={{
            disabled: !('action' in action) || action.disabled,
            sx: {
              color: 'primary.main',
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'primary.main'
              },
              '&.Mui-disabled': {
                color: 'grey.A200',
                borderColor: 'grey.A200',
                backgroundColor: 'grey.50',
                opacity: 0.4
              }
            }
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default memo(SideMenu);
