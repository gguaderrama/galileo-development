// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecoredAlign';
import '../css/captura_solicitud_sidebar.css';
const MoreInfoPanel_solicitud = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt><h6 className="size-title">Solicitud 0000001111</h6></TitlePanelContainerAlt>
  <div>
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
