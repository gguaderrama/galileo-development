import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow, Icon } from '@material-ui/core';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from './../Generic/SnackbarNotificacion';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { DATOS_PRESCORE } from '../../constants/RegistroSolicitud/registroSolicitud';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles'

const TablaScore = (props) => {
    const { classes, integrantes, handleClick, handleOnClick } = props;
    const { openDialog, closeDialog } = props;
    const { respuestaScore, buttonRegistro } = props;
    const { snackbarNotificacion, openSnackBar, handleCloseSnack } = props;
    console.log("respuestaScore", respuestaScore)
    let nombreCompleto = '';
    return (
        <div className={classes.containerBusqueda}>
            <Paper>
                <Table className={classes.tablaPreScoreCont} >
                    <TableHead>
                        <TableRow>
                            {DATOS_PRESCORE.map(fila => {
                                return (
                                    <TableCell
                                        key={fila.id} className={classes.tableCell}>
                                        {fila.label}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {integrantes.map((integrante, i) => {
                            if (integrante.apellidoMaterno) {
                                nombreCompleto = `${integrante.nombre} ${integrante.apellidoPaterno} ${integrante.apellidoMaterno}`;
                            }
                            return (
                                <TableRow
                                    hover={true} /* onClick={event => handleClick(event, integrante)} */ key={i} >
                                    <TableCell className={classes.tableCell}>{integrante.persona}</TableCell>
                                    <TableCell className={classes.tableCell}>{nombreCompleto}</TableCell>
                                    <TableCell className={classes.tableCell}>{integrante.relacionConPersona}</TableCell>
                                    <TableCell className={classes.tableCell}>{respuestaScore ? respuestaScore.motivoResultadoPreaprobacion === 'APRUEBA' ?
                                        <Icon color="primary">check_circle</Icon> :
                                        <Icon color="error">highlight_off</Icon> :
                                        '-'}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div style={{ marginTop: '30px', marginLeft: '1270px' }}>
                    {!buttonRegistro ?
                        <Tooltip title="Evaluar Prescore">
                            <Button
                                disabled={respuestaScore && respuestaScore.motivoResultadoPreaprobacion !== 'APRUEBA' && true}
                                style={{ marginBottom: '10px' }}
                                onClick={handleClick}
                                variant="contained" color="primary"
                                type="submit">
                                Evaluar</Button>
                        </Tooltip>
                        :
                        <Tooltip title="Registrar Solicitud">
                            <Button
                                color="primary"
                                onClick={handleOnClick}
                                style={{ marginBottom: '10px' }}
                                variant="contained">
                                Registrar</Button>
                        </Tooltip>
                    }
                </div>
            </Paper>
            <div>
                <DialogNotificationModal
                    {...openDialog}
                    handleClose={closeDialog}
                    handleOnClose={() => { }} />

                <SnackbarNotificacion
                    {...snackbarNotificacion}
                    opened={openSnackBar}
                    onClose={handleCloseSnack} />
            </div>
        </div >



    );
};

TablaScore.propTypes = {
    classes: PropTypes.object,
    integrantes: PropTypes.array.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default withStyles(registroStyle)(TablaScore);
