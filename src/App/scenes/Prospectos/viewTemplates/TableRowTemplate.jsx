// Dependencies
import React from 'react';
//
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';

import Truncate from 'react-truncate';

//
const TableRowTemplate = props => {
  const { classes={tableCell:''} } = props;
  //
  return <TableRow hover={true}>
    <TableCell className={classes.tableCell}>{props.persona}</TableCell>
    <TableCell className={classes.tableCell}>{`${props.nombre} ${props.apellidoPaterno} ${props.apellidoMaterno}`}</TableCell>
    <TableCell className={classes.tableCell}>{props.rfcCalculado}</TableCell>
    <TableCell className={classes.tableCell}>
      <Truncate trimWhitespace width={200}>{props.domicilio}</Truncate>
    </TableCell>
    <TableCell className={classes.tableCell}>{props.codigoEstado}</TableCell>
    {props.fechaUltimaGestion !== null ?
      <TableCell className={classes.tableCell}>
        <Moment format="DD/MM/YYYY">{props.fechaUltGestion}</Moment>
      </TableCell> :
      <TableCell className={classes.tableCell}>{'-'}</TableCell>
    }
    <TableCell className={classes.tableCell}>
      <Tooltip title="Ver Detalle">
        <IconButton color="primary" onClick={() => props.handleRowChange(props.persona)} >
          <Icon>visibility</Icon>
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
}

// TODO: Fix class decorated by parent container
/*const TableRowTemplateRaw = props => {
  return <TableRow hover={true}>
    <TableCell>{props.persona}</TableCell>
    <TableCell>{`${props.nombre} ${props.apellidoPaterno} ${props.apellidoMaterno}`}</TableCell>
    <TableCell>{props.rfcCalculado}</TableCell>
    <TableCell>
      <Truncate trimWhitespace width={200}>{props.domicilio}</Truncate>
    </TableCell>
    <TableCell>{props.codigoEstado}</TableCell>
    {props.fechaUltimaGestion !== null
      ? <TableCell><Moment format="DD/MM/YYYY">{props.fechaUltGestion}</Moment></TableCell>
      : <TableCell>{'-'}</TableCell>
    }
    <TableCell>
      <Tooltip title="Ver Detalle">
        <IconButton color="primary" onClick={() => props.handleRowChange(props.persona)} >
          <Icon>visibility</Icon>
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
}*/

export default TableRowTemplate;
