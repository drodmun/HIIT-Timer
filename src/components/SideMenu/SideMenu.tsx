import { memo, useMemo } from 'react';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useUIConfig } from 'hooks/useUIConfig';

const SideMenu = () => {
  const { openDialog, toggleSetOpenDialog } = useUIConfig();

  const actions: { icon: JSX.Element; name: Omit<typeof openDialog, 'none'>; action?: () => void }[] = useMemo(
    () =>
      [
        { icon: <BookmarkBorderIcon />, name: 'Save', action: toggleSetOpenDialog('Save') },
        { icon: <ShareIcon />, name: 'Share', action: toggleSetOpenDialog('Share') },
        { icon: <CommentIcon />, name: 'Feedback', action: toggleSetOpenDialog('Feedback') },
        { icon: <SettingsIcon />, name: 'Settings', action: toggleSetOpenDialog('Settings') },
        { icon: <InfoIcon />, name: 'About', action: toggleSetOpenDialog('About') }
      ].reverse(),
    [toggleSetOpenDialog]
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
                // color: !('action' in action) ? 'grey.A200' : 'primary.main'
                color: 'primary.main'
              }}
            >
              {/* {!('action' in action) ? 'Soon...' : action.name} */}
              {action.name}
            </Box>
          }
          tooltipOpen
          onClick={action.action}
          FabProps={{
            // disabled: !('action' in action),
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
