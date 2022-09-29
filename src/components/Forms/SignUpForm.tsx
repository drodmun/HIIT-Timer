import { ChangeEvent, useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link, Snackbar } from '@mui/material';
import Button from 'components/Button/Button';
import { auth, db } from '../../config/firebase/firebaseConf';
import { useGlobalContext } from 'globalStateContext';
import ExternalAuth from './ExternalAuth';
import Alert from '../Alert/Alert';

const SignUpForm = () => {
  const { darkMode } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formElements = ['Name', 'Email', 'Password', 'Confirm_Password'];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
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

  const register = () =>
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) =>
        setDoc(doc(db, 'users', formData.email), {
          name: formData.name,
          authProvider: 'local',
          email: formData.email,
          password: formData.password,
          userID: res.user.uid,
          presets: []
        })
          .then(() => setRedirect((pRedirect) => !pRedirect))
          .catch(handleError)
      )
      .catch(handleError);

  const handleError = (e: Error) => {
    console.error(e);
    setErrorMessage('An error occured. Please try again.');
    setOpen(true);
  };

  const handleRegister = () =>
    getDoc(doc(db, 'users', formData.email))
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
      .catch((error) => console.log('Error getting document:', error));

  return (
    <>
      {redirect && <Navigate replace to='/' />}

      <div style={{ color: darkMode ? 'black' : 'white' }}>
        <h2 style={{ margin: '16px 0' }}>Welcome!</h2>
        <>
          <Form className=' d-flex flex-column'>
            {formElements.map((element, index) => (
              <Form.Group key={`SignUp-Form${index}`} className='mb-2' controlId={`SignUp-Form${element}`}>
                <Form.Control
                  className='rounded-3'
                  type={element == 'Password' || element == 'Confirm_Password' ? 'password' : 'text'}
                  required
                  placeholder={`${element.replace('_', ' ')}`}
                  name={element.toLowerCase()}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <Button className='mt-2' onClick={handleRegister} sx={{ textDecoration: 'none' }} size='large'>
              Sign Up
            </Button>

            <div style={{ textAlign: 'center', margin: 8 }}>OR</div>

            <Link href='/' style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  borderLeftColor: '#FF5FF4',
                  borderBottomColor: '#FF5FF4',
                  color: darkMode ? '11c1f4' : '#ffffff',
                  '&:hover': {
                    color: darkMode ? 'black' : '#ffffff'
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
export default SignUpForm;
