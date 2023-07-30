import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function ItemTable({onItemSelected, itemList, isLoading}) {

    // const [loading, setLoading] = useState(true)

    function renderItems(arr) {
        if(arr){
            return arr.map((item, id) => {
                 return (
                    <tr className="" key={id} onClick={() => onItemSelected(item.id)} style={{cursor: 'pointer'}}>
                        <td>{isLoading ? <Skeleton/> : item.id}</td>
                        <td>{isLoading ? <Skeleton/> : item.name}</td>
                    </tr>
                );
            });
         }
    }
    // function onItemLoaded() {
    //     // setLoading(false)
    // }
    const items = renderItems(itemList)

    return (
        <div style={{paddingTop: '50px'}}>
            <Table  hover >
                <thead>
                    <tr>
                        <th style={{width: '70px'}}>#</th>
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
 
export default ItemTable;