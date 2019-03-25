/* eslint-disable import/first */
// Constants
import { API } from 'constants/api';

// Base
import appConfig from 'app-config';
const { baseOtorgamientoAnalisisCliente, baseProspectosGeneric } = appConfig.api;

// Utils
import { apiFetch } from 'utils/api';

// store
//import store from 'redux/index';
//import { setDialogNotificationModalToLoading, setDialogNotificationModalToInit } from 'redux/shared-reducers/app-actions';

class ProspectosDetailApi {
  // consultarDatosContratoAnterior
  static async getConsultarDatosContratoAnterior(persona, appBufferKey, creditoGrupal = "N") {
    const paramsInterface = {
      "solicitud": JSON.stringify({
        "cliente": persona,
        "creditoGrupal": creditoGrupal
      })
    }
    const waitResponse = await apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.CONTRATO_ANTERIOR}`, {}, paramsInterface);
    return {
      appBufferKey,
      response: { panelInfo: waitResponse }
    }
  }

  // getConsultarOfertasSolicitudesContratos
  static async getConsultarOfertasSolicitudesContratos(params, appBufferKey, solicitudesTransform) {
    const paramsContratos = {
      "solicitud": JSON.stringify({
        "cliente": params.cliente,
        "oficina": params.oficina
      })
    }
    const paramsSolicitudes = {
      "persona": JSON.stringify({"persona":params.cliente}),
      esPerfilNominaAnalisisCliente:false,
      page:1,
      start:0,
      limit:50
    }
    const paramsOfertas = {
      [params.paramsOfertas.key]: JSON.stringify(params.paramsOfertas.data)
    }
    let waitContratosResponse = null;
    let waitSolicitudesResponse = null;
    let waitOfertasResponse = null;
    try {
      waitContratosResponse = await apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.CONTRATOS_CLIENTE}`, {}, paramsContratos);
      waitSolicitudesResponse = await apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.SOLICITUDES_CLIENTE}`, {}, paramsSolicitudes);
      waitOfertasResponse = await apiFetch(`${baseOtorgamientoAnalisisCliente}${API.PROSPECTOS.OFERTAS_CLIENTE}`, {}, paramsOfertas);

      return {
        appBufferKey,
        response: { panelInfoTabs: [waitOfertasResponse, waitSolicitudesResponse, waitContratosResponse] },
        solicitudesTransform
      }
    } catch (e) {
      console.log('CATCH ERROR', e);
      //store.dispatch(setDialogNotificationModalToLoading());
    } finally {
      console.log('FINALY', waitOfertasResponse, waitSolicitudesResponse, waitContratosResponse);
      //store.dispatch(setDialogNotificationModalToInit());
      return {
        appBufferKey,
        response: { panelInfoTabs: [waitOfertasResponse || [], waitSolicitudesResponse || [], waitContratosResponse || []] },
        solicitudesTransform
      }
    }
  }

  //
  static async getContactoGestiones(params, appBufferKey, contactoGestionesTransform) {
    const bodyToSend = {
      "prospectos": [
        {
          "claveEmpresa": params.claveEmpresa,
          "oficina": params.oficina,
          "idProspecto": params.idProspecto,
          "contrato": null
        }
      ],
      "destino": {
        "claveEmpresa": params.claveEmpresa,
        "codigoDestino": "PISO",
        "gestor": params.gestor
      },
      "start": 0,
      "limit": 10
    }
    const waitResponse = await apiFetch(`${baseProspectosGeneric}${API.PROSPECTOS.PROSPECTOS_LIST}`, {body:bodyToSend, method:'POST'});

    return {
      appBufferKey,
      response: { panelGestion: waitResponse.payload },
      contactoGestionesTransform
    }
  }

  // Generar gestion generarGestionProspecto
  static async postGenerarGestionProspecto(params, appBufferKey){
    const bodyToSend = {
      claveEmpresa: params.claveEmpresa,
      //codigoCampania: selectedProspect.codigoCampania,
      //periodo: selectedProspect.periodo,
      idProspecto: params.idProspecto,
      codigoContacto: params.medio,
      codigoResultado: params.respuesta,
      comentarios: params.comentario,
      gestor: params.usuario,
      fechaCita: params.scheduledDate !== null ? params.scheduledDate : null,
      horaCita: params.scheduledDate !== null ? params.scheduledDate : null,
      codigoTipoCita: params.scheduledDate !== null ? params.respuesta : null,
      codigoLugarparamsCita: params.respuesta === 'CITA' ? 'SUC' : params.respuesta === 'LLDP' ? 'TEL' : null
    };
    const waitResponse = await apiFetch(`${baseProspectosGeneric}${API.PROSPECTOS.GENERAR_GESTION}`, {body:bodyToSend, method:'POST'});

    return {
      appBufferKey,
      response: { gestionResponse: waitResponse.payload },
    }
  }
}

export default ProspectosDetailApi;
