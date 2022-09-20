import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
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
          <br />
          <Link to='/' style={{ textDecoration: 'none', margin: '0 auto' }}>
            <Button variant='contained'> Continue as a guest </Button>
          </Link>
          {redirect ? (
            <div className='py-3' style={{ margin: '0 auto' }}>
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}
          <ExternalAuth
            setRedirect={() => {
              setRedirect(!redirect);
            }}
            redirect={redirect}
            errorMessage={handleErrorMessage}
          />
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
