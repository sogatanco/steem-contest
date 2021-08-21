import React from 'react';
import {Container, Form, Row, Col, Card, Button} from 'react-bootstrap';
import '../css/add.css';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';




class Add extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(date) {
        this.setState({
          startDate: date
        })
      }
    
   

    render(){
        return(
            <>
                <Container className="add">

                    <Card>
                        <Card.Body>
                        <Form>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            Steemit Post Link
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" placeholder="post url" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                            Category
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select>
                                    <option>Select Category</option>
                                    <option>Promo-steem</option>
                                    <option>Power up</option>
                                    <option>Story</option>
                                    <option>Motivation</option>
                                    <option>Education</option>
                                    <option>Design</option>
                                    <option>Steemfoods</option>
                                    <option>Steemwomen</option>
                                    <option>Sport</option>
                                    <option>Writing</option>
                                    <option>Crypto</option>
                                    <option>Photography</option>
                                    <option>Creativity</option>
                                    <option>Others</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            Prize
                            </Form.Label>
                            <Col sm="9">
                                <Row>
                                    <Col xs="10">
                                     <Form.Control type="text" placeholder="amount" />
                                    </Col>
                                    <Col xs="2">
                                        <Form.Select>
                                            <option>STEEM</option>
                                            <option>SBD</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            End Date
                            </Form.Label>
                            <Col sm="9">
                                <DatePicker className="form-control" 
                                    selected={ this.state.startDate }
                                    onChange={ this.handleChange }
                                    name="startDate"
                                    dateFormat="MM/dd/yyyy"
                                />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            </Form.Label>
                            <Col sm="9" className="d-grid gap-2">
                                <Button variant="secondary" size="lg">
                                    SUBMIT YOUR CONTEST
                                </Button>
                            </Col>
                        </Form.Group>

                    


                    </Form>
                        </Card.Body>
                    </Card>

                    
                    
                </Container>
            </>
        )
    }
}

export default Add;