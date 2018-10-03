import React, { Component } from 'react';

import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import SummaryCard from './components/SummaryCard';
import { Grid } from '@material-ui/core';

import axios from 'axios';
import XLSX from 'xlsx';
import firebase from './firebase.js';

class App extends Component {
  state = {};

  componentDidMount() {
    let dbRef = firebase.database().ref('data');

    axios(URL, {
      responseType: 'arraybuffer'
    }).then(res => {
      const data = new Uint8Array(res.data);
      const wb = XLSX.read(data, { type: 'array' });
      const JSON = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
      console.log(JSON);

      // Grab values and discard extraneous rows
      const startingRow = 2;
      const endingRow = 23;
      const values = JSON.map(obj => Object.values(obj));
      const gridRows = values.slice(startingRow, endingRow);

      dbRef.set(gridRows);
    });

    dbRef.on('value', snapshot => {
      let data = snapshot.val();
      this.generateGridFromJSON(data);
    });
  }

  generateGridFromJSON(data) {
    const totalCol = 12;

    let MONDAY = [];
    let TUESDAY = [];
    let WEDNESDAY = [];
    let THURSDAY = [];
    let FRIDAY = [];

    data.forEach(row => {
      MONDAY.push(row.slice(0, totalCol));
      TUESDAY.push(row.slice(totalCol, totalCol * 2));
      WEDNESDAY.push(row.slice(totalCol * 2, totalCol * 3));
      THURSDAY.push(row.slice(totalCol * 3, totalCol * 4));
      FRIDAY.push(row.slice(totalCol * 4, totalCol * 5));
    });

    this.setState(() => {
      return { data: [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY] };
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid container justify="center" style={{ padding: 24 }}>
          <Grid item xs={1} />
          <Grid item xs={7}>
            <CalendarGrid data={this.state.data} />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <SummaryCard data={this.state.data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
