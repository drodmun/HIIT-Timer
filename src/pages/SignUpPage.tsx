import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ContainerS from 'components/Container/Container';
import SignUpForm from '../components/Forms/SignUpForm';
import { Link } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
import Nav from 'react-bootstrap/Nav';

function SignUpPage() {
  const { darkMode } = useGlobalContext();
  return (
    <ContainerS isSecondary={darkMode}>
      <Navbar expand='lg'>
        <Container>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ fontSize: '30px' }}>
              <b style={{ color: '#11c1f4' }}>HIIT</b>
              <b style={{ color: darkMode ? '#000000' : 'white' }}> timer</b>
            </Navbar.Brand>
          </Link>
          <Nav>
              <Nav.Item style={{fontSize:'20px'}}>
                {`New User  ?  `}
                <Link to='/login' style={{ color: '#11c1f4', fontWeight: 'bold', textDecoration: 'none'}}>
                  Log in
                </Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>
      <Container style={{ color: darkMode ? 'black' : 'white' }}>
        <div className='d-flex justify-content-center'>
          <div>
            <SignUpForm />
            {/* <h4>
              Already a member?{' '}
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </h4> */}
          </div>
        </div>
      </Container>
    </ContainerS>
  );
}
export default SignUpPage;
