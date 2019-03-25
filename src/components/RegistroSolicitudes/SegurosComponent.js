import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper } from '@material-ui/core';
import { NumberFormatCustom } from 'utilities/format';

export const SegurosComponent = (props) => {
    const { classes, seguroDesempleo } = props;
    return (
        <div>
            <Paper>
                <TextField label="Producto"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroDesempleo.descripcionProductoSeguro}
                    InputProps={{

                        readOnly: true,
                    }} />
                <TextField label="Tipo Seguro"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroDesempleo.tipoSeguro}
                    InputProps={{

                        readOnly: true,
                    }} />
                <TextField label="Suma Asegurada"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroDesempleo.sumaAsegurada}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        readOnly: true,
                    }} />
                <TextField label="Monto"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroDesempleo.montoPagoAnual}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        readOnly: true,
                    }} />
            </Paper>
        </div>

    );
};

SegurosComponent.propTypes = {
    classes: PropTypes.object,
    seguroDesempleo: PropTypes.object

};


export const SeguroFunerario = (props) => {
    const { classes, seguroGastosFunerarios } = props;
    return (
        <div>
            <Paper>
                <TextField label="Producto"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroGastosFunerarios.descripcionProductoSeguro}
                    InputProps={{
                        readOnly: true,
                    }} />
                <TextField label="Tipo Seguro"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroGastosFunerarios.tipoSeguro}
                    InputProps={{
                        readOnly: true,
                    }} />
                <TextField label="Suma Asegurada"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroGastosFunerarios.sumaAsegurada}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        readOnly: true,
                    }} />
                <TextField label="Monto"
                    margin="normal"
                    className={classes.textFieldsSeguros}
                    value={seguroGastosFunerarios.montoPagoAnual}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        readOnly: true,
                    }} />
            </Paper>
        </div>

    );
};

SeguroFunerario.propTypes = {
    classes: PropTypes.object,
    seguroGastosFunerarios: PropTypes.object
};








