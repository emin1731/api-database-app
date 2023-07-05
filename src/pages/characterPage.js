// Pagination logic
// 

// import { Container } from 'react-bootstrap';
import { Component } from 'react'
import {Container, Row, Col, Pagination} from 'react-bootstrap'

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
            currentPage: 20
            // data: this.props.data,
            // img: null,

        }
    }

    componentDidMount() {
    }
    componentDidUpdate() {
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
                        <ItemTable data={this.NarutoDB.getAllCharacters} onItemSelected={(id) => this.onItemSelected(id)}/>
                        <PaginationBar />
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