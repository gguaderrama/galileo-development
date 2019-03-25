import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DatosSolicitanteContainer from '../../containers/RegistroSolicitudes/DatosSolicitanteContainer';
import Typography from '@material-ui/core/Typography';

const DialogoDatosSolicitante = props => {
    const { handleClose, integrante, open, classes, datosSolicitud , descripciones } = props;
    const producto = descripciones.find(descrpcion => descrpcion.codigo === datosSolicitud.codigoProducto)
   
    return (
        <Dialog maxWidth={false} onClose={handleClose} open={open}>
            <DialogTitle>
                <Typography
                    style={{
                        fontSize: '24px',
                        color: 'rgba(0, 0, 0, 1)'
                    }}
                    align="left">
                    Datos Integrante</Typography>
                <Typography
                    style={{
                       // marginLeft:'100px',
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 1)'
                    }}
                    align="left"> Producto : {producto.descripcion}
                </Typography>
                <div>
                    <IconButton
                        className={classes.closeButton}
                        color="primary"
                        onClick={handleClose}>
                        <Icon>
                            close
                            </Icon>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <DatosSolicitanteContainer integrante={integrante}></DatosSolicitanteContainer>
            </DialogContent>

        </Dialog>
    )
}

DialogoDatosSolicitante.propTypes = {
    open: PropTypes.bool.isRequired,
    integrante: PropTypes.array,
    handleClose: PropTypes.func.isRequired
};


export default (DialogoDatosSolicitante);