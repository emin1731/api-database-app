import { Component } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import ItemTable from '../components/ItemTable';
import SelectedLocation from '../components/SelectedLocation';
import RickAndMortyDB from '../service/RickAndMortyDB';
import PaginationBar from '../components/Pagination';
import RandomCard from '../components/RandomCard';
import Header from '../components/Header';

import { useParams } from 'react-router-dom';


function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>
}

class LocationPage extends Component {
    RickAndMortyDB = new RickAndMortyDB()

    constructor(props) {
        super(props);
        this.state = {
            itemId: null,
            currentPage: 1,
            locationList: null,
            totalLocations: 126,
            isLoading: true,
            isRandHided: false

        }
    }


    updateLocation() {
        this.RickAndMortyDB.getAllLocations(this.state.currentPage)
        .then((locationList) => {
            
            this.setState({
                locationList
            })
            
        })
        .then(
            setTimeout(() => {
                this.setState({
                    isLoading: false
                }) 
            }, 1000)
        )
    }
    componentDidMount() {
        if(this.props.params) {
            this.setState({
                itemId: this.props.params.id
            })
            console.log(this.props.params)
        }
        this.updateLocation()
 

    }

    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentPage !== this.state.currentPage) {
        this.updateLocation()
        }
    }
   
    onItemSelected(id) {
        this.setState({
            itemId: id
        })

    }

    
    render() { 
        return (
            <Container >
                <Row>
                    <Col lg='8'>
                        <ItemTable 
                            data={this.RickAndMortyDB.getAllLocations} 
                            onItemSelected={(id) => this.onItemSelected(id)}
                            currentPage={this.state.currentPage}
                            itemList={this.state.locationList}
                            isLoading={this.state.isLoading}
                            itemPath={'location'}/>


                        <PaginationBar
                            currentPage={this.state.currentPage}
                            totalCount={this.state.totalLocations}
                            pageSize={20}
                            onPageChange={page => this.setState({currentPage: page})}
                            />
                    </Col>
                    <Col lg='4'>
                        <SelectedLocation
                            itemId = {this.state.itemId}
                            getData = {this.RickAndMortyDB.getLocation}
                            getCharName={this.RickAndMortyDB.getName}
                        />
                        <Row style={{marginTop: '50px'}}>
                            <Col sm='9'>
                                <h3>Random Locations</h3>
                            </Col>
                            <Col sm='3'>
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    style={{width: '100%'}}
                                    onClick={() => this.setState({isRandHided: !this.state.isRandHided})}>{this.state.isRandHided ? 'Show' : 'Hide'}</Button>
                            </Col>
                            {
                                this.state.isRandHided 
                                ? null
                                : <RandomCard 
                                    getChar={this.RickAndMortyDB.getLocation} 
                                    totalCharacters={this.state.totalLocations}
                                    onItemSelected={(id) => this.onItemSelected(id)}
                                    itemCount={126}
                                    itemPath={'location'}/>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default withParams(LocationPage);