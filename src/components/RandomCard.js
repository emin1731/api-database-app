import { Component, useEffect, useState, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';

import NotFoundImg from '../img/no-image.jpg'
import { Link } from 'react-router-dom';

function RandomCard({getChar, onItemSelected, itemCount, itemPath}) {
    const [charItem, setCharItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createCharList = useCallback(() => {
        // getChar(Math.floor((Math.random() * 1430)))
        getChar(Math.floor((Math.random() * itemCount)))
            .then(item => {
                setCharItem(item)
                setIsLoading(false)
            })   
    }, [getChar])

    useEffect(() => {
        createCharList()
        let timerId = setInterval(createCharList, 50000)
        return() => {
            clearInterval(timerId)
        }
    }, [createCharList]);    

    function renderCard(item) {
        return(
            <Card style={{ width: '100%' }} onClick={() => onItemSelected(item.id)} >
                {item.image && <Card.Img variant="top" src= {item.image} />}
                {/* <Card.Img variant="top" src= {item.image ? item.image : NotFoundImg} /> */}
                <Card.Body>
                    <Card.Title>
                        <Link to={`/${itemPath}/${item.id}`}>
                            {item.name}
                        </Link>
                        </Card.Title>
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
