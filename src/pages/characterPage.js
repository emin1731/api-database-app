import { Component } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import RandomCards from '../components/RandomCards';
import ItemTable from '../components/ItemTable';
import SelectedItem from '../components/SelectedItem';
import NarutoDB from '../service/NarutoDB';
import PaginationBar from '../components/Pagination';



class CharacterPage extends Component {
    NarutoDB = new NarutoDB()

    constructor(props) {
        super(props);
        this.state = {
            itemId: null,
            currentPage: 1,
            characterList: null,
            totalCharacters: null,
            isLoading: true,
            isRandHided: false

        }
    }
    updateCharacter() {
        this.NarutoDB.getAllCharacters(this.state.currentPage)
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
        this.NarutoDB.getTotalCharacterCount()
        .then((res) => {
            this.setState({
                totalCharacters: res
            })
        })
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
            <Container>
                <Row>
                    <Col lg='8'>
                        <ItemTable 
                            data={this.NarutoDB.getAllCharacters} 
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
                        getData = {this.NarutoDB.getCharacter}
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
                                : <RandomCards 
                                    getChar={this.NarutoDB.getCharacter} 
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
 
export default CharacterPage;