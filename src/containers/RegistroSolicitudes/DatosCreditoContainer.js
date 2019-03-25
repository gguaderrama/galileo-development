import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from 'components/RegistroSolicitudes/Panels';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FoliosContainer from 'containers/RegistroSolicitudes/FoliosContainer';
import SegurosContainer from 'containers/RegistroSolicitudes/SegurosContainer';
import DatosSolicitud from 'components/RegistroSolicitudes/DatosSolicitud';
import ZonaAutorizadaContainer from 'containers/RegistroSolicitudes/ZonaAutorizadaContainer';
import CalculoCredito from 'components/RegistroSolicitudes/CalculoCredito';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import { getCreditData } from 'redux/selectors/RegistroSolicitudes/datosCredito';
import { getSessionRegistro } from 'redux/selectors/Session/session';
import { getClientes } from 'redux/selectors/RegistroSolicitudes/busquedaCliente';
import { dataCreditoValidatios } from 'components/RegistroSolicitudes/validations';
import { updateCliente, setDatosCredito } from 'redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import { consultaMenu, validarFolio, consultaVendores } from 'redux/actions/RegistroSolicitudes/obtenerFormatos';
import { consultaProductosWS, consultaDescripcionProductos, consultaProductos } from 'redux/actions/RegistroSolicitudes/obtenerProductos';
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT } from 'constants/RegistroSolicitud/registroSolicitud';
import { connect } from 'react-redux';
import { reset, autofill } from 'redux-form';

class DatosCreditoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogoFolios: false,
            descripciones: [],
            productos: [],
            vendedores: [],
            corresponsales: [],
            tipoDisposicion: [],
            vendedorSeleccionado: null,
            corresponsalSeleccionado: null,
            tipoProductoSeleccionado: null,
            plazoSeleccionado: null,
            frecuenciaSeleccionada: null,
            productoSeleccionado: null,
            categoriaSeleccionada: '',
            tipoDisposicionSeleccionada: null,
            esRangoPlazo: null,
            esRangoMonto: null,
            segmento: null,
            montoSeleccionado: null,
            tasaSeleccionada: null,
            formatosUnicos: [],
            comboProductoItems: [],
            comboFrecuenciasItems: [],
            comboCategoriasItems: [],
            comboTipoProductoItems: [],
            productosSeleccionados: [],
            expanded: 'datosProducto',
            error: false,
            openSnackBar: false,
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
            openDialog: {},
            solicitud: null,
            tipoProducto: null,
            tipoProdB: false,
            catB: false,
            contenidoDialogo: GENERIC_DIALOG_CONTENT,
            disabledMonto: false
        }
    }

    componentDidMount() {
        console.log("this.props", this.props)
        /* console.log("this.state", this.state) */
        const { clienteSeleccionado } = this.props.busquedaPersona;
        if (!clienteSeleccionado[0].persona) {
            this.props.updateCliente({ ...clienteSeleccionado[0], persona: '000000000000' })
        }

        this.setState({ ...this.props })
        this.props.enabledContinuar();
        if (this.props.comboProductoItems) {
            if (this.props.comboProductoItems.length > 0) {
                this.props.autofill('DatosSolicitud', 'producto', this.props.productoSeleccionado)

            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.datosCredito.tipoAnalisis) {
            this.closeDialog();
            if (Object.keys(nextProps.datosCredito.tipoAnalisis).length < 1) {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    title: 'Error',
                    icon: 'error',
                    iconColor: 'error',
                    content: 'Tipo Análisis',
                    subcontent: `Ocurrio un error al obtener el tipo Análisis`,
                    bandera: false,
                    isLoadingDialog: false
                });

            }
        }
        if (nextProps.datosCredito.descripciones) {
            if (Object.keys(nextProps.datosCredito.descripciones).length < 1) {
                console.log("no se obtuvieron las descripciones")
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    title: 'Descripción catálogos',
                    content: 'Productos',
                    subcontent: `Ocurrio un error al obtener las descripciones`,
                    bandera: false,
                    isLoadingDialog: false
                });
            }
        }
        if (nextProps.datosCredito.productos) {
            if (Object.keys(nextProps.datosCredito.productos).length < 1) {
                console.log("no se obtuvieron los productos del drools")
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    content: 'Productos',
                    subcontent: `Ocurrio un error al obtener los productos`,
                    flag: false,
                    isLoadingDialog: false
                });

            }
        }

        if (nextProps.datosCredito.folio) {
            if (Object.keys(nextProps.datosCredito.folio).length > 0 && this.props.datosCredito.folio !== nextProps.datosCredito.folio) {
                this.props.autofill('DatosSolicitud', 'solicitud', nextProps.datosCredito.folio.solicitud);
                this.validarFolio(nextProps.datosCredito.folio.solicitud);
                this.setState({
                    openSnackBar: true,
                    snackbarNotificacion: {
                        ...this.state.snackbarNotificacion,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                        duration: 2000,
                        message: `Folio generado exitosamente ${nextProps.datosCredito.folio.solicitud}`,
                        type: 'success'
                    }
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { esValido, catalogoFormatoDrools, folio } = this.props.datosCredito;
        const { descripciones, productos } = this.state;
        //validaciòn de productos
        if (prevState.comboProductoItems !== this.state.comboProductoItems) {
            if (this.state.comboProductoItems.length < 1) {
                this.setState({
                    openSnackBar: true,
                    snackbarNotificacion: {
                        ...this.state.snackbarNotificacion,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                        duration: 2000,
                        icon: 'warning',
                        message: 'No existen productos con el Tipo Producto y Categoria seleccionados',
                        type: 'warning'
                    }
                })

            }
        }

        if (prevProps.datosCredito.folio !== folio) {
            this.setState({ solicitud: folio.solicitud })
        }
        if (this.state.productos && esValido) {
            if (esValido.esValido) {
                //condicion para autocompletar el segmento
                if (this.state.segmento === null && this.state.descripciones.length > 0 && this.state.productos.length > 0) {
                    const segmentDs = this.state.descripciones.filter(codigos => codigos.codigo === this.state.productos[0].segmento)
                    this.props.autofill('DatosSolicitud', 'segmento', segmentDs[0].descripcion);
                    this.setState({ segmento: this.state.productos[0].segmento })
                    this.tipoProducto()
                }
                //condicion para autocompletar el tipoProducto
                if (this.state.comboTipoProductoItems.length === 1 && !this.state.tipoProdB) {
                    const tipoProductoDS = descripciones.filter(codigos => codigos.codigo === productos[0].tipoProducto)
                    this.setState({ tipoProductoSeleccionado: tipoProductoDS[0].codigo, tipoProdB: true, segmento: productos[0].segmento })
                    this.props.autofill('DatosSolicitud', 'tipoProducto', tipoProductoDS[0].codigo)
                }//condicion para completar la tasa
                if (prevState.plazoSeleccionado !== this.state.plazoSeleccionado && this.state.plazoSeleccionado !== null) {
                    const { productosSeleccionados, frecuenciaSeleccionada, plazoSeleccionado, esRangoMonto } = this.state;
                    let tasaSe;
                    if (this.state.esRangoPlazo) {
                        if (plazoSeleccionado >= productosSeleccionados[0].plazoMin && plazoSeleccionado <= productosSeleccionados[0].plazoMax) {
                            let tasa = productosSeleccionados.filter(producto => producto.frecuencia === frecuenciaSeleccionada && (plazoSeleccionado >= producto.plazoMin && plazoSeleccionado <= producto.plazoMax))
                            this.props.autofill('DatosSolicitud', 'tasa', tasa[0].tasa)
                            tasaSe = tasa[0].tasa;
                            this.setState({ tasaSeleccionada: tasa[0].tasa })
                        }
                    } else {
                        let tasa = productosSeleccionados.filter(producto => producto.frecuencia === frecuenciaSeleccionada && (plazoSeleccionado >= producto.plazoMin && plazoSeleccionado <= producto.plazoMax))
                        this.props.autofill('DatosSolicitud', 'tasa', tasa[0].tasa)
                        tasaSe = tasa[0].tasa;
                        this.setState({ tasaSeleccionada: tasa[0].tasa })

                    }
                    /* Cuando sole se tiene un monto en el combo se llena con el valor y se guarda en el objeto para consultar el monto de pago */
                    if (!esRangoMonto && productosSeleccionados.length === 1) {
                        this.props.autofill('DatosSolicitud', 'monto', productosSeleccionados[0].montoMax)
                        this.setState({ montoSeleccionado: productosSeleccionados[0].montoMax, disabledMonto: true })
                        this.props.setDatosCredito({
                            solicitud: this.state.solicitud,
                            codigoProducto: this.state.productoSeleccionado,
                            categoria: this.state.categoriaSeleccionada,
                            segmento: this.state.segmento,
                            frecuencia: this.state.frecuenciaSeleccionada,
                            tasa: tasaSe,
                            plazo: this.state.plazoSeleccionado,
                            tipoProducto: this.state.tipoProductoSeleccionado,
                            montoSolicitado: productosSeleccionados[0].montoMax,
                            vendedor: this.state.vendedorSeleccionado,
                        })

                    }
                }
            }
        }
        //condicion para completar y validar el folio
        if (prevProps.datosCredito.esValido !== esValido && !catalogoFormatoDrools) {
            if (esValido.esValido) {
                /*  await this.consultaVendores(); */
                this.closeDialog();
                this.props.autofill('DatosSolicitud', 'solicitud', this.state.solicitud);
            } else if (!esValido.esValido && esValido.message === 'No existe el folio.') {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    title: esValido.message,
                    subcontent: '¿Deseas generar un folio?',
                    flag: true,
                })
                this.setState({ solicitud: null })
                this.props.autofill('DatosSolicitud', 'solicitud', this.state.solicitud);
            } else if (!esValido.esValido && esValido.message === 'El folio de solicitud ya ha sido registrado.') {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    icon: 'text',
                    title: esValido.message,
                    subcontent: '',
                    flag: false,
                })
                this.props.autofill('DatosSolicitud', 'solicitud', this.state.solicitud);
                this.setState({ solicitud: null })
            }
        }
    }

    consultaVendores = async () => {
        const { esValido } = this.props.datosCredito;
        const { valoresSession } = this.props.sessionRegistro;
        const request = {
            "oficina": valoresSession.oficina,
            "claveEmpresa": valoresSession.empresa,
            "tipoFormato": esValido.codigoFormato
        }
        const requestConsultaVendores = JSON.stringify(request);
        this.props.consultaVendores(requestConsultaVendores, () => { }).then(response => {
            console.log("response vendedores", response)
            if (response.payload.length > 0) {
                this.setState({ vendedores: response.payload })
            }
            return response;
        })
        await this.consultaDescripcionProductos();

    }
    consultaDescripcionProductos = () => {
        const { valoresSession } = this.props.sessionRegistro;
        const request = valoresSession.empresa;
        console.log("JSON que se envia para obtener los formatos", request)
        this.consultaProductos();
        this.props.consultaDescripcionProductos(request, () => { }).then(response => {
            if (response.payload.length > 0) {
                this.setState({ descripciones: response.payload })
            }
            console.log("descripcion productos", response)
            return response;
        })
    }

    consultaProductos = () => {
        console.log("se ejecuta desde datosCredito")
        const { valoresSession } = this.props.sessionRegistro;
        const { esValido } = this.props.datosCredito;
        const request = {
            empresa: valoresSession.empresa,
            codigoFormato: esValido.codigoFormato
        }
        const requestConsultaProductos = JSON.stringify(request);
        console.log("request consulta productos", requestConsultaProductos)
        this.props.consultaProductos(requestConsultaProductos, () => { }).then(response => {
            console.log("Productos", response)
            if (response.payload.length > 0) {
                this.setState({ productos: response.payload })
            }
            return response;
        })

    }
    //metodo que abre el dialgo
    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    //metodo que cierra el dialogo
    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }

    //metodo que cierra el snackbar
    handleCloseSnack = () => {
        this.setState({ openSnackBar: false })
    }

    //metodo que maneja el cambio de panel
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    //guarada los tipos de disposicion en el estado del componente
    saveTipoDisposicion = (value) => {
        this.setState({ tipoDisposicion: value })
    }

    //guarada los correponsales en el estado del componente
    saveCorresponsales = (value) => {
        this.setState({ corresponsales: value })
    }
    //obtiene los formatos que se muestran en el dialogo
    getFormatosSolicitudDrools = () => {
        const { valoresSession } = this.props.sessionRegistro;
        const getFormatosSolicitudDrools = {
            "status": "A",
            "oficina": valoresSession.oficina,
            "empresa": valoresSession.empresa
        }
        const jsonFormatos = JSON.stringify(getFormatosSolicitudDrools);
        console.log("Json a enviar al método ---->(getFormatosSolicitudDrools)", jsonFormatos)
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.consultaMenu(jsonFormatos, this.closeDialog).then(response => {
            console.log("respuesta del servicio (FORMATOS DROOLS )", response)
            this.getFormatosUnique(response.payload);
            return response;
        });
        this.setState({ dialogoFolios: true })
    }

    //metodo que cierra el dialgo de folios
    closeFolios = () => {
        this.setState({ dialogoFolios: false })
    }


    handleSelectTipoProducto = (event) => {
        const { productos } = this.props.datosCredito;
        const { valoresSession } = this.props.sessionRegistro;
        const { clienteSeleccionado } = this.props.busquedaPersona;
        let productoSeleccionado = event.target.value;
        if (this.state.tipoProductoSeleccionado !== null) {
            if (this.state.tipoProductoSeleccionado !== event.target.value) {
                this.props.autofill('DatosSolicitud', 'frecuencia', '')
                this.props.autofill('DatosSolicitud', 'producto', '')
                this.props.autofill('DatosSolicitud', 'tasa', '')
                this.props.autofill('DatosSolicitud', 'categoria', '')
                this.props.autofill('DatosSolicitud', 'plazo', '')
                if (this.state.montoSeleccionado !== null) {
                    this.props.autofill('DatosSolicitud', 'monto', '')
                }
                this.setState({
                    plazoSeleccionado: null,
                    frecuenciaSeleccionada: null,
                    productoSeleccionado: null,
                    tasaSeleccionada: null,
                    categoriaSeleccionada: null,
                    montoSeleccionado: null,
                    tipoProdB: false,
                })
            }
        }
        this.setState({ segmento: productos[0].segmento, tipoProductoSeleccionado: productoSeleccionado })
        if (productoSeleccionado === 'REVO' && this.state.segmento === 'FORM') {
            productos.filter(producto => producto.tipoProducto === productoSeleccionado).map((item, i) => {
                const request = {
                    claveEmpresa: valoresSession.empresa,
                    segmento: item.segmento,
                    categoria: item.categoria,
                    tipoProducto: item.tipoProducto,
                    creditoGrupal: 'N',
                    cliente: clienteSeleccionado[0].persona,
                    oficina: { oficina: valoresSession.oficina },
                    claveCorresponsal: null,
                    solicitud: this.state.solicitud,
                    tipoCredito: this.props.tipoCredito
                }
                this.consultaProductosWs(request);
                return null;
            })
        }
    }

    handleSelectCategoria = event => {
        const { productos } = this.state;
        const { valoresSession } = this.props.sessionRegistro;
        const { clienteSeleccionado } = this.props.busquedaPersona;
        let categoria = event.target.value;
        if (this.state.categoriaSeleccionada !== null) {
            if (this.state.categoriaSeleccionada !== event.target.value) {
                this.props.autofill('DatosSolicitud', 'frecuencia', '')
                this.props.autofill('DatosSolicitud', 'producto', '')
                this.props.autofill('DatosSolicitud', 'tasa', '')
                this.props.autofill('DatosSolicitud', 'plazo', '')
                if (this.state.montoSeleccionado !== null) {
                    this.props.autofill('DatosSolicitud', 'monto', '')
                }
                this.setState({
                    plazoSeleccionado: null,
                    frecuenciaSeleccionada: null,
                    productoSeleccionado: null,
                    tasaSeleccionada: null,
                    montoSeleccionado: null,
                    tipoProdB: false,
                })
            }
        }
        this.setState({ categoriaSeleccionada: categoria })
        let request = {};
        const { tipoProductoSeleccionado } = this.state;

        productos.filter(producto => producto.categoria === categoria && producto.tipoProducto === tipoProductoSeleccionado).map((item, i) => {
            request = {
                claveEmpresa: valoresSession.empresa,
                segmento: item.segmento,
                categoria: item.categoria,
                tipoProducto: item.tipoProducto,
                creditoGrupal: 'N',
                cliente: clienteSeleccionado[0].persona,
                oficina: { oficina: valoresSession.oficina },
                claveCorresponsal: categoria === 'NOMN' ? this.state.corresponsalSeleccionado : null,
                solicitud: this.state.solicitud,
                tipoCredito: this.props.tipoCredito
            }
            return null;
        })
        this.consultaProductosWs(request);
    }

    consultaProductosWs = (request) => {
        if (request.claveCorresponsal !== null || this.state.categoriaSeleccionada !== 'NOMN') {
            const jsonFormatos = JSON.stringify(request);
            console.log("JSON wsProductos", jsonFormatos);
            this.openDialog({
                ...this.state.contenidoDialogo,
                isLoadingDialog: true
            })
            this.props.consultaProductosWS(jsonFormatos, this.closeDialog).then(response => {
                console.log("WS productos", response)
                this.selectedProducto(response.payload)
                if (response.payload.length === 0) {
                    this.setState({
                        openSnackBar: true,
                        snackbarNotificacion: {
                            ...this.state.snackbarNotificacion,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                            duration: 2000,
                            icon: 'warning',
                            message: 'No existen productos con el Tipo Producto y Categoria seleccionados',
                            type: 'warning'
                        }
                    })

                }
            })
        } else {
            this.setState({
                openSnackBar: true,
                snackbarNotificacion: {
                    ...this.state.snackbarNotificacion,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    duration: 2000,
                    message: 'Favor de seleccionar un corresponsal',
                    type: 'error'
                }
            })
        }

    }
    getFormatosUnique(formatosDrools) {
        const formatosUnicosAUX = [];
        formatosDrools.forEach(formato => {
            const formatoUnicoTemp = {
                codigoFormato: formato.codigoFormato,
                descripcion: formato.descripcion
            }
            if (formatosUnicosAUX.find(formatoUnico => formatoUnico.codigoFormato === formatoUnicoTemp.codigoFormato && formatoUnico.descripcion === formatoUnicoTemp.descripcion) === undefined) {
                formatosUnicosAUX.push(formatoUnicoTemp);
            }

        });
        this.setState({ formatosUnicos: formatosUnicosAUX })
    }

    tipoProducto = () => {
        const { productos, descripciones } = this.state;
        const tipoProductoItems = [];
        const productosAUX = [];
        productos.forEach(producto => {
            const prodsTemp = {
                segmento: producto.segmento,
                categoria: producto.categoria,
                tipoProducto: producto.tipoProducto
            }
            if (productosAUX.find(productoWS => productoWS.tipoProducto === prodsTemp.tipoProducto) === undefined) {
                productosAUX.push(prodsTemp);
            }

        });
        for (var i = 0; i < productosAUX.length; i++) {
            for (var j = 0; j < descripciones.length; j++) {
                if (productosAUX[i].tipoProducto === descripciones[j].codigo) {
                    const frecuenciaDescripcion = {
                        descripcion: descripciones[j].descripcion,
                        codigo: productosAUX[i].tipoProducto
                    }
                    tipoProductoItems.push(frecuenciaDescripcion);
                }
            }
        }
        this.setState({ comboTipoProductoItems: tipoProductoItems })

    }

    blurCategoria = () => {
        const { productos, descripciones } = this.state;
        const categoriaItems = [];
        const productosAUX = [];
        productos.forEach(producto => {
            const prodsTemp = {
                segmento: producto.segmento,
                categoria: producto.categoria,
                tipoProducto: producto.tipoProducto
            }
            if (productosAUX.find(productoWS => productoWS.categoria === prodsTemp.categoria && productoWS.tipoProducto === prodsTemp.tipoProducto) === undefined) {
                productosAUX.push(prodsTemp);
            }

        });
        for (var i = 0; i < productosAUX.length; i++) {
            for (var j = 0; j < descripciones.length; j++) {
                if (productosAUX[i].categoria === descripciones[j].codigo) {
                    const frecuenciaDescripcion = {
                        segmento: productosAUX[i].segmento,
                        descripcion: descripciones[j].descripcion,
                        codigo: productosAUX[i].categoria,
                        tipoProducto: productosAUX[i].tipoProducto
                    }
                    categoriaItems.push(frecuenciaDescripcion);
                }
            }
        }
        this.setState({ comboCategoriasItems: categoriaItems })
    }

    selectedProducto(productosWS) {
        const { categoriaSeleccionada, segmento, tipoProductoSeleccionado, descripciones } = this.state;
        const productosAUX = [];
        const descripcionesAUX = [];
        const frecuenciasAUX = [];
        const frecuenciaItems = [];
        productosWS.forEach(producto => {
            if (producto.visible === 'S') {
                if (producto.categoria === categoriaSeleccionada && producto.segmento === segmento && producto.tipoProducto === tipoProductoSeleccionado) {
                    const prodsTemp = {
                        producto: producto.producto,
                        frecuencia: producto.frecuencia,
                        categoria: producto.categoria,
                        plazoMin: producto.plazoMin,
                        plazoMax: producto.plazoMax,
                        montoMax: producto.montoMax,
                        montoMin: producto.montoMin,
                        tipoProducto: producto.tipoProducto,
                        anticipada: producto.anticipada

                    }
                    if (productosAUX.find(productoWS => productoWS.producto === prodsTemp.producto) === undefined) {
                        productosAUX.push(prodsTemp);
                    }
                }
            }
        });

        productosWS.forEach(producto => {
            const frecuenciaTEM = {
                producto: producto.producto,
                frecuencia: producto.frecuencia,
            }
            if (frecuenciaItems.find(productoWS => productoWS.producto === frecuenciaTEM.producto && productoWS.frecuencia === frecuenciaTEM.frecuencia) === undefined) {
                frecuenciaItems.push(frecuenciaTEM);
            }

        });
        for (var i = 0; i < productosAUX.length; i++) {
            for (var j = 0; j < descripciones.length; j++) {
                if (productosAUX[i].producto === descripciones[j].codigo) {
                    const productoDescripcion = {
                        descripcion: descripciones[j].descripcion,
                        frecuencia: productosAUX[i].frecuencia,
                        producto: productosAUX[i].producto,
                        plazoMin: productosAUX[i].plazoMin,
                        plazoMax: productosAUX[i].plazoMax,
                        montoMax: productosAUX[i].montoMax,
                        montoMin: productosAUX[i].montoMin,
                        anticipada: productosAUX[i].anticipada
                    }
                    descripcionesAUX.push(productoDescripcion);
                }
            }
        }
        for (var a = 0; a < frecuenciaItems.length; a++) {
            for (var b = 0; b < descripciones.length; b++) {
                if (frecuenciaItems[a].frecuencia === descripciones[b].codigo) {
                    const frecuenciaDescripcion = {
                        producto: frecuenciaItems[a].producto,
                        descripcion: descripciones[b].descripcion,
                        frecuencia: frecuenciaItems[a].frecuencia
                    }
                    frecuenciasAUX.push(frecuenciaDescripcion);
                }
            }
        }
        this.props.guardaProductos(descripcionesAUX);
        this.setState({ comboFrecuenciasItems: frecuenciasAUX, comboProductoItems: descripcionesAUX })
    }

    selectProducto = event => {
        const { productosWS } = this.props.datosCredito;
        let productosSeleccionados = [];

        if (this.state.productoSeleccionado !== null) {
            if (this.state.productoSeleccionado !== event.target.value) {
                this.props.autofill('DatosSolicitud', 'frecuencia', '')
                this.props.autofill('DatosSolicitud', 'tasa', '')
                this.props.autofill('DatosSolicitud', 'plazo', '')
                if (this.state.montoSeleccionado !== null) {
                    this.props.autofill('DatosSolicitud', 'monto', '')
                }
                this.setState({
                    plazoSeleccionado: null,
                    frecuenciaSeleccionada: null,
                    tasaSeleccionada: null,
                    montoSeleccionado: null,
                    tipoProdB: false,
                })
            }
        }

        for (var i = 0; i < productosWS.length; i++) {
            if (productosWS[i].producto === event.target.value) {
                const objetoPruba = {
                    productoSeleccionado: event.target.value,
                    montoMin: productosWS[i].montoMin,
                    montoMax: productosWS[i].montoMax,
                    plazoMin: productosWS[i].plazoMin,
                    plazoMax: productosWS[i].plazoMax,
                    frecuencia: productosWS[i].frecuencia,
                    tasa: productosWS[i].tasaMax,
                    tipoAnalisis: productosWS[i].tipoAnalisis,

                }
                productosSeleccionados.push(objetoPruba);
            }
        }
        this.validateZonaAutorizada();
        this.setState({ productosSeleccionados: productosSeleccionados, productoSeleccionado: event.target.value })
    }

    //setea el valor del vendedor seleccionado al estado del componente
    selectVendedor = event => {
        this.setState({ vendedorSeleccionado: event.target.value })
    }


    //valida si el plazo es un rango o son fijos en base al prodcutoSeleccionado
    validatePlazo() {
        const { productosSeleccionados } = this.state;
        for (var i = 0; i < productosSeleccionados.length; i++) {
            if (productosSeleccionados[i].plazoMin === productosSeleccionados[i].plazoMax) {
                this.setState({ esRangoPlazo: false })
            } else if (productosSeleccionados[i].plazoMin !== productosSeleccionados[i].plazoMax) {
                this.setState({ esRangoPlazo: true })
            }

        }
        this.validateMonto();
    }


    //valida si el monto es un rango o es monto fijo en base al producto seleccionado
    validateMonto() {
        const { productosSeleccionados } = this.state;
        for (var i = 0; i < productosSeleccionados.length; i++) {
            if (productosSeleccionados[i].montoMin === productosSeleccionados[i].montoMax) {
                this.setState({ esRangoMonto: false })
            } else if (productosSeleccionados[i].montoMin !== productosSeleccionados[i].montoMax) {
                this.setState({ esRangoMonto: true })
            }

        }
    }

    handleChangeFrecuencia = (event) => {
        this.validatePlazo();
        if (this.state.frecuenciaSeleccionada !== null) {
            if (this.state.frecuenciaSeleccionada !== event.target.value) {
                this.props.autofill('DatosSolicitud', 'tasa', '')
                this.props.autofill('DatosSolicitud', 'plazo', '')
                if (this.state.montoSeleccionado !== null) {
                    this.props.autofill('DatosSolicitud', 'monto', '')
                }
                this.setState({
                    plazoSeleccionado: null,
                    tasaSeleccionada: null,
                    montoSeleccionado: null,
                    tipoProdB: false,
                })
            }
        }
        this.setState({ frecuenciaSeleccionada: event.target.value })
    }
    handleChangePlazo = event => {
        if (this.state.plazoSeleccionado !== null) {
            if (this.state.plazoSeleccionado !== event.target.value) {
                this.props.autofill('DatosSolicitud', 'tasa', '')
                if (this.state.montoSeleccionado !== null) {
                    this.props.autofill('DatosSolicitud', 'monto', '')
                }
                this.setState({
                    tasaSeleccionada: null,
                    montoSeleccionado: null,
                    tipoProdB: false,
                })
            }
        }
        this.setState({ plazoSeleccionado: event.target.value })
    }

    //metodo que maneja el evento del monto
    onBlurMonto = (event) => {
        const { esRangoMonto, productosSeleccionados } = this.state;
        let monto = event.target.value;
        let montoParse = parseInt(monto, 10)
        this.setState({ montoSeleccionado: monto })
        if ((esRangoMonto === true && (montoParse >= productosSeleccionados[0].montoMin && montoParse <= productosSeleccionados[0].montoMax)) || !esRangoMonto) {
            const values = {
                vendedorSeleccionado: this.state.vendedorSeleccionado,
                tipoProductoSeleccionado: this.state.tipoProductoSeleccionado,
                plazoSeleccionado: this.state.plazoSeleccionado,
                frecuenciaSeleccionada: this.state.frecuenciaSeleccionada,
                productoSeleccionado: this.state.productoSeleccionado,
                categoriaSeleccionada: this.state.categoriaSeleccionada,
                segmento: this.state.segmento,
                montoSeleccionado: monto,
                tasaSeleccionada: this.state.tasaSeleccionada
            }
            let respuestaValidacion = dataCreditoValidatios(values)
            if (respuestaValidacion.isValid) {
                this.props.setDatosCredito({
                    solicitud: this.state.solicitud,
                    codigoProducto: this.state.productoSeleccionado,
                    categoria: this.state.categoriaSeleccionada,
                    segmento: this.state.segmento,
                    frecuencia: this.state.frecuenciaSeleccionada,
                    tasa: this.state.tasaSeleccionada,
                    plazo: this.state.plazoSeleccionado,
                    tipoProducto: this.state.tipoProductoSeleccionado,
                    montoSolicitado: monto,
                    vendedor: this.state.vendedorSeleccionado,
                    corresponsal: this.state.corresponsalSeleccionado
                })

            } else if (!respuestaValidacion.isValid && respuestaValidacion.campo === 'VENDEDOR_SELECCIONADO') {
                this.props.autofill('DatosSolicitud', 'monto', '')
                this.setState({ montoSeleccionado: null })
                this.openDialog(respuestaValidacion.tipoMensaje)
            }
        } else if (esRangoMonto === true && (montoParse <= productosSeleccionados[0].montoMin || montoParse >= productosSeleccionados[0].montoMax)) {
            this.props.autofill('DatosSolicitud', 'monto', '');
            this.setState({ montoSeleccionado: null })
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: 'Error',
                icon: 'error',
                iconColor: 'error',
                content: 'Monto incorrecto',
                subcontent: `El rango debe estar entre $ ${productosSeleccionados[0].montoMin} y $ ${productosSeleccionados[0].montoMax}`,
                flag: false,
            });

        }
    }

    //metodo que maneja el evento de seleccion de plazo
    onBlurPlazo = (event) => {
        const { comboProductoItems, productoSeleccionado, esRangoPlazo } = this.state;
        for (var i = 0; i < comboProductoItems.length; i++) {
            if (productoSeleccionado === comboProductoItems[i].producto) {
                if (esRangoPlazo === true && (event.target.value < comboProductoItems[i].plazoMin || event.target.value > comboProductoItems[i].plazoMax)) {

                    this.openDialog({
                        ...this.state.contenidoDialogo,
                        title: 'Plazo incorrecto.',
                        subcontent: `El rango debe estar entre ${comboProductoItems[0].plazoMin} y ${comboProductoItems[0].plazoMax}`,
                        flag: false,
                    })
                    this.setState({ plazoSeleccionado: null })
                }
            }
        }

    }

    //metodo que se ejecuta para limpiar la pantalla de datos credito
    handleReset = () => {
        this.props.reset('DatosSolicitud');
        this.setState({
            vendedorSeleccionado: null,
            corresponsalSeleccionado: null,
            tipoProductoSeleccionado: null,
            plazoSeleccionado: null,
            frecuenciaSeleccionada: null,
            productoSeleccionado: null,
            categoriaSeleccionada: '',
            tipoDisposicionSeleccionada: null,
            esRangoPlazo: null,
            esRangoMonto: null,
            segmento: null,
            montoSeleccionado: null,
            tasaSeleccionada: null,
            formatosUnicos: [],
            comboProductoItems: [],
            comboFrecuenciasItems: [],
            comboCategoriasItems: [],
            comboTipoProductoItems: [],
            productosSeleccionados: [],
            error: false,
            openSnackBar: false,
            openDialog: {},
            solicitud: null,
            tipoProducto: null,
            descripciones: [],
            productos: [],
            corresponsales: [],
            vendedores: [],
            tipoDisposicion: [],
            tipoProdB: false,
            catB: false,
        })
    }

    //guarda el valor de la tasa en el estado del componente
    changeTasa = (event) => {
        this.setState({ tasaSeleccionada: event.target.value })
    }


    //maneja el evento de la solicitud cuando se escribe
    onBlurSolicitud = (event) => {
        let solicitud = null;
        if (!this.state.solicitud && (event.target.value.length >= 8 && event.target.value.length < 13)) {
            if (event.target.value.length === 8) {
                solicitud = `0000${event.target.value}`
                /*    console.log("solicitud", solicitud) */
            } else {
                solicitud = event.target.value
            }
            this.openDialog({
                ...this.state.contenidoDialogo,
                isLoadingDialog: true
            })
            this.validarFolio(solicitud);
            this.setState({ solicitud: solicitud })
        }
        if (event.target.value.length > 0 && (event.target.value.length < 8 || event.target.value.length > 12)) {
            console.log("folio invalido")
            this.openDialog({
                ...this.state.contenidoDialogo,
                iconColor: 'text',
                content: 'Folio inválido',
                subcontent: 'Favor de ingresar un folio valido',
                flag: false,
            })
            return;
        }

    }

    //metodo que consulta el servicio para validar el folio
    validarFolio = (solicitud) => {
        const { valoresSession } = this.props.sessionRegistro;
        console.log("solicitud a validar", solicitud)
        const request = {
            "solicitud": solicitud,
            "oficina": valoresSession.oficina,
            "empresa": valoresSession.empresa
        }
        const getValidateFolio = JSON.stringify(request);
        console.log("JSON que se envía a validarFolio")
        this.props.validarFolio(getValidateFolio, () => { }).then(response => {
            console.log("respuesta (VALIDAR FOLIO)", response.payload)
            return response;
        })
    }


    //guarda el valor seleccionado del corresponsal en el estado del componente
    selectCorresponsal = (event) => {
        if (this.state.categoriaSeleccionada !== null) {
            this.props.autofill("DatosSolicitud", "categoria", '')
        }
        this.setState({ corresponsalSeleccionado: event.target.value })
    }

    //guarda el tipo de disposicion en el estado del componente
    selectTipoDisposicion = (event) => {
        this.setState({ tipoDisposicionSeleccionada: event.target.value })
    }

    onBlurTipoDisposicion = (event) => {
        this.props.setDatosCredito({
            solicitud: this.state.solicitud,
            codigoProducto: this.state.productoSeleccionado,
            categoria: this.state.categoriaSeleccionada,
            segmento: this.state.segmento,
            frecuencia: this.state.frecuenciaSeleccionada,
            tasa: this.state.tasaSeleccionada,
            plazo: this.state.plazoSeleccionado,
            tipoProducto: this.state.tipoProductoSeleccionado,
            corresponsal: this.state.corresponsalSeleccionado,
            montoOtorgado: this.state.montoSeleccionado,
            montoPago: this.props.datosCredito.objMontoPagoSinSeguro.montoPago,
            tipoDisposicion: this.state.tipoDisposicionSeleccionada,
            vendedor: this.state.vendedorSeleccionado
        })
    }

    validateZonaAutorizada = () => {
        const { productos, categoriaSeleccionada, tipoProductoSeleccionado, segmento } = this.state;
        const { tipoCredito } = this.props;
        const productoItem = productos.find(producto => producto.categoria === categoriaSeleccionada && producto.tipoProducto === tipoProductoSeleccionado && producto.segmento === segmento)
        console.log("productoItem.visibleFiltroAsentamientos", productoItem.visibleFiltroAsentamientos)
        console.log("categoriaSeleccionada", categoriaSeleccionada)
        console.log("tipoCredito", tipoCredito)
        if (tipoCredito === 'N' && categoriaSeleccionada !== 'NOMN') {
            if (productoItem.visibleFiltroAsentamientos === 'S') {
                this.props.setMuestraZona(true)
            }
        } else {
            this.props.setMuestraZona(false)
        }

    }

    render() {
        const { expanded } = this.state;
        const props = { ...this.state, ...this.props }
        return (
            <div style={{ padding: "20px" }}>
                <div style={{
                    padding: "20px"
                }}>
                    <CalculoCredito {...this.props.datosCredito} />
                </div>
                <div>
                    <ExpansionPanel expanded={expanded === 'datosProducto'} onChange={this.handleChange('datosProducto')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Icon color={expanded === 'datosProducto' ? "primary" : "inherit"} fontSize="small">description</Icon>
                            <Typography style={{ marginLeft: '20px' }} color={expanded === 'datosProducto' ? "primary" : "inherit"}>DATOS PRODUCTO</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <DatosSolicitud
                                {...props}
                                onBlurTipoDisposicion={this.onBlurTipoDisposicion}
                                selectTipoDisposicion={this.selectTipoDisposicion}
                                selectCorresponsal={this.selectCorresponsal}
                                handleReset={this.handleReset}
                                tipoProductoBlur={this.tipoProducto}
                                onBlurSolicitud={this.onBlurSolicitud}
                                handleGetDrools={this.getFormatosSolicitudDrools}
                                handleCloseSnack={this.handleCloseSnack}
                                selectVendedor={this.selectVendedor}
                                changeMonto={this.changeMonto}
                                changeTasa={this.changeTasa}
                                onBlurMonto={this.onBlurMonto}
                                onBlurPlazo={this.onBlurPlazo}
                                onSubmit={this.handleSubmit}
                                blurCategoria={this.blurCategoria}
                                handleChangePlazo={this.handleChangePlazo}
                                handleChangeFrecuencia={this.handleChangeFrecuencia}
                                selectProducto={this.selectProducto}
                                handleSelectCategoria={this.handleSelectCategoria}
                                handleSelectTipoProducto={this.handleSelectTipoProducto}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel >
                    <ExpansionPanel expanded={expanded === 'datosSeguro'} onChange={this.handleChange('datosSeguro')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Icon color={expanded === 'datosSeguro' ? "primary" : "inherit"} fontSize="small">security</Icon>
                            <Typography style={{ marginLeft: '20px' }} color={expanded === 'datosSeguro' ? "primary" : "inherit"}>SEGUROS</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <SegurosContainer {...this.props} {...this.state} tipoCredito={this.props.tipoCredito} handleCloseNotification={this.closeDialog} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'zonaAutorizada'} onChange={this.handleChange('zonaAutorizada')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Icon color={expanded === 'zonaAutorizada' ? "primary" : "inherit"} fontSize="small">map</Icon>
                            <Typography style={{ marginLeft: '20px' }} color={expanded === 'zonaAutorizada' ? "primary" : "inherit"} >ZONA AUTORIZADA</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ZonaAutorizadaContainer  {...props} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </div>
                <div>
                    <FoliosContainer {...this.state}
                        saveTipoDisposicion={this.saveTipoDisposicion}
                        saveCorresponsales={this.saveCorresponsales}
                        setTipoCredito={this.props.setTipoCredito}
                        closeFolios={this.closeFolios}
                        consultaVendores={this.consultaVendores}
                        validarFolio={this.validarFolio} />
                </div>
                <DialogNotificationModal
                    {...this.state.openDialog}
                    handleClose={this.closeDialog}
                    handleOnClose={this.getFormatosSolicitudDrools} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    datosCredito: getCreditData(state),
    sessionRegistro: getSessionRegistro(state),
    busquedaPersona: getClientes(state)
});

const mapDispatchToProps = ({
    consultaMenu,
    consultaProductosWS,
    reset,
    autofill,
    validarFolio,
    consultaVendores,
    consultaDescripcionProductos,
    consultaProductos,
    updateCliente,
    setDatosCredito
})

export default connect(mapStateToProps, mapDispatchToProps)(DatosCreditoContainer);
