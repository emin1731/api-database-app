import { Component, useEffect, useState, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';

import NotFoundImg from '../img/no-image.jpg'

function RandomCard({getChar, onItemSelected}) {
    const [charItem, setCharItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createCharList = useCallback(() => {
        getChar(Math.floor((Math.random() * 1430)))
            .then(item => {
                setCharItem(item)
                setIsLoading(false)
            })   
    }, [getChar])

    useEffect(() => {
        createCharList()
        let timerId = setInterval(createCharList, 10000)
        return() => {
            clearInterval(timerId)
        }
    }, [createCharList]);    

    function renderCard(item) {
        return(
            <Card style={{ width: '100%' }} onClick={() => onItemSelected(item.id)} >
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

    function renderSkeleton() {
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

    return ( 
            isLoading 
            ? renderSkeleton() 
            : renderCard(charItem)
    )

}

 
export default RandomCard;
