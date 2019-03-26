// Dependencies
import React from 'react';
//
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const RowTemplate = props => {
  const { classes={tableCell:''} } = props;
  //
  return <TableRow hover={true}>
    <TableCell className={classes.tableCell}>{props.referencia}</TableCell>
    <TableCell className={classes.tableCell}>{props.nombre}</TableCell>
    <TableCell className={classes.tableCell}>{props.particular}</TableCell>
    <TableCell className={classes.tableCell}>{props.celular}</TableCell>
    <TableCell className={classes.tableCell}>{props.parentesco}</TableCell>
  </TableRow>
}
