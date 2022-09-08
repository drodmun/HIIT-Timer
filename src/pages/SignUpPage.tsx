import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ContainerS from 'components/Container/Container';
import SignUpForm from '../components/Forms/SignUpForm';
import { Link } from "react-router-dom";
function SignUpPage() {

    return (
        <ContainerS isSecondary={true}>
            <Navbar expand="lg" >
                <Container>
                <Link to="/">
                    <Navbar.Brand>HIIT timer</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <Container>
                <div className='min-vh-100 d-flex justify-content-end'>
                    <div className='d-inline-flex flex-column w-50'>
                        <SignUpForm/>
                        
                        <h4>Already a member? <Link to="/login">Login</Link></h4>
                      
                        
                    </div>
                    
                </div>
            </Container>
        </ContainerS>
    )
}
export default SignUpPage