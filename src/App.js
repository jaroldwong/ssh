import React, { Component } from 'react';

import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import SummaryCard from './components/SummaryCard';
import { Grid } from '@material-ui/core';

import XLSX from 'xlsx';
import axios from 'axios';

class App extends Component {
  state = {};

  componentDidMount() {
    var _this = this;

    axios
      .get('https://btwjpq291b.execute-api.us-west-1.amazonaws.com/default')
      .then(function(res) {
        _this.generateGridFromJSON(JSON.parse(res.data));
      });
  }

  generateGridFromJSON(data) {
    const totalCol = 11;

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

  handleFileSelect = event => {
    const _this = this;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const data = e.target.result;
      const arrBuffer = new Uint8Array(data);
      const wb = XLSX.read(arrBuffer, {
        type: 'array'
      });
      const convertedData = XLSX.utils.sheet_to_json(
        wb.Sheets[wb.SheetNames[0]],
        {
          defval: ''
        }
      );

      // Grab values and discard extraneous rows
      const startingRow = 2;
      const endingRow = 23;
      const values = convertedData.map(obj => Object.values(obj));
      const gridRows = values.slice(startingRow, endingRow);

      axios
        .post(
          'https://btwjpq291b.execute-api.us-west-1.amazonaws.com/default',
          JSON.stringify(gridRows)
        )
        .then(function(res) {
          _this.setState(() => {
            _this.generateGridFromJSON(gridRows);
          });
        });
    };

    reader.readAsArrayBuffer(file);
    event.target.value = null;
  };

  render() {
    return (
      <div>
        <Navbar onFileSelect={this.handleFileSelect} />
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
