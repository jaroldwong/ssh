import React, { Component } from 'react';

import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import SummaryCard from './components/SummaryCard';
import { Grid } from '@material-ui/core';

import axios from 'axios';
import XLSX from 'xlsx';

import * as data from './data.json';

class App extends Component {
  componentDidMount() {
    let URL = process.env.REACT_APP_URL;
    let TOKEN = process.env.REACT_APP_TOKEN;

    axios(URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      responseType: 'arraybuffer'
    }).then(res => {
      let data = new Uint8Array(res.data);
      let wb = XLSX.read(data, { type: 'array' });

      let JSON = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
      console.log(JSON);
    });

    this.generateGridFromJSON();
  }

  generateGridFromJSON() {
    const jsonData = data; // array of Row objects
    const startingRow = 2;
    const endingRow = 22;
    const totalCol = 12;
    const gridRows = [];

    for (let row = startingRow; row <= endingRow; row++) {
      let currentGridRow = [];
      for (const key in jsonData[row]) {
        currentGridRow.push(jsonData[row][key]);
      }

      gridRows.push(currentGridRow);
    }
    debugger;
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid container justify="center" style={{ padding: 24 }}>
          <Grid item xs={1} />
          <Grid item xs={7}>
            <CalendarGrid />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <SummaryCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
