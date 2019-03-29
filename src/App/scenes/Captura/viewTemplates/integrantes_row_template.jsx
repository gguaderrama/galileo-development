// Dependencies
import React from 'react';
//
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';

import Truncate from 'react-truncate';

//
const TableRowTemplate = props => {
  const { classes={tableCell:''} } = props;

  return <TableRow hover={true}>
    <TableCell className={classes.tableCell}>{props.nombre}</TableCell>
    <TableCell className={classes.tableCell}>{props.monto}</TableCell>
    <TableCell className={classes.tableCell}>{props.efectivo}</TableCell>
    <TableCell className={classes.tableCell}>{props.pago}</TableCell>
    <TableCell className={classes.tableCell}>
      <Truncate trimWhitespace width={200}>{props.tipo_relacion}</Truncate>
    </TableCell>
      <TableCell className={classes.tableCell}>
      <Tooltip title="Ver Detalle">
        <IconButton color="primary" onClick={e => props.handleRowChange(e, 'panelInfo')} >
          
          <Icon>visibility</Icon>
        </IconButton>
      </Tooltip>
    </TableCell>

      <TableCell className={classes.tableCell}>
      <Tooltip title="Eliminar">
        <IconButton color="primary" onClick={(e) => props.handleRowChange(e, 'panelDelete')} >
           <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
}

export default TableRowTemplate;
