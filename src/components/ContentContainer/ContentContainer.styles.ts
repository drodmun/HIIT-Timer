import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useContentContainerStyles = makeStyles((theme: Theme) => ({
  sectionContainer: {
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(0.7),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  sectionPrimary: {
    border: `1px solid ${theme.palette.primary.dark}`
  },
  sectionSecondary: {
    border: `1px solid ${theme.palette.secondary.dark}`
  },
  sectionTitle: {
    position: 'relative',
    top: '-1rem',
    display: 'inline-flex',
    padding: `0 ${theme.spacing(0.5)}`,
    alignItems: 'center'
  },
  noTitle: {
    marginTop: '3%'
  },
  sectionContent: {
    padding: '0 3% 3% 3%',
    overflow: 'auto'
  }
}));
