import Form from 'react-bootstrap/Form';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConf'
import { Navigate } from "react-router-dom";
function SignUpForm() {
  const [redirect, setRedirect] = useState<boolean>(false)
  const [formData, setFormData] = useState(
    {
      name: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: ""
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

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      setRedirect(!redirect)
    } catch (error) {
      alert('User not found')
    }

  }
  return (
    <div>
      {redirect && <Navigate replace to="/login" />}
      <div>
        <h5>Signup</h5>
      </div>

      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control required type="text" placeholder="Full Name"
              onChange={handleChange}
              name='name'
              value={formData.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" placeholder="Contact No."
              onChange={handleChange}
              name='contact'
              value={formData.contact} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              onChange={handleChange}
              name='email'
              value={formData.email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              onChange={handleChange}
              name='password'
              value={formData.password} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password"
              onChange={handleChange}
              name='confirmPassword'
              value={formData.confirmPassword} />
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