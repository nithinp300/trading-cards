import React from 'react';

function FilterSort(props) {
  let monsterTypeData = ['Normal Monster', 'Normal Tuner Monster', 'Effect Monster', 
  'Tuner Monster', 'Flip Effect Monster', 'Spirit Monster', 'Union Effect Monster', 
  'Gemini Monster', 'Pendulum Effect Monster', 'Pendulum Normal Monster', 
  'Pendulum Tuner Effect Monster', 'Ritual Monster', 'Ritual Effect Monster', 
  'Toon Monster', 'Fusion Monster', 'Synchro Monster', 'Synchro Tuner Monster', 
  'Synchro Pendulum Effect Monster', 'XYZ Monster', 'XYZ Pendulum Effect Monster', 
  'Link Monster', 'Pendulum Flip Effect Monster', 'Pendulum Effect Fusion Monster'];
  let MonsterOptions = monsterTypeData.map(typeName => {
    return(<option value={typeName}>{typeName}</option>)
  })
  let typeData = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 
  'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 
  'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 
  'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 
  'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
  let TypeOptions = typeData.map(typeName => {
    return(<option value={typeName}>{typeName}</option>)
  })
  return(
    <div>
      <div style={{float:"left"}}>
        <label>&nbsp; Monster Type:&nbsp;</label>
        <select value={props.monsterType} onChange={props.handleChange} name="monsterType">
          <option value="">Choose</option>
          {MonsterOptions}
        </select>
        <label>&nbsp; Attribute:&nbsp;</label>
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
        <label>&nbsp; Type:&nbsp;</label>
        <select value={props.type} onChange={props.handleChange} name="type">
          <option value="">Choose</option>
          {TypeOptions}
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