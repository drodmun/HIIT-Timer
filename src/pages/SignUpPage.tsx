import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from '@mui/material';
import Container from 'components/Container/Container';
import SignUpForm from 'components/Forms/SignUpForm';
import { useGlobalContext } from 'globalStateContext';
import Header from 'components/Header/Header';

function SignUpPage() {
  const { darkMode } = useGlobalContext();

  return (
    <Container isSecondary={darkMode} style={{ display: 'flex', flexDirection: 'column' }}>
      <Header hideMenu />

      <div className='d-flex justify-content-center' style={{ flexGrow: 1, alignItems: 'center' }}>
        <div>
          <SignUpForm />

          <Navbar expand='lg' className='py-4' style={{ color: darkMode ? 'black' : 'white' }}>
            <div>
              <Nav>
                <Nav.Item>
                  {`Already have an account? `}
                  <Link href='/login' style={{ color: '#11c1f4', fontWeight: 'bold', textDecoration: 'none' }}>
                    Log In
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
export default SignUpPage;
