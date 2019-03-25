import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { toolbarStyles } from './styles/styles'
import { DATOS_INTEGRANTES } from '../../constants/RegistroSolicitud/registroSolicitud';
import { withStyles } from '@material-ui/core/styles';
import DialogoDatosSolicitante from './DialogoDatosSolicitante';
import { registroStyle } from './styles/styles'

const TableIntegranteHead = props => {
  const { classes, onSelectAllClick, numSelected, rowCount } = props;
  const {  modeloBPM } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {modeloBPM && modeloBPM.calulaPrescore &&
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick} />}
        </TableCell>
        {DATOS_INTEGRANTES.map(row => {
          return (
            <TableCell
              className={classes.tableCell}
              key={row.id}
            >
              {row.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = props => {
  const { numSelected, classes, handleClickDelete, selected } = props;

  return (
    <Toolbar >
      <div className={classes.spacer}>
        <Typography
          style={{ marginLeft: '15px' }}
          align='left'
          color="inherit">
          Integrantes</Typography>


      </div>
      <div className={classes.actions}>
        {numSelected > 0 && numSelected < 2 ? (
          <div style={{ display: 'flex' }} >
            {selected ? selected[0].id !== 1 && (
              <Tooltip title="Eliminar">
                <IconButton color="primary" onClick={handleClickDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>) : null
            }
          </div>
        ) : (numSelected > 1 ? <Tooltip title="Eliminar">
          <IconButton color="primary" onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> : null
          )}
      </div>
    </Toolbar >
  );
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const TablaIntegrantes = props => {
  const { classes, integrantes, modeloBPM } = props;
  const { selected, open ,enabledRegistro } = props;
  const { handleSelectAllClick, handleDeleteIntegrante, handleOpenDialog, isSelected, handleClick, handleClose, registroSolicitud } = props;
  let nombreCompleto = '';
  return (
    <div className={classes.containerBusqueda}>

      {modeloBPM && !modeloBPM.calulaPrescore &&
        <Typography
          style={{ fontSize: '1.25em' }}
          align='left'
          color="primary">
          El producto no requiere preevalución</Typography>
      }
      <Paper>

        <EnhancedTableToolbar
          selected={selected}
          numSelected={selected.length}
          handleClickOpen={handleOpenDialog}
          handleClickDelete={handleDeleteIntegrante} />

        <Table className={classes.tablaPreScoreCont}>
          <TableIntegranteHead
            classes={classes}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={integrantes.length}
            modeloBPM={modeloBPM} />
          <TableBody>
            {
              integrantes.map((integrante, i) => {
                const integranteSelected = isSelected(integrante);
                if (integrante.apellidoMaterno) {
                  nombreCompleto = `${integrante.nombre} ${integrante.apellidoPaterno} ${integrante.apellidoMaterno}`;

                } else if (!integrante.apellidoMaterno) {
                  nombreCompleto = `${integrante.nombre} ${integrante.apellidoPaterno}`;
                }
                return (
                  <TableRow
                    hover={true} onClick={event => handleClick(event, integrante)}
                    key={i} selected={integranteSelected}>
                    <TableCell >
                      {modeloBPM && modeloBPM.calulaPrescore &&
                        <Checkbox color="primary" checked={integranteSelected} />}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{integrante.persona}</TableCell>
                    <TableCell className={classes.tableCell}>{nombreCompleto}</TableCell>
                    <TableCell className={classes.tableCell} >{integrante.efectivoSolicitado ? `$ ${integrante.efectivoSolicitado}.00` : '$ 0'}</TableCell>
                    <TableCell className={classes.tableCell} >{integrante.montoSeguro ? `$ ${integrante.montoSeguro}.00` : '$ 0'}</TableCell>
                    <TableCell className={classes.tableCell} >{integrante.montoPago ? `$ ${integrante.montoPago}.00` : '$ 0'}</TableCell>
                    <TableCell className={classes.tableCell}>{integrante.relacionConPersona}</TableCell>
                    <Tooltip title="Editar">
                      <TableCell className={classes.tableCell}>
                        {modeloBPM && modeloBPM.calulaPrescore &&
                          <IconButton
                            disabled={selected.length > 0 ? true : false}
                            color="primary"
                            onClick={handleOpenDialog}>
                            <EditIcon />
                            {integrante.editar}
                          </IconButton>
                        }
                      </TableCell>
                    </Tooltip>

                  </TableRow>
                );
              })}
          </TableBody>

          {/* <TableFooter>

          <Typography className={classes.integrantes} >Integrantes : {integrantes.length} de {condicionesProducto.maxIntegrantes} </Typography>
        </TableFooter> */}
        </Table>
        {enabledRegistro &&
          <div style={{ marginTop: '30px', marginLeft: '1270px' }}>
            <Button

              onClick={() => registroSolicitud()}
              style={{ marginBottom: '10px' }}
              variant="contained"
              color="primary"
              type="submit" >
              Registrar</Button>
          </div>
        }
        <DialogoDatosSolicitante {...props} open={open} handleClose={handleClose} integrante={selected} classes={classes} />
      </Paper>

    </div>
  )
}

TablaIntegrantes.propTypes = {
  classes: PropTypes.object,
  integrantes: PropTypes.array.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  handleDeleteIntegrante: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modeloBPM: PropTypes.object
};

export default (withStyles(registroStyle)(TablaIntegrantes));