import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default class ImprimirSolicitudComponent extends Component {
    static propTypes = {
        solicitud: PropTypes.string,
    }

    render() {
        return (
            <Button variant="contained" color="primary">
                <Icon>print</Icon>
                Imprimir Solicitud                
            </Button>
        )
    }
}
