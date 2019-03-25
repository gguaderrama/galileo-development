import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { STYLES } from '../../constants/styles';
import { NumberFormatCustom } from '../../utilities/format';

class DatosGeneralesCreditoComponent extends Component {

    
    componentDidMount() {
        this.props.calculaMontoPago();
    }
    

    render() {
        const { classes, descTipoAnalisis, montoSolicitado, montoPago } = this.props;
        return (
            <Paper className={classes.paperGenerales}>
                <Typography variant="body1" style={{paddingTop: '18px', paddingLeft: '18px'}} gutterBottom>
                    Datos crédito
                </Typography>
                <TextField label="Monto Crédito"
                    margin="dense"
                    className={classes.textField} 
                    disabled 
                    value={montoSolicitado || ''}
                    variant="filled"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }} />
                <TextField label="Monto Pago" 
                    margin="dense" 
                    className={classes.textField}
                    disabled 
                    value={montoPago || ''}
                    variant="filled"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }} />
                <TextField label="Tipo Análisis" 
                    margin="dense" 
                    className={classes.textField350}
                    disabled 
                    variant="filled"
                    value={(descTipoAnalisis && descTipoAnalisis.descripcion) || ''} />
            </Paper>
        )
    }
}

DatosGeneralesCreditoComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    descTipoAnalisis: PropTypes.object,
    montoSolicitado: PropTypes.string,
    montoPago: PropTypes.string,
    calculaMontoPago: PropTypes.func.isRequired,
};

export default withStyles(STYLES)(DatosGeneralesCreditoComponent);