import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { red } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function LoginForm() {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { loggedIn, setLoggedIn } = useGlobalContext();
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
      setLoggedIn(true);
      console.log(loggedIn);
      setRedirect(!redirect);
    } catch (error) {
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
          <Button onClick={login} sx={{ textTransform: 'none' }} size='large'>
            Login
          </Button>

          <div className='pt-5 text-center'>
            <h5> OR login with </h5>
            <div className='d-flex justify-content-center' style={{ gap: '30px' }}>
              <GoogleIcon sx={{ color: red[500], fontSize: 50, cursor: 'pointer' }} />
              <FacebookIcon color='primary' sx={{ fontSize: 50, cursor: 'pointer' }} />
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
          No user found against this email and password!
        </Alert>
      </Snackbar>
    </div>
  );
}
export default LoginForm;
