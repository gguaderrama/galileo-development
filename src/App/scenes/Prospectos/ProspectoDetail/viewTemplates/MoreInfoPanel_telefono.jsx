// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';

const MoreInfoPanel_telefono = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt>Nuevo teléfono</TitlePanelContainerAlt>
  <div>
    <TextFieldDecored style={{width: '18.3%'}} valuetext="tipoTelefono" label="Tipo teléfono" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="telefono" label="Teléfono" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="tipoPlan" label="Plan" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="claveProveedorServicios" label="Proveedor" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="fechaStatus" label="Fecha de verificación" />
  </div>
  </PanelContainer>
</div>

export default MoreInfoPanel_telefono;
