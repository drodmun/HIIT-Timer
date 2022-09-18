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
            <Navbar.Brand style={{fontSize:'30px'}}>
              <b style={{ color: '#11c1f4' }}>HIIT</b>
              <b style={{ color: darkMode ? '#000000' : 'white' }}> timer</b>
            </Navbar.Brand>
          </Link>
            <Nav>
              <Nav.Item style={{fontSize:'20px'}}>
                {`New User  ?  `}
                <Link to='/signup' style={{ color: '#11c1f4', fontWeight: 'bold', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Nav.Item>
            </Nav>
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
