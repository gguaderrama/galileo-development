/* eslint-disable import/first */
// Constants
import { API } from 'constants/api';

// Base
import appConfig from 'app-config';
const { baseProspectos, baseOtorgamientoAnalisisCliente } = appConfig.api;

// Utils
import { apiFetch } from 'utils/api';

class ProspectosApi {
  // consultaProspectos - baseProspectos POST
  static getProspectos_prospectos(params) {
    const {
      empresa:claveEmpresa = null,
      campania:codigoCampania = null,
      apellidoPaterno:apellidoPat = null,
      apellidoMaterno:apellidoMat = null,
      rfc:rfcCapturado = null,
      nombre = null,
      oficina = null,
      status = null,
      fechaNacimiento = null,
      persona = null,
      contrato = null
    } = params;
    const paramsInterface = {
      "prospectos":[{
        claveEmpresa, codigoCampania, apellidoPat, apellidoMat, rfcCapturado, nombre, oficina, status, fechaNacimiento, persona, contrato
      }],
      "limit": params.limit || 25,
      "start":0
    }
    return apiFetch(`${baseProspectos}${API.PROSPECTOS.PROSPECTOS_LIST}`, {body:paramsInterface, method:'POST'});
  }

  // consultaPersonas - baseProspectos POST
  static getPersonas_prospectos(params) {
    const {
      apellidoPaterno = null,
      apellidoMaterno = null,
      rfc:rfcCapturado = null,
      nombre = null,
      oficina = null,
    } = params;
    const paramsInterface = {
      "persona": JSON.stringify({
        nombre: nombre && nombre.toUpperCase(),
        apellidoPaterno: apellidoPaterno && apellidoPaterno.toUpperCase(),
        apellidoMaterno: apellidoMaterno && apellidoMaterno.toUpperCase(),
        rfcCapturado,
        oficina
      })
    }
    return apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.PERSONAS_LIST}`, {}, paramsInterface, false);
  }

  // consultaPersonas - baseOtorgamientoAnalisisCliente GET - error if more than 25
  static getPersonas_otorgamientoAnalisisCliente(params) {
    const {
      apellidoPaterno = null,
      apellidoMaterno = null,
      rfc:rfcCapturado = null,
      nombre = null,
      oficina = null,
      persona = null,
      contrato = null
    } = params;

    let preParams = {
      nombre: nombre && nombre.toUpperCase(),
      apellidoPaterno: apellidoPaterno && apellidoPaterno.toUpperCase(),
      apellidoMaterno: apellidoMaterno && apellidoMaterno.toUpperCase(),
      rfcCapturado,
      oficina,
    }

    preParams = persona ? {...preParams, persona} : preParams;
    preParams = contrato ? {...preParams, contrato} : preParams;
    
    const paramsInterface = {
      "persona": JSON.stringify({...preParams})
    }
    console.log('paramsInterface', paramsInterface)
    return apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.PERSONAS_LIST}`, {}, paramsInterface, false);
  }
}

export default ProspectosApi;
