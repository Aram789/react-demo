import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function NavMenu (){
    return(
        <Navbar bg="dark" variant="dark">
            <Container className='gap-5'>
                <Nav className="me-auto gap-3">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}