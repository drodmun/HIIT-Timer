import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ContainerS from 'components/Container/Container';
import LoginForm from './loginForm';
import { Link } from "react-router-dom";
function LoginPage() {

    return (
        <ContainerS isSecondary={true}>
            <Navbar expand="lg" >
                <Container>
                <Link to="/">
                    <Navbar.Brand >HIIT timer</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Link to="/signup">
                        <Nav.Item>Sign Up </Nav.Item>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className='min-vh-100 d-flex justify-content-end'>
                    <div className='d-inline-flex flex-column w-50'>
                        <LoginForm/>
                    </div>
                </div>
            </Container>
        </ContainerS>
    )
}
export default LoginPage