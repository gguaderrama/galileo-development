import { handleActions } from 'redux-actions';
import {
    OBTENER_PERSONAS, SET_CLIENTES, SET_SELECTED_CLIENTE, DELETE_DOMICILIO, DELETE_INTEGRANTE, AGREGA_DOMICILIO, ACTUALIZAR_INFORMACION_PERSONA,
    CALCULA_RFC, CONSULTA_CATALOGO_RELACIONES, UPDATE_DOMICILIO
} from "constants/RegistroSolicitud/registroSolicitud";


export const busquedaPersona = handleActions({
    [OBTENER_PERSONAS]: (state, action) => ({ ...state, clientes: action.payload }),
    [SET_CLIENTES]: (state, action) => ({ ...state, clientes: action.payload }),
    [SET_SELECTED_CLIENTE]: (state, action) => {
        if (Object.keys(action.payload).length > 0) {
            const clienteList = state.clienteSeleccionado.concat([{ ...action.payload, id: state.clienteSeleccionado.length + 1 }]);
            return { ...state, clienteSeleccionado: clienteList }
        } else {
            return { ...state, clienteSeleccionado: [], rfc: undefined, relaciones: undefined, clientes: undefined }
        }
    },
    [AGREGA_DOMICILIO]: (state, action) => {
        let newCliente = null;
        const selected = state.clienteSeleccionado.find(i => i.id === action.payload.id)
        if (selected.domiciliosParticulares) {
            newCliente = selected.domiciliosParticulares.concat([{ ...action.payload }])
        }
        else {
            newCliente.domiciliosParticulares = selected.domiciliosParticulares.concat([{ ...action.payload }])
        }
        return { ...state }
    },
    [DELETE_DOMICILIO]: (state, action) => {
        const selected = state.clienteSeleccionado.find(i => i.id === action.payload.id)
        const newClienteSeleccionado = { ...selected, domiciliosParticulares: null }
        const clienteSeleccionado = state.clienteSeleccionado.map(i => {
            if (i.id === action.payload.id) {
                return newClienteSeleccionado;
            }
            return i;
        })
        return { ...state, clienteSeleccionado }
    },
    [DELETE_INTEGRANTE]: (state, action) => {
        const elimando = state.clienteSeleccionado.filter(x => !action.payload.includes(x))
        state.clienteSeleccionado = elimando;
        return { ...state }
    },
    [ACTUALIZAR_INFORMACION_PERSONA]: (state, action) => {
        const selected = state.clienteSeleccionado.find(i => i.id === action.payload.id)
        const newCliente = { ...selected, ...action.payload }
        const clienteSeleccionado = state.clienteSeleccionado.map(i => {
            if (i.id === action.payload.id) {
                return newCliente;
            }
            return i;
        })
        return { ...state, clienteSeleccionado }

    },
    [CALCULA_RFC]: (state, action) => ({ ...state, rfc: action.payload }),
    [CONSULTA_CATALOGO_RELACIONES]: (state, action) => ({ ...state, relaciones: action.payload.filter(relacion => relacion.codigoRelacion === "24" || relacion.codigoRelacion === "23" || relacion.codigoRelacion === "25") }),
    [UPDATE_DOMICILIO]: (state, action) => {
        const selected = state.clienteSeleccionado.find(i => i.id === action.payload.id)
        let domicilioSeleccionado = selected.domiciliosParticulares.find(i => action.payload.values.consecutivo === i.consecutivo)
        let domicilios = selected.domiciliosParticulares.filter(i => i !== domicilioSeleccionado)
        // domicilios.push({ ...action.payload.values })
        const newDomicilio = { ...selected, domiciliosParticulares: [...domicilios, action.payload.values] }
        const clienteSeleccionado = state.clienteSeleccionado.map(cliente => {
            if (cliente.id === action.payload.id) {
                return newDomicilio;
            }
            return cliente;
        })
        return { ...state, clienteSeleccionado }

    }

}, []); 
