import { useCallback, useState, forwardRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Snackbar, CircularProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { auth } from '../../config/firebase/firebaseConf';
import { useGlobalContext } from 'globalStateContext';
import Button from 'components/Button/Button';
import ExternalAuth from './ExternalAuth';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { darkMode } = useGlobalContext();
  const formElements = ['Email', 'Password'];
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }));
    },
    [setFormData]
  );

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    setOpen(true);
  };

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
            <Form.Group key={`Login-Form${index}`} className='mb-3' controlId={`Login-Form${element}`}>
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

          <br />
          <Link to='/' style={{ textDecoration: 'none', margin: '0 auto' }}>
            <Button variant='contained'> Continue as a guest </Button>
          </Link>

          {redirect && (
            <div className='py-3' style={{ margin: '0 auto' }}>
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}

          <ExternalAuth setRedirect={setRedirect} redirect={redirect} errorMessage={handleErrorMessage} />
        </Form>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
