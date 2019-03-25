import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './../reducers';
import promiseMilddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { FOLIOS_INITIAL_STATE, OPCIONES } from './../../constants/RegistroSolicitud/registroSolicitud';

import { CATALOGO_EMPRESAS, CATALOGO_STATUSES, CATALOGO_DESTINOS, CATALOGO_MEDIOS_GESTION, CATALOGO_RESPUESTAS_GESTION } from './../../constants/Generic';

const estadoInicial = {
    navegacion: {
        opciones: OPCIONES,
        opcionActiva: 0
    },
    busquedaPersona: {
        clienteSeleccionado: []
    },
    sessionRegistro: {},
    datosCredito: {
        dialogoAltaFolio: FOLIOS_INITIAL_STATE,
        datosSolicitud: {}
    },
    catalogos: {
        mapaJNDI: null,
        empresas: CATALOGO_EMPRESAS,
        oficinas: [],
        campanias: [],
        periodos: [],
        statuses: CATALOGO_STATUSES,
        destinos: CATALOGO_DESTINOS,
        mediosGestion: CATALOGO_MEDIOS_GESTION,
        respuestasGestion: CATALOGO_RESPUESTAS_GESTION,
        gestores: [],
        persona: {},
        arbolCampanias: [],
        prospectos: [],
        citas: []
    },
    session: {
        access: null
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, estadoInicial, composeEnhancers(applyMiddleware(promiseMilddleware, thunk)));