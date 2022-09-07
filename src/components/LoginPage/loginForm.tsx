import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from 'firebaseConf';

function LoginForm() {

  const [formData, setFormData] = useState(
    {
      email: "",
      password: ""
    }
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const login = async() =>{
    try {
      await signInWithEmailAndPassword(auth,formData.email,formData.password)
    } catch(error){
      console.log(error)
    }
    
  }
  return (
    <div>
      
      <div>
        <h5>Welcome !</h5>
        <p>Login to continue</p>
      </div>

      <div>
        <Form>
        <Form.Group className="mb-3 " controlId="loginEmail">
            <Form.Control type="email" placeholder="Enter email"
              onChange={handleChange}
              name='email'
              value={formData.email}
               />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Control type="password" placeholder="Password"
              onChange={handleChange}
              name='password'
              value={formData.password} />
          </Form.Group>

          <Button onClick={login} sx={{ textTransform: 'none' }} size='x-large'>
            Login
          </Button>

        </Form>
      </div>
    </div>
  );
}

export default LoginForm;