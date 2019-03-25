import { handleActions } from 'redux-actions';
import isEmpty from 'lodash.isempty';
import { SET_PERSONA,
        SET_XML_INTERFACES,
        AGREGAR_TELEFONO,
        AGREGAR_DOMICILIO_CAPTURA,
        AGREGAR_REFERENCIA,
        ELIMINAR_REFERENCIA,
        ELIMINAR_DOMICILIO,
        ELIMINAR_TELEFONO,
        ACTUALIZAR_DOMICILIO,
        ACTUALIZAR_TELEFONO,
        AGREGAR_SEGURO,
        ELIMINAR_SEGURO, 
        ACTUALIZAR_REFERENCIA} from '../../../constants';

export const xmlInterfaces = handleActions({
    [SET_PERSONA]: (state, action) => {
        const integrantes = [{ persona: action.payload }];
        state['integrantes'] = integrantes;
        return state;
      },
    [SET_XML_INTERFACES]: (state, action) => action.payload,
    [AGREGAR_TELEFONO]: (state, action) => {
        let telefonosParticulares;
        state.integrantes[0].persona.telefonosParticulares ?
        telefonosParticulares = [...state.integrantes[0].persona.telefonosParticulares, action.payload] :
        telefonosParticulares = [action.payload];
        state.integrantes[0].persona.telefonosParticulares = telefonosParticulares;
        return {...state};
      },
    [AGREGAR_DOMICILIO_CAPTURA]: (state, action) => {
        if (action.payload.tipoDomicilio === "CASA"){
          let domiciliosParticulares;
          state.integrantes[0].persona.domiciliosParticulares ? 
          domiciliosParticulares = [...state.integrantes[0].persona.domiciliosParticulares, action.payload] :
          domiciliosParticulares = [action.payload];
          state.integrantes[0].persona.domiciliosParticulares = domiciliosParticulares;
        } else if (action.payload.tipoDomicilio === "EMPL"){
          let domiciliosEmpleo;
          state.integrantes[0].persona.domiciliosEmpleo ? 
          domiciliosEmpleo = [...state.integrantes[0].persona.domiciliosEmpleo, action.payload] :
          domiciliosEmpleo = [action.payload];
          state.integrantes[0].persona.domiciliosEmpleo = domiciliosEmpleo;
        }        
        return {...state};
      },
    [AGREGAR_REFERENCIA]: (state, action) => {
        let referencias = isEmpty(state.integrantes[0].persona.referencias) ?  [action.payload] : [...state.integrantes[0].persona.referencias, action.payload];
        state.integrantes[0].persona.referencias = referencias;
        return {...state};
      },
    [ELIMINAR_REFERENCIA]: (state, action) => {
        const referencias = state.integrantes[0].persona.referencias;
        let difference = referencias.filter(x => !action.payload.includes(x));
        state.integrantes[0].persona.referencias = difference;
        return {...state};
      },
    [ELIMINAR_DOMICILIO]: (state, action) => {
        let difference = state.integrantes[0].persona.domiciliosParticulares.filter(x => !action.payload.includes(x));
        state.integrantes[0].persona.domiciliosParticulares = difference;
        return {...state};
      },
    [ELIMINAR_TELEFONO]: (state, action) => {
        let difference = state.integrantes[0].persona.telefonosParticulares.filter(x => !action.payload.includes(x));
        state.integrantes[0].persona.telefonosParticulares = difference;
        return {...state};
      },
    [ACTUALIZAR_DOMICILIO]: (state, action) => {
      const domicilioActual = action.payload.domicilioAnterior;
      if (domicilioActual.tipoDomicilio === "CASA"){
        const index = state.integrantes[0].persona.domiciliosParticulares.indexOf(domicilioActual);
        const domicilioNuevo = {...domicilioActual, ...action.payload.domicilio};
        let domiciliosParticulares = state.integrantes[0].persona.domiciliosParticulares;
        domiciliosParticulares.splice(index,1,domicilioNuevo);
        state.integrantes[0].persona.domiciliosParticulares = domiciliosParticulares;
      } else if (domicilioActual.tipoDomicilio === "EMPL"){
        const index = state.integrantes[0].persona.domiciliosEmpleo.indexOf(domicilioActual);
        const domicilioNuevo = {...domicilioActual, ...action.payload.domicilio};
        let domiciliosEmpleo = state.integrantes[0].persona.domiciliosEmpleo;
        domiciliosEmpleo.splice(index,1,domicilioNuevo);
        state.integrantes[0].persona.domiciliosEmpleo = domiciliosEmpleo;
      }
      return {...state};
    },
    [ACTUALIZAR_TELEFONO]: (state, action) => {
      const telefonoActual = action.payload.telefonoAnterior;
      const index = state.integrantes[0].persona.telefonosParticulares.indexOf(telefonoActual);
      const telefonoNuevo = {...telefonoActual, ...action.payload.telefono};
      let telefonosParticulares = state.integrantes[0].persona.telefonosParticulares;
      telefonosParticulares.splice(index,1,telefonoNuevo);
      state.integrantes[0].persona.telefonosParticulares = telefonosParticulares;
      return {...state};
    },
    [ACTUALIZAR_REFERENCIA]: (state, action) => {
      console.log(action.payload);
      const referenciaActual = action.payload.referenciaAnterior;
      const index = state.integrantes[0].persona.referencias.indexOf(referenciaActual);
      const referenciaNueva = {...referenciaActual, ...action.payload.referencia};
      let referencias = state.integrantes[0].persona.referencias;
      referencias.splice(index,1,referenciaNueva);
      state.integrantes[0].persona.referencias = referencias;
      return {...state};
    },
    [AGREGAR_SEGURO]: (state, action) => {
      const seguros = state.integrantes[0].seguros ? [...state.integrantes[0].seguros, action.payload] : [action.payload];
      state.integrantes[0].seguros = seguros;
      return {...state};
    },
    [ELIMINAR_SEGURO]: (state, action) => {
      var index = state.integrantes[0].seguros.findIndex(seguro => seguro.tipoSeguro === action.payload.tipoSeguro);
      if (index > -1) {
        state.integrantes[0].seguros.splice(index, 1);
      }
      return {...state};
    },
}, null);
