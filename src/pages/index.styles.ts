import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useIndexStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  containerBox: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent'
  },
  adsense: {
    margin: '0 auto',
    zIndex: 900,
    height: '100px',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    overflow: 'hidden'
  }
}));
