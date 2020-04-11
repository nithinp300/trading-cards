import React from 'react';

function FilterSort(props) {
  return(
    <div>
      <div style={{float:"left"}}>
        <label>&nbsp;Attribute: &nbsp;</label>
        <select value={props.attribute} onChange={props.handleChange} name="attribute">
          <option value="">Choose</option>
          <option value="DARK">Dark</option>
          <option value="DIVINE">Divine</option>
          <option value="EARTH">Earth</option>
          <option value="FIRE">Fire</option>
          <option value="LIGHT">Light</option>
          <option value="WATER">Water</option>
          <option value="WIND">Wind</option>
        </select>
        <label>&nbsp; Monster Type: &nbsp;</label>
        <select value={props.type} name="type">
        </select>
        <label>&nbsp; Archetype: &nbsp;</label>
        <select value={props.type} name="type">
        </select>
      </div>
      <div style={{float:"right"}}>
        <label>Sort by &nbsp;</label>
        <select value={props.sortBy} onChange={props.handleChange} name="sortBy">
          <option value="name">Name: A to Z</option>
          <option value="-name">Name: Z to A</option>
          <option value="atk">ATK: Low to High</option>
          <option value="-atk">ATK: High to Low</option>
          <option value="def">DEF: Low to High</option>
          <option value="-def">DEF: High to Low</option>
          <option value="level">Level: Low to High</option>
          <option value="-level">Level: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default FilterSort