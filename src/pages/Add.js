import React from 'react';
import {Container, Form, Row, Col, Card, Button, Modal, InputGroup} from 'react-bootstrap';
import '../css/add.css';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from '../firebaseConfig';

import QRCode from "react-qr-code";
import {CopyToClipboard} from 'react-copy-to-clipboard';



class Add extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
          startDate: new Date(),
          link:'',
          permalink:'',
          user:'',
          category:'',
          prize:'',
          currency:'steem',

          linkChek:false,

          show:false,

          copied:false,

          size:124

        };
        this.handleChange = this.handleChange.bind(this);
        this.onChangeLink=this.onChangeLink.bind(this);
        this.submit=this.submit.bind(this);
        this.handleClose=this.handleClose.bind(this);
      }

      submit(){
          if(this.state.user==="" || this.state.link==="" || this.state.permalink=== "" || this.state.prize==="" || this.state.category==="" || this.state.startDate===""||this.state.currency===""){
              alert("Some field is empty")
          } else{
            fetch("https://api.steemit.com", {
                body: '{"jsonrpc":"2.0", "method":"condenser_api.get_content", "params":["'+this.state.user+'", "'+this.state.permalink+'"], "id":1}',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST'
                }).then(response=>response.json())
                .then((data)=>{

                    console.log(data.result.title)
                    console.log(JSON.parse(data.result.json_metadata).image[0])

                    var db=firebase.firestore().collection('/contests');
                   db.add({
                       title:data.result.title,
                       thumbnail:JSON.parse(data.result.json_metadata).image[0],
                       link:this.state.link,
                       permalink:this.state.permalink,
                       user:this.state.user,
                       end:this.state.startDate,
                       prize:this.state.prize+' '+this.state.currency,
                       status:'unpaid',
                       added:new Date(),
                       category:this.state.category
                   }).then((ref)=>{
                       db.doc(ref.id).update({
                           id:ref.id
                       })
                       this.setState({show:true})
                   })
                    
                })
          }

        
      }

      handleClose(){
          this.setState({show:false})
      }

      handleChange(date) {
        this.setState({
          startDate: date
        })
      }

      onChangeLink(event){
          var link=event.target.value;
          if(link.startsWith('https://steemit.com/')){

            var db=firebase.firestore().collection('/contests').where('link', '==',event.target.value);
            db.get().then(contests=>{
                if(contests.docs.length>0){
                    this.setState({linkChek:true})
                    alert('link has added before')
                }else{
                    this.setState({linkChek:false})
                    this.setState({link:event.target.value})

                    var link1=link.split('https://steemit.com/')[1]
                    this.setState({permalink:link1.split('/')[2]})

                    var user=link1.split('/')[1];
                    this.setState({user:user.split('@')[1]})
                }
            })
            

           
          }else{
            this.setState({linkChek:true})
              
          }
      }
   

    render(){
        return(
            <>
                <Container className="add">

                    <Card>
                        <Card.Body>
                        <Form>

                        <Form.Group as={Row} className="mb-3" controlId="link">
                            <Form.Label column sm="3">
                            Steemit Post Link
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" placeholder="post url" onChange={this.onChangeLink} isInvalid={Boolean(this.state.linkChek)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                            Category
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select value={this.state.category} onChange={e => this.setState({ category:e.target.value}) }  >
                                    <option value="">Select Category</option>
                                    <option value="promo-steem">Promo-steem</option>
                                    <option value="power-up">Power up</option>
                                    <option value="story">Story</option>
                                    <option value="motivation">Motivation</option>
                                    <option value="education">Education</option>
                                    <option value="design">Design</option>
                                    <option value="foods">Foods</option>
                                    <option value="sport">Sport</option>
                                    <option value="writing">Writing</option>
                                    <option value="crypto">Crypto</option>
                                    <option value="photography">Photography</option>
                                    <option value="creativity">Creativity</option>
                                    <option value="story">Story</option>
                                    <option value="challenge">Challenge</option>
                                    <option value="game">Game</option>
                                    <option value="others">Others</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            Prize
                            </Form.Label>
                            <Col sm="9">
                                <Row>
                                    <Col xs="8">
                                     <Form.Control type="number" placeholder="amount"  value={this.state.prize}  onChange={(e) => this.setState({prize:e.target.value})} />
                                    </Col>
                                    <Col xs="4">
                                        <Form.Select value={this.state.currency} onChange={e=>this.setState({currency:e.target.value})}>
                                            <option value="steem">STEEM</option>
                                            <option value="sbd">SBD</option>
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
                                <Button variant="secondary" size="lg" onClick={this.submit}>
                                    SUBMIT YOUR CONTEST
                                </Button>
                            </Col>
                        </Form.Group>

                    </Form>
                        </Card.Body>
                    </Card>
                 
                </Container>



                {/* modal */}

                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    
                    <Modal.Body>

                         <h4 className="text-center">Contest Verification</h4>
                        <hr></hr>
                        <p className="text-center">to display your contest on our page, please transfer 0.1 STEEM to:</p>

                      <div className="p-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>username</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    value="steemcontest.com"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    readOnly/>
                                   
                                    <CopyToClipboard text="steemcontest.com" onCopy={() => this.setState({copied: true})}>
                                        <Button variant="secondary">Copy</Button>
                                    </CopyToClipboard>
                                   
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>memo</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    value={this.state.link}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    readOnly/>
                                   
                                    <CopyToClipboard text={this.state.link} onCopy={() => this.setState({copied: true})}>
                                        <Button variant="secondary">Copy</Button>
                                    </CopyToClipboard>
                                
                                </InputGroup>
                            </Form.Group> 

                          
                                <Row className="justify-content-center">
                                    <Col>
                                    
                                    </Col>
                                    <Col>
                                    <QRCode size={this.state.size} value={"https://steemlogin.com/sign/transfer?to=steemcontest.com&amount=0.1%20STEEM&memo="+this.state.link} />
                                    </Col>
                                    <Col>
                                    
                                    </Col>
                                    
                                </Row>
                           

                            <div className="d-grid gap-2 mt-4">
                                <Button href={"https://steemlogin.com/sign/transfer?to=steemcontest.com&amount=0.1%20STEEM&memo="+this.state.link} target="blank" variant="dark">
                                    SteemConnect Transfer
                                </Button> 
                                
                            </div> 

                            </div>
                    </Modal.Body>
                    
                </Modal>

                {/* end modal */}
            </>
        )
    }
}

export default Add;