import { ChangeEvent, useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Snackbar } from '@mui/material';
import { auth } from '../../config/firebase/firebaseConf';
import { useDarkMode } from 'hooks';
import Button from 'components/Button/Button';
import ExternalAuth from './ExternalAuth';
import Alert from '../Alert/Alert';

const LoginForm = () => {
  const { isLightMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formElements = ['Email', 'Password'];
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }));
    },
    [setFormData]
  );

  const handleErrorMessage = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setOpen(true);
    },
    [setErrorMessage, setOpen]
  );

  const login = () =>
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => setRedirect((pRedirect) => !pRedirect))
      .catch((e) => {
        console.error(e);
        setErrorMessage(
          `No user found with that email and password. Please try again or sign up if you don't have an account.`
        );
        setOpen(true);
      });

  return (
    <>
      {redirect && <Navigate replace to='/' />}

      <div style={{ color: isLightMode ? 'black' : 'white' }}>
        <h2 style={{ margin: '16px 0' }}>Welcome!</h2>

        <>
          <Form className=' d-flex flex-column'>
            {formElements.map((element, index) => (
              <Form.Group key={`Login-Form${index}`} className='mb-2' controlId={`Login-Form${element}`}>
                <Form.Control
                  className='rounded-3'
                  type={element === 'Password' ? 'password' : 'text'}
                  placeholder={element}
                  name={element.toLowerCase()}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <Button className='mt-2' onClick={login} sx={{ textDecoration: 'none' }} size='large'>
              Log In
            </Button>

            <div style={{ textAlign: 'center', margin: 8 }}>OR</div>

            <Link href='/' style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  borderLeftColor: '#FF5FF4',
                  borderBottomColor: '#FF5FF4',
                  color: isLightMode ? '11c1f4' : '#ffffff',
                  '&:hover': {
                    color: isLightMode ? 'black' : '#ffffff'
                  }
                }}
                fullWidth
                size='large'
                variant='outlined'
              >
                Continue as a guest
              </Button>
            </Link>

            <ExternalAuth setRedirect={setRedirect} redirect={redirect} errorMessage={handleErrorMessage} />
          </Form>
        </>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
