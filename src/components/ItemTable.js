import Table from 'react-bootstrap/Table';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

function ItemTable({onItemSelected, itemList, isLoading}) {

    function renderItems(arr) {
        if(arr){
            return arr.map((item, id) => {
                 return (
                     <tr className="" key={id}>
                        <td>{item.id}</td>
                        <td>
                            <Link to={`/characters/${item.id}`} onClick={() => onItemSelected(item.id)} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                                {item.name}
                            </Link>
                        </td>
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