import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default function PaginationBar(props){
  return(
    <div style={{margin:"auto"}}>
      <Pagination>
        <Pagination.First disabled={props.current_page === 1} 
        onClick={() => props.handlePaginationClick(1)}/>
        <Pagination.Prev disabled={props.current_page === 1}
        onClick={() => props.handlePaginationClick(props.current_page-1)}/>
        <Pagination.Item>{props.current_page}</Pagination.Item>
        <Pagination.Next disabled={props.current_page === props.last_page} 
        onClick={() => props.handlePaginationClick(props.current_page+1)}/>
        <Pagination.Last disabled={props.current_page === props.last_page} 
        onClick={() => props.handlePaginationClick(props.last_page)}/>
      </Pagination>
    </div>
  );
}