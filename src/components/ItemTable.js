import {Container, Row, Col} from 'react-bootstrap'
import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import NarutoDB from '../service/NarutoDB';


class ItemTable extends Component {
    NarutoDB = new NarutoDB()

        state = {
            itemList: null,
            currentPage: this.props.currentPage

    
        }


    componentDidMount() {
        const getData = this.props.data
        const page = this.state.currentPage
        // this.NarutoDB.getAllCharacters(3)
        getData(page)
            .then((itemList) => {
                this.setState({
                    itemList
                })
                
            })
    }
    renderItems(arr) {
        if(arr){
            return arr.map((item, id) => {
                 return (
                    <tr className="" key={id} onClick={() => this.props.onItemSelected(item.id)} style={{cursor: 'pointer'}}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                );
            });
         }
    }

    render() { 
        const items = this.renderItems(this.state.itemList)
        return (
            <div style={{paddingTop: '50px'}}>
                <Table  hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default ItemTable;