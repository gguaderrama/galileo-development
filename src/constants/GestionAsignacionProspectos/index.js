export const CATALOGO_PARAMETROS = [
    'claveEmpresa',
    'oficina',
    'usuario',
    'nombre'
];

export const TABS_GESTION_ASIGNACION_PROSPECTOS = [
    {
        key: 0,
        label: 'Prospectos',
        icons: [
            {
                key: 0,
                name: 'group'
            }
        ],
        disabled: false,
        visible: true
    },
    {
        key: 1,
        label: 'Citas',
        icons: [
            {
                key: 0,
                name: 'event_available'
            }
        ],
        disabled: false,
        visible: true
    },
    {
        key: 2,
        label: 'Asignacion Manual',
        icons: [
            {
                key: 0,
                name: 'compare_arrows'
            },
            {
                key: 1,
                name: 'person'
            }
        ],
        disabled: false,
        visible: true
    },
    {
        key: 3,
        label: 'Seleccion Carteo',
        icons: [
            {
                key: 0,
                name: 'print'
            },
            {
                key: 1,
                name: 'list_alt'
            }
        ],
        disabled: true,
        visible: false
    },
    {
        key: 4,
        label: 'Reportes',
        icons: [
            {
                key: 0,
                name: 'insert_chart_outlined'
            }
        ],
        disabled: true,
        visible: false
    }
];

export const TABS_DETALLES_PROSPECTO = [
    {
        key: 0,
        label: 'Ofertas',
        icon: 'attach_money',
        toolTip: 'Mostrar Datos Ofertas'
    },{
        key: 1,
        label: 'Asignación',
        icon: 'directions',
        toolTip: 'Mostrar Datos Asignación'
    },{
        key: 2,
        label: 'Personales',
        icon: 'person',
        toolTip: 'Mostrar Datos Personales'
    },{
        key: 3,
        label: 'Teléfonos',
        icon: 'phone',
        toolTip: 'Mostrar Datos Teléfonos'
    },{
        key: 4,
        label: 'Domicilios',
        icon: 'home',
        toolTip: 'Mostrar Datos Domicilios'
    }
];

export const TABS_DETALLES_PROSPECTO_OFERTAS_ONLY = [
    {
        key: 0,
        label: 'Ofertas',
        icon: 'attach_money',
        toolTip: 'Mostrar Datos Ofertas'
    }
];

export const BUSQUEDA_PROSPECTOS_COLUMNS = [
    {
        key: 0,
        label: 'Persona'
    }, {
        key: 1,
        label: 'Nombre'
    }, {
        key: 2,
        label: 'Contrato'
    }, {
        key: 3,
        label: 'Estatus'
    }, {
        key: 4,
        label: 'Motivo Estatus'
    }, {
        key: 5,
        label: 'Oficina'
    }, {
        key: 6,
        label: 'Ultima Gestión'
    }, {
        key: 7,
        label: 'Gestor'
    }, {
        key: 8,
        label: 'Gestión Principal'
    },
    {
        key: 9,
        label: 'Gestión Secundaria'
    },{
        key: 10,
        label: 'Ultima Modificación'
    },{
        key: 11,
        label: 'Detalles'
    }
];

export const DETALLES_PROSPECTO_OFERTAS_PRODUCTO_ACTUAL_COLUMNS = [
    {
        key: 0,
        label: 'Tipo'
    },
    {
        key: 1,
        label: 'Categoría'
    },
    {
        key: 2,
        label: 'Producto'
    },
    {
        key: 3,
        label: 'Monto'
    },
    {
        key: 4,
        label: 'Plazo'
    },
    {
        key: 5,
        label: 'Frecuencia Pago'
    },
    {
        key: 6,
        label: 'Monto Pago'
    },
    {
        key: 7,
        label: 'Tasa'
    }
];

export const DETALLES_PROSPECTO_OFERTAS_PRODUCTOS_NUEVOS_COLUMNS = [
    {
        key: 0,
        label: 'Id Oferta'
    },
    {
        key: 1,
        label: 'Tipo'
    },
    {
        key: 2,
        label: 'Categoría'
    },
    {
        key: 3,
        label: 'Producto'
    },
    {
        key: 4,
        label: 'Monto Mínimo'
    },
    {
        key: 5,
        label: 'Monto Máximo'
    },
    {
        key: 6,
        label: 'Frecuencia Pago'
    },
    {
        key: 7,
        label: 'Tasa'
    },
    {
        key: 8,
        label: 'Plazo'
    },
    {
        key: 9,
        label: 'Monto Pago'
    },
    {
        key: 10,
        label: 'Grupo Renovación'
    }
];

export const DETALLES_PROSPECTO_DOMICILIOS_COLUMNS = [
    {
        key: 0,
        label: 'Consecutivo'
    },
    {
        key: 1,
        label: 'Tipo'
    },
    {
        key: 2,
        label: 'Calle'
    },
    {
        key: 3,
        label: 'No Exterior'
    },
    {
        key: 4,
        label: 'No Interior'
    },
    {
        key: 5,
        label: 'CP'
    },
    {
        key: 6,
        label: 'Colonia'
    },
    {
        key: 7,
        label: 'Minicipio/Delegación'
    },
    {
        key: 8,
        label: 'Código Estado'
    }
];

export const DETALLES_PROSPECTO_TELEFONOS_COLUMNS = [
    {
        key: 0,
        label: 'Consecutivo'
    },
    {
        key: 1,
        label: 'Tipo'
    },
    {
        key: 2,
        label: 'Plan'
    },
    {
        key: 3,
        label: 'Teléfono'
    },
    {
        key: 4,
        label: 'Extensión'
    }
];

export const DETALLES_PROSPECTO_DESTINOS_COLUMNS = [
    {
        key: 0,
        label: 'Código Destino'
    },
    {
        key: 1,
        label: 'Gestor'
    },
    {
        key: 2,
        label: 'Usuario Asignación'
    },
    {
        key: 3,
        label: 'Fecha Asignación'
    },
    {
        key: 4,
        label: 'Fecha Ultima Modificación'
    },
    {
        key: 5,
        label: 'Usuario Ultima Modificación'
    }
];

export const GESTION_PERSONA_HISTORIAL_GESTIONES_COLUMNS = [
    {
        key: 0,
        label: 'Id Gestión'
    }, {
        key: 1,
        label: 'Periodo'
    }, {
        key: 2,
        label: 'Campaña'
    }, {
        key: 3,
        label: 'Fecha Gestión'
    }, {
        key: 4,
        label: 'Gestor'
    }, {
        key: 5,
        label: 'Tipo Gestión'
    }, {
        key: 6,
        label: 'Respuesta'
    }, {
        key: 7,
        label: 'Comentarios'
    }
];

export const GESTION_PERSONA_CONTACTOS_COLUMNS = [
    {
        key: 0,
        label: 'Tipo'
    }, {
        key: 1,
        label: 'Consecutivo'
    }, {
        key: 2,
        label: 'Nombre'
    }, {
        key: 3,
        label: 'Contacto'
    }, {
        key: 4,
        label: 'Ultima Modificacion'
    }
];

export const GESTION_PERSONA_OFERTAS_COLUMNS = [
    {
        key: 0,
        label: 'Producto'
    }, {
        key: 1,
        label: 'Monto Credito'
    }, {
        key: 2,
        label: 'Monto Seguro'
    }, {
        key: 3,
        label: 'Monto Pago'
    }, {
        key: 4,
        label: 'Tasa'
    }, {
        key: 5,
        label: 'Plazo'
    }, {
        key: 6,
        label: 'Frecuencia'
    }, {
        key: 7,
        label: 'Efectivo Otorgado'
    }
];

export const BUSQUEDA_CITAS_COLUMNS = [
    {
        key: 0,
        label: 'Fecha'
    }, {
        key: 1,
        label: 'Hora'
    }, {
        key: 2,
        label: 'Persona'
    }, {
        key: 3,
        label: 'Cliente'
    }, {
        key: 4,
        label: 'Campaña'
    }, {
        key: 5,
        label: 'Tipo Cita'
    }, {
        key: 6,
        label: 'Gestor'
    },{
        key: 7,
        label: 'Detalle'
    }
];

export const PANEL_ASIGNACION_MANUAL_COLUMNS = [
    {
        key: 0,
        label: 'Código Campania'
    },{
        key: 1,
        label: 'Periodo'   
    },{
        key: 2,
        label: 'Id Prospecto'
    },{
        key: 3,
        label: 'Solicitud'
    },{
        key: 4,
        label: 'Contrato'
    },{
        key: 5,
        label: 'Nombre Prospecto'
    }
];


export const PAGINATION_INITIAL_STATE = {
    start: 0,
    limit: 10,
    total: 0,
    page: 0
};

export const FIELD_INITIAL_STATE_DISABLED = {
    value: '',
    error: false,
    disabled: true,
    readOnly: false
};

export const FIELD_INITIAL_STATE_ENABLED = {
    value: '',
    error: false,
    disabled: false,
    readOnly: false
};

export const EXPANSION_PANEL_INITIAL_STATE_DISABLED_NO_EXPANDED = {
    disabled: true,
    expanded: false
}

export const EXPANSION_PANEL_ENABLED = {
    disabled: false,
    expanded: false
}

export const EXPANSION_PANEL_ENABLED_EXPANDED = {
    disabled: false,
    expanded: true
}

export const DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE = {
    opened: false,
    detallesProspectoActiveTab: 0,
    medioGestion: '',
    respuestaGestion: '',
    contactoGestion: '',
    comentarioGestion: '',
    fechaHoraCitaGestion: null
};

export const DIALOGO_DETALLES_PROSPECTO_INITIAL_STATE_OPENED = {
    opened: true,
    detallesProspectoActiveTab: 0,
    medioGestion: '',
    respuestaGestion: '',
    contactoGestion: '',
    comentarioGestion: '',
    fechaHoraCitaGestion: null
};

export const DIALOGO_NOTIFICACION_CITAS_SIN_RESULTADOS = {
    opened: true,
    title: 'Sin Resultados',
    content: 'Ninguna coincidencia de citas con los filtros seleccionados',
    subcontent: '',
    isLoadingDialog: false,
    flag: false
};

export const SNACKBAR_NOTIFICACION_FECHA_HORA_CITA_GESTION_FUERA_RANGO = {
    opened: true,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 3000,
    icon: 'warning',
    message: 'El horario disponible para cita es de 08:00:00 AM a 10:00:00 PM',
    type: 'warning'
};

export const SNACKBAR_NOTIFICACION_POST_GENERAR_GESTION_PROSPECTO_SUCCESS = {
    opened: true,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 3000,
    icon: 'check',
    message: 'Se ha registrado la gestion del prospecto con exito',
    type: 'success'
};

export const SNACKBAR_NOTIFICACION_DATOS_REQUERIDOS = {
    opened: true,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    duration: 3000,
    icon: 'error',
    message: 'Campos marcados con * son requeridos',
    type: 'error'
};

export const SNACKBAR_NOTIFICACION_OFICINA_SIN_PROSPECTOS = {
    opened: true,
    duration: 3000,
    icon: 'warning',
    message: 'Oficina sin prospectos, seleccione otra oficina',
    type: 'warning'
};

export const SNACKBAR_NOTIFICACION_BUSQUEDA_AVANZADA_AFINACION_BUSQUEDA = {
    opened: true,
    duration: 3000,
    icon: 'error',
    message: 'Hay más de 25 resultados, afine busqueda usando Apellido Materno',
    type: 'error'
};

export const SNACKBAR_NOTIFICACION_TELEFONO_PERSONA_AGREGADO = {
    opened: true,
    duration: 3000,
    icon: 'check',
    message: 'Contacto agregado correctamente',
    type: 'success'
};

export const SNACKBAR_NOTIFICACION_SELECCION_OFICINA_REQUERIDA = {
    opened: true,
    duration: 3000,
    icon: 'warning',
    message: 'Debe seleccionar una oficina para poder continuar',
    type: 'warning'
};

export const SNACKBAR_NOTIFICACION_CITA_OCUPADA = {
    opened: true,
    duration: 3000,
    icon: 'error',
    message: 'Error, ya se encuentra una cita en ese horario',
    type: 'error'
};

export const SNACKBAR_NOTIFICACION_CIERRE_CITA_EXTIOSO = {
    opened: true,
    duration: 3000,
    icon: 'check',
    message: 'Se ha registrado el cierre de cita con exito',
    type: 'success'
};

export const SET_EXPANSION_PANEL_BUSQUEDA_AVANZADA = 'SET_EXPANSION_PANEL_BUSQUEDA_AVANZADA';

export const SET_EXPANSION_PANEL_PERIODOS_COMERCIALES = 'SET_EXPANSION_PANEL_PERIODOS_COMERCIALES';

export const SET_EXPANSION_PANEL_SUCURSALES = 'SET_EXPANSION_PANEL_SUCURSALES';