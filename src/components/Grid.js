import React from 'react';

const START_TIMES = [
  '7:30AM',
  '8:00AM',
  '8:30AM',
  '9:00AM',
  '9:30AM',
  '10:00AM',
  '10:30AM',
  '11:00AM',
  '11:30AM',
  '12:00PM',
  '12:30PM',
  '1:00PM',
  '1:30PM',
  '2:00PM',
  '3:00PM',
  '4:00PM',
  '4:30PM',
  '5:00PM',
  '5:30PM'
];

class Grid extends React.Component {
  render() {
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

        {START_TIMES.map(startTime => (
          <tr>
            <td>{startTime}</td>
          </tr>
        ))}
      </table>
    );
  }
}

export default Grid;
