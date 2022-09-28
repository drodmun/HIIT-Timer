import { ChangeEvent, useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Navigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import Snackbar from '@mui/material/Snackbar';
import Button from 'components/Button/Button';
import { auth, db } from '../../config/firebase/firebaseConf';
import { useGlobalContext } from 'globalStateContext';
import ExternalAuth from './ExternalAuth';
import Alert from '../Alert/Alert';

const SignUpForm = () => {
  const { darkMode } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const formElements = ['Name', 'Email', 'Password', 'Confirm_Password'];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleErrorMessage = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setOpen(true);
    },
    [setErrorMessage, setOpen]
  );

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

  const handleRegister = () => {
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
      .catch((error) => console.log('Error getting document:', error));
  };

  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/login' />}

      <h2>Signup</h2>
      <div>
        <Form className='py-4 d-flex flex-column'>
          {formElements.map((element, index) => (
            <Form.Group key={`Regform${index}`} className='mb-3' controlId={`Regform${element}`}>
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
          ))}

          <Button onClick={handleRegister} sx={{ textTransform: 'none' }} size='large'>
            SignUp
          </Button>
          <br />
          <Link to='/' style={{ textDecoration: 'none', margin: '0 auto' }}>
            <Button variant='contained'> Continue as a guest </Button>
          </Link>
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
export default SignUpForm;
