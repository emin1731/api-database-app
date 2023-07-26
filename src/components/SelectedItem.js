// import {Container, Row, Col} from 'react-bootstrap'
import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import NotFoundImg from '../img/no-image.jpg'


class SelectedItem extends Component {
    // constructor(props) {

    state = {
        item: null,
        img: null,
        debut: null,
        personal: null,

    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
        console.log("SEL ITEM UPDATE", this.state.item)
    }

    updateItem() {
        const {itemId} = this.props
        const {getData} = this.props
        if(!itemId) {
            return
        }

        // this.GOTservice.getCharacter(itemId)  
        getData(itemId)  
        .then(item => {
            this.setState({
                item: item,
                img: item.images[0],
                debut: item.debut,
                personal: item.personal
            })
            // if(item.debut === undefined) {
            //     this.setState({
            //         debut: "none"
            //     }) 
            // } 
            // else {
            //     this.setState({
            //         debut: item.debut
            //     }) 
            // }
            // co
            // console.log("CROPPED", item.images[0].split('png')[0] + 'png')
        })

        
    }


    render() { 
        if(!this.state.item) {
            return <Card style={{ width: '100%', height: '300px', marginTop: '50px', textAlign:'center', paddingTop: '20px' }} >Please select a character</Card>
        }
        
        const res = this.state.item
        const debut = this.state.debut
        const anime = debut ? debut.anime : 'none'
        const manga = debut ? debut.manga : 'none'
        const birthdate = this.state.personal.birthdate ? this.state.personal.birthdate : 'unknown'
        const status = this.state.personal.status ? this.state.personal.status : 'unknown'
        const img = this.state.img ? this.state.img.split('png')[0] + 'png' : NotFoundImg
        return (
            <Card style={{ width: '100%', marginTop: '50px' }} >
                <Card.Img variant="top" src= {img} />
                <Card.Body>
                    <Card.Title>{res.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Birth date: {birthdate}</ListGroup.Item>
                        <ListGroup.Item>Status: {status}</ListGroup.Item>
                        <ListGroup.Item>Anime: {anime}</ListGroup.Item>
                        <ListGroup.Item>Manga: {manga}</ListGroup.Item>
                        <ListGroup.Item>{this.props.jutsu}</ListGroup.Item>
                    </ListGroup>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        );
    }
}
 
export default SelectedItem;