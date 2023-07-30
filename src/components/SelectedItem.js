// import {Container, Row, Col} from 'react-bootstrap'
import { Component, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';


import NotFoundImg from '../img/no-image.jpg'


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
                img: item.images[0],
                img_arr: item.images,
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
                                <tr style={{wordBreak: 'break-all'}}>
                                    <td>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </td>
                                    {typeof charItem[item] === 'object' && !Array.isArray(charItem[item]) && 
                                        <td>
                                            {Object.keys(charItem[item]).map((elem, id) => {
                                                return(
                                                    <Fragment>
                                                        {elem.charAt(0).toUpperCase() + elem.slice(1)} : {charItem[item][elem]} <br/>
                                                    </Fragment>
                                                    )
                                            })}
                                        </td> }
                                    {typeof charItem[item] === 'object' && Array.isArray(charItem[item]) && 
                                        <td>
                                            {charItem[item].map((elem) => {
                                                return(
                                                    <Fragment>{elem}<br/></Fragment>)
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
            return <Card style={{ width: '100%', height: '300px', marginTop: '50px', textAlign:'center', paddingTop: '20px' }} >Please select a character</Card>
        }
        const item = this.state.item

        return (
            <Card style={{ width: '100%', marginTop: '50px' }} >
                {this.createImg(item.images)}
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        {item.debut && this.createCharTable('Appearance', item.debut)}
                        {item.family && this.createCharTable('Family', item.family)}
                        {item.personal && this.createCharTable('Personal', item.personal)}
                        {item.voiceActors && this.createCharTable('Voice Actors', item.voiceActors)}
                        
                    </ListGroup>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        );
    }
}
 
export default SelectedItem;


