import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default function PaginationBar(props){
  return(
    <div style={{margin:"auto"}}>
      <Pagination>
        <Pagination.First disabled={props.currentPage === 1} 
        onClick={() => props.handlePaginationClick(1)}/>
        <Pagination.Prev disabled={props.currentPage === 1}
        onClick={() => props.handlePaginationClick(props.currentPage-1)}/>
        <Pagination.Item>{props.currentPage}</Pagination.Item>
        <Pagination.Next disabled={props.currentPage === props.lastPage} 
        onClick={() => props.handlePaginationClick(props.currentPage+1)}/>
        <Pagination.Last disabled={props.currentPage === props.lastPage} 
        onClick={() => props.handlePaginationClick(props.lastPage)}/>
      </Pagination>
    </div>
  );
}