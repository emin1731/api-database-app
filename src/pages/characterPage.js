import { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap'

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
            currentPage: 20,
            characterList: null,
            totalCharacters: null

        }
    }
    componentDidMount() {
        this.NarutoDB.getTotalCharacterCount()
        .then((res) => {
            this.setState({
                totalCharacters: res
            })
        })

        this.NarutoDB.getAllCharacters(this.state.currentPage)
        .then((characterList) => {
            
            this.setState({
                characterList
            })
            
        })
        
 

    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentPage !== this.state.currentPage) {
        console.log('UPDATE', prevState)
        this.NarutoDB.getAllCharacters(this.state.currentPage)
        .then((characterList) => {
            
            this.setState({
                characterList
            })
            
        })
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
                    <RandomCards/>
                </Row>
                <Row>
                    <Col lg='8'>
                        <ItemTable 
                            data={this.NarutoDB.getAllCharacters} 
                            onItemSelected={(id) => this.onItemSelected(id)}
                            currentPage={this.state.currentPage}
                            itemList={this.state.characterList}/>
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
                    </Col>
                </Row>

            </Container>
        );
    }
}
 
export default CharacterPage;