import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConf';
import { Navigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { useGlobalContext } from 'globalStateContext';
function SignUpForm() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const { darkMode } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const register = async () => {
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
      setRedirect(!redirect);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ color: darkMode ? 'black' : 'white' }}>
      {redirect && <Navigate replace to='/login' />}
      <div>
        <h5>Signup</h5>
      </div>

      <div>
        <Form className='py-4'>
          <Form.Group className='mb-3' controlId='formName'>
            <Form.Control
              className='rounded-5'
              required
              type='text'
              placeholder='Full Name'
              onChange={handleChange}
              name='name'
              value={formData.name}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formContact'>
            <Form.Control
              className='rounded-5'
              type='text'
              placeholder='Contact No.'
              onChange={handleChange}
              name='contact'
              value={formData.contact}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Control
              className='rounded-5'
              required
              type='email'
              placeholder='Enter email'
              onChange={handleChange}
              name='email'
              value={formData.email}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Control
              className='rounded-5'
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={formData.password}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formConfirmPassword'>
            <Form.Control
              className='rounded-5'
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
              name='confirmPassword'
              value={formData.confirmPassword}
            />
          </Form.Group>

          <Button onClick={register} sx={{ textTransform: 'none' }} size='x-large'>
            SignUp
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
