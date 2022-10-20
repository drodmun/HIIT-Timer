import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from '@mui/material';
import Container from 'components/Container/Container';
import LoginForm from 'components/Forms/LoginForm';
import { useDarkMode } from 'hooks';
import Header from 'components/Header/Header';

function LoginPage() {
  const { isLightMode } = useDarkMode();

  return (
    <Container isSecondary={isLightMode} style={{ display: 'flex', flexDirection: 'column' }}>
      <Header hideMenu />

      <div className='d-flex justify-content-center' style={{ flexGrow: 1, alignItems: 'center' }}>
        <div>
          <LoginForm />

          <Navbar expand='lg' className='py-4' style={{ color: isLightMode ? 'black' : 'white' }}>
            <div>
              <Nav>
                <Nav.Item>
                  {`Don't have an account? `}
                  <Link href='/signup' style={{ color: '#11c1f4', fontWeight: 'bold', textDecoration: 'none' }}>
                    Sign Up
                  </Link>
                </Nav.Item>
              </Nav>
            </div>
          </Navbar>
        </div>
      </div>
    </Container>
  );
}
export default LoginPage;
