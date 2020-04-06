import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default function PaginationBar(){
  return(
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}