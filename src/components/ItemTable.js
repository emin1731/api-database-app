import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function ItemTable({onItemSelected, itemList, isLoading}) {

    function renderItems(arr) {
        if(arr){
            return arr.map((item, id) => {
                 return (
                    <tr className="" key={id} onClick={() => onItemSelected(item.id)} style={{cursor: 'pointer'}}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                );
            });
         }
    }
    let items
    if(isLoading) {
        items = Array.from({length: 20}, (_, index) => {
            return (
                <tr className="" key={index}>
    
                   <td><Skeleton/></td>
                   <td><Skeleton/></td>
               </tr>
           );
        })
    }
    else {
        items = renderItems(itemList)
    }
    
    

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