// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecoredAlign';
import '../../../_globals/css/InputStyleSolicitud.css';
const MoreInfoPanel_solicitud = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt><h6 className="size-title">Datos de credito</h6></TitlePanelContainerAlt>
  <div>
  {/* <TextFieldDecored style={{width: '50%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" /> */}

    <TextFieldDecored style={{width: '45%'}} valuetext="tipoTelefono" label="Monto de crédito" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="claveProveedorServicios" label="Monto de pago" variant="filled"  />
    <TextFieldDecored style={{width: '94%'}} valuetext="claveProveedorServicios" label="Tipo de análisis" variant="filled"  />
  </div>
  </PanelContainer>
</div>

export default MoreInfoPanel_solicitud;
