import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('XRSO3TSLU8', '658e7558b6f9829eef7e50f382bd32ba');

function Spells(){
  return(
    <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}

export default Spells