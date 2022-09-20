import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db, facebookProvider } from '../../firebase/firebaseConf';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { red } from '@mui/material/colors';
import { setDoc, doc, getDoc } from 'firebase/firestore';

function ExternalAuth(props: any) {
  function externalProvider(provider: any, providerName: string) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        let mail: any = '';
        if (user.email) {
          mail = user.email;
          //check if user exists in db
          const docRef = doc(db, 'users', mail);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                //setRedirect(!redirect);
                props.setRedirect(!props.redirect);
              } else {
                // doc.data() will be undefined in this case
                setDoc(docRef, {
                  name: user.displayName,
                  authProvider: providerName,
                  email: user.email,
                  userID: user.uid,
                  presets: []
                });
              }
            })
            .catch((error) => {
              console.log('Error getting document:', error);
            });
          //setRedirect(!redirect);
          props.setRedirect(!props.redirect);
        } else {
          console.log('error doc no sent');
          props.errorMessage(
            `There was an issue while saving your information. Please try again or sign up if you don't have an account.`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        props.errorMessage('There was an issue while logging in. Please try again by refreshing.');
      });
  }
  function facebookLogin() {
    externalProvider(facebookProvider, 'facebook');
  }
  function googleLogin() {
    externalProvider(googleProvider, 'google');
  }
  return (
    <div className='pt-5 text-center'>
      <h5>
        OR <br />
        <br /> continue with
      </h5>
      <div className='d-flex justify-content-center' style={{ gap: '30px' }}>
        <GoogleIcon sx={{ color: red[500], fontSize: 50, cursor: 'pointer' }} onClick={googleLogin} />
        <FacebookIcon color='primary' sx={{ fontSize: 50, cursor: 'pointer' }} onClick={facebookLogin} />
      </div>
    </div>
  );
}

export default ExternalAuth;
