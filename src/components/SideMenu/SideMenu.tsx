import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { BookmarkBorder, Share } from '@mui/icons-material';

import { useHIITSets, useUIConfig, useWindowSize } from 'hooks';

const SideMenu = () => {
  const size = useWindowSize();
  const { openDialog, toggleSetOpenDialog, isHasChanges } = useUIConfig();
  const { isSetAlreadySaved } = useHIITSets();

  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenuHeight(ref.current?.clientHeight);
  }, [setMenuHeight]);

  const isDisabled = !isHasChanges || isSetAlreadySaved;
  const actions: {
    icon: JSX.Element;
    name: Omit<typeof openDialog, 'none'>;
    action?: ReturnType<typeof toggleSetOpenDialog>;
    disabled?: boolean;
  }[] = useMemo(
    () =>
      [
        {
          icon: <BookmarkBorder />,
          name: 'Save',
          action: () => !isDisabled && toggleSetOpenDialog('Save'),
          disabled: isDisabled
        },
        { icon: <Share />, name: 'Share', action: toggleSetOpenDialog('Share') }
      ].reverse(),
    [isDisabled, toggleSetOpenDialog]
  );

  const verticalPosition = useMemo(() => {
    if (!!size.height && !!menuHeight) return { top: size.height - menuHeight - 16 };
    return { bottom: 16 };
  }, [menuHeight, size.height]);

  return (
    <>
      <SpeedDial
        ref={ref}
        ariaLabel='SpeedDial'
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          position: 'absolute',
          right: 16,
          ...verticalPosition
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
    </>
  );
};

export default memo(SideMenu);
