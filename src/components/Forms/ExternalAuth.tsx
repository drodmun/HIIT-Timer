import { Google, Facebook } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import Button from '../Button/Button';
import { useFirebaseAuth } from 'config/contexts';

const ExternalAuth = ({ toggleRedirect }: { toggleRedirect: () => void }) => {
  const { facebookLogin, googleLogin } = useFirebaseAuth();

  const handleOnGoogleLogin = () => googleLogin(toggleRedirect);
  const handleOnFacebookLogin = () => facebookLogin(toggleRedirect);

  return (
    <div className='pt-1 text-center'>
      <div style={{ margin: 8 }}>OR</div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          variant='outlined'
          onClick={handleOnGoogleLogin}
          startIcon={<Google sx={{ color: red[500] }} />}
          style={{ color: red[500], borderColor: red[500] }}
        >
          GOOGLE
        </Button>
        <Button
          onClick={handleOnFacebookLogin}
          variant='outlined'
          startIcon={<Facebook sx={{ color: '#4267B2' }} />}
          style={{ color: '#4267B2', borderColor: '#4267B2' }}
        >
          FACEBOOK
        </Button>
      </div>
    </div>
  );
};

export default ExternalAuth;
