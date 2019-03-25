import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import PdfComponent from './PdfComponent';

class DialogoImprimirSolicitud extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        urlPdf: PropTypes.string.isRequired,
    }

    handleClose = () => {
        this.props.onClose();
      };

    render() {
        const { urlPdf, ...other } = this.props;
        return (
            <Dialog maxWidth="lg" onClose={this.handleClose} {...other}>
                <DialogTitle style={{verticalAlign: 'super',}} color="primary" variant='subtitle1'>
                    <PrintIcon color="primary" ></PrintIcon>
                    IMPRIMIR SOLICITUD
                </DialogTitle>
                <DialogContent>
                    <PdfComponent urlPdf={urlPdf}></PdfComponent>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" >
                        Imprimir
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogoImprimirSolicitud;