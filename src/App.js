import React, { Component } from 'react';

import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import SummaryCard from './components/SummaryCard';
import { Grid } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid container justify="center" spacing={24} style={{ padding: 24 }}>
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
