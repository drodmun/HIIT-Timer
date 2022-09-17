import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ContainerS from 'components/Container/Container';
import SignUpForm from '../components/Forms/SignUpForm';
import { Link } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';

function SignUpPage() {
  const { darkMode } = useGlobalContext();
  return (
    <ContainerS isSecondary={darkMode}>
      <Navbar expand='lg'>
        <Container>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand>
              <b style={{ color: '#11c1f4' }}>HIIT</b>
              <b style={{ color: darkMode ? '#000000' : 'white' }}> timer</b>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='navbar-nav' />
        </Container>
      </Navbar>
      <Container style={{ color: darkMode ? 'black' : 'white' }}>
        <div className='d-flex justify-content-center'>
          <div>
            <SignUpForm />
            <h4>
              Already a member?{' '}
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </h4>
          </div>
        </div>
      </Container>
    </ContainerS>
  );
}
export default SignUpPage;
