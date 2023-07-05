import {Container, Row, Col} from 'react-bootstrap'
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './../styles/RandomCards.css'


class RandomCards extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <div className='random-cards-container'>
                {/* <Container> */}
                    <Row>
                        <Col>
                            <h2>Random Characters</h2>
                        </Col>
                    </Row>
                <Row>

                <Col>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src= {require('./ItachiKisame.jpg')} />
                        <Card.Body>
                            <Card.Title>Itachi</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    </Col>
                <Col>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src= {require('./ItachiKisame.jpg')} />
                        <Card.Body>
                            <Card.Title>Itachi</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src= {require('./ItachiKisame.jpg')} />
                        <Card.Body>
                            <Card.Title>Itachi</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src= {require('./ItachiKisame.jpg')} />
                            <Card.Body>
                                <Card.Title>Itachi</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src= {require('./ItachiKisame.jpg')} />
                            <Card.Body>
                                <Card.Title>Itachi</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            {/* </Container> */}
            </div>
            
        );
    }
}
 
export default RandomCards;