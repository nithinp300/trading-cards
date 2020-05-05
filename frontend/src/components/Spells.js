import React, {Component} from 'react';
import algoliasearch from 'algoliasearch/lite';
import './Spells.css';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
const searchClient = algoliasearch('XRSO3TSLU8', '658e7558b6f9829eef7e50f382bd32ba');

class Spells extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Brands</h2>
            <RefinementList attribute="brand" />
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit}/>
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}


export default Spells