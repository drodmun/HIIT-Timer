import { Dispatch, SetStateAction } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db, facebookProvider } from '../../config/firebase/firebaseConf';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { red } from '@mui/material/colors';
import Button from '../Button/Button';

const ExternalAuth = ({
  errorMessage,
  redirect,
  setRedirect
}: {
  errorMessage: (message: string) => void;
  redirect?: boolean;
  setRedirect: Dispatch<SetStateAction<boolean>>;
}) => {
  const externalProvider = (provider: FacebookAuthProvider | GoogleAuthProvider, providerName: string) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (!!user.email) {
          //check if user exists in db
          const docRef = doc(db, 'users', user.email);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                //setRedirect(!redirect);
                setRedirect(!redirect);
              } else {
                // doc.data() will be undefined in this case
                setDoc(docRef, {
                  ...user,
                  authProvider: providerName,
                  presets: []
                });
              }
            })
            .catch((error) => {
              console.log('Error getting document:', error);
            });
          //setRedirect(!redirect);
          setRedirect(!redirect);
        } else {
          console.log('error doc no sent');
          errorMessage(
            `There was an issue while saving your information. Please try again or sign up if you don't have an account.`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        errorMessage('There was an issue while logging in. Please try again by refreshing.');
      });
  };

  const facebookLogin = () => externalProvider(facebookProvider, 'facebook');
  const googleLogin = () => externalProvider(googleProvider, 'google');

  return (
    <div className='pt-1 text-center'>
      <div style={{ margin: 8 }}>OR</div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          variant='outlined'
          onClick={googleLogin}
          startIcon={<GoogleIcon sx={{ color: red[500] }} />}
          style={{ color: red[500], borderColor: red[500] }}
        >
          GOOGLE
        </Button>
        <Button
          onClick={facebookLogin}
          variant='outlined'
          startIcon={<FacebookIcon sx={{ color: '#4267B2' }} />}
          style={{ color: '#4267B2', borderColor: '#4267B2' }}
        >
          FACEBOOK
        </Button>
      </div>
    </div>
  );
};

export default ExternalAuth;
