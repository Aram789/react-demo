import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

export default function NavMenu (){
    return(
        <Navbar bg="dark" variant="dark">
            <Container className='gap-5'>
                <Link to="/">Navbar</Link>
                <Nav className="me-auto gap-3">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}