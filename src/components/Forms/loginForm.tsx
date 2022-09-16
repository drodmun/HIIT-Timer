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
function LoginForm() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const { loggedIn, setLoggedIn } = useGlobalContext();
  const { darkMode } = useGlobalContext();
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
      alert('User not found');
    }
  };

  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/' />}
      <div>
        <h5>Welcome !</h5>
        <p className='fw-light'>Login to continue</p>
      </div>

      <div>
        <Form>
          <Form.Group className='mb-3 py-2' controlId='loginEmail'>
            <Form.Control
              className='rounded-5'
              type='email'
              placeholder='Enter email'
              onChange={handleChange}
              name='email'
              value={formData.email}
            />
          </Form.Group>

          <Form.Group className='mb-3 py-2' controlId='loginPassword'>
            <Form.Control
              className='rounded-5'
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={formData.password}
            />
          </Form.Group>

          <Button onClick={login} sx={{ textTransform: 'none' }} size='x-large'>
            Login
          </Button>

          {/* login with group */}
          <div className='pt-5 text-center fw-bold'>
            <p>OR login with </p>
            {/* google */}
            <div className='d-flex justify-content-center' style={{ gap: '30px' }}>
              <GoogleIcon sx={{ color: red[500], fontSize: 50, cursor: 'pointer' }} />
              {/* facebook */}
              <FacebookIcon color='primary' sx={{ fontSize: 50, cursor: 'pointer' }} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default LoginForm;
