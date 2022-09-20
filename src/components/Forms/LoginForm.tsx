import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
<<<<<<< HEAD:src/components/Forms/loginForm.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
=======
import { useCallback, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db, facebookProvider } from '../../config/firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
import { Google, Facebook } from '@mui/icons-material';
import { red } from '@mui/material/colors';
>>>>>>> e43095b8c2e29b95de59f900350ab8b8ea4b1693:src/components/Forms/LoginForm.tsx
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ExternalAuth from './ExternalAuth';
import { Link } from 'react-router-dom';

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
<<<<<<< HEAD:src/components/Forms/loginForm.tsx
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  }
  function handleErrorMessage(message: string) {
    setErrorMessage(message);
    setOpen(true);
  }
=======

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: type === 'checkbox' ? checked : value
        };
      });
    },
    [setFormData]
  );

>>>>>>> e43095b8c2e29b95de59f900350ab8b8ea4b1693:src/components/Forms/LoginForm.tsx
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
<<<<<<< HEAD:src/components/Forms/loginForm.tsx
=======

  const externalProvider = (provider: any, providerName: string) => {
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
  };

  const facebookLogin = () => externalProvider(facebookProvider, 'facebook');
  const googleLogin = () => externalProvider(googleProvider, 'google');

>>>>>>> e43095b8c2e29b95de59f900350ab8b8ea4b1693:src/components/Forms/LoginForm.tsx
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
          {formElements.map((element, index) => (
            <Form.Group key={`Loginform${index}`} className='mb-3' controlId={`Loginform${element}`}>
              <Form.Label>{element}</Form.Label>
              <Form.Control
                className='rounded-3'
                type={element === 'Password' ? 'password' : 'text'}
                placeholder={element}
                name={element.toLowerCase()}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
          <Form.Group className='mb-3' controlId='formRemember'>
            <Form.Check type='checkbox' label='Remember me' />
          </Form.Group>
          <Button onClick={login} sx={{ textTransform: 'none' }} size='large'>
            Login
          </Button>
<<<<<<< HEAD:src/components/Forms/loginForm.tsx
          <br />
          <Link to='/' style={{ textDecoration: 'none', margin: '0 auto' }}>
            <Button variant='contained'> Continue as a guest </Button>
          </Link>
          {redirect ? (
=======

          {redirect && (
>>>>>>> e43095b8c2e29b95de59f900350ab8b8ea4b1693:src/components/Forms/LoginForm.tsx
            <div className='py-3' style={{ margin: '0 auto' }}>
              <CircularProgress />
            </div>
          )}
<<<<<<< HEAD:src/components/Forms/loginForm.tsx
          <ExternalAuth
            setRedirect={() => {
              setRedirect(!redirect);
            }}
            redirect={redirect}
            errorMessage={handleErrorMessage}
          />
=======

          <div className='pt-5 text-center'>
            <h5> OR login with </h5>
            <div className='d-flex justify-content-center' style={{ gap: '30px' }}>
              <Google sx={{ color: red[500], fontSize: 50, cursor: 'pointer' }} onClick={googleLogin} />
              <Facebook color='primary' sx={{ fontSize: 50, cursor: 'pointer' }} onClick={facebookLogin} />
            </div>
          </div>
>>>>>>> e43095b8c2e29b95de59f900350ab8b8ea4b1693:src/components/Forms/LoginForm.tsx
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
