import React from 'react';
//
import TableCell from '@material-ui/core/TableCell';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

const TableCellBasic = props => {
  const { classes={tableCell:''} } = props;
  return <TableCell className={classes.tableCell}>{props.children}</TableCell>
}

export default withStyles(styles)(TableCellBasic);
