import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';  
import { TextField,  } from '@material-ui/core';
import { STYLES } from '../../constants/styles';
import { NumberFormatCustom } from '../../utilities/format';

class SeguroComponent extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
      open: false,
      cliente: '',
    }

    handleClickOpen = index => {
        this.setState({
            open: true,
            index,
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false, 
        });
    };    

    handleChangeSelectCliente = event => {
        this.setState({
            cliente: event.target.value, 
        })        
    };

    render() {
        const { classes, 
            descripcionProductoSeguro,
            tipoSeguro,
            sumaAsegurada,
            montoSeguro,
            } = this.props;
        return (            
            <div className={classes.rootSeguro}>
                <div>
                    <TextField label="Producto" 
                        margin="normal" 
                        className={classes.textFieldSeguros}
                        value={descripcionProductoSeguro || ''}
                        disabled />
                    <TextField label="Tipo Seguro" 
                        margin="normal" 
                        className={classes.textFieldSeguros}
                        value={tipoSeguro || ''}
                        disabled />
                    <TextField label="Suma Asegurada" 
                        margin="normal" 
                        className={classes.textFieldSeguros}
                        value={sumaAsegurada || ''}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                            readOnly: true,
                        }}
                        disabled />
                    <TextField label="Monto" 
                        margin="normal" 
                        className={classes.textFieldSeguros}
                        value={montoSeguro || ''}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                            readOnly: true,
                        }}
                        disabled />
                    </div>                
            </div>
        )
    }
}

export default withStyles(STYLES)(SeguroComponent);

