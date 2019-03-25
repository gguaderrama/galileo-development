import React from 'react';
import PropTypes from 'prop-types';
import { DETALLES_PROSPECTO_TELEFONOS_COLUMNS } from '../../constants/GestionAsignacionProspectos';
import { CATALOGO_TIPOS_TELEFONO, CATALOGO_TIPOS_PLAN } from '../../constants/Generic';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

const TabTelefonos = props => {
    const { classes } = props;
    const { telefonos } = props.selectedProspect;
    const { tipoTelefono, tipoPlan, telefono, extension } = props;
    const { handleTipoTelefonoChange, handleTipoPlanChange, handleTelefonoChange, handleExtensionChange, handleAgregarContactoOnClick } = props;

    return (
        <div
            style={
                {
                    margin: 10
                }
            }
        >
            <div>
                <Typography
                    variant="subtitle1"
                    style={
                        {
                            fontWeight: 500
                        }
                    }
                >
                    Agregar Datos Contacto
                </Typography>
                <FormControl
                    className={classes.formControl}
                    required={true}
                >
                    <InputLabel
                        disabled={tipoTelefono.disabled}
                        htmlFor="tipo-telefono-simple"
                    >
                        Tipo Teléfono
                    </InputLabel>
                    <Select
                        readOnly={tipoTelefono.readOnly}
                        value={tipoTelefono.value}
                        error={tipoTelefono.errror}
                        disabled={tipoTelefono.disabled}
                        onChange={handleTipoTelefonoChange}
                        inputProps={{
                            name: 'tipo-telefono',
                            id: 'tipo-telefono-simple',
                        }}
                    >
                        {CATALOGO_TIPOS_TELEFONO.map(tipoTelefono => <MenuItem key={tipoTelefono.claveTipoTelefono} value={tipoTelefono.claveTipoTelefono}>{tipoTelefono.nombreTipoTelefono}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    required={true}
                >
                    <InputLabel
                        disabled={tipoPlan.disabled}
                        htmlFor="tipo-plan-simple"
                    >
                        Tipo Plan
                    </InputLabel>
                    <Select
                        readOnly={tipoPlan.readOnly}
                        value={tipoPlan.value}
                        error={tipoPlan.error}
                        disabled={tipoPlan.disabled}
                        onChange={handleTipoPlanChange}
                        inputProps={{
                            name: 'tipo-plan',
                            id: 'tipo-plan-simple',
                        }}
                    >
                        {CATALOGO_TIPOS_PLAN.map(tipoPlan => <MenuItem key={tipoPlan.claveTipoPlan} value={tipoPlan.claveTipoPlan}>{tipoPlan.nombreTipoPlan}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    style={
                        {
                            marginTop: 8
                        }
                    }
                    required={true}
                    error={telefono.error}
                >
                    <InputLabel>
                        Teléfono
                    </InputLabel>
                    <Input
                        value={telefono.value}
                        onChange={handleTelefonoChange}
                        aria-describedby='telefonoError'
                    >
                    </Input>
                    {
                        telefono.error === true &&
                        <FormHelperText
                            id='telefonoError'
                        >
                            Necesariamente debe contener 10 digitos
                        </FormHelperText>
                    }
                </FormControl>
                <TextField
                    className={classes.formControl}
                    label='Extensión'
                    value={extension.value}
                    onChange={handleExtensionChange}
                    margin='normal'
                >
                </TextField>
                <div className={classes.divButtonContainer}>
                    <Tooltip
                        title='Agregar Contacto'
                    >
                        <div>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='primary'
                                onClick={handleAgregarContactoOnClick}
                            >
                                Agregar Contacto
                            </Button>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div
                style={
                    {
                        paddingTop: 50
                    }
                }
            >
                <Typography
                    variant="subtitle1"
                    style={
                        {
                            fontWeight: 500
                        }
                    }
                >
                    Datos Contacto
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {DETALLES_PROSPECTO_TELEFONOS_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {telefonos.map(telefono =>
                            <TableRow
                                hover={true}
                                key={`${telefono.idTelefono.consecutivo}-${telefono.idTelefono.tipoTelefono}-${telefono.tipoPlan}`}
                            >
                                <TableCell className={classes.tableCell}>{telefono.idTelefono.consecutivo}</TableCell>
                                <TableCell className={classes.tableCell}>{CATALOGO_TIPOS_TELEFONO.find(tipoTelefono => tipoTelefono.claveTipoTelefono === telefono.idTelefono.tipoTelefono) !== undefined ? CATALOGO_TIPOS_TELEFONO.find(tipoTelefono => tipoTelefono.claveTipoTelefono === telefono.idTelefono.tipoTelefono).nombreTipoTelefono : telefono.idTelefono.tipoTelefono}</TableCell>
                                <TableCell className={classes.tableCell}>{telefono.tipoPlan}</TableCell>
                                <TableCell className={classes.tableCell}>{telefono.telefono}</TableCell>
                                <TableCell className={classes.tableCell}>{telefono.extension}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

TabTelefonos.propTypes = {
    selectedProspect: PropTypes.object.isRequired,
    tipoTelefono: PropTypes.object.isRequired,
    tipoPlan: PropTypes.object.isRequired,
    telefono: PropTypes.object.isRequired,
    extension: PropTypes.object.isRequired,

    handleTipoTelefonoChange: PropTypes.func.isRequired,
    handleTipoPlanChange: PropTypes.func.isRequired,
    handleTelefonoChange: PropTypes.func.isRequired,
    handleExtensionChange: PropTypes.func.isRequired,
    handleAgregarContactoOnClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(TabTelefonos);