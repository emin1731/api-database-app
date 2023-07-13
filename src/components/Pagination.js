import Pagination from 'react-bootstrap/Pagination';
import { Component } from 'react';


const PaginationBar = (props) =>  {
    // state = {
    //     selectedPage: null,
    //     totalItems: this.props.totalCharacters,
    //     pageSize: 20,
    //     currentPage: 20,

    // }

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
      } = props;


    //   const paginationRange = usePagination({
    //     currentPage,
    //     totalCount,
    //     siblingCount,
    //     pageSize
    //   });


    return (
        <Pagination style={{width:'100%'}}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            {/* <Pagination.Item>{2}</Pagination.Item> */}
            {/* <Pagination.Item>{3}</Pagination.Item> */}
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item>{14}</Pagination.Item>
            <Pagination.Item>{15}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    );

}
 
export default PaginationBar;