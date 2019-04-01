// Dependencies
import React from 'react';
//
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Checkbox } from '@material-ui/core';

export const RowTemplate = props => {
  const { classes={tableCell:''} } = props;
  return <TableRow>
    <TableCell className={classes.tableCell}>{props.referencia} </TableCell>
    <TableCell className={classes.tableCell}>{props.nombre}     </TableCell>
    <TableCell className={classes.tableCell}>{props.particular} </TableCell>
    <TableCell className={classes.tableCell}>{props.celular}    </TableCell>
    <TableCell className={classes.tableCell}>{props.parentesco} </TableCell>
  </TableRow>
}

export const RowEditTemplate = props => {
  const { classes={tableCell:''} } = props;
  return <TableRow>
    <TableCell className={classes.tableCell}><Checkbox /> </TableCell>
    <TableCell className={classes.tableCell}>{props.nombre} </TableCell>
    <TableCell className={classes.tableCell}>{props.paterno}     </TableCell>
    <TableCell className={classes.tableCell}>{props.materno}     </TableCell>
    <TableCell className={classes.tableCell}>{props.parentesco} </TableCell>
    <TableCell className={classes.tableCell}>{props.particular} </TableCell>
    <TableCell className={classes.tableCell}>{props.celular}    </TableCell>
  </TableRow>
}