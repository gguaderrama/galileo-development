const urlBaseProspectos = 'http://10.1.44.117:8080/ProspectosWEB/services/ProspectosService';
export const urlObtenerOficinas = `${urlBaseProspectos}/obtenerOficinas`;

const urlBaseProspectosTemp = 'http://10.1.44.117:8080/rest-prospectos-generic-services/services/prospectos';
export const urlGenerarGestionProspecto = `${urlBaseProspectosTemp}/generarGestionProspecto`;
export const urlGenerarCierreCita = `${urlBaseProspectosTemp}/generarCierreCita`;
export const urlConsultaArbolCampanias = `${urlBaseProspectosTemp}/consultaArbolCampanias`;
export const urlConsultaCampanias = `${urlBaseProspectosTemp}/consultaCampanias`;
export const urlConsultaCampaniasPeriodo = `${urlBaseProspectosTemp}/consultaCampaniasPeriodo`;
export const urlConsultaVendedoresOficina = `${urlBaseProspectosTemp}/consultaVendedoresOficina`;
export const urlConsultaProspectos = `${urlBaseProspectosTemp}/consultaProspectos`;
export const urlConsultaCampaniasProspectoGestionesCitas = `${urlBaseProspectosTemp}/consultaCampaniasProspectoGestionesCitas`;

const urlBasePersonas = 'http://10.1.44.228:8183/cxf/personasFisa/PersonaService';
export const urlConsultaPersonas = `${urlBasePersonas}/consultarPersona`;
export const urlAgregarTelefonosPersona = `${urlBasePersonas}/agregarTelefonos`;
//uncomment line 15 for prod
const urlBaseGalileo = './services/GalileoRestService';
//uncommnet line 17 for dev
//const urlBaseGalileo = 'http://10.1.44.117:8080/galileo-web/services/GalileoRestService';
export const urlConsultaMapaJNDI = `${urlBaseGalileo}/consultarMapaJNDI`;