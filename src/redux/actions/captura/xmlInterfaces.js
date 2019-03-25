import {    SET_PERSONA, 
            SET_XML_INTERFACES,
            AGREGAR_TELEFONO, 
            AGREGAR_DOMICILIO_CAPTURA, 
            AGREGAR_REFERENCIA,
            ACTUALIZAR_REFERENCIA,
            ELIMINAR_REFERENCIA,
            ELIMINAR_DOMICILIO,
            ELIMINAR_TELEFONO,
            ACTUALIZAR_DOMICILIO,
            ACTUALIZAR_TELEFONO,
            GUARDAR_INFORMACION_XML,
            AGREGAR_SEGURO,
            ELIMINAR_SEGURO,
        } from '../../../constants';
import { createAction } from 'redux-actions';
import { initialize } from 'redux-form';
import { urlConsultarPersona, urlConsultarSolicitudXMLInterfaces, urlGuardarInformacionXML } from '../../../api/urls';
import { convierteFechasPersona } from '../../../services/captura';
import { apiPost } from '../../../api/index';

export const consultarSolicitudXMLInterfaces = payload => {
    return (dispatch, getState) => {

        return fetch(`${urlConsultarSolicitudXMLInterfaces}?xmlInterfaces=${encodeURIComponent(JSON.stringify(payload.xmlInterfaces))}`)
        .then( data => {
            return data.json();
        }).then(xmlInterface => {
            const xmlInterfacefechas = convierteFechasPersona(xmlInterface);
            dispatch(setXmlInterfaces(xmlInterfacefechas));
            if (!(xmlInterface && xmlInterface.integrantes && xmlInterface.integrantes[0].persona)) {
                dispatch(consultarPersona(payload.persona));
            }
        });        
    }
};

export const consultarPersona = payload => {
    return (dispatch, getState) => {
        return fetch(`${urlConsultarPersona}?persona=${encodeURIComponent(JSON.stringify(payload))}`)
            .then( data => {
                return data.json();
            }).then(personas => {
                const persona = convierteFechasPersona(personas[0]);
                dispatch(setPersona(persona));
            });
    }
}
export const loadDomicilio = payload => {
    return (dispatch, getState) => {
        dispatch(initialize('Domicilios', payload));
    }
};

export const loadTelefono = payload => {
    return (dispatch, getState) => {
        dispatch(initialize('Telefonos', payload));
    }
};

export const guardaDomicilio = payload => {
    return (dispatch, getState) => {
        dispatch(updateDomicilio(payload));
        dispatch(initialize('Domicilios', null));
    }
};

export const updateDomicilio = createAction(
    ACTUALIZAR_DOMICILIO,
    (domicilio) => (domicilio)
);

export const guardaTelefono = payload => {
    return (dispatch, getState) => {
        dispatch(updateTelefono(payload));
        dispatch(initialize('Telefonos', null));
    }
};

export const updateTelefono = createAction(
    ACTUALIZAR_TELEFONO,
    (telefono) => (telefono)
);

export const setXmlInterfaces = createAction(
    SET_XML_INTERFACES,
    (xmlInterfaces) => (xmlInterfaces)
);
export const setPersona = createAction(
    SET_PERSONA,
    (persona) => (persona)
);

export const addTelefono = createAction(
    AGREGAR_TELEFONO,
    (telefono) => (telefono)
);

export const delTelefono = createAction(
    ELIMINAR_TELEFONO,
    (telefono) => (telefono)
);

export const addDomicilio = createAction(
    AGREGAR_DOMICILIO_CAPTURA,
    (domicilio) => (domicilio)
);

export const delDomicilio = createAction(
    ELIMINAR_DOMICILIO,
    (domicilio) => (domicilio)
);

export const addReferencia = createAction(
    AGREGAR_REFERENCIA,
    (referencia) => (referencia)
);

export const updateReferencia = createAction(
    ACTUALIZAR_REFERENCIA,
    (referencia) => (referencia)
);

export const delReferencia = createAction(
    ELIMINAR_REFERENCIA,
    (referencia) => (referencia)
);

export const postCapturaParcial = createAction(
    GUARDAR_INFORMACION_XML, 
    (params, notificationClose) => apiPost(urlGuardarInformacionXML, params, notificationClose)()
);

export const addSeguro = createAction(
    AGREGAR_SEGURO,
    (seguro) => (seguro)
);

export const delSeguro = createAction(
    ELIMINAR_SEGURO,
    (seguro) => (seguro)
);