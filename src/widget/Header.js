import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';
import '../css/header.css';

class Header extends React.Component {
    render(){
        return(
            <Navbar  collapseOnSelect expand="lg"  variant="light">
                <Container>
                    <Navbar.Brand href="/">STEEM-CONTEST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/new">New</Nav.Link>
                        <Nav.Link href="/hight">High Prize</Nav.Link>
                        <Nav.Link href="/ended">Ended Soon</Nav.Link>
                        
                        </Nav>
                        <Nav>
                        <Nav.Link href="/add">Add Your Contest Here</Nav.Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        )
    }
}
export default Header;
