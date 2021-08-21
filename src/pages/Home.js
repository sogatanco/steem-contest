import React from 'react';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import '../css/home.css';
import firebase from '../firebaseConfig';

class Home extends React.Component{

    constructor(){
        super();
        this.state={
            contests:[]
        }
    }

    componentDidMount(){
        var db=firebase.firestore().collection('/contests');
        db.get().then(contest=>{
            var dataall=[];
            contest.docs.forEach(s=>{
                var data1=[];
                fetch("https://api.steemit.com", {
                    body: '{"jsonrpc":"2.0", "method":"condenser_api.get_content", "params":["'+s.data().username+'", "'+s.data().permalink+'"], "id":1}',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST'
                    }).then(response=>response.json())
                    .then((data)=>{
                        // console.log(s.data().end)
                        // console.log(s.data().prize)
                        // console.log(data.result.title)
                        // console.log(JSON.parse(data.result.json_metadata).image[0])
                        var img=JSON.parse(data.result.json_metadata).image[0]
                        data1.push([img, data.result.title])
                    })
                    
                    dataall.push({'prize':s.data().prize, 'end':s.data().end,data1})

            })
            this.setState({contests:dataall})
        
        })
    }

    render(){
        console.log(this.state.contests[0])

        return(
            <Container>
                <Row>

                   {this.state.contests.map(c=>
                        <Col xs={6} md={4}>
                        <Card >
                            <Card.Img variant="top" src="https://awsimages.detik.net.id/community/media/visual/2020/06/09/syifa-gadis-cantik-yang-hilang_43.jpeg" />
                            <Card.Body>
                                <Card.Text className="text-capitalize">{c.data1[1]}</Card.Text>
                                <Card.Title className="d-flex justify-content-between">
                                   <strong className="text-muted ">$ {c.prize}</strong> 
                                    <Badge bg="warning" text="dark">
                                        End in 1 Day
                                    </Badge>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    )}
                   
                    
                   
                    
                    
                   
                    
                   
                </Row>
            </Container>
        )
    }
}

export default Home;

