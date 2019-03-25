import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import update from 'immutability-helper';
import { paramsHasProperties, getAccessFromUrl, stringAccessToObject, getUrlParams } from '../../utilities/session';
import { CATALOGO_EMPRESAS, SNACKBAR_NOTIFICACION_INITIAL_STATE, DIALOGO_NOTIFICACION_INITIAL_STATE, DIALOGO_NOTIFICACION_CARGANDO, DIALOGO_NOTIFICACION_PARAMETROS_SESION_INCORRECTOS, DIALOGO_NOTIFICACION_SIN_RESULTADOS, lengthLetterNumberValidation, dateFormatArbolCampanias, lengthNumberValidation, lengthLetterValidation } from '../../constants/Generic';
import { TABS_GESTION_ASIGNACION_PROSPECTOS, EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED, CATALOGO_PARAMETROS, EXPANSION_PANEL_ENABLED_EXPANDED, DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE, FIELD_INITIAL_STATE_ENABLED, FIELD_INITIAL_STATE_DISABLED, SNACKBAR_NOTIFICACION_FECHA_HORA_CITA_GESTION_FUERA_RANGO, SNACKBAR_NOTIFICACION_POST_GENERAR_GESTION_PROSPECTO_SUCCESS, SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS, EXPANSION_PANEL_ENABLED, SNACKBAR_NOTIFICACION_OFICINA_SIN_PROSPECTOS, SNACKBAR_NOTIFICACION_BUSQUEDA_AVANZADA_AFINACION_BUSQUEDA, SNACKBAR_NOTIFICACION_TELEFONO_PERSONA_AGREGADO, DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE_OPENED, SNACKBAR_NOTIFICACION_SELECCION_OFICINA_REQUERIDA, PAGINATION_INITIAL_STATE, SNACKBAR_NOTIFICACION_CITA_OCUPADA, TABS_DETALLES_PROSPECTO, TABS_DETALLES_PROSPECTO_OFERTAS_ONLY, DIALOGO_NOTIFICACION_CITAS_SIN_RESULTADOS, SNACKBAR_NOTIFICACION_CIERRE_CITA_EXTIOSO } from '../../constants/GestionAsignacionProspectos';
import { getCatalogos } from '../../redux/selectors/Catalogos/catalogos';
import { fetchMapaJNDI, fetchOficinas, fetchArbolCampanias, fetchGestores, fetchCampanias, fetchPersona, fetchProspectos, fetchCitas, setProspectos, postGenerarGestionProspecto, postGenerarCierreCita, postAgregarTelefonosPersona } from '../../redux/actions/Catalogos/catalogos';
import { getSession } from '../../redux/selectors/Session/session';
import { getAccess } from '../../redux/actions/Session/session';
import { apiPost } from '../../api/GestionAsignacionProspectos';
import { urlConsultaPersonas } from '../../api/GestionAsignacionProspectos/urls';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from '../../components/Generic/SnackbarNotificacion';
import PanelExpansiones from '../../components/GestionAsignacionProspectos/PanelExpansiones';
import PanelContenedorTabs from '../../components/GestionAsignacionProspectos/PanelContenedorTabs';
import DialogoDetallesProspecto from '../../components/GestionAsignacionProspectos/DialogoDetallesProspecto';

class GestionAsignacionProspectosContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbarNotificacion: SNACKBAR_NOTIFICACION_INITIAL_STATE,
            dialogoNotificacion: DIALOGO_NOTIFICACION_INITIAL_STATE,
            gestionAsignacionProspectosTabs: TABS_GESTION_ASIGNACION_PROSPECTOS,
            gestionAsignacionProspectosActiveTab: 0,
            expansionPanelBusquedaAvanzada: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
            expansionPanelPeriodosComerciales: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
            expansionPanelSucursales: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
            empresa: FIELD_INITIAL_STATE_DISABLED,
            oficina: FIELD_INITIAL_STATE_DISABLED,
            nombre: FIELD_INITIAL_STATE_ENABLED,
            apellidoPaterno: FIELD_INITIAL_STATE_ENABLED,
            apellidoMaterno: FIELD_INITIAL_STATE_ENABLED,
            persona: FIELD_INITIAL_STATE_ENABLED,
            contrato: FIELD_INITIAL_STATE_ENABLED,
            tipoTelefono: FIELD_INITIAL_STATE_ENABLED,
            tipoPlan: FIELD_INITIAL_STATE_ENABLED,
            telefono: FIELD_INITIAL_STATE_ENABLED,
            extension: FIELD_INITIAL_STATE_ENABLED,
            campania: {},
            paginacionProspectos: PAGINATION_INITIAL_STATE,
            paginacionCitas: PAGINATION_INITIAL_STATE,
            arbolCampanias: [],
            selectedProspect: {},
            selectedDate: {},
            session: {},
            dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE,
            detallesProspectoTabs: TABS_DETALLES_PROSPECTO
        }
    }

    componentDidMount() {
        this.validateUrlParams();
    }

    receivedParamsAreEncrypted = async (encrypted = false) => {
        if (encrypted) {
            const access = getAccessFromUrl(true);
            await this.props.getAccess(encodeURIComponent(access));
        }
        return encrypted ? stringAccessToObject(this.props.session.access) : getUrlParams(true);
    }

    validateUrlParams = async () => {
        const accessParams = await this.receivedParamsAreEncrypted(false);
        if (paramsHasProperties(accessParams, CATALOGO_PARAMETROS)) {
            //fetchJNDIMap
            //this.props.fetchMapaJNDI({}, this.handleDialogoNotificacionClose);
            //setMask
            this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
            //setEmpresa
            const empresa = CATALOGO_EMPRESAS.find(empresa => empresa.codigoEmpresa === parseInt(accessParams.claveEmpresa));
            //setUsuario
            const usuario = { usuario: accessParams.usuario, nombre: accessParams.nombre }
            //setOficina
            const paramsFetchOficinas = { claveEmpresa: empresa.claveEmpresa };
            await this.props.fetchOficinas(paramsFetchOficinas, this.handleDialogoNotificacionClose);
            const { oficinas } = this.props.catalogos;
            const oficinaTemp = oficinas.find(oficina => oficina.oficina === parseInt(accessParams.oficina));
            const oficina = { oficina: oficinaTemp.oficina, nombre: oficinaTemp.nombre }
            if (oficina.oficina === 0) {
                this.setState({
                    expansionPanelSucursales: EXPANSION_PANEL_ENABLED_EXPANDED,
                    expansionPanelBusquedaAvanzada: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
                    empresa: FIELD_INITIAL_STATE_ENABLED,
                    session: { empresa, oficina, usuario }
                });
            }
            else {
                this.setState({
                    expansionPanelPeriodosComerciales: EXPANSION_PANEL_ENABLED_EXPANDED,
                    expansionPanelBusquedaAvanzada: EXPANSION_PANEL_ENABLED,
                    session: { empresa, oficina, usuario }
                });
                const paramsArbolCampanias = { oficina: this.state.session.oficina.oficina, gestor: this.state.session.usuario.usuario };
                this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                await this.props.fetchArbolCampanias(paramsArbolCampanias, this.handleDialogoNotificacionClose);
                const { arbolCampanias } = this.props.catalogos;
                if (arbolCampanias.length > 0) {
                    const paramsGestores = { oficina: this.state.session.oficina.oficina, codigoDestino: 'PISO' }
                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                    await this.props.fetchGestores(paramsGestores, this.handleDialogoNotificacionClose);

                    const arbolCampaniasDecorado = [];
                    arbolCampanias.forEach(periodoCampanias => {
                        periodoCampanias.descripcion = dateFormatArbolCampanias(periodoCampanias.periodo);
                        periodoCampanias.expanded = true

                        arbolCampaniasDecorado.push(periodoCampanias);
                    });
                    this.setState({
                        arbolCampanias: arbolCampaniasDecorado,
                        oficina: {
                            value: this.state.session.oficina.oficina,
                            error: false,
                            disabled: false,
                            readOnly: false
                        },
                        expansionPanelSucursales: {
                            expanded: false,
                            disabled: true
                        },
                        expansionPanelPeriodosComerciales: {
                            expanded: true,
                            disabled: false
                        }
                    });
                }
                else {
                    this.setState({
                        snackbarNotificacion: SNACKBAR_NOTIFICACION_OFICINA_SIN_PROSPECTOS
                    })
                }
            }
        }
        else {
            this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_PARAMETROS_SESION_INCORRECTOS });
        }
    }

    parseDate = date => {
        return moment(date).format('DD/MM/YYYY');
    }

    handleSnackBarNotificacionClose = () => {
        this.setState({
            snackbarNotificacion: {
                ...this.state.snackbarNotificacion,
                opened: false
            }
        });
    }

    handleDialogoNotificacionClose = () => {
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_INITIAL_STATE });
    }

    handleExpansionPanelBusquedaAvanzadaChange = (event, expanded) => {
        if (this.state.expansionPanelPeriodosComerciales.expanded === true) {
            this.setState({
                expansionPanelPeriodosComerciales: {
                    ...this.state.expansionPanelPeriodosComerciales,
                    expanded: false
                }
            });
        }
        this.setState({
            expansionPanelBusquedaAvanzada: {
                disabled: false,
                expanded: expanded
            }
        });
    }

    handleExpansionPanelPeriodosComercialesChange = (event, expanded) => {
        const { oficina } = this.state.session;
        if (oficina.oficina === 0 && expanded === false) {
            this.props.setProspectos([]);
            this.setState({
                expansionPanelBusquedaAvanzada: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
                expansionPanelPeriodosComerciales: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
                expansionPanelSucursales: EXPANSION_PANEL_ENABLED_EXPANDED,
                empresa: FIELD_INITIAL_STATE_ENABLED,
                oficina: FIELD_INITIAL_STATE_DISABLED,
                arbolCampanias: []
            });
        }
        else {
            this.setState({
                expansionPanelPeriodosComerciales: {
                    expanded
                }
            })
        }
    }

    handleExpansionPanelSucursalesChange = (event, expanded) => {
        const { oficina } = this.state.session;
        if (oficina.oficina === 0) {
            this.setState({
                expansionPanelSucursales: {
                    expanded: expanded
                }
            });
        }
        else {
            this.setState({
                expansionPanelSucursales: {
                    expanded
                }
            })
        }
    }

    handleTabChange = (event, value) => {
        const { oficina } = this.state;
        const { usuario } = this.state.session;
        if (oficina.value !== '') {
            if (value === 1) {
                this.obtenerCitas(oficina, usuario);
            }
            this.setState({ gestionAsignacionProspectosActiveTab: value });
        }
        else {
            this.setState({ snackbarNotificacion: SNACKBAR_NOTIFICACION_SELECCION_OFICINA_REQUERIDA });
        }
    }

    obtenerCitas = async (oficina, usuario) => {
        const paramsCitas = {
            fechaCita: moment().format('YYYYMMDD'),
            oficina: oficina.value,
            gestor: this.state.session.oficina.oficina !== 0 ? usuario.usuario : null,
            start: 0,
            limit: 10
        }
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
        await this.props.fetchCitas(paramsCitas, this.handleDialogoNotificacionClose).then(response => {
            const { payload } = response;
            if (payload.successful) {
                const { start, limit, total } = payload.payload;
                if (total > 0) {
                    this.setState({
                        paginacionCitas: {
                            ...this.state.paginacionCitas,
                            total,
                            page: start / limit
                        }
                    });
                }
                else {
                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CITAS_SIN_RESULTADOS });
                }
            }
        });
    }

    handleSelectedProspectChange = (selectedProspect) => {
        this.setState({
            detallesProspectoTabs: TABS_DETALLES_PROSPECTO,
            dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE_OPENED,
            tipoTelefono: FIELD_INITIAL_STATE_ENABLED,
            tipoPlan: FIELD_INITIAL_STATE_ENABLED,
            telefono: FIELD_INITIAL_STATE_ENABLED,
            extension: FIELD_INITIAL_STATE_ENABLED,
            selectedProspect
        });
    }

    handleSelectedDateChange = async (selectedDate) => {
        const { oficina } = this.state.session;
        const params = {
            prospectos: [
                {
                    claveEmpresa: selectedDate.claveEmpresa,
                    codigoCampania: selectedDate.codigoCampania,
                    periodo: selectedDate.periodo,
                    oficina: oficina.oficina === 0 ? this.state.oficina.value : oficina.oficina,
                    status: 'A',
                    idProspecto: selectedDate.idProspecto
                }
            ],
            destino: {
                claveEmpresa: selectedDate.claveEmpresa,
                codigoCampania: selectedDate.codigoCampania,
                periodo: selectedDate.periodo,
                codigoDestino: 'PISO'
            }
        }
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
        await this.props.fetchProspectos(params, this.handleDialogoNotificacionClose).then(async responseProspectos => {
            const { payload } = responseProspectos;
            if (payload.successful) {
                const prospecto = payload.payload.prospectos[0];
                const paramsPersona = {
                    idPersona: prospecto.idProspecto
                };
                await this.fetchPersonaWithoutRedux(paramsPersona, this.handleDialogoNotificacionClose).then(responsePersonas => {
                    const { payload } = responsePersonas;
                    if (responsePersonas.successful) {
                        const persona = payload[0];
                        const prospectoDecorado = {
                            ...prospecto,
                            telefonos: persona.telefonos
                        };
                        this.setState({
                            selectedDate,
                            detallesProspectoTabs: TABS_DETALLES_PROSPECTO_OFERTAS_ONLY,
                            selectedProspect: prospectoDecorado,
                            dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE_OPENED
                        });
                    }
                });
            }
        })
    }

    handleProspectosPageChange = async (event, page) => {
        await this.setState({
            paginacionProspectos: {
                ...this.state.paginacionProspectos,
                start: page * 10,
                page
            }
        });
        this.handlePeriodoCampaniasOnClick({ ...this.state.campania });
    }

    handleCitasPageChange = async (event, page) => {
        const start = page * 10;
        const { oficina } = this.state;
        const { usuario } = this.state.session;
        const paramsCitas = {
            fechaCita: moment().format('YYYYMMDD'),
            oficina: oficina.value,
            gestor: this.state.session.oficina.oficina !== 0 ? usuario.usuario : null,
            start,
            limit: 10
        }
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
        await this.props.fetchCitas(paramsCitas, this.handleDialogoNotificacionClose).then(response => {
            const { payload } = response;
            if (payload.successful) {
                const { start, limit, total } = payload.payload;
                if (total > 0) {
                    this.setState({
                        paginacionCitas: {
                            ...this.state.paginacionCitas,
                            total,
                            page: start / limit
                        }
                    });
                }
            }
        });
    }

    handleEmpresaChange = async (event, value) => {
        this.setState({
            empresa: {
                value: event.target.value,
                error: false,
                disabled: false,
                readOnly: false
            },
            oficina: {
                value: '',
                error: false,
                disabled: false,
                readOnly: false
            }
        });

        const params = { claveEmpresa: event.target.value };
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
        await this.props.fetchOficinas(params, this.handleDialogoNotificacionClose);
    }

    handleOficinaChange = async (event, value) => {
        const paramsArbolCampanias = { oficina: event.target.value };
        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
        await this.props.fetchArbolCampanias(paramsArbolCampanias, this.handleDialogoNotificacionClose);
        const { arbolCampanias } = this.props.catalogos;
        if (arbolCampanias.length > 0) {
            const paramsGestores = { oficina: event.target.value, codigoDestino: 'PISO' }
            this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
            await this.props.fetchGestores(paramsGestores, this.handleDialogoNotificacionClose);

            const arbolCampaniasDecorado = [];
            arbolCampanias.forEach(periodoCampanias => {
                periodoCampanias.descripcion = dateFormatArbolCampanias(periodoCampanias.periodo);
                periodoCampanias.expanded = true

                arbolCampaniasDecorado.push(periodoCampanias);
            });
            this.setState({
                arbolCampanias: arbolCampaniasDecorado,
                oficina: {
                    value: event.target.value,
                    error: false,
                    disabled: false,
                    readOnly: false
                },
                expansionPanelSucursales: EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED,
                expansionPanelPeriodosComerciales: EXPANSION_PANEL_ENABLED_EXPANDED,
                expansionPanelBusquedaAvanzada: EXPANSION_PANEL_ENABLED
            });
        }
        else {
            this.setState({
                snackbarNotificacion: SNACKBAR_NOTIFICACION_OFICINA_SIN_PROSPECTOS
            })
        }
    }

    handleNombreChange = event => {
        if (lengthLetterValidation(event.target.value, 20, true)) {
            this.setState({
                nombre: {
                    ...this.state.nombre,
                    value: event.target.value.toUpperCase()
                }
            });
        }
    }

    handleApellidoPaternoChange = event => {
        if (lengthLetterValidation(event.target.value, 20, true)) {
            this.setState({
                apellidoPaterno: {
                    ...this.state.apellidoPaterno,
                    value: event.target.value.toUpperCase()
                }
            })
        }
    }

    handleApellidoMaternoChange = event => {
        if (lengthLetterValidation(event.target.value, 20, true)) {
            this.setState({
                apellidoMaterno: {
                    ...this.state.apellidoMaterno,
                    value: event.target.value.toUpperCase()
                }
            })
        }
    }

    handlePersonaChange = event => {
        if (lengthNumberValidation(event.target.value, 12)) {
            this.setState({
                persona: {
                    ...this.state.persona,
                    value: event.target.value,
                    error: event.target.value.length > 11 || event.target.value.length === 0 ? false : true
                }
            });
        }
    }

    handleContratoChange = event => {
        if (lengthNumberValidation(event.target.value, 12)) {
            this.setState({
                contrato: {
                    ...this.state.contrato,
                    value: event.target.value,
                    error: event.target.value.length > 11 || event.target.value.length === 0 ? false : true
                }
            });
        }
    }

    handleLimpiarOnClick = () => {
        this.props.setProspectos([]);
        this.setState({
            nombre: FIELD_INITIAL_STATE_ENABLED,
            apellidoPaterno: FIELD_INITIAL_STATE_ENABLED,
            apellidoMaterno: FIELD_INITIAL_STATE_ENABLED,
            persona: FIELD_INITIAL_STATE_ENABLED,
            contrato: FIELD_INITIAL_STATE_ENABLED,
            fechaInicial: null,
            fechaFinal: null
        });
    }

    handleConsultarOnClick = () => {
        this.handlePeriodoCampaniasOnClick({
            codigoCampania: null,
            periodo: null
        });
    }

    handlePeriodoOnClick = periodo => {
        const { arbolCampanias } = this.state;
        const recordPosition = arbolCampanias.findIndex(periodoCampania => periodoCampania.periodo === periodo.periodo);
        this.setState({
            arbolCampanias: update(arbolCampanias, {
                [recordPosition]: {
                    expanded: {
                        $set: !arbolCampanias[recordPosition].expanded
                    }
                }
            })
        });
    }

    handlePeriodoCampaniasOnClick = async campania => {
        const { empresa, oficina, usuario } = this.state.session;
        const { start, limit } = this.state.paginacionProspectos;

        const { nombre, apellidoPaterno, apellidoMaterno, persona, contrato } = this.state;

        if (nombre.value !== '' && apellidoPaterno.value !== '') {
            const params = {
                nombre: nombre.value,
                apellidoPat: apellidoPaterno.value,
                apellidoMat: apellidoMaterno.value !== '' ? apellidoMaterno.value : null
            }
            await this.props.fetchPersona(params, this.handleDialogoNotificacionClose).then(response => {
                if (response.payload.successful) {
                    if (response.payload.payload[0]) {
                        const personaTemp = response.payload.payload[0];
                        const params = {
                            prospectos: [
                                {
                                    claveEmpresa: oficina.oficina === 0 ? this.state.empresa.value : empresa.claveEmpresa,
                                    oficina: oficina.oficina === 0 ? this.state.oficina.value : oficina.oficina,
                                    status: 'A',
                                    idProspecto: personaTemp.idPersona
                                }
                            ],
                            destino: {
                                claveEmpresa: oficina.oficina === 0 ? this.state.empresa.value : empresa.claveEmpresa,
                                codigoDestino: 'PISO',
                                gestor: oficina.oficina === 0 ? null : usuario.usuario
                            },
                            start: start,
                            limit: limit
                        };
                        this.props.setProspectos([]);
                        this.setState({
                            dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO,
                            paginacionProspectos: {
                                ...this.state.paginacionProspectos,
                                start: 0
                            }
                        });
                        this.fetchProspectosDecorate(params, campania);
                    }
                    else {
                        this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_SIN_RESULTADOS });
                    }
                }
                else {
                    this.setState({ snackbarNotificacion: SNACKBAR_NOTIFICACION_BUSQUEDA_AVANZADA_AFINACION_BUSQUEDA });
                }
            });
        }
        else if ((campania.codigoCampania !== null && campania.periodo !== null) || (persona.value !== '' && persona.error === false) || (contrato.value !== '' && contrato.error === false)) {
            const params = {
                prospectos: [
                    {
                        claveEmpresa: oficina.oficina === 0 ? this.state.empresa.value : empresa.claveEmpresa,
                        codigoCampania: campania.codigoCampania !== null && campania.periodo !== null ? campania.codigoCampania : null,
                        periodo: campania.codigoCampania !== null && campania.periodo !== null ? campania.periodo : null,
                        oficina: oficina.oficina === 0 ? this.state.oficina.value : oficina.oficina,
                        status: 'A',
                        idProspecto: (campania.codigoCampania === null && campania.periodo === null) && persona.value !== '' && persona.error === false ? persona.value : null,
                        contrato: (campania.codigoCampania === null && campania.periodo === null) && contrato.value !== '' && contrato.error === false ? contrato.value : null,
                    }
                ],
                destino: {
                    claveEmpresa: oficina.oficina === 0 ? this.state.empresa.value : empresa.claveEmpresa,
                    codigoCampania: campania.codigoCampania !== null && campania.periodo !== null ? campania.codigoCampania : null,
                    periodo: campania.codigoCampania !== null && campania.periodo !== null ? campania.periodo : null,
                    codigoDestino: 'PISO',
                    gestor: oficina.oficina === 0 ? null : usuario.usuario
                },
                start: start,
                limit: limit
            };
            this.props.setProspectos([]);
            this.setState({
                dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO,
                paginacionProspectos: {
                    ...this.state.paginacionProspectos,
                    start: 0
                }
            });
            this.fetchProspectosDecorate(params, campania);
        }
        else {
            this.setState({ snackbarNotificacion: SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS });
        }
    }

    fetchPersonaWithoutRedux = (params) => {
        return apiPost(urlConsultaPersonas, params, this.handleDialogoNotificacionClose)();
    }

    fetchProspectosDecorate = async (params, campania) => {
        await this.props.fetchProspectos(params, this.handleDialogoNotificacionClose).then(async response => {
            if (response.payload.payload.prospectos.length > 0) {
                const prospectosTemp = this.props.catalogos.prospectos;
                this.setState({
                    paginacionProspectos: {
                        ...this.state.paginacionProspectos,
                        total: prospectosTemp.total,
                        page: prospectosTemp.start / prospectosTemp.limit,
                    },
                    campania: campania
                });
                const personasTemp = Promise.all(prospectosTemp.prospectos.map(prospecto => {
                    return this.fetchPersonaWithoutRedux({ idPersona: prospecto.idProspecto }).then(response => {
                        const { oficinas, gestores } = this.props.catalogos;

                        const telefonosDirecto = response.payload[0].telefonos.filter(telefono => telefono.idTelefono.tipoTelefono === 'DIRE').sort((a, b) => a.idTelefono.consecutivo > b.idTelefono.consecutivo);
                        const telefonosEmpleo = response.payload[0].telefonos.filter(telefono => telefono.idTelefono.tipoTelefono === 'EMPL').sort((a, b) => a.idTelefono.consecutivo > b.idTelefono.consecutivo);
                        const telefonos = [...telefonosDirecto, ...telefonosEmpleo];
                        const nombreOficina = oficinas.find(oficina => oficina.oficina === prospecto.oficina).nombre;
                        const destinos = [gestores.find(gestor => gestor.persona === prospecto.destinos[0].gestor)].map(gestor => ({ ...prospecto.destinos[0], nombreGestor: `${gestor.nombre} ${gestor.apellidoPat} ${gestor.apellidoMat}` }));
                        return ({
                            ...prospecto,
                            nombre: prospecto.nombre === null ? response.payload[0].nombre : prospecto.nombre,
                            apellidoPat: prospecto.apellidoPat === null ? response.payload[0].apellidoPat : prospecto.apellidoPat,
                            apellidoMat: prospecto.apellidoMat === null ? response.payload[0].apellidoMat : prospecto.apellidoMat,
                            fechaNacimiento: prospecto.fechaNacimiento === null ? response.payload[0].fechaNacimiento : prospecto.fechaNacimiento,
                            genero: prospecto.genero === null ? response.payload[0].sexo === 'M' ? 'MASCULINO' : 'FEMENINO' : prospecto.genero,
                            rfcCapturado: prospecto.rfcCapturado === null ? response.payload[0].rfcCapturado : prospecto.rfcCapturado,
                            rfcCalculado: prospecto.rfcCalculado === null ? response.payload[0].rfcCalculado : prospecto.rfcCalculado,
                            telefonos: prospecto.telefonos.length === 0 ? telefonos : prospecto.telefonos,
                            domicilios: prospecto.domicilios.length === 0 ? response.payload[0].domicilios : prospecto.domicilios,
                            nombreOficina,
                            destinos
                        })
                    });
                }));
                personasTemp.then(r => this.props.setProspectos(personasTemp));
            }
            else {
                this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_SIN_RESULTADOS });
            }
        });
    }

    handleDetallesProspectoTabChange = (event, value) => {
        let dialogoDetallesProspecto = { ...this.state.dialogoDetallesProspecto, detallesProspectoActiveTab: value }
        this.setState({ dialogoDetallesProspecto });
    }

    handleGestionPersonaMedioGestionChange = (event, value) => {
        let dialogoDetallesProspecto = { ...this.state.dialogoDetallesProspecto, medioGestion: event.target.value }
        this.setState({ dialogoDetallesProspecto });
    }

    handleGestionPersonaRespuestaGestionChange = (event, value) => {
        let dialogoDetallesProspecto = { ...this.state.dialogoDetallesProspecto, respuestaGestion: event.target.value }
        this.setState({ dialogoDetallesProspecto });
    }

    handleGestionPersonaContactoGestionChange = (event, value) => {
        let dialogoDetallesProspecto = { ...this.state.dialogoDetallesProspecto, contactoGestion: event.target.value }
        this.setState({ dialogoDetallesProspecto });
    }

    handleGestionPersonaFechaHoraCitaGestionChange = date => {
        let rangoInicialHoras = moment(date);
        let rangoFinalHoras = moment(date);

        rangoInicialHoras.set('hour', 7);
        rangoInicialHoras.set('minute', 59);

        rangoFinalHoras.set('hour', 22);
        rangoFinalHoras.set('minute', 1);
        if (moment(date).isBetween(rangoInicialHoras, rangoFinalHoras, 'minute')) {
            this.setState({ dialogoDetallesProspecto: { ...this.state.dialogoDetallesProspecto, fechaHoraCitaGestion: date.toDate() } });
        } else {
            this.setState({
                snackbarNotificacion: SNACKBAR_NOTIFICACION_FECHA_HORA_CITA_GESTION_FUERA_RANGO,
                dialogoDetallesProspecto: {
                    ...this.state.dialogoDetallesProspecto,
                    fechaHoraCitaGestion: null
                }
            });
        }
    }

    handleGestionPersonaComentarioGestionChange = (event, value) => {
        if (lengthLetterNumberValidation(event.target.value, 255, true)) {
            this.setState({ dialogoDetallesProspecto: { ...this.state.dialogoDetallesProspecto, comentarioGestion: event.target.value.toUpperCase() } });
        }
    }

    handleGestionPersonaRegistrarGestionOnClick = async (event, value) => {
        const { oficina } = this.state;
        const { usuario } = this.state.session;
        const { selectedProspect, selectedDate } = this.state;
        const { medioGestion, respuestaGestion, contactoGestion, fechaHoraCitaGestion, comentarioGestion } = this.state.dialogoDetallesProspecto;

        if (medioGestion !== '' && respuestaGestion !== '' && contactoGestion !== '' && comentarioGestion !== '') {
            const params = {
                claveEmpresa: selectedDate.claveEmpresa,
                codigoCampania: selectedDate.codigoCampania,
                periodo: selectedDate.periodo,
                idProspecto: selectedDate.idProspecto,
                idGestion: selectedDate.idGestion,
                gestion: {
                    claveEmpresa: selectedProspect.claveEmpresa,
                    codigoCampania: selectedProspect.codigoCampania,
                    periodo: selectedProspect.periodo,
                    idProspecto: selectedProspect.idProspecto,
                    codigoContacto: medioGestion,
                    codigoResultado: respuestaGestion,
                    comentarios: comentarioGestion,
                    gestor: usuario.usuario,
                    fechaCita: fechaHoraCitaGestion !== null ? fechaHoraCitaGestion : null,
                    horaCita: fechaHoraCitaGestion !== null ? fechaHoraCitaGestion : null,
                    codigoTipoCita: fechaHoraCitaGestion !== null ? respuestaGestion : null,
                    codigoLugarCita: respuestaGestion === 'CITA' ? 'SUC' : respuestaGestion === 'LLDP' ? 'TEL' : null
                }
            }
            if ((respuestaGestion === 'CITA' || respuestaGestion === 'LLDP') && fechaHoraCitaGestion !== null) {
                this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                if (Object.keys(selectedDate).length > 0) {
                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                    await this.props.postGenerarCierreCita(params, this.handleDialogoNotificacionClose).then(response => {
                        const {payload} = response;
                        if(payload.successful){
                            this.setState({
                                snackbarNotificacion: SNACKBAR_NOTIFICACION_CIERRE_CITA_EXTIOSO,
                                dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE,
                                detallesProspectoTabs: TABS_DETALLES_PROSPECTO,
                                selectedDate: {}
                            });
                            this.obtenerCitas(oficina, usuario);
                        }
                        else{
                            this.setState({ snackbarNotificacion: SNACKBAR_NOTIFICACION_CITA_OCUPADA });
                        }
                    });
                }
                else {
                    await this.props.postGenerarGestionProspecto(params.gestion, this.handleDialogoNotificacionClose).then(result => {
                        const { payload } = result;
                        if (payload.successful) {
                            this.setState({
                                selectedProspect: {
                                    ...this.state.selectedProspect,
                                    gestiones: update(this.state.selectedProspect.gestiones, { $push: [result.payload.payload] })
                                },
                                dialogoDetallesProspecto: {
                                    ...this.state.dialogoDetallesProspecto,
                                    medioGestion: '',
                                    respuestaGestion: '',
                                    contactoGestion: '',
                                    fechaHoraCitaGestion: null,
                                    comentarioGestion: '',
                                },
                                snackbarNotificacion: SNACKBAR_NOTIFICACION_POST_GENERAR_GESTION_PROSPECTO_SUCCESS
                            });
                            const recordPosition = this.props.catalogos.prospectos.findIndex(record => record.idProspecto === this.state.selectedProspect.idProspecto);
                            const { prospectos } = this.props.catalogos;
                            this.props.setProspectos(update(prospectos, {
                                [recordPosition]: {
                                    gestiones: {
                                        $set: this.state.selectedProspect.gestiones
                                    }
                                }
                            }));
                        }
                        else {
                            this.setState({ snackbarNotificacion: SNACKBAR_NOTIFICACION_CITA_OCUPADA });
                        }
                    });
                }
            }
            if ((respuestaGestion !== 'CITA' && respuestaGestion !== 'LLDP') && fechaHoraCitaGestion === null) {
                if (Object.keys(selectedDate).length > 0) {
                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                    await this.props.postGenerarCierreCita(params, this.handleDialogoNotificacionClose).then(response => {
                        const {payload} = response;
                        if(payload.successful){
                            this.setState({
                                snackbarNotificacion: SNACKBAR_NOTIFICACION_CIERRE_CITA_EXTIOSO,
                                dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE,
                                detallesProspectoTabs: TABS_DETALLES_PROSPECTO,
                                selectedDate: {}
                            });
                            this.obtenerCitas(oficina, usuario);
                        }
                    });
                }
                else {
                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                    await this.props.postGenerarGestionProspecto(params.gestion, this.handleDialogoNotificacionClose).then(result => {
                        if (result.payload !== null) {
                            this.setState({
                                selectedProspect: {
                                    ...this.state.selectedProspect,
                                    gestiones: update(this.state.selectedProspect.gestiones, { $push: [result.payload.payload] })
                                },
                                dialogoDetallesProspecto: {
                                    ...this.state.dialogoDetallesProspecto,
                                    medioGestion: '',
                                    respuestaGestion: '',
                                    contactoGestion: '',
                                    fechaHoraCitaGestion: null,
                                    comentarioGestion: '',
                                },
                                snackbarNotificacion: SNACKBAR_NOTIFICACION_POST_GENERAR_GESTION_PROSPECTO_SUCCESS
                            });
                            const recordPosition = this.props.catalogos.prospectos.findIndex(record => record.idProspecto === this.state.selectedProspect.idProspecto);
                            const { prospectos } = this.props.catalogos;
                            this.props.setProspectos(update(prospectos, {
                                [recordPosition]: {
                                    gestiones: {
                                        $set: this.state.selectedProspect.gestiones
                                    }
                                }
                            }));
                        }
                    });
                }
            }
            if ((respuestaGestion === 'CITA' || respuestaGestion === 'LLDP') && fechaHoraCitaGestion === null) {
                this.setState({
                    snackbarNotificacion: SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS
                });
            }
        }
        else {
            this.setState({
                snackbarNotificacion: SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS
            });
        }
    }

    handleDialogoDetallesProspectoClose = (event, value) => {
        this.setState({
            dialogoDetallesProspecto: DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE,
            detallesProspectoTabs: TABS_DETALLES_PROSPECTO,
            selectedDate: {}
        });
    }

    handleTipoTelefonoChange = (event, value) => {
        this.setState({
            tipoTelefono: {
                ...this.state.tipoTelefono,
                value: event.target.value
            }
        });
    }

    handleTipoPlanChange = (event, value) => {
        this.setState({
            tipoPlan: {
                ...this.state.tipoPlan,
                value: event.target.value
            }
        });
    }

    handleTelefonoChange = (event, value) => {
        if (lengthNumberValidation(event.target.value, 10)) {
            this.setState({
                telefono: {
                    ...this.state.telefono,
                    value: event.target.value,
                    error: event.target.value.length > 9 || event.target.value.length === 0 ? false : true
                }
            });
        }
    }

    handleExtensionChange = (event, value) => {
        if (lengthNumberValidation(event.target.value, 6)) {
            this.setState({
                extension: {
                    ...this.state.extension,
                    value: event.target.value
                }
            });
        }
    }

    handleAgregarContactoOnClick = async () => {
        const { tipoTelefono, tipoPlan, telefono, extension, selectedProspect } = this.state;
        const { usuario, oficina } = this.state.session;

        if (tipoTelefono.value !== '' && tipoPlan.value !== '' && (telefono.value !== '' && telefono.error === false)) {
            const params = {
                idPersona: selectedProspect.idProspecto,
                origen: 'SGAP',
                usuarioAlta: usuario.usuario,
                usuarioUltMod: usuario.usuario,
                idSucursal: oficina.oficina === 0 ? this.state.oficina.value : oficina.oficina,
                telefonos: [
                    {
                        idTelefono: {
                            tipoTelefono: tipoTelefono.value
                        },
                        telefono: telefono.value,
                        extension: extension.value !== '' ? extension.value : null,
                        cveProveedorServicios: 'NA',
                        tipoPlan: tipoPlan.value,
                        status: 'N',
                        bloqueado: 'N',
                        usuarioAlta: usuario.usuario,
                        usuarioUltMod: usuario.usuario
                    }
                ]
            };
            await this.props.postAgregarTelefonosPersona(params, this.handleDialogoNotificacionClose).then(async response => {
                if (response.payload.successful) {
                    const params = {
                        idPersona: this.state.selectedProspect.idProspecto
                    }

                    this.setState({ dialogoNotificacion: DIALOGO_NOTIFICACION_CARGANDO });
                    const fetchPersona = await this.props.fetchPersona(params, this.handleDialogoNotificacionClose);
                    this.setState({
                        selectedProspect: {
                            ...this.state.selectedProspect,
                            telefonos: fetchPersona.payload.payload[0].telefonos
                        },
                        tipoTelefono: FIELD_INITIAL_STATE_ENABLED,
                        tipoPlan: FIELD_INITIAL_STATE_ENABLED,
                        telefono: FIELD_INITIAL_STATE_ENABLED,
                        extension: FIELD_INITIAL_STATE_ENABLED,
                        snackbarNotificacion: SNACKBAR_NOTIFICACION_TELEFONO_PERSONA_AGREGADO
                    });
                }
                else {
                    this.setState({
                        snackbarNotificacion: {
                            opened: true,
                            duration: 3000,
                            icon: 'error',
                            message: response.payload.technicalMessage.split(':')[0],
                            type: 'error'
                        }
                    });
                }
            });
        }
        else {
            this.setState({
                snackbarNotificacion: SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS
            });
        }
    }

    render() {
        const { handleEmpresaChange, handleOficinaChange, handlePeriodoOnClick, handlePeriodoCampaniasOnClick, handleExpansionPanelBusquedaAvanzadaChange, handleExpansionPanelPeriodosComercialesChange, handleExpansionPanelSucursalesChange, handleNombreChange, handleApellidoPaternoChange, handleApellidoMaternoChange, handlePersonaChange, handleContratoChange, handleLimpiarOnClick, handleConsultarOnClick } = this;
        const methodsPanelExpansiones = { handleEmpresaChange, handleOficinaChange, handlePeriodoOnClick, handlePeriodoCampaniasOnClick, handleExpansionPanelBusquedaAvanzadaChange, handleExpansionPanelPeriodosComercialesChange, handleExpansionPanelSucursalesChange, handleNombreChange, handleApellidoPaternoChange, handleApellidoMaternoChange, handlePersonaChange, handleContratoChange, handleLimpiarOnClick, handleConsultarOnClick };

        const { handleTabChange, handleSelectedProspectChange, handleSelectedDateChange, handleProspectosPageChange, handleCitasPageChange } = this;
        const methodsPanelContenedorTabs = { handleTabChange, handleSelectedProspectChange, handleSelectedDateChange, handleProspectosPageChange, handleCitasPageChange };

        const { parseDate, handleDetallesProspectoTabChange, handleGestionPersonaMedioGestionChange, handleGestionPersonaRespuestaGestionChange, handleGestionPersonaContactoGestionChange, handleGestionPersonaFechaHoraCitaGestionChange, handleGestionPersonaComentarioGestionChange, handleGestionPersonaRegistrarGestionOnClick, handleDialogoDetallesProspectoClose, handleTipoTelefonoChange, handleTipoPlanChange, handleTelefonoChange, handleExtensionChange, handleAgregarContactoOnClick } = this;
        const methodsDialogoDetallesProspecto = { parseDate, handleDetallesProspectoTabChange, handleGestionPersonaMedioGestionChange, handleGestionPersonaRespuestaGestionChange, handleGestionPersonaContactoGestionChange, handleGestionPersonaFechaHoraCitaGestionChange, handleGestionPersonaComentarioGestionChange, handleGestionPersonaRegistrarGestionOnClick, handleDialogoDetallesProspectoClose, handleTipoTelefonoChange, handleTipoPlanChange, handleTelefonoChange, handleExtensionChange, handleAgregarContactoOnClick };
        return (
            <div
                style={
                    {
                        height: '100vh',
                        display: 'flex'
                    }
                }
            >
                <div
                    style={
                        {
                            width: '20%',
                            heigth: '100%',
                            display: 'flex',
                            marginTop: 10,
                            marginLeft: 10,
                            marginBottom: 10,
                            marginRight: 5
                        }
                    }
                >
                    <PanelExpansiones
                        {...this.props.catalogos}
                        {...this.state}
                        {...methodsPanelExpansiones}
                    >
                    </PanelExpansiones>
                </div>
                <div
                    style={
                        {
                            width: '80%',
                            heigth: '100%',
                            display: 'flex',
                            marginTop: 10,
                            marginLeft: 5,
                            marginBottom: 10,
                            marginRight: 10
                        }
                    }
                >
                    <PanelContenedorTabs
                        {...this.props.catalogos}
                        {...this.state}
                        {...methodsPanelContenedorTabs}
                    >
                    </PanelContenedorTabs>
                </div>
                <DialogoDetallesProspecto
                    {...this.props.catalogos}
                    {...this.state}
                    {...this.state.dialogoDetallesProspecto}
                    {...methodsDialogoDetallesProspecto}
                >
                </DialogoDetallesProspecto>
                <SnackbarNotificacion
                    {...this.state.snackbarNotificacion}
                    onClose={this.handleSnackBarNotificacionClose}
                >
                </SnackbarNotificacion>
                <DialogNotificationModal
                    {...this.state.dialogoNotificacion}
                    handleClose={this.handleDialogoNotificacionClose}
                >
                </DialogNotificationModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    catalogos: getCatalogos(state),
    session: getSession(state)
})

const mapDispatchToProps = {
    fetchMapaJNDI,
    fetchOficinas,
    fetchGestores,
    fetchArbolCampanias,
    fetchCampanias,
    fetchPersona,
    fetchProspectos,
    fetchCitas,
    setProspectos,
    getAccess,
    postGenerarGestionProspecto,
    postGenerarCierreCita,
    postAgregarTelefonosPersona
}

export default connect(mapStateToProps, mapDispatchToProps)(GestionAsignacionProspectosContainer);