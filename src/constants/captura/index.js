export const stepsCaptura = [
    {
      "id": 0,
      "nombre": "Captura",
      "icon": "work",
      "color": "primary",
      "disabled": false
    },
    {
      "id": 1,
      "nombre": "Evaluación",
      "icon": "description",
      "color": "disabled",
      "disabled": true
    },
    {
      "id": 2,
      "nombre": "Investigación",
      "icon": "business",
      "color": "disabled",
      "disabled": true
    },
    {
      "id": 3,
      "nombre": "Análisis de Crédito",
      "icon": "attach_money",
      "color": "disabled",
      "disabled": true
    },
    {
      "id": 4,
      "nombre": "Autorización",
      "icon": "assignment",
      "color": "disabled",
      "disabled": true
    },
    {
      "id": 5,
      "nombre": "Cierre",
      "icon": "assignment",
      "color": "disabled",
      "disabled": true
    }
  ];

export const SIN_EXPEDIENTES = {
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 2000,
    icon: 'information',
    message: 'No hay registros en base a filtros seleccionados',
    type: 'information'
};

export const ERROR_PORCENTAJE_SUMA_ASEGURADA = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 2000,
  icon: 'error',
  message: 'La suma de los porcentajes de los beneficiarios debe ser 100',
  type: 'error'
};

export const GUARDAR_XML_OK = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 2000,
  icon: 'success',
  message: 'Se guardó el XML con exito',
  type: 'success'
};

export const GUARDAR_XML_ERROR = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 2000,
  icon: 'error',
  message: 'Ocurrió un error al guardar el XML',
  type: 'error'
};

export const DIALOGO_NOTIFICACION_ERROR_DIGITALIZACION_GUARDAR = {
  opened: true,
  title: 'Error en Anexar Documentos',
  icon: 'error',
  iconColor: 'secondary',
  content: 'Ha ocurrido un error al intentar guardar los documentos',
  subcontent: '',
  isLoadingDialog: false,
  flag: false
};

export const DIALOGO_NOTIFICACION_GUARDANDO = {
  opened: true,
  title: 'Guardando Informacion',
  icon: 'info',
  iconColor: 'primary',
  content: 'Guardando Datos...',
  subcontent: 'Espere un momento, sea paciente...',
  isLoadingDialog: true,
  flag: false
};
