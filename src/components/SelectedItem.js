// import {Container, Row, Col} from 'react-bootstrap'
import { Component,Row, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Skeleton from 'react-loading-skeleton';

import NotFoundImg from '../img/no-image.jpg'
import { Container } from 'react-bootstrap';


class SelectedItem extends Component {

    state = {
        item: null,
        img: null,
        img_arr: null,
        debut: null,
        personal: null,

    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem() {
        const {itemId} = this.props
        const {getData} = this.props
        if(!itemId) {
            return
        }
        getData(itemId)  
        .then(item => {
            this.setState({
                item: item,
                img: item.image,
                img_arr: item.image,
                debut: item.debut,
                personal: item.personal
            })
        })
    }
    createImg(img) {
        if(!img.length) {
            return <Card.Img variant="top" src= {NotFoundImg} />
        }
        else if(img.length === 1) {
             return <Card.Img variant="top" src= {img[0]} />
        }
        else {
            return(
                <Carousel slide={false}>
                    {img.map((item, id) => {
                        return(
                            <Carousel.Item>
                                <img src={item} alt='{item}' style={{ width: '100%'}} key={id}></img>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            )
            
        }

    }

    createCharTable(title, charItem) {
        return(
            <Table hover>
                <thead>
                    <tr>
                        <th style={{ width: '100px'}}>{title}</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(charItem).map((item, id) => {
                            return(
                                <tr style={{wordBreak: 'break-all'}} key={id}>
                                    <td>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </td>
                                    {typeof charItem[item] === 'object' && !Array.isArray(charItem[item]) && 
                                        <td>
                                            {Object.keys(charItem[item]).map((elem, id) => {
                                                return(
                                                    <Fragment key={id}>
                                                        {elem.charAt(0).toUpperCase() + elem.slice(1)} : {charItem[item][elem]} <br/>
                                                    </Fragment>
                                                    )
                                            })}
                                        </td> }
                                    {typeof charItem[item] === 'object' && Array.isArray(charItem[item]) && 
                                        <td>
                                            {charItem[item].map((elem, id) => {
                                                return(
                                                    <Fragment key={id} >{elem}<br/></Fragment>)
                                                }) 
                                            }
                                        </td>}
                                    {typeof charItem[item] !== 'object' && <td>{charItem[item]}</td> }
                                </tr>
                            )
                    })}
                </tbody>
            </Table>

        )
    }


    render() { 
        if(!this.state.item) {
            return (
                <Card style={{ width: '100%', marginTop: '50px' }} >
                    <Skeleton style={{height: '300px'}}></Skeleton>
                    <Card.Body style={{width: '70%'}}>
                        <Card.Title>Please select a character</Card.Title>
                        <Card.Text>
                            <Skeleton count={5}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
            
            
            // <Card style={{ width: '100%', height: '300px', marginTop: '50px', textAlign:'center', paddingTop: '20px' }} ><h3>Please select a character</h3></Card>
        }
        const item = this.state.item

        return (


                <Card style={{ width: '100%', marginTop: '50px' }} >
                {/* {this.createImg(item.images)} */}
                <Card.Img variant="top" src= {item.image} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Gender: {item.gender}</ListGroup.Item>
                        <ListGroup.Item>Species: {item.species}</ListGroup.Item>
                        {item.type && <ListGroup.Item>Type: {item.type}</ListGroup.Item>}
                        <ListGroup.Item>Status: {item.status}</ListGroup.Item>
                        <ListGroup.Item action onClick={() => this.props.onLocationClicked(item.origin.url)}>Origin: {item.origin.name}</ListGroup.Item>
                        <ListGroup.Item>Location: {item.location.name}</ListGroup.Item>
                        {/* <ListGroup.Item>Origin: {item.origin.name}</ListGroup.Item> */}
                        {/* {item.debut && this.createCharTable('Appearance', item.debut)}
                        {item.family && this.createCharTable('Family', item.family)}
                        {item.personal && this.createCharTable('Personal', item.personal)}
                        {item.voiceActors && this.createCharTable('Voice Actors', item.voiceActors)} */}
                        
                    </ListGroup>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>




        );
    }
}
 
export default SelectedItem;


