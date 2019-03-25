import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import FormReferencia from './FormReferencia';


class DialogoReferenciaComponent extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        handleSaveReferencia: PropTypes.func.isRequired,
        handleAddReferencia: PropTypes.func.isRequired,
        listaCatalogos: PropTypes.array.isRequired,
        edicion: PropTypes.bool.isRequired,
        catalogoRelaciones: PropTypes.array.isRequired,        
    }

    handleClose = () => {
        this.props.onClose();
      };

    render() {
        const { referencia, catalogoRelaciones, listaCatalogos, handleAddReferencia, handleSaveReferencia, edicion, ...other } = this.props;
        return (
            <Dialog maxWidth="md" onClose={this.handleClose} {...other}>
                <DialogTitle>Referencias</DialogTitle>
                <DialogContent>
                    <FormReferencia 
                        handleClose={this.handleClose} 
                        handleAddReferencia={handleAddReferencia} 
                        handleSaveReferencia={handleSaveReferencia}
                        catalogoRelaciones={catalogoRelaciones}
                        listaCatalogos={listaCatalogos}
                        edicion={edicion}
                        {...referencia}/>
                </DialogContent>                
            </Dialog>
        )
    }
}

export default DialogoReferenciaComponent;