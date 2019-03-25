import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { STYLES } from '../../constants/styles';

class DatosGeneralesSolicitudComponent extends Component {
    
    render() {
        const { classes, 
            solicitud, 
            fechaSolicitud, 
            cliente, 
            grupoVentas, 
            vendedor, 
            origen, 
            nombreVendedor, 
            mensajeError, persona , calificacion  } = this.props;
        return (
            <Paper className={classes.paperGenerales}>
                <Typography variant="body1" style={{paddingTop: '18px', paddingLeft: '18px'}} gutterBottom>
                    Solicitud {solicitud}
                </Typography>
                <TextField label="Fecha Solicitud"
                    margin="normal" 
                    className={classes.textField}
                    value={(fechaSolicitud && fechaSolicitud.substring(0, 10)) || ''}
                    disabled
                    variant="filled" />
                <TextField label="No. Cliente" 
                    margin="normal" 
                    className={classes.textField}
                    value={cliente || ''}
                    variant="filled"
                    disabled />
                <TextField label="Nombre Cliente" 
                    margin="normal" 
                    className={classes.textField350}
                    value={`${persona.nombre || ''} ${persona.apellidoPaterno || ''}  ${persona.apellidoMaterno || ''}`}
                    variant="filled"
                    disabled />                
                <TextField label="Grupo" 
                    margin="normal" 
                    className={classes.textField}
                    value={grupoVentas || ''}
                    variant="filled"
                    disabled />
                <TextField label="Origen" 
                    margin="normal" 
                    className={classes.textField}
                    value={origen || ''}
                    variant="filled"
                    disabled />
                <TextField label="Calificación" 
                    margin="normal" 
                    className={classes.textField}
                    value={calificacion || 0}
                    variant="filled"
                    disabled />
                <TextField label="Vendedor" 
                    margin="normal" 
                    className={classes.textField350}
                    value={`${vendedor || ''} - ${nombreVendedor || ''}`}
                    variant="filled"
                    disabled />
                { mensajeError && 
                    <TextField label="Mensaje de error" 
                        margin="normal" 
                        className={classes.textField350}
                        value={mensajeError}
                        disabled
                        variant="filled"
                        error/>
                }
            </Paper>
        )
    }
}

DatosGeneralesSolicitudComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(STYLES)(DatosGeneralesSolicitudComponent);