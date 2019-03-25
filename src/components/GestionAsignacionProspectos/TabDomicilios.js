import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CATALOGO_TIPOS_DOMICILIO } from '../../constants/Generic';
import {DETALLES_PROSPECTO_DOMICILIOS_COLUMNS} from '../../constants/GestionAsignacionProspectos';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const TabDomicilios = props => {
    const { classes } = props;
    const { domicilios } = props.selectedProspect;
    return (
        <div
            style={
                {
                    margin: 10
                }
            }
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {DETALLES_PROSPECTO_DOMICILIOS_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {domicilios.map(domicilio => {
                        return (
                            <TableRow
                                hover={true}
                                key={`${domicilio.idDomicilio.consecutivo}-${domicilio.idDomicilio.tipoDomicilio}-${domicilio.idPersona}`}
                            >
                                <TableCell className={classes.tableCell}>{domicilio.idDomicilio.consecutivo}</TableCell>
                                <TableCell className={classes.tableCell}>{CATALOGO_TIPOS_DOMICILIO.find(tipoDomicilio => tipoDomicilio.claveTipoDomicilio === domicilio.idDomicilio.tipoDomicilio) !== undefined ? CATALOGO_TIPOS_DOMICILIO.find(tipoDomicilio => tipoDomicilio.claveTipoDomicilio === domicilio.idDomicilio.tipoDomicilio).nombreTipoDomicilio : domicilio.idDomicilio.tipoDomicilio}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.calle}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.noExterior}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.noInterior}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.cp}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.colonia}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.municipioDelegacion}</TableCell>
                                <TableCell className={classes.tableCell}>{domicilio.codigoEstado}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

TabDomicilios.propTypes = {
    selectedProspect: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabDomicilios);