import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useGlobalContext } from 'globalStateContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import ExternalAuth from './ExternalAuth';
import { Link } from 'react-router-dom';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function SignUpForm() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const formElements = ['Name', 'Email', 'Password', 'Confirm_Password'];
  const { darkMode } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  function handleErrorMessage(message: string) {
    setErrorMessage(message);
    setOpen(true);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  }
  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = res.user;
      await setDoc(doc(db, 'users', formData.email), {
        name: formData.name,
        authProvider: 'local',
        email: formData.email,
        password: formData.password,
        userID: user.uid,
        presets: []
      });
      setRedirect(true);
    } catch (error) {
      setErrorMessage('An error occured. Please try again.');
      setOpen(true);
    }
  };
  function handleRegister() {
    const docRef = doc(db, 'users', formData.email);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setErrorMessage('Email already exists.');
          setOpen(true);
        } else {
          if (formData.password === formData.confirm_password) {
            register();
          } else {
            setErrorMessage('Passwords do not match.');
            setOpen(true);
          }
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }
  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/login' />}

      <h2>Signup</h2>
      <div>
        <Form className='py-4 d-flex flex-column'>
          {formElements.map((element, index) => {
            return (
              <Form.Group key={index} className='mb-3' controlId={`Regform${element}`}>
                {/* <Form.Label>{element}</Form.Label> */}
                <Form.Control
                  className='rounded-3'
                  type={element == 'Password' || element == 'Confirm_Password' ? 'password' : 'text'}
                  required
                  placeholder={`${element.replace('_', ' ')}`}
                  name={element.toLowerCase()}
                  onChange={handleChange}
                />
              </Form.Group>
            );
          })}
          <Button onClick={handleRegister} sx={{ textTransform: 'none' }} size='large'>
            SignUp
          </Button>
          <br />
          <Link to='/' style={{ textDecoration: 'none', margin: '0 auto' }}>
            <Button variant='contained'> Continue as a guest </Button>
          </Link>
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

export default SignUpForm;
