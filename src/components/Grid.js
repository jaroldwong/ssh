import React from 'react';

class Grid extends React.Component {
  render() {
    const generatedGrid = this.props.data.map(row => {
      return (
        <tr className="grid-table--border">
          {row.map(value => {
            return <td className="grid-table--border grid-table__cell--padding">{value}</td>;
          })}
        </tr>
      );
    });

    return (
      <table className="grid-table">
        <tr className="grid-table--border">
          <th className="grid-table--border grid-table__header--padding">Start</th>
          <th className="grid-table--border grid-table__header--padding">SSH</th>
          <th className="grid-table--border grid-table__header--padding">SSH</th>
          <th className="grid-table--border grid-table__header--padding">SSH</th>
          <th className="grid-table--border grid-table__header--padding">SSH</th>
          <th className="grid-table--border grid-table__header--padding">SSH</th>
          <th className="grid-table--border grid-table__header--padding">Young</th>
          <th className="grid-table--border grid-table__header--padding">Young</th>
          <th className="grid-table--border grid-table__header--padding">CMB</th>
          <th className="grid-table--border grid-table__header--padding">CMB</th>
          <th className="grid-table--border grid-table__header--padding">Kerr</th>
        </tr>
        {generatedGrid}
      </table>
    );
  }
}

export default Grid;
