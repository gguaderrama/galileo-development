import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import DatosSolicitanteContainer from '../../containers/captura/DatosSolicitanteContainer';
import Typography from '@material-ui/core/Typography';

export default class DialogoSolicitante extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        handleClickAceptar: PropTypes.func.isRequired,
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { pantalla, onClose, handleClickAceptar, ...other } = this.props;
    
        return (
            <Dialog maxWidth={false} onClose={this.handleClose} {...other}>
                <DialogTitle disableTypography={true}>
                    <Typography
                        align="left"
                        variant="h5">
                        Datos Integrante</Typography>
                </DialogTitle>
                <DialogContent>
                    <DatosSolicitanteContainer pantalla={pantalla}></DatosSolicitanteContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClickAceptar}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
