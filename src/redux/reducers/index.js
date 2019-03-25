import { reducer as formReducer } from 'redux-form';
import { datosCaptura } from './captura/solicitud';
import { navegacion } from './RegistroSolicitudes/navegacion';
import { busquedaPersona } from './RegistroSolicitudes/busquedaCliente';
import { datosCredito } from './RegistroSolicitudes/datosCredito'
import { iformularios } from './captura/iformularios';
import { visorExpedientes } from './Generic/visorExpedientes';
import { catalogos as catalogosCaptura } from './captura/catalogos';
import { sessionRegistro } from './Session/sessionPrueba';
import { xmlInterfaces } from './captura/xmlInterfaces';
import { referencias } from './captura/referencias';
import { oficina } from './captura/oficina';
import { catalogos } from './Catalogos/catalogos';
import { session } from './Session/session';
import { xmlValidoPdf } from './captura/validarXmlSucursalPdf';

export default {
  navegacion,
  form: formReducer,
  busquedaPersona,
  datosCaptura,
  datosCredito,
  iformularios,
  catalogosCaptura,
  xmlInterfaces,
  visorExpedientes,
  sessionRegistro,
  //jjr
  catalogos,
  session,
  referencias,
  oficina,
  xmlValidoPdf,
};
