// Dependencies
import React from 'react';
//
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Tooltip, Icon, IconButton, Checkbox } from '@material-ui/core';

export const RowBeneficiarioTemplate = props => {
  const { classes={tableCell:''}, view } = props;
  console.log(view);
  //
  return <TableRow>
    <TableCell className={classes.tableCell}>
      <Checkbox />
    </TableCell>
    <TableCell className={classes.tableCell}>{props.nombre}     </TableCell>
    <TableCell className={classes.tableCell}>{props.relacion} </TableCell>
    <TableCell className={classes.tableCell}>{props.porcentaje}    </TableCell>
    <TableCell className={classes.tableCell}>
      <Tooltip title="Editar">
        <IconButton color="primary">
          <Icon>edit</Icon>
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
}
