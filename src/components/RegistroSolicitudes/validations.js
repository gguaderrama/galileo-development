export const validatios = values => {
    let objetoValidacion = {}
    const { nombre, apellidoPaterno, rfcCapturado, fechaNacimiento, apellidoMaterno } = values;
    if (!nombre && !apellidoPaterno && !rfcCapturado && !fechaNacimiento && !apellidoMaterno) {
        objetoValidacion = {
            campo: "SIN DATOS",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de ingresar: Nombre y Primer Apellido o RFC',
                type: 'error'
            },
            isValid: false
        }
        return objetoValidacion;
    } else if ((nombre && apellidoPaterno) || (rfcCapturado && (rfcCapturado.length === 13 || rfcCapturado.length === 10))) {
        objetoValidacion = {
            campo: "",
            tipoMensaje: {},
            isValid: true
        }
        return objetoValidacion;
    } else if (rfcCapturado && rfcCapturado !== 10) {
        objetoValidacion = {
            tipoMensaje: "RFC NO CUMPLE",
            isValid: false
        }
        return objetoValidacion;
    } else if (!nombre) {
        objetoValidacion = {
            campo: "SIN NOMBRE",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de ingresar: Nombre',
                type: 'error'
            },
            isValid: false
        }
        return objetoValidacion;
    } else if (!apellidoPaterno) {
        objetoValidacion = {
            campo: "SIN PATERNO",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de ingresar: Primer Apellido',
                type: 'error'
            },
            isValid: false
        }
        return objetoValidacion;
    }

}

export const foliosValidations = values => {
    let objValidacion = {};
    const { codigoFormato, version } = values;

    if (!codigoFormato && !version) {
        objValidacion = {
            campo: "SIN DATOS",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar los campos requeridos',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (!codigoFormato) {
        objValidacion = {
            campo: "SIN CODIGO",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar el formato',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (!version) {
        objValidacion = {
            campo: "SIN VERSION",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar la versión',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (codigoFormato && version) {
        objValidacion = {
            campo: "",
            tipoMensaje: {},
            isValid: true
        }
        return objValidacion;
    }
}


export const dataCreditoValidatios = values => {
    let objValidacion = {};
    const { vendedorSeleccionado, tipoProductoSeleccionado, plazoSeleccionado, frecuenciaSeleccionada, productoSeleccionado, categoriaSeleccionada, montoSeleccionado,
        tasaSeleccionada } = values;
    if (vendedorSeleccionado && tipoProductoSeleccionado && plazoSeleccionado && frecuenciaSeleccionada && productoSeleccionado && categoriaSeleccionada && montoSeleccionado &&
        tasaSeleccionada) {
        objValidacion = {
            campo: "",
            tipoMensaje: {

            },
            isValid: true
        }
        return objValidacion;
    } else if (!vendedorSeleccionado && tipoProductoSeleccionado &&
        plazoSeleccionado && frecuenciaSeleccionada &&
        productoSeleccionado && categoriaSeleccionada &&
        montoSeleccionado && tasaSeleccionada) {
        objValidacion = {
            campo: "VENDEDOR_SELECCIONADO",
            tipoMensaje: {
                opened: true,
                title: 'Error',
                icon: 'error',
                iconColor: 'error',
                content: 'Favor de seleccionar un vendedor',
                subcontent: '',
                flag: false,
                isLoadingDialog: false
            },
            isValid: false
        }
        return objValidacion;
    }
}

export const formPersonales = values => {
    let respuestaValidacion = {};
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, rfcCapturado, sexo, curp } = values;
    if (nombre && apellidoPaterno && apellidoMaterno && fechaNacimiento && rfcCapturado && sexo && curp) {
        respuestaValidacion = {
            tipoMensaje: {},
            isValid: true
        }
        return respuestaValidacion;
    } else {
        respuestaValidacion = {
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar los datos marcados con *',
                type: 'error'
            },
            isValid: false
        }
        return respuestaValidacion;
    }
}

export const formDomiciliosValidatios = values => {
    let objValidacion = {};
    const { calle, ciudad, codigoEstado, codigoPais, colonia, cp, noExterior, tipoVivienda } = values;
    if (calle && ciudad && codigoEstado && codigoPais && colonia && cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "OK",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar los datos marcados con *',
                type: 'error'
            },
            isValid: true
        }
        return objValidacion;

    } else if (!calle && !ciudad && !codigoEstado && !codigoPais && !colonia && !cp && !noExterior && !tipoVivienda) {
        objValidacion = {
            campo: "SIN_DATOS",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar los datos',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (!calle && ciudad && codigoEstado && codigoPais && colonia && cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_CALLE",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar el campo calle',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && codigoPais && colonia && !cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_CP",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar el campo codigo postal',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && codigoPais && colonia && cp && !noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_EXTERIOR",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar el campo número exterior',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && !codigoEstado && codigoPais && colonia && cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_ESTADO",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar un estado',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && codigoPais && !colonia && cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_COLONIA",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar un colonia',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && !codigoPais && colonia && cp && noExterior && tipoVivienda) {
        objValidacion = {
            campo: "SIN_PAIS",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar un país',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && codigoPais && colonia && cp && noExterior && !tipoVivienda) {
        objValidacion = {
            campo: "SIN_VIVIENDA",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de seleccionar un el tipo de vivienda',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (calle && ciudad && codigoEstado && codigoPais && colonia && cp && noExterior && !tipoVivienda) {
        objValidacion = {
            campo: "SIN_CIUDAD",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar el campo ciuidad',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    } else if (Object.keys(values).length < 8) {
        objValidacion = {
            campo: "FAILD",
            tipoMensaje: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 2000,
                icon: 'error',
                message: 'Favor de completar los campos marcados con *',
                type: 'error'
            },
            isValid: false
        }
        return objValidacion;

    }
}
