// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecoredAlign';
import '../css/captura_solicitud_sidebar.css';
const MoreInfoPanel_solicitud = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt><h6 className="size-title">Datos de credito</h6></TitlePanelContainerAlt>
  <div>
    <TextFieldDecored style={{width: '45%'}} valuetext="tipoTelefono" label="Monto de crédito" variant="filled"  />
    <TextFieldDecored style={{width: '45%'}} valuetext="claveProveedorServicios" label="Monto de pago" variant="filled"  />
    <TextFieldDecored style={{width: '94%'}} valuetext="claveProveedorServicios" label="Tipo de análisis" variant="filled"  />
  </div>
  </PanelContainer>
</div>

export default MoreInfoPanel_solicitud;
