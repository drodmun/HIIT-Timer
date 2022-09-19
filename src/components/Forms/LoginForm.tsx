import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db, facebookProvider } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { red } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function LoginForm() {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { darkMode } = useGlobalContext();
  const formElements = ['Email', 'Password'];
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setRedirect(!redirect);
    } catch (error) {
      setErrorMessage(
        `No user found with that email and password. Please try again or sign up if you don't have an account.`
      );
      setOpen(true);
    }
  };

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
                setRedirect(!redirect);
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
          setRedirect(!redirect);
        } else {
          console.log('error doc no sent');
          setErrorMessage(
            `There was an issue while saving your information. Please try again or sign up if you don't have an account.`
          );
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('There was an issue while logging in. Please try again by refreshing.');
        setOpen(true);
      });
  }
  function facebookLogin() {
    externalProvider(facebookProvider, 'facebook');
  }
  function googleLogin() {
    externalProvider(googleProvider, 'google');
  }

  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/' />}
      <div>
        <h2>Welcome !</h2>
        <h5 className='fw-light'>Login to continue</h5>
        <br></br>
      </div>

      <div>
        <Form className=' d-flex flex-column'>
          {formElements.map((element, index) => {
            return (
              <Form.Group key={index} className='mb-3' controlId={`Loginform${element}`}>
                <Form.Label>{element}</Form.Label>
                <Form.Control
                  className='rounded-3'
                  type={element === 'Password' ? 'password' : 'text'}
                  placeholder={element}
                  name={element.toLowerCase()}
                  onChange={handleChange}
                />
              </Form.Group>
            );
          })}
          <Form.Group className='mb-3' controlId='formRemember'>
            <Form.Check type='checkbox' label='Remember me' />
          </Form.Group>
          <Button onClick={login} sx={{ textTransform: 'none' }} size='large'>
            Login
          </Button>
          {redirect ? (
            <div className='py-3' style={{ margin: '0 auto' }}>
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}
          <div className='pt-5 text-center'>
            <h5> OR login with </h5>
            <div className='d-flex justify-content-center' style={{ gap: '30px' }}>
              <GoogleIcon sx={{ color: red[500], fontSize: 50, cursor: 'pointer' }} onClick={googleLogin} />
              <FacebookIcon color='primary' sx={{ fontSize: 50, cursor: 'pointer' }} onClick={facebookLogin} />
            </div>
          </div>
        </Form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity='error'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default LoginForm;
