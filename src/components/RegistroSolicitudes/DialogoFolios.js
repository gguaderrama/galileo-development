import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import SnackbarNotificacion from 'components/Generic/SnackbarNotificacion';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import { renderSelectField } from 'utilities/index';
import { withStyles } from '@material-ui/core/styles';
import { registroStyles } from './styles/styles';
import FormControl from '@material-ui/core/FormControl';
import { theme2 } from 'constants/styles';

const DialogoFolios = props => {
    const { classes, openDialog, handleClose } = props;
    const { open, catalogoFormatoDrools, snackbarNotificacion, openSnackBar, errorCodigo, errorVersion, required } = props;
    const { handleCloseDialogFolios, handleSubmit, handleSnackBarNotificacionClose, handleCleanDialogFolios, handleChangeFormato } = props;
    const { pristine, submitting, formatoSeleccionado, formatosUnicos } = props;

    return (
        <MuiThemeProvider theme={theme2}>
            <div>
                <form>
                    <FormControl >
                        {
                            catalogoFormatoDrools &&
                            <Dialog
                                disableBackdropClick={false} disableEscapeKeyDown={false}
                                open={open}
                                onClose={handleCloseDialogFolios}
                            >
                                <DialogTitle color="primary" >
                                    Alta Folios
                                <Typography align="left">
                                        Ingresa los datos correspondientes para dar de alta el folio
                                </Typography>
                                </DialogTitle>
                                <DialogContent className={classes.dialgFoliosContenent}>
                                    <div>
                                        <Field className={classes.fieldsFolios}
                                            onChange={handleChangeFormato}
                                            name="codigoFormato" component={renderSelectField} label="Formato"
                                            error={errorCodigo} required={required}>
                                            {formatosUnicos.map((item, i) => {
                                                return (
                                                    < MenuItem key={i} value={item.codigoFormato}>
                                                        <Typography align="left" color='textPrimary'>
                                                            {item.descripcion}
                                                        </Typography>
                                                    </MenuItem>
                                                );
                                            })}

                                        </Field>
                                    </div>
                                    <div>
                                        <Field

                                            className={classes.fieldsFolios} disabled={formatoSeleccionado ? false : true}
                                            name="version" component={renderSelectField} label="Versión"
                                            error={errorVersion} required={required}>
                                            {catalogoFormatoDrools.filter(formato => formato.codigoFormato === formatoSeleccionado).map((item, i) => {
                                                return (
                                                    <MenuItem key={i} value={item.version} >
                                                        <Typography align="left" color='textPrimary'>
                                                            {item.version}
                                                        </Typography>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Field>
                                    </div>
                                    <div className={classes.divBtnDialogoFolio}>
                                        <Tooltip title="Limpiar Formulario">
                                            <Button component="div" onClick={handleCleanDialogFolios} disabled={pristine || submitting}
                                                className={classes.button} size="small" color="primary">
                                                Limpiar
                                         </Button>
                                        </Tooltip>
                                        <Tooltip title="Generar Folio">
                                            <Button className={classes.button} size="small" variant="contained" color="primary" type="submit"
                                                onClick={handleSubmit}>
                                                Aceptar
                                    </Button>
                                        </Tooltip>

                                    </div>
                                </DialogContent>
                            </Dialog>
                        }
                    </FormControl>
                </form>
                <div>
                    <SnackbarNotificacion
                        {...snackbarNotificacion}
                        opened={openSnackBar}
                        onClose={handleSnackBarNotificacionClose}>
                    </SnackbarNotificacion>
                    <DialogNotificationModal
                        {...openDialog}
                        handleClose={handleClose}
                        handleOnClose={handleClose} />
                </div>
            </div >
        </MuiThemeProvider>

    );
};

DialogoFolios.propTypes = {
    open: PropTypes.bool.isRequired,
    handleCloseDialogFolios: PropTypes.func.isRequired,
    catalogoFormatoDrools: PropTypes.array,
    handleSubmit: PropTypes.func,
    inputPropsFormato: PropTypes.object,
    inputPropsVersion: PropTypes.object,
    version: PropTypes.string
};

const DialogoFoliosForm = reduxForm({ form: 'Folios', destroyOnUnmount: true })(DialogoFolios);

export default withStyles(registroStyles)(DialogoFoliosForm);
