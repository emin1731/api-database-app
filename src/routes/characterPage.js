import { Component } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import ItemTable from '../components/ItemTable';
import SelectedItem from '../components/SelectedItem';
import RickAndMortyDB from '../service/RickAndMortyDB';
import PaginationBar from '../components/Pagination';
import RandomCard from '../components/RandomCard';
import Header from '../components/Header';

import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>
}

class CharacterPage extends Component {
    RickAndMortyDB = new RickAndMortyDB()

    constructor(props) {
        super(props);
        this.state = {
            itemId: null,
            currentPage: 1,
            characterList: null,
            totalCharacters: 826,
            isLoading: true,
            isRandHided: false

        }
    }


    updateCharacter() {
        this.RickAndMortyDB.getAllCharacters(this.state.currentPage)
        .then((characterList) => {
            
            this.setState({
                characterList
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
        this.updateCharacter()
 

    }

    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentPage !== this.state.currentPage) {
        this.updateCharacter()
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
                            data={this.RickAndMortyDB.getAllCharacters} 
                            onItemSelected={(id) => this.onItemSelected(id)}
                            currentPage={this.state.currentPage}
                            itemList={this.state.characterList}
                            isLoading={this.state.isLoading}/>


                        <PaginationBar
                            currentPage={this.state.currentPage}
                            totalCount={this.state.totalCharacters}
                            pageSize={20}
                            onPageChange={page => this.setState({currentPage: page})}
                            />
                    </Col>
                    <Col lg='4'>
                        <SelectedItem
                        itemId = {this.state.itemId}
                        getData = {this.RickAndMortyDB.getCharacter}
                        // onLocationClicked = {}
                        />
                        <Row style={{marginTop: '50px'}}>
                            <Col sm='9'>
                                <h3>Random Characters</h3>
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
                                    getChar={this.RickAndMortyDB.getCharacter} 
                                    totalCharacters={this.state.totalCharacters}
                                    onItemSelected={(id) => this.onItemSelected(id)}/>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default withParams(CharacterPage);