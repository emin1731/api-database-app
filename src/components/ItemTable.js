import Table from 'react-bootstrap/Table';

function ItemTable({onItemSelected, itemList}) {

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

    const items = renderItems(itemList)

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
 
export default ItemTable;