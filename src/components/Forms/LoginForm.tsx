import { ChangeEvent, useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Link } from '@mui/material';
import { useDarkMode, useFirebaseAuth } from 'hooks';
import Button from 'components/Button/Button';
import ExternalAuth from './ExternalAuth';

const LoginForm = () => {
  const { isLightMode } = useDarkMode();
  const { login } = useFirebaseAuth();
  const [redirect, setRedirect] = useState<boolean>(false);
  const toggleRedirect = () => setRedirect((prevState) => !prevState);
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

  const handleOnLogin = () => login(formData.email, formData.password, toggleRedirect);

  return (
    <>
      {redirect && <Navigate to='/' />}

      <div style={{ color: isLightMode ? 'black' : 'white' }}>
        <h2 style={{ margin: '16px 0' }}>Welcome!</h2>

        <>
          <Form className=' d-flex flex-column'>
            {formElements.map((e, index) => (
              <Form.Group key={`Login-Form${index}`} className='mb-2' controlId={`Login-Form${e}`}>
                <Form.Control
                  className='rounded-3'
                  type={e === 'Password' ? 'password' : 'text'}
                  placeholder={e}
                  name={e.toLowerCase()}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <Button className='mt-2' onClick={handleOnLogin} sx={{ textDecoration: 'none' }} size='large'>
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

            <ExternalAuth toggleRedirect={toggleRedirect} />
          </Form>
        </>
      </div>
    </>
  );
};

export default LoginForm;
