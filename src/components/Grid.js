import React from 'react';

import { MONDAY } from '../seed';
class Grid extends React.Component {
  render() {
    let gridRows = MONDAY[0].map(() => []);

    MONDAY.forEach(column => {
      column.forEach((item, index) => {
        gridRows[index].push(item);
      });
    });

    const generatedGrid = gridRows.map(row => {
      return (
        <tr>
          {row.map(value => {
            return <td>{value}</td>;
          })}
        </tr>
      );
    });

    return (
      <table>
        <tr>
          <th>Start</th>
          <th>SSH</th>
          <th>SSH</th>
          <th>SSH</th>
          <th>SSH</th>
          <th>SSH</th>
          <th>SSH</th>
          <th>Young</th>
          <th>Young</th>
          <th>CMB</th>
          <th>CMB</th>
          <th>Kerr</th>
        </tr>
        {generatedGrid}
      </table>
    );
  }
}

export default Grid;
