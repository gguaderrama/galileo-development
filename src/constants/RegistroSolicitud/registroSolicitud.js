export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const SET_NEXT_STEP = 'SET_NEXT_STEP';
export const OBTENER_PERSONAS = 'OBTENER_PERSONAS';
export const SET_CLIENTES = 'SET_PERSONAS';
export const SET_STEP_DISABLED = 'SET_STEP_DISABLED';
export const SET_STEP_VISIBLE = 'SET_STEP_VISIBLE';
export const SET_SELECTED_CLIENTE = 'SET_SELECTED_CLIENTE';
export const AGREGA_DOMICILIO = 'AGREGA_DOMICILIO';
export const DELETE_DOMICILIO = 'DELETE_DOMICILIO';
export const DELETE_INTEGRANTE = 'DELETE_INTEGRANTE';
export const CONSULTA_FORMATOS = 'CONSULTA_FORMATOS';
export const GENERA_FOLIO = 'GENERA_FOLIO';
export const VALIDA_FOLIO = 'VALIDA_FOLIO';
export const CONSULTA_VENDEDORES = 'CONSULTA_VENDEDORES';
export const CONSULTA_PRODUCTOS = 'CONSULTA_PRODUCTOS';
export const CONSULTA_DESCRIPCION_PRODUCTOS = 'CONSULTA_DESCRIPCION_PRODUCTOS';
export const CONSULTA_PRODUCTOS_WS = 'CONSULTA_PRODUCTOS_WS';
export const CONSULTA_SEGUROS = 'CONSULTA_SEGUROS';
export const CALCULA_MONTO_PAGO = 'CALCULA_MONTO_PAGO';
export const CALCULA_MONTO_PAGO_SIN_SEGURO = 'CALCULA_MONTO_PAGO_SIN_SEGURO';
export const OBTEN_TIPO_ANALISIS = 'OBTEN_TIPO_ANALISIS';
export const CONSULTA_COLONIAS = 'CONSULTA_COLONIAS';
export const CONSULTA_COLONIAS_EMPLEO = 'CONSULTA_COLONIAS_EMPLEO';
export const CONSULTA_CONTRATO_ANT = 'CONSULTA_CONTRATO_ANT';
export const CONSULTA_POLITICAS_RENOVACION_X_CLIENTE = 'CONSULTA_POLITICAS_RENOVACION_X_CLIENTE';
export const ACTUALIZAR_INFORMACION_PERSONA = 'ACTUALIZAR_INFORMACION_PERSONA';
export const CALCULA_RFC = 'CALCULA_RFC';
export const CONSULTA_CATALOGO_RELACIONES = 'CONSULTA_CATALOGO_RELACIONES';
export const UPDATE_DOMICILIO = 'UPDATE_DOMICILIO';
export const SET_DATOS_CREDITO = 'SET_DATOS_CREDITO';
export const VALIDA_XML_PRESCORE = 'VALIDA_XML_PRESCORE';
export const VALIDA_POLITICAS_REGISTRO = 'VALIDA_POLITICAS_REGISTRO';
export const GET_MODELO_BPM = 'GET_MODELO_BPM';
export const VALIDA_ZONA_AUTORIZADA = 'VALIDA_ZONA_AUTORIZADA';
export const ACTUALIZA_ASENTAMIENTO_PARTICULAR = 'ACTUALIZA_ASENTAMIENTO_PARTICULAR';
export const ACTUALIZA_ASENTAMIENTO_EMPLEO = 'ACTUALIZA_ASENTAMIENTO_EMPLEO';
export const REGISTRA_SOLICITUD = 'REGISTRA_SOLICITUD';
export const RECHAZAR_SOLICITUD = 'RECHAZAR_SOLICITUD';
export const CONSULTA_CORRESPONSALES = 'CONSULTA_CORRESPONSALES';
export const CONSULTA_TIPOS_DISPOSICION = 'CONSULTA_TIPOS_DISPOSICION';
export const LIMPIAR_REDUCER_BUSQUEDA = 'LIMPIAR_REDUCER_BUSQUEDA';
export const LIMPIAR_DATOS_CREDITO = 'LIMPIAR_DATOS_CREDITO';
export const SET_DATOS_PRESCORE = 'SET_DATOS_PRESCORE';
export const GUARDA_INFORMACION_XML_PRESCORE = 'GUARDA_INFORMACION_XML_PRESCORE';
export const VALIDA_PRESCORE = 'VALIDA_PRESCORE';
export const OBTENER_IP = 'OBTENER_IP';
export const OPCIONES = [{
    "id": 0,
    "nombre": "BÚSQUEDA CLIENTE",
    "icon": 'search',
    "color": "primary",
    "disabled": false
},
{
    "id": 1,
    "nombre": "DATOS CRÉDITO",
    "icon": "payment",
    "color": "disabled",
    "disabled": true
},
{
    "id": 2,
    "nombre": "INTEGRANTES",
    "icon": "people",
    "color": "disabled",
    "disabled": false
},
{
    "id": 3,
    "nombre": "DIGITALIZACIÓN",
    "icon": "scanner",
    "color": "disabled",
    "disabled": true
},
{
    "id": 4,
    "nombre": "PREEVALUACIÓN",
    "icon": "assignment",
    "color": "disabled",
    "disabled": true
},
{
    "id": 5,
    "nombre": "PRUEBA",
    "icon": "assignment",
    "color": "primary",
    "disabled": false
}];

export const PARAMETROS_REGISTRO = [
    'gsCveUsuario',
    'gsCveSucursal',
    'gsCveCentroCosto',
    'gsCveEmpresa',
    'gsCveUsuario',
    'gsCvePerfil',
    'usuario',
    'departamento',
    'nombre'
];

export const NO_EXISTE_PERSONA = {
    opened: true,
    iconColor: 'text',
    content: 'Error',
    subcontent: 'Hay más de 25 resultados similares, afine su busqueda empleando más datos como lo son fecha de nacimiento y/o rfc',
    bandera: false,
    isLoadingDialog: false
};

export const NO_EXISTE_INTEGRANTE_EN_BD = {
    opened: true,
    iconColor: 'text',
    content: 'No se encontró información referente al cliente.',
    subcontent: '¿Deseas agregar a la persona?',
    bandera: true,
    isLoadingDialog: false
};

export const GENERIC_DIALOG_CONTENT = {
    opened: true,
    iconColor: '',
    content: '',
    subcontent: '',
    bandera: null,
    isLoadingDialog: null

};

export const GENERIC_SNACK_CONTENT = {
    verticalPosition: '',
    horizontalPosition: '',
    duration: 0,
    icon: '',
    message: '',
    type: ''

};

export const DATOS_CREDITO_STEP_STATE = {
    index: 1,
    color: "primary",
    disabled: false
}
export const INITIAL_STATE_DATOS = {
    index: 1,
    color: "disabled",
    disabled: true
}
export const INTEGRANTES_STEP_STATE = {
    index: 2,
    color: "primary",
    disabled: false
}

export const INITIAL_STATE_INTEGRANTES = {
    index: 2,
    color: "disabled",
    disabled: true
}

export const PRESCORE_STEP_STATE = {
    index: 4,
    color: "primary",
    disabled: false
}

export const INITIAL_STATE_PRESCORE = {
    index: 4,
    color: "disabled",
}

export const DIGITALIZA_STEP_STATE = {
    index: 3,
    color: "primary",
    disabled: false
}

export const INITIAL_STATE_DIGITALIZA = {
    index: 3,
    color: "disabled",
}

export const DATOS_BUSQUEDA_PERSONA = [
    { id: 'persona', label: 'N° Persona' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'rfc', label: 'RFC' },
    { id: 'estado', label: 'Estado' },
    { id: 'tipoPersona', label: 'Tipo Persona' },
    { id: 'domParticular', label: 'Domicilio Paritcular' },
    { id: 'domEmpleo', label: 'Domicilio Empleo' },
    { id: 'agregar', label: 'Seleccionar' }
];
export const DATOS_BUSQUEDA_INTEGRANTE = [
    { id: 'persona', label: 'N° Persona' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'rfc', label: 'RFC' },
    { id: 'estado', label: 'Estado' },
    { id: 'tipoPersona', label: 'Tipo Persona' },
    { id: 'domParticular', label: 'Domicilio Paritcular' },
    { id: 'domEmpleo', label: 'Domicilio Empleo' },

];
export const DATOS_INTEGRANTES = [
    { id: 'persona', label: 'N° Persona' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'efectivo-solicitado', label: 'Efectivo solicitado' },
    { id: 'monto-seguro', label: 'Monto seguro' },
    { id: 'monto-pago', label: 'Monto pago' },
    { id: 'tipo-relacion', label: 'Tipo relación' },
    { id: 'editar', label: 'Editar' },
];

export const DATOS_DOMICILIO_INTEGRANTES = [
    { id: 'tipo-domicilio', label: 'Tipo Domicilio' },
    { id: 'calle', label: 'Calle' },
    { id: 'numero-exterior', label: 'Número Exterior' },
    { id: 'numero-interior', label: 'Número interior' },
    { id: 'ciudad', label: 'Ciudad' },
    { id: 'codigo-postal', label: 'Código Postal' },
    { id: 'colonia', label: 'Colonia' },
    { id: 'tipo-vivienda', label: 'Tipo Vivienda' },
    { id: 'pais', label: 'País' },
    { id: 'estado', label: 'Estado' },
];
export const DATOS_PRESCORE = [
    { id: 'persona', label: 'N° Persona' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'tipoRelacion', label: 'Tipo Relación' },
    { id: 'resultado', label: 'Resultado' }
];

export const DATOS_DIGITALIZA = [
    { id: 'persona', label: 'N° Persona' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'tipoRelacion', label: 'Tipo Relación' },
    { id: 'adjuntar', label: 'Adjuntar Imagen' }
];
export const CATALOGOS_INICIO = [
    { "tipoCodigo": "TDOMI" },
    { "tipoCodigo": "VIVI" }
];
