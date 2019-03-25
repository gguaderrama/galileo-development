import React, { Component } from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from '../../components/Generic/SnackbarNotificacion';
import { updateCliente } from '../../redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import DatosPersonales from '../../components/RegistroSolicitudes/DatosPersonales'
import DomicilioContainer from './DomiclioContainer';
import { formPersonales } from '../../components/RegistroSolicitudes/validations'
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT } from '../../constants/RegistroSolicitud/registroSolicitud';
import { calculaRFC, consultaCatalogoRelaciones } from '../../redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import { getClientes } from './../../redux/selectors/RegistroSolicitudes/busquedaCliente';
import moment from 'moment';
import { change, autofill } from 'redux-form';
import { connect } from 'react-redux';

class DatosSolicitanteContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponent: 1,
            selected: props.integrante[0].fechaNacimiento ? props.integrante[0].fechaNacimiento : null,
            apellidoMaterno: props.integrante[0].apellidoMaterno ? props.integrante[0].apellidoMaterno : '',
            contenidoDialogo: GENERIC_DIALOG_CONTENT,
            openSnackBar: false,
            openDialog: {},
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.busquedaPersona.relaciones) {
            if (nextProps.busquedaPersona.relaciones.length > 0) {
                this.closeDialog();
            }
        } if (nextProps.busquedaPersona.rfc) {
            this.closeDialog();
        }


    }

    componentDidMount() {
        let request = { "status": "A" }
        console.log("this.state.apellidoMaterno (didMount)", this.state.apellidoMaterno)
        const requestJson = JSON.stringify(request);
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.consultaCatalogoRelaciones(requestJson);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.busquedaPersona.relaciones) {
            if (this.props.integrante[0].id === 1) {
                this.props.autofill('DatosPersonales', 'relacionConPersona', 'CLIENTE')

            }
        }
        if (prevProps.busquedaPersona.clienteSeleccionado !== this.props.busquedaPersona.clienteSeleccionado) {
            this.setState({
                openSnackBar: true,
                snackbarNotificacion: {
                    ...this.state.snackbarNotificacion,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    duration: 2000,
                    icon: 'check_box',
                    message: 'Actualización exitosa !',
                    type: 'success'
                }
            })
        }
    }
    handleCloseSnack = () => {
        this.setState({ openSnackBar: false })
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }
    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }

    handleDateChange = date => {
        this.setState({ selected: date });
    };

    onBlurFecha = (event, apellidoMaterno) => {
        let fechaNacimientoAux = null;
        const { integrante } = this.props;

        console.log("value", event.target.value)
        if (event) {
            fechaNacimientoAux = this.props.change('DatosPersonales', 'fechaNacimiento', moment(event.target.value).format('YYYY/MM/DD HH:mm:ss')).payload;

        } else {
            fechaNacimientoAux = this.state.selected;

        }
        console.log("antes del parse", fechaNacimientoAux)
        console.log("fechaNacimiento PARSE", moment(fechaNacimientoAux).format('YYYY-DD-MMTHH:mm:ss'))
        console.log("fechaNacimiento PARSE 2", moment(fechaNacimientoAux).format('YYYY/MM/DD HH:mm:ss'))
        let request = {
            "nombre": integrante[0].nombre,
            "apellidoPaterno": integrante[0].apellidoPaterno,
            "apellidoMaterno": this.state.apellidoMaterno !== '' ? this.state.apellidoMaterno : apellidoMaterno,
            "fechaNacimiento": moment(fechaNacimientoAux).format('YYYY-DD-MMTHH:mm:ss')
        }
        const requestRFC = JSON.stringify(request);
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.calculaRFC(requestRFC).then(r => {
            this.props.autofill('DatosPersonales', 'rfcCapturado', r.payload.rfcCapturado)
            return r;
        });;
    }


    handleSubmit = values => {
        const id = this.props.integrante[0].id;
        const respuestaValidacion = formPersonales(values);
        console.log("respuestaValidación", respuestaValidacion)
        if (respuestaValidacion.isValid) {
            const persona = {
                nombre: values.nombre,
                apellidoPaterno: values.apellidoPaterno,
                apellidoMaterno: values.apellidoMaterno,
                fechaNacimiento: values.fechaNacimiento,
                rfcCapturado: values.rfcCapturado,
                sexo: values.sexo,
                relacionConPersona: values.relacionConPersona,
                curp: values.curp,
                id: id
            };
            this.props.updateCliente(persona)
        } else if (!respuestaValidacion.isValid) {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje })
        }

    }
    onChangeMaterno = event => {
        if (this.state.selected) {
            this.onBlurFecha(null, event.target.value);
        } else {
            this.setState({ apellidoMaterno: event.target.value })
        }
    }

    renderSwitch(param, integrante) {
        if (integrante) {
            switch (param) {
                case 1:
                    return <DatosPersonales
                        onChangeMaterno={this.onChangeMaterno}
                        onBlurFecha={this.onBlurFecha}
                        onSubmit={this.handleSubmit}
                        handleDateChange={this.handleDateChange}
                        {...this.props.busquedaPersona}
                        {...this.state}
                        {...integrante[0]} />
                case 2:
                    return <DomicilioContainer id={integrante[0].id} integrante={integrante[0]} />
                default:
                    return null;
            }
        }
    }

    showComponent(param) {
        this.setState({ showComponent: param });
    }
    render() {
        const { integrante } = this.props;
        const { showComponent } = this.state;
        return (

            <Grid>
                <Row>
                    <Col xs={1}>
                        <List>

                            <ListItem selected={showComponent === 1} button onClick={() => this.showComponent(1)}>
                                <ListItemIcon ><PersonIcon color="primary"></PersonIcon></ListItemIcon>
                            </ListItem>
                            <ListItem selected={showComponent === 2} button onClick={() => this.showComponent(2)}>
                                <ListItemIcon ><HomeIcon color="primary"></HomeIcon></ListItemIcon>
                            </ListItem>
                        </List>
                    </Col>
                    <Col xs={11}>
                        {
                            this.renderSwitch(showComponent, integrante)
                        }
                    </Col>
                </Row>

                <DialogNotificationModal
                    {...this.state.openDialog}
                    handleClose={this.closeDialog}
                    handleOnClose={() => { }} />

                <SnackbarNotificacion
                    {...this.state.snackbarNotificacion}
                    opened={this.state.openSnackBar}
                    onClose={this.handleCloseSnack} />
            </Grid>
        )
    }
}


const mapStateToProps = (state) => ({
    busquedaPersona: getClientes(state),
});

const mapDispatchToProps = ({
    updateCliente, calculaRFC, change, autofill, consultaCatalogoRelaciones
});

export default connect(mapStateToProps, mapDispatchToProps)(DatosSolicitanteContainer);
