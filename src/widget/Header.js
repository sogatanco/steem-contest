import React from 'react';
import {Nav, Navbar, Container, Card} from 'react-bootstrap';
import '../css/header.css';

class Header extends React.Component {
   

   
    render(){
        
        return(
            <>
            <Navbar  collapseOnSelect expand="lg"  variant="light" >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="../logo.png"
                            height="50"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/new">New</Nav.Link>
                        <Nav.Link href="/endsoon">Ended Soon</Nav.Link>
                        <Nav.Link href="/expired">Expired Contests</Nav.Link>
                        <Nav.Link href="/hight">High Prize</Nav.Link>
                        
                        
                        </Nav>
                        <Nav>
                        <Nav.Link href="/delegator">Delegators</Nav.Link>
                        <Nav.Link href="/add">Add Your Contest Here</Nav.Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Card className="jumbotron">
                <Card.Body className="text-center">
                    <h1 className="jumbotitle">STEEMCONTEST</h1>
                    <small >a platform that provide all contest informations on steemit</small>
                </Card.Body>
            </Card>
            </>
        )
    }
}
export default Header;
