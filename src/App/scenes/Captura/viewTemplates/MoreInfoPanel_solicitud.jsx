// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecoredAlign';
import '../../../_globals/css/InputStyleSolicitud.css';
const MoreInfoPanel_solicitud = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt><h6 className="size-title">Solicitud 0000001111</h6></TitlePanelContainerAlt>
  <div>
  {/* <TextFieldDecored style={{width: '50%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored style={{width: '40%'}}  valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" /> */}

    <TextFieldDecored style={{width: '45%'}} valuetext="tipoTelefono" label="Fecha solicitud" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="telefono" label="No. Cliente" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="tipoPlan" label="Nombre de cliente" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="claveProveedorServicios" label="Grupo" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="tipoPlan" label="Origen" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="claveProveedorServicios" label="Calificación" variant="filled"  />
    <TextFieldDecored style={{width: '94%'}} valuetext="claveProveedorServicios" label="Vendedor" variant="filled"  />
  </div>
  </PanelContainer>
</div>

export default MoreInfoPanel_solicitud;
