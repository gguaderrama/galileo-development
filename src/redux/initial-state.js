//import { CATALOGO_EMPRESAS, CATALOGO_STATUSES, CATALOGO_DESTINOS, CATALOGO_MEDIOS_GESTION, CATALOGO_RESPUESTAS_GESTION } from 'constants/Generic';
import { OPCIONES } from 'constants/RegistroSolicitud/registroSolicitud';
import * as GENERIC from 'constants/Generic';
import { CATALOGO_PARAMETROS } from 'constants/GestionAsignacionProspectos';
//
import CONST_STORE from 'constants/store';
const {
  DIALOG_NOTIFICATION_MODAL,
  SNACKBAR_NOTIFICATION
} = CONST_STORE;
//

const estadoInicial = {
  navegacion: {
    opciones: OPCIONES,
    opcionActiva: 0
  },
  busquedaPersona: {
    clienteSeleccionado: []
  },
  sessionRegistro: {

  },
  datosCredito: {
    datosSolicitud: {}
  },
  catalogos: {
    mapaJNDI: null,
    empresas: GENERIC.CATALOGO_EMPRESAS,
    oficinas: [],
    campanias: [],
    periodos: [],
    statuses: GENERIC.CATALOGO_STATUSES,
    destinos: GENERIC.CATALOGO_DESTINOS,
    mediosGestion: GENERIC.CATALOGO_MEDIOS_GESTION,
    respuestasGestion: GENERIC.CATALOGO_RESPUESTAS_GESTION,
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

export const initialState = {
  app: {
    snackbarNotification: {
      initialState: SNACKBAR_NOTIFICATION.INITIAL_STATE,
      bufferState: null
    },
    dialogNotificationModal: {
      initialState: DIALOG_NOTIFICATION_MODAL.INITIAL_STATE,
      bufferState: null
    },
    goBackPanel: {
      visible: false,
    },
    breadcrumbsPanel: {
      visible: false,
    },
    bufferState: null
  },
  catalogsCollection: {
    mapaJNDI: null,
    empresas: GENERIC.CATALOGO_EMPRESAS,
    oficinas: [],
    campanias: [],
    periodos: [],
    statuses: GENERIC.CATALOGO_STATUSES,
    destinos: GENERIC.CATALOGO_DESTINOS,
    mediosGestion: GENERIC.CATALOGO_MEDIOS_GESTION,
    respuestasGestion: GENERIC.CATALOGO_RESPUESTAS_GESTION,
    tiposDomicilio: GENERIC.CATALOGO_TIPOS_DOMICILIO,
    tiposTelefono: GENERIC.CATALOGO_TIPOS_TELEFONO,
    tipoContacto: GENERIC.CATALOGO_TIPOS_TELEFONO,
    tiposPlan: GENERIC.CATALOGO_TIPOS_PLAN,
    gestores: [],
    persona: {},
    arbolCampanias: [],
    prospectos: [],
    citas: [],
    //
    parametros: CATALOGO_PARAMETROS,
  },

  searchPanel: {
    inputSelectData: {
      empresas: null,
      oficinas: null,
      campanias: null,
      statuses: null
    },
    result: null,
    bufferState: null
  },

  ...estadoInicial
};
