import { handleActions } from 'redux-actions';
import {
    CONSULTA_FORMATOS, GENERA_FOLIO, CONSULTA_SEGUROS,
    VALIDA_FOLIO, CONSULTA_VENDEDORES, CONSULTA_PRODUCTOS, CONSULTA_DESCRIPCION_PRODUCTOS, CONSULTA_PRODUCTOS_WS,
    CALCULA_MONTO_PAGO, OBTEN_TIPO_ANALISIS, CONSULTA_COLONIAS, CONSULTA_COLONIAS_EMPLEO, CONSULTA_CONTRATO_ANT,
    CONSULTA_POLITICAS_RENOVACION_X_CLIENTE, SET_DATOS_CREDITO, VALIDA_XML_PRESCORE, CALCULA_MONTO_PAGO_SIN_SEGURO,
    VALIDA_POLITICAS_REGISTRO, GET_MODELO_BPM, VALIDA_ZONA_AUTORIZADA, ACTUALIZA_ASENTAMIENTO_PARTICULAR, ACTUALIZA_ASENTAMIENTO_EMPLEO,
    REGISTRA_SOLICITUD, CONSULTA_CORRESPONSALES, CONSULTA_TIPOS_DISPOSICION, LIMPIAR_DATOS_CREDITO, SET_DATOS_PRESCORE, VALIDA_PRESCORE,
    OBTENER_IP
} from 'constants/RegistroSolicitud/registroSolicitud';

export const datosCredito = handleActions({
    [CONSULTA_FORMATOS]: (state, action) => ({ ...state, catalogoFormatoDrools: action.payload }),
    [GENERA_FOLIO]: (state, action) => ({ ...state, folio: action.payload[0] }),
    [VALIDA_FOLIO]: (state, action) => ({ ...state, esValido: action.payload }),
    [CONSULTA_VENDEDORES]: (state, action) => ({ ...state, vendedores: action.payload }),
    [CONSULTA_PRODUCTOS]: (state, action) => ({ ...state, productos: action.payload }),
    [CONSULTA_DESCRIPCION_PRODUCTOS]: (state, action) => ({ ...state, descripciones: action.payload }),
    [CONSULTA_PRODUCTOS_WS]: (state, action) => ({ ...state, productosWS: action.payload }),
    [CONSULTA_SEGUROS]: (state, action) => ({ ...state, seguros: action.payload }),
    [CALCULA_MONTO_PAGO]: (state, action) => ({ ...state, objMontoPago: action.payload }),
    [CALCULA_MONTO_PAGO_SIN_SEGURO]: (state, action) => ({ ...state, objMontoPagoSinSeguro: action.payload }),
    [OBTEN_TIPO_ANALISIS]: (state, action) => ({ ...state, tipoAnalisis: action.payload }),
    [CONSULTA_COLONIAS]: (state, action) => ({ ...state, asentamientosDomicilio: action.payload }),
    [CONSULTA_COLONIAS_EMPLEO]: (state, action) => ({ ...state, asentamientosEmpleo: action.payload }),
    [CONSULTA_CONTRATO_ANT]: (state, action) => ({ ...state, contratoAnt: action.payload }),
    [CONSULTA_POLITICAS_RENOVACION_X_CLIENTE]: (state, action) => ({ ...state, politicasReno: action.payload }),
    [SET_DATOS_CREDITO]: (state, action) => ({ ...state, datosSolicitud: action.payload }),
    [VALIDA_XML_PRESCORE]: (state, action) => ({ ...state, prescoreXmlCondicion: action.payload }),
    [VALIDA_POLITICAS_REGISTRO]: (state, action) => ({ ...state, politicasRegistro: action.payload }),
    [GET_MODELO_BPM]: (state, action) => ({ ...state, modeloBPM: action.payload }),
    [VALIDA_ZONA_AUTORIZADA]: (state, action) => ({ ...state, validacionZonaAutorizada: action.payload }),
    [ACTUALIZA_ASENTAMIENTO_PARTICULAR]: (state, action) => ({ ...state, asentamientoDomicilio: action.payload }),
    [ACTUALIZA_ASENTAMIENTO_EMPLEO]: (state, action) => ({ ...state, asentamientoEmpleo: action.payload }),
    [REGISTRA_SOLICITUD]: (state, action) => ({ ...state, respuestaRegistro: action.payload }),
    [CONSULTA_CORRESPONSALES]: (state, action) => ({ ...state, corresponsales: action.payload }),
    [CONSULTA_TIPOS_DISPOSICION]: (state, action) => ({ ...state, tipoDisposicion: action.payload }),
    [SET_DATOS_PRESCORE]: (state, action) => ({ ...state, jsonPrescore: action.payload }),
    [VALIDA_PRESCORE]: (state, action) => ({ ...state, respuestaScore: action.payload }),
    [OBTENER_IP]: (state, action) => ({ ...state, rutaArchivo: action.payload }),
    [LIMPIAR_DATOS_CREDITO]: (state, action) => {
        return {
            ...state,
            catalogoFormatoDrools: undefined,
            esValido: undefined,
            vendedores: undefined,
            modeloBPM: undefined,
            respuestaRegistro: undefined,
            productos: undefined,
            descripciones: undefined,
            tipoAnalisis: undefined,
            objMontoPago: undefined,
            objMontoPagoSinSeguro: undefined,
            productosWS: undefined,
            asentamientosDomicilio: undefined,
            asentamientosEmpleo: undefined,
            asentamientoDomicilio: undefined,
            asentamientoEmpleo: undefined,
            politicasReno: undefined,
            seguros: undefined,
            folio: undefined,
            datosSolicitud: {},
            contratoAnt: undefined,
            politicasRegistro: undefined,
            prescoreXmlCondicion: undefined,
            validacionZonaAutorizada: undefined,
            corresponsales: undefined,
            tipoDisposicion: undefined,
            jsonPrescore: undefined,
            respuestaScore: undefined,
            rutaArchivo: undefined

        }
    },

}, []); 