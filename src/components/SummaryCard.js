import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import orderBy from 'lodash/orderBy';

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SummaryCard(props) {
  const { classes } = props;

  let counter = {};
  if (props.data) {
    props.data.forEach(row => {
      row.forEach((col, index) => {
        col.forEach(value => {
          if (value === '' || value.indexOf(':') > -1) return;

          if (!counter[value]) {
            counter[value] = 1;
          } else {
            counter[value] += 1;
          }
        });
      });
    });
  }

  let list = Object.keys(counter).map(name => ({ name: name, hours: counter[name] }));
  let sortedList = orderBy(list, ['hours', 'name'], ['desc', 'asc']);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Hours Summary
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedList.map((person, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {person.name}
                  </TableCell>
                  <TableCell numeric>{(person.hours * 30) / 60}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

SummaryCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SummaryCard);
