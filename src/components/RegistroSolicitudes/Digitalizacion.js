import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { DATOS_DIGITALIZA } from '../../constants/RegistroSolicitud/registroSolicitud';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles';
import DigitalizacionComponent from './DigitalizacionComponent';


let DWObject;
let DW_RIGHTObject;
const Digitalizacion = (props) => {
    const { handleOpenDigitalizaComponent, classes, integrantes, openDigitaliza, handleCloseDigitalizaComponent } = props;
    let nombreCompleto = '';
    console.log("props", props)
    return (
        <div className={classes.containerBusqueda}>
            <Paper>
                <Table className={classes.tablaPreScoreCont} >
                    <TableHead>
                        <TableRow>
                            {DATOS_DIGITALIZA.map(fila => {
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
                                    <Tooltip title="Digitalizar">
                                        <TableCell className={classes.tableCell}>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenDigitalizaComponent()}>
                                                <Icon>link</Icon>
                                            </IconButton>{integrante.adjuntar}
                                        </TableCell>
                                    </Tooltip>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
            <div>
                <DigitalizacionComponent DW_RIGHTObject={DW_RIGHTObject} DWObject={DWObject} handleCloseDigitalizaComponent={handleCloseDigitalizaComponent} openDigitaliza={openDigitaliza} />

            </div>
        </div >



    );
};

Digitalizacion.propTypes = {
    classes: PropTypes.object,
    integrantes: PropTypes.array.isRequired,

};

export default withStyles(registroStyle)(Digitalizacion);

