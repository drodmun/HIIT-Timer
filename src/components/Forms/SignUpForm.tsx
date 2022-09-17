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
  const formElements = ['Name', 'Contact', 'Email', 'Password', 'Confirm_Password'];
  const { darkMode } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    confirm_password: ''
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
      setRedirect(true);
    } catch (error) {
      alert('Enter all fields correctly.');
    }
  };
  function handleRegister() {
    if (formData.password === formData.confirm_password) {
      register();
    } else {
      alert("Passwords don't match");
    }
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
                  type={element === 'password' || element === 'confirmPassword' ? 'password' : 'text'}
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
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
