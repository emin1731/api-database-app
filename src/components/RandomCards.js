import { Component} from 'react';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';

import NotFoundImg from '../img/no-image.jpg'

class RandomCards extends Component  {
    state = {
        itemList: null,
        isLoading: true
    }
    componentDidMount() {
        this.createCharList()

        let arr = Math.floor((Math.random() * 1430))
        console.log("RAND", arr)
    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            
        }
    }
    createCharList() {
        const {getChar} = this.props
        getChar(Math.floor((Math.random() * 1430)))
            .then(item => {
                this.setState({itemList: item})
                this.setState({isLoading: false})
            })   
    }

    renderCard(item) {
        return(
            <Card style={{ width: '100%' }} onClick={() => this.props.onItemSelected(item.id)} >
                <Card.Img variant="top" src= {item.images.length ? item.images[0] : NotFoundImg} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        id: {item.id}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
        
    }
    renderSkeleton() {
        return(
            <Card style={{ width: '100%'}} >
                <Skeleton style={{height: '300px'}}></Skeleton>
                <Card.Body style={{width: '40%'}}>
                    <Card.Title><Skeleton/></Card.Title>
                    <Card.Text>
                        <Skeleton/>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    render() {
        return ( 
                this.state.isLoading 
                ? this.renderSkeleton() 
                : this.renderCard(this.state.itemList)
        )
    }
    

}

 
export default RandomCards;
