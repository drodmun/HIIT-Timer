import clsx from 'clsx';

import { Typography, useTheme } from '@mui/material';

import { ContentContainerPropsType } from './ContentContainer.types';
import { useContentContainerStyles } from './ContentContainer.styles';
import { useDarkMode } from 'config/contexts';

export const ContentContainer = (props: ContentContainerPropsType): JSX.Element => {
  const theme = useTheme();
  const { isLightMode } = useDarkMode();
  const classes = useContentContainerStyles(theme);
  const {
    borderColor,
    customBorderColor,
    customBorderWidth,
    title,
    content,
    minHeightContent,
    maxHeightContent,
    containerClass,
    titleClass,
    contentClass
  } = props;

  return (
    <div
      data-testid='sectionContainer'
      className={clsx(classes.sectionContainer, {
        [classes.sectionPrimary]: borderColor === 'primary',
        [classes.sectionSecondary]: borderColor === 'secondary',
        [`${containerClass}`]: containerClass
      })}
      style={{
        border: (!!customBorderColor && `1px solid ${customBorderColor}`) || '',
        borderWidth: customBorderWidth ?? 1
      }}
    >
      {title && (
        <Typography
          data-testid='sectionTitle'
          variant='h6'
          className={clsx(classes.sectionTitle, {
            [`${titleClass}`]: titleClass
          })}
          noWrap
          sx={{
            mb: 0,
            ml: '5%',
            bgcolor: isLightMode ? 'white' : '#0d174d',
            color: isLightMode ? '#0d174d' : 'white'
          }}
        >
          {title}
        </Typography>
      )}

      <div
        data-testid='sectionContent'
        className={clsx(classes.sectionContent, {
          [`${contentClass}`]: contentClass,
          [classes.noTitle]: !title
        })}
        style={{ minHeight: minHeightContent ?? undefined, maxHeight: maxHeightContent ?? undefined }}
      >
        {content}
      </div>
    </div>
  );
};
