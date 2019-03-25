import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import VisorExpedientesContainer from '../../containers/Generic/VisorExpedientesContainer';

class DialogoVisorExpedientes extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        solicitud: PropTypes.string.isRequired,
        oficina: PropTypes.number.isRequired,
        empresa: PropTypes.string.isRequired,
    }

    handleClose = () => {
        this.props.onClose();
      };

    render() {
        const { onClose, solicitud, oficina, empresa, ...other } = this.props;
        return (
            <Dialog maxWidth="lg" onClose={this.handleClose} {...other}>
                <DialogTitle>Visor Expedientes</DialogTitle>
                <DialogContent>
                    <VisorExpedientesContainer 
                        solicitud={solicitud}
                        oficina={oficina}
                        empresa={empresa} />
                </DialogContent>                
            </Dialog>
        )
    }
}

export default DialogoVisorExpedientes;