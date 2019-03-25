import { handleActions } from 'redux-actions';
import { FETCH_SOLICITUD, 
    FETCH_PRODUCTOS, 
    ELIMINAR_INTEGRANTE, 
    CONSULTAR_DATOS_CONTRATO_ANTERIOR, 
    OBTENER_CODIGO_FORMATO_FOLIO, 
    CONSULTAR_PRODUCTOS, 
    CONSULTAR_DESCRIPCION_CATALOGOS, 
    CONSULTAR_PRIMA_SEGUROS,
    CONSULTAR_DETALLE_REACTIVACION, 
    CALCULA_MONTO_PAGO_CAPTURA,
    AGREGAR_BENEFICIARIO } from '../../../constants';

export const datosCaptura = handleActions({
    [FETCH_SOLICITUD]: (state, action) => {return { ...state, solicitud: action.payload } },
    [ELIMINAR_INTEGRANTE]: (state, action) => {
        let difference = state.integrantes.filter(x => !action.payload.includes(x));
        state.integrantes = difference;
        return {...state};
      },
    [FETCH_PRODUCTOS]: (state, action) => {return { ...state, productos: action.payload } },
    [CONSULTAR_DATOS_CONTRATO_ANTERIOR]: (state, action) => {return { ...state, contratoAnterior: action.payload } },
    [OBTENER_CODIGO_FORMATO_FOLIO]: (state, action) => {return { ...state, codigoFormatoFolio: action.payload } },
    [CONSULTAR_PRODUCTOS]: (state, action) => {return { ...state, producto: action.payload } },
    [CONSULTAR_DESCRIPCION_CATALOGOS]: (state, action) => {return { ...state, descripcionCatalogos: action.payload } },
    [CONSULTAR_PRIMA_SEGUROS]: (state, action) => {return { ...state, primaSeguros: action.payload } },
    [CONSULTAR_DETALLE_REACTIVACION]: (state, action) => {return { ...state, detalleReactivacion: action.payload } },
    [AGREGAR_BENEFICIARIO]: (state, action) => {
        let beneficiarios = [...state.solicitud.integrantes[0].seguros[1].beneficiarios, action.payload];
        state.solicitud.integrantes[0].seguros[1].beneficiarios = beneficiarios;
        console.log(beneficiarios);
        return {...state};
      },
    [CALCULA_MONTO_PAGO_CAPTURA]: (state, action) => {return { ...state, montoPago: action.payload } },
}, null);
