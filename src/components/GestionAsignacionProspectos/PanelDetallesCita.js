import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelDetallesCita = props => {
    const { classes } = props;
    const { selectedDate } = props;
    return (
        <div>
            <Typography
                variant="subtitle1"
                style={
                    {
                        fontWeight: 500
                    }
                }
            >
                Cita Actual
            </Typography>
            <div>
                <TextField
                    label="Clave Empresa"
                    value={selectedDate.claveEmpresa}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Codigo Campaña"
                    value={selectedDate.codigoCampania}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Periodo"
                    value={selectedDate.periodo}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Id Prospecto"
                    value={selectedDate.idProspecto}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Id Gestion"
                    value={selectedDate.idGestion}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
            <div>
                <TextField
                    label="Codigo Contacto"
                    value={selectedDate.codigoContacto}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Codigo Resultado"
                    value={selectedDate.codigoResultado}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Fecha Cita"
                    value={selectedDate.fechaCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Hora Cita"
                    value={selectedDate.horaCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Codigo Tipo Cita"
                    value={selectedDate.codigoTipoCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
            <div>
                <TextField
                    label="Codigo Lugar Cita"
                    value={selectedDate.codigoLugarCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Gestor"
                    value={selectedDate.gestor}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Fecha Gestion"
                    value={selectedDate.fechaGestion}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Estatus Cita"
                    value={selectedDate.statusCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Fecha Cierre Cita"
                    value={selectedDate.fechaCierreCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
            <div>
                <TextField
                    label="Fecha Fin Cita"
                    value={selectedDate.fechaFinCita}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    className={classes.formControlExtended}
                    label="Nombre Prospecto"
                    value={selectedDate.nombreProspecto}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    className={classes.formControlExtended}
                    label="Nombre Gestor"
                    value={selectedDate.nombreGestor}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
            <div>
                <TextField
                    className={classes.formControl}
                    label='Comentario'
                    margin='normal'
                    fullWidth={true}
                    multiline={true}
                    value={selectedDate.comentarios}
                    InputProps={
                        {
                            readOnly: true
                        }
                    }
                >
                </TextField>
            </div>
        </div>
    );
};

PanelDetallesCita.propTypes = {

};

export default withStyles(styles)(PanelDetallesCita);