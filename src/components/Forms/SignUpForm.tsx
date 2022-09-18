import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { ChangeEvent, useCallback, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { useGlobalContext } from 'globalStateContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SignUpForm = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const formElements = ['Name', 'Contact', 'Email', 'Password', 'Confirm_Password'];
  const { darkMode } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
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

  const register = useCallback(async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = res.user;
      await setDoc(doc(db, 'users', formData.email), {
        name: formData.name,
        contact: formData.contact,
        authProvider: 'local',
        email: formData.email,
        password: formData.password,
        userID: user.uid,
        presets: []
      });
      setRedirect(true);
    } catch (error) {
      setOpen(true);
    }
  }, [formData.contact, formData.email, formData.name, formData.password]);

  const handleRegister = useCallback(() => {
    if (formData.password === formData.confirm_password) {
      register();
    } else {
      setOpen(true);
    }
  }, [formData.confirm_password, formData.password, register]);

  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/login' />}

      <h2>Signup</h2>
      <div>
        <Form className='py-4 d-flex flex-column'>
          {formElements.map((element, index) => (
            <Form.Group key={index} className='mb-3' controlId={`Regform${element}`}>
              {/* <Form.Label>{element}</Form.Label> */}
              <Form.Control
                className='rounded-3'
                type={element === 'password' || element === 'confirmPassword' ? 'password' : 'text'}
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
          An error occured! Please enter all fields correctly. Check email, password length and make sure password and
          confirm password match.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUpForm;
