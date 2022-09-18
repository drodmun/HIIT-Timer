import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ContainerS from 'components/Container/Container';
import LoginForm from '../components/Forms/LoginForm';
import { Link } from 'react-router-dom';
import { useGlobalContext } from 'globalStateContext';
function LoginPage() {
  const { darkMode } = useGlobalContext();
  return (
    <ContainerS isSecondary={darkMode}>
      <Navbar expand='lg' className='pb-5' style={{ color: darkMode ? 'black' : 'white' }}>
        <Container>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand>
              <b style={{ color: '#11c1f4' }}>HIIT</b>
              <b style={{ color: darkMode ? '#000000' : 'white' }}> timer</b>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='loginNav' />
          <Navbar.Collapse id='loginNav' className='justify-content-end'>
            <Nav>
              <Nav.Item>
                {`New User  ?  `}
                <Link to='/signup' style={{ color: '#11c1f4', fontWeight: 'bold', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className='d-flex justify-content-center'>
          <div>
            <LoginForm />
          </div>
        </div>
      </Container>
    </ContainerS>
  );
}
export default LoginPage;
