import moment from 'moment';
import 'moment/locale/es';
//jjr
export const CATALOGO_EMPRESAS = [
    {
        claveEmpresa: '000100000000',
        codigoEmpresa: 1,
        nombreEmpresa: 'FISA'
    },
    {
        claveEmpresa: '000100000001',
        codigoEmpresa: 15,
        nombreEmpresa: 'FISOFO'
    },
    {
        claveEmpresa: '000100000003',
        codigoEmpresa: 12,
        nombreEmpresa: 'FINFIN'
    },
    {
        claveEmpresa: '000100000004',
        codigoEmpresa: 18,
        nombreEmpresa: 'AEF'
    }
];

export const CATALOGO_STATUSES = [
    {
        "claveStatus": "A",
        "nombreStatus": "ACTIVO"
    },
    {
        "claveStatus": "I",
        "nombreStatus": "INACTIVO"
    },
    {
        "claveStatus": "N",
        "nombreStatus": "NUEVO"
    }
];

export const CATALOGO_DESTINOS = [
    {
        "claveDestino": "CALLE",
        "nombreDestino": "CALLE"
    },
    {
        "claveDestino": "PISO",
        "nombreDestino": "PISO"
    }
];

export const CATALOGO_MEDIOS_GESTION = [
    {
        claveMedioGestion: 'CART',
        nombreMedioGestion: 'CARTA'
    },
    {
        claveMedioGestion: 'LLAM',
        nombreMedioGestion: 'LLAMADA'
    },
    {
        claveMedioGestion: 'MENS',
        nombreMedioGestion: 'MENSAJE'
    },
    {
        claveMedioGestion: 'VDOM',
        nombreMedioGestion: 'VISITA DOMICILIO'
    }
];

export const CATALOGO_RESPUESTAS_GESTION = [
    {
        claveRespuestaGestion: 'BUZO',
        nombreRespuestaGestion: 'BUZON'
    },
    {
        claveRespuestaGestion: 'CITA',
        nombreRespuestaGestion: 'CITA'
    },
    {
        claveRespuestaGestion: 'FASV',
        nombreRespuestaGestion: 'FUERA DEL AREA DE SERVICIO'
    },
    {
        claveRespuestaGestion: 'LLDP',
        nombreRespuestaGestion: 'LLAMAR DESPUES'
    },
    {
        claveRespuestaGestion: 'MLPL',
        nombreRespuestaGestion: 'MOLESTIA POR LA LLAMADA'
    },
    {
        claveRespuestaGestion: 'NOCT',
        nombreRespuestaGestion: 'NO CONTESTA'
    },
    {
        claveRespuestaGestion: 'NOIN',
        nombreRespuestaGestion: 'NO LE INTERESA'
    },
    {
        claveRespuestaGestion: 'TNOE',
        nombreRespuestaGestion: 'TELEFONO NO EXISTE'
    },
    {
        claveRespuestaGestion: 'TNOC',
        nombreRespuestaGestion: 'TELEFONO NO ES DEL CLIENTE'
    }
];

export const CATALOGO_TIPOS_DOMICILIO = [
    {
        claveTipoDomicilio: 'CASA',
        nombreTipoDomicilio: 'CASA'
    },{
        claveTipoDomicilio: 'EMPL',
        nombreTipoDomicilio: 'EMPLEO'
    }
];

export const CATALOGO_TIPOS_TELEFONO = [
    {
        claveTipoTelefono: 'DIRE',
        nombreTipoTelefono: 'DIRECTO'
    },{
        claveTipoTelefono: 'EMPL',
        nombreTipoTelefono: 'EMPLEO'
    }
];

export const CATALOGO_TIPOS_PLAN = [
    {
        claveTipoPlan: 'MOVIL',
        nombreTipoPlan: 'MOVIL'
    },{
        claveTipoPlan: 'FIJO',
        nombreTipoPlan: 'FIJO'
    }
];

export const SNACKBAR_NOTIFICACION_INITIAL_STATE = {
    opened: false,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 2000,
    icon: '',
    message: '',
    type: ''
};

export const DIALOGO_NOTIFICACION_INITIAL_STATE = {
    opened: false,
    title: '',
    icon: 'info',
    iconColor: 'primary',
    content: '',
    subcontent: '',
    isLoadingDialog: true,
    flag: false
};

export const DIALOGO_NOTIFICACION_CARGANDO = {
    opened: true,
    title: 'Obteniendo Informacion',
    icon: 'info',
    iconColor: 'primary',
    content: 'Cargando Datos...',
    subcontent: 'Espere un momento, sea paciente...',
    isLoadingDialog: true,
    flag: false
};

export const DIALOGO_NOTIFICACION_PARAMETROS_SESION_INCORRECTOS = {
    opened: true,
    title: 'Error en parametros de sesion',
    icon: 'error',
    iconColor: 'secondary',
    content: 'Ha ocurrido un error al consultar los parametros de sesion',
    subcontent: '',
    isLoadingDialog: true,
    flag: false
};

export const DIALOGO_NOTIFICACION_SIN_RESULTADOS = {
    opened: true,
    title: 'Sin Resultados',
    icon: 'info',
    iconColor: 'primary',
    content: 'Ninguna coincidencia con los filtros seleccionados',
    subcontent: '',
    isLoadingDialog: false,
    flag: false
};
//jjr
export const lengthNumberValidation = (expression, length) => {
    //original expression
    //only for dev purpose
    //expression: ^[0-9]{0,12}$
    const regExp = RegExp(`^[0-9]{0,${length}}$`);
    return regExp.test(expression)
};

export const lengthLetterValidation = (expression, length, allowSpaces) => {
    //original expression
    //only for dev purpose
    //expression with spaces allowed: ^[a-zA-ZñÑ ]{0,255}$
    //expression with spaces not allowed: ^[a-zA-ZñÑ]{0,255}$
    const regExp = RegExp(allowSpaces === true ? `^[a-zA-ZñÑ ]{0,${length}}$` : `^[a-zA-ZñÑ]{0,${length}}$`);
    return regExp.test(expression);
}

export const lengthLetterNumberValidation = (expression, length, allowSpaces) => {
    //original expression
    //only for dev purpose
    //expression with spaces allowed: ^[a-zA-Z0-9 ]{0,255}$
    //expression with spaces not allowed: ^[a-zA-Z0-9]{0,255}$
    const regExp = RegExp(allowSpaces === true ? `^[a-zA-Z0-9 ]{0,${length}}$` : `^[a-zA-Z0-9]{0,${length}}$`);
    return regExp.test(expression);
};

export const dateFormatArbolCampanias = (dateString) => {
    const date = moment(`${dateString}01`, 'YYYYMMDD');
    date.locale('es');
    return `${date.format('MMMM').toUpperCase()} ${date.format('YYYY')}`
};





/*
export const REGEX_RFC = '^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$';
 */
export const textValidation = (expression) => {
    const regExp = RegExp('^[a-zA-ZñÑ ]+$');
    return regExp.test(expression);
};

export const CONSULTAR_IMAGENES_VISOR = 'CONSULTAR_IMAGENES_VISOR';
export const OBTENER_RUTA_COA = 'OBTENER_RUTA_COA';
