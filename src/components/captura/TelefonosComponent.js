import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import TablaTelefonos from './TablaTelefonos';
import FormTelefonos from './FormTelefonos';

export default class TelefonosComponent extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <FormTelefonos></FormTelefonos>
                <TablaTelefonos></TablaTelefonos>
            </div>
        )
    }
}
