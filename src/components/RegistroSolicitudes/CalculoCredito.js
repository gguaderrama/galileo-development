import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles'
import { reduxForm } from 'redux-form';

const CalculoCredito = (props) => {
    const { classes, tipoAnalisis, descripciones, datosSolicitud } = props;
    const tipo = (tipoAnalisis && descripciones) && descripciones.find(item => item.codigo === tipoAnalisis.tipoAnalisis);
    return (
        <form>
            {tipoAnalisis && tipoAnalisis.clave !== 'ERROR' ?
                <div className={classes.containerCalculoCredito}>
                    <Paper style={{
                        width: '397.4px',
                        height: '100px',
                        marginLeft: '120px',
                        marginRight: '106.05px'
                    }}>
                        <Typography className={classes.encabezadoCalculoCredito} > Monto Total Crédito</Typography>
                        <Typography className={classes.contenido} >
                            {
                                datosSolicitud && datosSolicitud.montoOtorgado &&
                                `$ ${datosSolicitud.montoOtorgado}.00`
                            }
                        </Typography>
                    </Paper>
                    <Paper style={{
                        width: '397.4px',
                        height: '100px',
                        marginRight: '102.25px'
                    }}>
                        <Typography className={classes.encabezadoCalculoCredito} > Monto Pago</Typography>
                        <Typography className={classes.contenido} >
                            {
                                datosSolicitud && datosSolicitud.montoPago &&
                                `$ ${datosSolicitud.montoPago}.00`
                            }
                        </Typography>
                    </Paper>
                    <Paper style={{
                        width: '397.4px',
                        height: '100px',
                        marginRight: '100px'
                    }}>
                        <Typography className={classes.encabezadoCalculoCredito} > Tipo Análisis</Typography>
                        <Typography className={classes.contenido} > {tipo.descripcion}</Typography>
                    </Paper>

                </div> : null
            }
        </form >
    );
};

CalculoCredito.propTypes = {
    classes: PropTypes.object,
    tipoAnalisis: PropTypes.object,
    descripciones: PropTypes.array,
    datosSolicitud: PropTypes.object,
    objMontoPagoSinSeguro: PropTypes.object
};

const CalculoCreditoForm = reduxForm({ form: 'CalculoCredito', destroyOnUnmount: false })(CalculoCredito);
export default withStyles(registroStyle)(CalculoCreditoForm);
