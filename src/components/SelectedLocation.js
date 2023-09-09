import {useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Skeleton from 'react-loading-skeleton';
import NotFoundImg from '../img/no-image.jpg'

function usePreviousValue(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

function SelectedLocation({itemId, getData}) {
    const previousValue = usePreviousValue(itemId);

    const [item, setItem] = useState();

    useEffect(() => {
        if(!previousValue || itemId !== previousValue) {
            updateItem()
        }
    })

    function updateItem() {
        console.log("UPDATE")
        // const {itemId} = this.props
        // const {getData} = this.props
        if(!itemId) {
            return
        }
        getData(itemId)  
        .then(item => {
            // this.setState({
            //     item: item,
            // })
            setItem(item)
        })
    }

    if(!item) {
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

    return (
        <Card style={{ width: '100%', marginTop: '50px' }} >
            <Card.Img variant="top" src= {NotFoundImg} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Dimension: {item.dimension}</ListGroup.Item>
                    <ListGroup.Item>Type: {item.type}</ListGroup.Item>
                    {item.status && <ListGroup.Item>Status: {item.status}</ListGroup.Item>}
                    {/* <ListGroup.Item>Status: {item.status}</ListGroup.Item> */}
                    {/* <ListGroup.Item action onClick={() => this.props.onLocationClicked(item.origin.url)}>Origin: {item.origin.name}</ListGroup.Item> */}
                    {/* <ListGroup.Item>Location: {item.location.name}</ListGroup.Item> */}
                </ListGroup>
            </Card.Body>
        </Card>




    );
}
export default SelectedLocation;
