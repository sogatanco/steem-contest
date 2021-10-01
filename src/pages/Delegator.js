import React from 'react';
import { Container, Row, Col, Image, Card, ProgressBar, Badge } from 'react-bootstrap';
import '../css/home.css';

class Delegators extends React.Component{
    constructor(){
        super();
        this.state={
            list:[],
            vts:0,
        }
        

    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.getDelegator(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    vestToSP(){
        fetch('https://anothervps.com/api/steemit/vests/')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({vts:data.vests_to_sp})
        })
        
    }

    getDelegator(){
        this.vestToSP()
        var hasildelegator=[]
        fetch('https://sds1.steemworld.org/delegations_api/getIncomingDelegations/steemcontest.com/100000/0')
            .then(response=>response.json())
            .then((data)=>{
                var hasil=data.result.rows
                hasil.sort(function(a,b){
                    return parseInt(b[3])- parseInt(a[3]);
                })

                hasil.map((hs)=>(
                    hasildelegator.push({'user':hs[1], 'total':(parseInt(hs[3])*this.state.vts).toFixed(2), 'avatar':'https://steemitimages.com/u/'+hs[1]+'/avatar'})
            ))

               this.setState({list:hasildelegator})
        })  
    }


    render(){
        let sumtotal= this.state.list.reduce(function(prev, current) {
            return prev + +current.total
          }, 0);

        return(
            <Container className="mt-4">
                <Row>
                    {this.state.list.map((x)=>(
                        <Col md={3}>

                        <Card className="contes mt-4">
                            <Card.Body>
                                <Row>
                                    <Col xs={3}>
                                        <Image src={x.avatar} roundedCircle fluid/>
                                    </Col>
                                    <Col xs={9}>
                                        <h6>
                                            @{x.user} <Badge bg="secondary">{x.total} SP</Badge>
                                        </h6>
                                        <ProgressBar animated variant="warning" now={x.total/sumtotal*100} label={`${(x.total/sumtotal*100).toFixed(1)} %`}/>
                                    </Col>
                                
                                </Row>
                            </Card.Body>
                        </Card>
                         
                    </Col>
                    ))}


                </Row>
            </Container>
        )
    }
}

export default Delegators;