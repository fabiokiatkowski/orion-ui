import React, { Component } from 'react';
import Grid from '../components/Grid';

const columns = [{
  key: 'name',
  name: 'Nome',
  filterable: true,
  resizable: true,
  hidden: false
}];

const tempData = [
  { name: "João" },
  { name: "Malaquias" },
  { name: "Jozoias" },
  { name: "Jizf" },
  { name: "foo" },
  { name: "bar" },
  { name: "Matheues" }
]

export default class GridRepresentante extends Component {
  render() {
    return(
      <Grid
        data={tempData}
        columns={columns}
      />
    );
  } 
  
}
