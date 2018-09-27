import React, { Component } from 'react';

import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import SummaryCard from './components/SummaryCard';
import { Grid } from '@material-ui/core';

import axios from 'axios';
import XLSX from 'xlsx';

class App extends Component {
  componentDidMount() {
    let URL = process.env.REACT_APP_URL;
    let TOKEN = process.env.REACT_APP_TOKEN;

    debugger;
    axios(URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      responseType: 'arraybuffer'
    }).then(res => {
      let data = new Uint8Array(res.data);
      let wb = XLSX.read(data, { type: 'array' });

      let JSON = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      console.log(JSON);
    });
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
