import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import '../css/header.css';

class Footer extends React.Component{
    render(){
        return(
            <>
            <Navbar fixed="bottom" className="footer" >
                <Container className="nn">
                    <Nav className="mx-auto">
                        <p>Made with <span className="text-danger">&hearts;</span> by  @arie.steem & @sogata | Sponsored by @promosteem.com</p>
                    </Nav>
                </Container>
            </Navbar>
            
            </>
        )
    }
}
export default Footer;