import { memo } from 'react';

import { Grid, Link, Typography } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PaidIcon from '@mui/icons-material/Paid';
import GitHubIcon from '@mui/icons-material/GitHub';

import Dialog from 'components/Dialog/Dialog';

const About = ({ onClose }: { onClose: () => void }) => (
  <Dialog
    onClose={onClose}
    title='About the App & Me'
    content={
      <Grid container spacing={0}>
        <Grid item xs={12} style={{ padding: 32, paddingTop: 0 }}>
          <Typography variant='h4' align='center' component='p' color='secondary'>
            HIIT timer
          </Typography>

          <br />
          <Typography variant='body1' component='p'>
            Timer-set to use during your HIIT trainings, or sprints or... whatever you need!
          </Typography>
          <Typography variant='body1' component='p'>
            Please don&apost;t hesitate to let me know suggestions, complaints... And if you enjoy it, feel free to
            <Link href='https://www.buymeacoffee.com/drodmun'> buy me a coffee </Link> to keep it up!
          </Typography>
          <br />
          <Typography variant='body1' component='p'>
            <Link
              href='https://www.buymeacoffee.com/drodmun'
              underline='none'
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <CoffeeIcon style={{ marginRight: 8 }} /> Buy Me a Coffee
            </Link>
          </Typography>
          <br />
          <Typography variant='body1' component='p'>
            <Link
              href='hhttps://paypal.me/drodmun'
              underline='none'
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <PaidIcon style={{ marginRight: 8 }} /> PayPal
            </Link>
          </Typography>
          <br />
          <Typography variant='body1' component='p'>
            Check more about this project:
          </Typography>
          <br />
          <Typography variant='body1' component='p'>
            <Link
              href='https://github.com/drodmun/HIIT-Timer'
              underline='none'
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <GitHubIcon style={{ marginRight: 8 }} /> HIIT Timer in GitHUB
            </Link>
          </Typography>
        </Grid>
      </Grid>
    }
  />
);

export default memo(About);
