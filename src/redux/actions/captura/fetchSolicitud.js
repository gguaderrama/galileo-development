import cloneDeep from 'lodash/cloneDeep';
import {
    FETCH_SOLICITUD,
    ELIMINAR_INTEGRANTE,
    FETCH_PRODUCTOS,
    CONSULTAR_DATOS_CONTRATO_ANTERIOR,
    OBTENER_CODIGO_FORMATO_FOLIO,
    CONSULTAR_PRODUCTOS,
    CONSULTAR_DESCRIPCION_CATALOGOS,
    CONSULTAR_PRIMA_SEGUROS,
    CONSULTAR_DETALLE_REACTIVACION,
    AGREGAR_BENEFICIARIO
} from '../../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import {
    urlSolicitud,
    urlConsultarProductosWS,
    urlConsultarDatosContratoAnterior,
    urlObtenCodigoFormatoFolio,
    urlConsultarProductos,
    urlConsultarDescripcionCatalogos,
    urlConsultaPrimaSeguros,
    urlConsultarDetalleReactivacion
} from '../../../api/urls';
import { fetchOficinas } from './catalogos';
import { consultarSolicitudXMLInterfaces } from './xmlInterfaces';
import { fetchValidarOficinaConfiguracion } from './validarOficinaConfiguracion';

export const fetchSolicitudSuccess = createAction(
    FETCH_SOLICITUD,
    (solicitud) => (solicitud)
);

export const fetchProductos = createAction(
    FETCH_PRODUCTOS,
    (solicitud) => apiGet(`${urlConsultarProductosWS}?solicitud=${encodeURIComponent(JSON.stringify(solicitud))}`, () => { })()
);

export const fetchDatosContratoAnterior = createAction(
    CONSULTAR_DATOS_CONTRATO_ANTERIOR,
    (contrato) => apiGet(`${urlConsultarDatosContratoAnterior}?contrato=${encodeURIComponent(JSON.stringify(contrato))}`, () => { })()
);

export const fetchConsultarProductos = createAction(
    CONSULTAR_PRODUCTOS,
    (folio) => apiGet(`${urlConsultarProductos}?folio=${encodeURIComponent(JSON.stringify(folio))}`, () => { })()
);

export const fetchConsultarDescripcionCatalogos = createAction(
    CONSULTAR_DESCRIPCION_CATALOGOS,
    (claveEmpresa) => apiGet(`${urlConsultarDescripcionCatalogos}?claveEmpresa=${claveEmpresa}`, () => { })()
);

export const fetchConsultarPrimaSeguros = createAction(
    CONSULTAR_PRIMA_SEGUROS,
    (seguros) => apiGet(`${urlConsultaPrimaSeguros}?seguros=${encodeURIComponent(JSON.stringify(seguros))}`, () => { })()
);

export const fetchConsultarDetalleReactivacion = createAction(
    CONSULTAR_DETALLE_REACTIVACION,
    (atomo) => apiGet(`${urlConsultarDetalleReactivacion}?atomo=${encodeURIComponent(JSON.stringify(atomo))}`, () => { })()
);

export const fetchCodigoFormatoFolioSuccess = createAction(
    OBTENER_CODIGO_FORMATO_FOLIO,
    (folio) => (folio)
);

export const fetchCodigoFormatoFolio = payload => {
    return (dispatch, getState) => {

        return fetch(`${urlObtenCodigoFormatoFolio}?folio=${encodeURIComponent(JSON.stringify(payload))}`)
            .then(data => {
                return data.json();
            }).then(codigoFormatoFolio => {
                //modificar el estado con el resultado de la promise (fetch)
                dispatch(fetchCodigoFormatoFolioSuccess(codigoFormatoFolio));

                let folio = {
                    "codigoFormato": codigoFormatoFolio.codigoFormato,
                    "empresa": codigoFormatoFolio.empresa,
                };
                dispatch(fetchConsultarProductos(folio));

            });
    }
}

export const delIntegrante = createAction(
    ELIMINAR_INTEGRANTE,
    (cliente) => (cliente)
);

export const addBeneficiario = createAction(
    AGREGAR_BENEFICIARIO,
    (beneficiario) => (beneficiario)
);

export const fetchSolicitudProductos = payload => {
    return (dispatch, getState) => {

        return fetch(`${urlSolicitud}?solicitud=${encodeURIComponent(JSON.stringify(payload))}`)
        .then( data => {
            return data.json();
        }).then(solicitud => {
            if (solicitud.clave !== 'ERROR') {
                const xmlInterfaces = {
                    solicitud:solicitud.solicitud,
                    cliente:solicitud.cliente,
                    numeroIntegrante:1,
                }
                const persona = {
                    persona:solicitud.cliente,
                    oficina:solicitud.oficina.oficina,
                }
                const payload = {
                    xmlInterfaces,
                    persona,
                }
                dispatch(consultarSolicitudXMLInterfaces(payload));
                //modificar el estado con el resultado de la promise (fetch)
                const solicitudProductos = cloneDeep(solicitud);
                solicitudProductos.claveCorresponsal = null;
                solicitudProductos.origen =  'REACTIVACION';
                solicitudProductos.horaResolucion 			= null;
                solicitudProductos.horaSolicitud			= null;
                solicitudProductos.horaUltimaModificacion	= null;
                
                solicitudProductos.fechaResolucion 		= null;
                solicitudProductos.fechaSolicitud			= null;
                solicitudProductos.fechaUltimaModificacion	= null;
                dispatch(fetchProductos(solicitudProductos));

                let oficina = solicitud.oficina;
                dispatch(fetchOficinas(oficina));

                let contrato = {
                    "cliente": solicitud.cliente,
                    "creditoGrupal": solicitud.creditoGrupal,
                    "solicitud": solicitud.solicitud
                };
                dispatch(fetchDatosContratoAnterior(contrato));

                let folio = {
                    "empresa":solicitud.claveEmpresa,
                    "solicitud":solicitud.solicitud
                };
                dispatch(fetchCodigoFormatoFolio(folio));

                dispatch(fetchConsultarDescripcionCatalogos(solicitud.claveEmpresa));

                let seguros = {
                    "empresa": solicitud.claveEmpresa,
                    "segmento": solicitud.segmento,
                    "tipoProducto": solicitud.tipoProducto,
                    "codigoProducto": solicitud.codigoProducto,
                    "categoria": solicitud.categoria,
                    "frecuencia": solicitud.frecuenciaPago,
                    "plazo": solicitud.plazo,
                    "oficina": solicitud.oficinaDisposicion,
                    "fechaVigencia": solicitud.fechaSolicitud
                };
                dispatch(fetchConsultarPrimaSeguros(seguros));

                let atomo = {
                    "numeroIntegrante": solicitud.numeroIntegrantes,
                    "solicitud": solicitud.solicitud,
                    "cliente": solicitud.cliente
                };
                dispatch(fetchConsultarDetalleReactivacion(atomo));

                //TODO: remover codigo duro de oficina
                
                /* let formato = {
                    // segmento: solicitud.segmento,
                    // tipoProducto: solicitud.tipoProducto,
                    // categoria: solicitud.categoria,
                    
                    valorDefault: '2',
                    
                    segmento: 'FORM',
                    tipoProducto: 'TRAD',
                    categoria: 'TRAD',
                    claveEmpresa:solicitud.claveEmpresa,
                    oficina:solicitud.oficina.oficina,
                    piloto:"S"
                } */
                //dispatch(fetchCamposAOcultarEnVista(formato));

                /* const mediosSubmedios={
                    claveEmpresa:solicitud.claveEmpresa,
                    oficina:solicitud.oficina.oficina,
                }; */
                //dispatch(fetchMediosSubmediosContacto(mediosSubmedios));

                const jsonModeloOficina = {"oficina":solicitud.oficina.oficina};
                dispatch(fetchValidarOficinaConfiguracion(jsonModeloOficina));
            }
            dispatch(fetchSolicitudSuccess(solicitud));
        });
    }
}