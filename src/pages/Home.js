import React from 'react';
import {Container, Row, Col, Card, Badge, Dropdown, DropdownButton} from 'react-bootstrap';
import '../css/home.css';
import firebase from '../firebaseConfig';

import { Client, PrivateKey } from 'dsteem';



class Home extends React.Component{

    constructor(){
        super();
        this.state={
            contests:[],
            category:'Category'
        }
        this.redirect=this.redirect.bind(this);
        this.getCat=this.getCat.bind(this);
    }

    getCat(cat){
        this.setState({category:cat})
        var db=firebase.firestore().collection('/contests')
        .where("category","==", cat)
        .where("status","==", "paid")
        .orderBy('added', 'desc');
        db.get().then(contest=>{
            var dataall=[];
            contest.docs.forEach(s=>{
                var now=new Date();
                var inday=(s.data().end.toDate().getTime() - now.getTime() ) / (1000 * 3600 * 24)
                // console.log(s.data().end.toDate().getTime()- new Date.toDate().getTime())
                dataall.push({'prize':s.data().prize, 'end':inday, 'title':s.data().title, 'thumbnail':s.data().thumbnail, 'id':s.data().id, 'link':s.data().link, 'user':s.data().user, 'category':s.data().category})
            })
            this.setState({contests:dataall})
        
        })

       
        
    }

    redirect(link){
        window.open(link, '_blank')
    }
        
    

    componentDidMount(){
        
       this.getData();
       this.checkPaid();
       this.checkEnd();

    }



    getData(){
        var db=firebase.firestore().collection('/contests')
        .orderBy('added', 'desc')
        .where("status","==", "paid")

        db.get().then(contest=>{
            var dataall=[];
            contest.docs.forEach(s=>{
                var now=new Date();
                var inday=(s.data().end.toDate().getTime() - now.getTime() ) / (1000 * 3600 * 24)
                // console.log(s.data().end.toDate().getTime()- new Date.toDate().getTime())
                dataall.push({'prize':s.data().prize, 'end':inday, 'title':s.data().title, 'thumbnail':s.data().thumbnail, 'id':s.data().id, 'link':s.data().link, 'user':s.data().user, 'category':s.data().category})
            })
            this.setState({contests:dataall})
        
        })
    }

    vote(author1, permlink1){
        const key = PrivateKey.from('5JyfNUFWGwgcmEHGdA565Ph8hszy35Pi8kFyekkPGR4huaZakXo')
        const voter='steemcontest.com';
        const author=author1;
        const permlink=permlink1;
        const weight=10000;
        const client = new Client('https://api.steemit.com');
        const vote = {
            voter,
            author,
            permlink,
            weight, //needs to be an integer for the vote function
        };

        client.broadcast.vote(vote, key).then(
            function(result) {
              console.log(result)
            },
            function(error) {
                console.log('error:', error);
               
            }
        );
    }

    resteem(author1, permlink1){
        const key = PrivateKey.from('5JyfNUFWGwgcmEHGdA565Ph8hszy35Pi8kFyekkPGR4huaZakXo')
        const client = new Client('https://api.steemit.com');
        const jsonOp = JSON.stringify([
            'reblog',
            {
                account: 'steemcontest.com',
                author: author1,
                permlink: permlink1,
            },
        ]);
        
        const data = {
            id: 'follow',
            json: jsonOp,
            required_auths: [],
            required_posting_auths: ['steemcontest.com'],
        };
        
        client.broadcast.json(data, key).then(
            function(result) {
                console.log('client broadcast result: ', result);
            },
            function(error) {
                console.error(error);
            }
        );
    }

    replayComment(author1, permlink1){
        const key = PrivateKey.from('5JyfNUFWGwgcmEHGdA565Ph8hszy35Pi8kFyekkPGR4huaZakXo')
        const client = new Client('https://api.steemit.com');
        const body=`* This contest has received votes and resteem \n* This contest has been included in https://steemcontest.com \n* Add another contest here https://steemcontest.com/add
        #contest #steemcontest
       [![Secondary SteemContest Logo Color.png](https://cdn.steemitimages.com/DQmU6R9567ZQfFFD3CbPzKQN5Wi6kMtTWM71oMCLNXBTKfr/Secondary%20SteemContest%20Logo%20Color.png)](https://steemcontest.com)`

        const comment = {
            author: 'steemcontest.com',
            title: '',
            body: body,
            parent_author: author1,
            parent_permlink: permlink1,
            permlink:  permlink1+'-autocomment',
            json_metadata: '',
        };
        client.broadcast.comment(comment, key).then(
            function(result) {
                console.log('comment broadcast result', result);
            },
            function(error) {
                console.error(error);
            }
        );
    }


    checkPaid(){
        
    
        
        var db=firebase.firestore().collection('/contests').where("status","==", "unpaid");
        db.get().then(contest=>{
            contest.docs.forEach(c=>{
                fetch('https://sds1.steemworld.org/transfers_api/getTransfers/%7B%22type%22:%22transfer%22,%22orderBy%22:%22time%22,%22orderDir%22:%22DESC%22,%22to%22:%22steemcontest.com%22,%22unit%22:%22STEEM%22,%22amount%22:%220.001%22,%22amountOp%22:%22%3E=%22%7D/250/0')
                    .then(response=>response.json())
                    .then((data)=>{
                       
                        if(data.result.rows.length>0){
                            var arr=data.result.rows
                            arr.forEach(a=>{
                                if(a[4]===c.data().link){
                                    console.log('yes')
                                    this.vote(c.data().user, c.data().permalink);
                                    this.resteem(c.data().user, c.data().permalink);
                                    this.replayComment(c.data().user, c.data().permalink);
                                    var db=firebase.firestore().collection('/contests');
                                    db.doc(c.data().id).update({
                                        status:'paid'
                                    })
                                }
                               
                            })
                            
                        }
                    })
            })
        })
    }

    checkEnd(){
        var db=firebase.firestore().collection('/contests')
        .orderBy('added', 'desc')
        .where("status","==", "paid");

        db.get().then(contest=>{
            contest.docs.forEach(s=>{
                var now=new Date();
                var inday=(s.data().end.toDate().getTime() - now.getTime() ) / (1000 * 3600 * 24)
                if(inday<=0){
                    var db=firebase.firestore().collection('/contests');
                    db.doc(s.data().id).update({
                        status:'ended'
                    })
                }
            })
        
        })
    }

    render(){
        return(
            <>
            
            
            <Container className="pb-5">

                <DropdownButton id="dropdown-basic-button" title={this.state.category}  variant="warning" size="sm" className="mt-4 d-flex  justify-content-end">
                    <Dropdown.Item onClick={()=>this.getCat('promo-steem')}>Promo-Steem</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('power-up')}>Power Up</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('motivation')}>Motivation</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('education')}>Education</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('design')}>Design</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('foods')}>Foods</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('sport')}>Sport</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('writing')}>Writing</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('crypto')}>Crypto</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('photography')}>Photography</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('cretivity')}>Creativity</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('story')}>Story</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('challenge')}>Challenge</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('game')}>Game</Dropdown.Item>
                    <Dropdown.Item onClick={()=>this.getCat('others')}>Others</Dropdown.Item>

                   
                </DropdownButton>
                <Row>

                   {this.state.contests.map((c)=>
                        <Col xs={12} md={4} lg={3} key={c.id} onClick={() =>this.redirect(c.link)}>
                        <Card  className="contes">
                            <Card.Img variant="top" src={c.thumbnail} className="img"/>
                            <Card.Body>
                                <Card.Text className="text-capitalize title">{c.title}</Card.Text>
                                <small className="text-muted">by {c.user} #{c.category}</small>
                                <Card.Text className="d-flex justify-content-between mt-2">
                                   <strong className="text-muted ">{c.prize}</strong> 
                                   {c.end>=2?
                                    <Badge bg="warning" text="dark">
                                        End in {~~ c.end} days
                                    </Badge>:''
                                    }

                                   {c.end>=1 && c.end<2?
                                    <Badge bg="warning" text="dark">
                                        End in {~~ c.end} day
                                    </Badge>:''
                                    }

                                   {c.end>0 && c.end<1?
                                    <Badge bg="warning" text="dark">
                                        End today
                                    </Badge>:''
                                    }

                                   {c.end<=0?
                                    <Badge bg="dark" text="light">
                                        Ended
                                    </Badge>:''
                                    }
                                    
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    )}
                </Row>
            </Container>
            </>
        )
    }
}

export default Home;

