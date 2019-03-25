import React, { Component } from 'react';
import TablaDomicilios from '../../components/RegistroSolicitudes/TablaDomicilios';
import Domicilios from '../../components/RegistroSolicitudes/Domicilios';
import { GENERIC_DIALOG_CONTENT } from '../../constants/RegistroSolicitud/registroSolicitud';
import { eliminarDomicilio, agregarDomicilio, actualizarDomicilio } from '../../redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import { formDomiciliosValidatios } from '../../components/RegistroSolicitudes/validations';
import { fetchCatalogoColonias } from '../../redux/actions/captura/catalogos';
import { getCatalogosCaptura } from '../../redux/selectors/captura/catalogos';
import { reset, autofill, initialize } from 'redux-form';
import { connect } from 'react-redux';

class DomicilioContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoDomicilio: '',
            selected: [],
            open: false,
            edicion: false,
            openSnackBar: false,
            estadoSelected: null,
            cpSelected: null,
            openDialog: {},
            snackbarNotificacion: {},
            required: true,
            errorCalle: false,
            errorExterior: false,
            errorEstado: false,
            errorCp: false,
            errorColonia: false,
            errorCiudad: false,
            errorPais: false,
            errorTipoViv: false,
            asentamientoSeleccionado: null,
            contenidoDialogo: GENERIC_DIALOG_CONTENT
        }
    }


    componentDidMount() {
        const { listaCatalogos } = this.props.catalogosCaptura;
        const { integrante } = this.props;
        const domicilioAsociado = [];
        if (integrante.domiciliosParticulares) {
            let domicilioAsociadoAux = integrante.domiciliosParticulares.find(dom => dom.asociadoUltSolicitud === 'S');
            domicilioAsociado.push(domicilioAsociadoAux)
            this.setState({ selected: domicilioAsociado })
        }
        let tipoDomicilio = listaCatalogos.filter(item => item.tipoCodigo === 'TDOMI').filter(item => item.codigo === 'CASA');
        this.props.autofill('DomiciliosForm', 'tipoDomicilio', tipoDomicilio[0].descripcion);
        this.setState({ tipoDomicilio: tipoDomicilio[0].descripcion })

    }
    handleOnChangeEstado = event => {
        const { cpSelected } = this.state;
        const { fetchCatalogoColonias } = this.props;
        let estado = event.target.value;
        if (estado) {
            this.setState({ estadoSelected: estado })
            if (cpSelected && cpSelected === 5) {
                let asentamiento = {
                    "idEstado": estado,
                    "cp": cpSelected
                };
                fetchCatalogoColonias(asentamiento);
            }
        }
    }

    handleOnChangeCP = event => {
        const { estadoSelected } = this.state;
        const { fetchCatalogoColonias } = this.props;
        const { catalogoEstados } = this.props.catalogosCaptura;

        const estado = catalogoEstados.find(estado => estado.codigoEstado === estadoSelected);
        const cp = event.target.value;
        if (cp.length === 5) {
            this.setState({ cpSelected: cp })
            if (estadoSelected) {
                let asentamiento = {
                    "idEstado": estado.idEstado,
                    "cp": cp
                };
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    title: '',
                    icon: 'info',
                    iconColor: 'primary',
                    content: 'Consultando zona autorizada ...',
                    subcontent: '',
                    isLoadingDialog: true
                });
                fetchCatalogoColonias(asentamiento, this.closeDialog).then(r => {
                    console.log("colonias", r.payload)
                    if (r.payload.length === 0) {
                        this.openDialog({
                            ...this.state.contenidoDialogo,
                            iconColor: 'text',
                            content: 'No se encontró información',
                            subcontent: '',
                            bandera: false,
                            isLoadingDialog: false
                        });
                    }
                    return r;
                });
            }
        }
    }

    handleFillCiudad = (event) => {
        const { catalogoColonias } = this.props.catalogosCaptura
        const asentamientoSeleccionado = catalogoColonias.find(colonia => colonia.asentamiento === event.target.value)
        console.log("asentamientoSeleccionado", asentamientoSeleccionado)
        this.props.autofill('DomiciliosForm', 'ciudad', asentamientoSeleccionado.ciudad);
        this.setState({ asentamientoSeleccionado: asentamientoSeleccionado })

    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }
    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }
    handleCloseSnack = () => {
        this.setState({
            openSnackBar: false, errorCalle: false, errorExterior: false, errorEstado: false, errorCp: false, errorColonia: false,
            errorCiudad: false, errorPais: false, errorTipoViv: false
        })
    }

    handleSelectAllClick = event => {
        const { integrante } = this.props;
        if (event.target.checked) {
            this.setState(state => ({ selected: integrante.domiciliosParticulares.map(n => n) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleDeleteDomicilio = () => {
        const { selected } = this.state;
        const { id, integrante } = this.props;
        this.setState({ selected: [] });
        integrante.domiciliosParticulares = [];
        this.props.eliminarDomicilio({ selected, id });
    }

    handleSubmit = (values) => {
        const { id, integrante, agregarDomicilio, reset } = this.props;
        let respuestaValidacion = formDomiciliosValidatios(values);
        if (respuestaValidacion.isValid) {
            if (integrante.domiciliosParticulares) {
                if (integrante.domiciliosParticulares.length < 1) {
                    integrante.domiciliosParticulares.push(values);
                } else {
                    console.log("solo se permite un domicilio")
                }
            } else {
                integrante.domiciliosParticulares = [values];
            }
            values.persona = this.props.integrante.persona;
            values.ciudad = this.state.asentamientoSeleccionado.ciudad;
            values.municipioDelegacion = this.state.asentamientoSeleccionado.municipio
            values.usuarioAlta = '';
            values.usuarioUltimaModificacion = '';
            values.asociadoUltSolicitud = 'S';
            this.setState({ selected: [values] });
            agregarDomicilio({ values, id })
            reset('DomiciliosForm')
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_DATOS') {
            this.setState({
                openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje,
                errorCalle: true, errorExterior: true, errorEstado: true, errorCp: true, errorColonia: true,
                errorCiudad: true, errorPais: true, errorTipoViv: true
            })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_CALLE') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorCalle: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_CP') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorCp: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_EXTERIOR') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorExterior: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_ESTADO') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorEstado: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_COLONIA') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorColonia: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_PAIS') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorPais: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_VIVIENDA') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorTipoViv: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'SIN_CIUDAD') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorTipoViv: true })
        } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'FAILD') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje })
        }

    };

    handleClick = (event, domicilio) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(domicilio);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat([], domicilio);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleLoadDomicilio = () => {
        const { catalogoEstados } = this.props.catalogosCaptura;
        const estado = catalogoEstados.find(estado => estado.codigoEstado === this.state.selected[0].codigoEstado);
        let asentamiento = {
            "idEstado": estado.idEstado,
            "cp": this.state.selected[0].cp
        }
        this.setState({ edicion: true })
        this.props.fetchCatalogoColonias(asentamiento, () => { });
        this.props.initialize('DomiciliosForm', ...this.state.selected)
    }

    handleUpdateDomicilio = (values) => {
        const { id, integrante } = this.props;
        let domicilios = integrante.domiciliosParticulares.filter(i => i.consecutivo !== values.consecutivo);
        domicilios.push(values)
        this.props.initialize('DomiciliosForm', {})
        integrante.domiciliosParticulares = domicilios;
        this.setState({ selected: [values], edicion: false });
        values.asociadoUltSolicitud = 'S';
        this.props.actualizarDomicilio({ values, id })
    }

    render() {
        const { integrante } = this.props;
        return (
            <div>
                <Domicilios
                    {...this.state}
                    {...this.props.catalogosCaptura}
                    handleFillCiudad={this.handleFillCiudad}
                    handleCloseSnack={this.handleCloseSnack}
                    onSubmit={!this.state.edicion ? this.handleSubmit : this.handleUpdateDomicilio}
                    handleOnChangeCP={this.handleOnChangeCP}
                    handleOnChangeEstado={this.handleOnChangeEstado}
                    handleOnClose={this.closeDialog}
                    handleClose={this.closeDialog} />
                <TablaDomicilios
                    {...this.state}
                    {...this.props.catalogosCaptura}
                    handleLoadDomicilio={this.handleLoadDomicilio}
                    handleSelectAllClick={this.handleSelectAllClick}
                    handleClick={this.handleClick}
                    isSelected={this.isSelected}
                    domicilios={integrante.domiciliosParticulares}
                    handleClickDelete={this.handleDeleteDomicilio} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    catalogosCaptura: getCatalogosCaptura(state),
});

const mapDispatchToProps = ({
    eliminarDomicilio,
    agregarDomicilio,
    actualizarDomicilio,
    fetchCatalogoColonias,
    reset,
    autofill,
    initialize
});

export default connect(mapStateToProps, mapDispatchToProps)(DomicilioContainer);