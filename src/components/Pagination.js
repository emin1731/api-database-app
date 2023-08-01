import Pagination from 'react-bootstrap/Pagination';
import { useMemo } from 'react';


const PaginationBar = (props) =>  {
    const {
        totalCount,
        currentPage,
        onPageChange,
        siblingCount = 3,
        pageSize,
        className
    } = props;


    const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
    return null;
    }

    const onNext = () => {
    onPageChange(currentPage + 1)
    }

    const onPrev = () => {
    onPageChange(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Pagination style={{width:'100%'}}>
            <Pagination.First disabled = {currentPage === 1} onClick={() => onPageChange(1)}/>
            <Pagination.Prev disabled = {currentPage === 1} onClick={onPrev}/>
            {
                paginationRange.map((item, id) => {
                    if(item === 'DOTS') {
                        return <Pagination.Ellipsis key={id}/>
                    }
                    if(item === currentPage) {
                        return <Pagination.Item active key={id}>{item}</Pagination.Item>
                    }

                    return <Pagination.Item  onClick={() => onPageChange(item)} className='pagination-item' key={id}>{item}</Pagination.Item>
                })
            }

            <Pagination.Next disabled = {currentPage === lastPage} onClick={onNext}/>
            <Pagination.Last disabled = {currentPage === lastPage} onClick={() => onPageChange(lastPage)}/>
        </Pagination>
    );

}



 const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {
    const paginationRange = useMemo(() => {
       // Our implementation logic will go here 
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5;

        if(totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if(!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount);
            return [...leftRange, 'DOTS', totalPageCount]
        }

        if(shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount, totalPageCount);
            return [firstPageIndex, 'DOTS', ...rightRange]
        }

        if(shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex]
        }
    

    }, [totalCount, pageSize, siblingCount, currentPage]);
  
    return paginationRange;
  };

 
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);

}

export default PaginationBar;