// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';

const MoreInfoPanel_domicilio = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt>Nuevo teléfono</TitlePanelContainerAlt>
  <div>
    <TextFieldDecored style={{width: '18.3%'}} valuetext="tipoDomicilio" label="Tipo de domicilio" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="calle" label="Calle" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="entreCalles" label="Entre calles" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="noExterior" label="Número exterior" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="noInterior" label="Número interior" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="ciudad" label="Ciudad" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="colonia" label="Colonia" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="cp" label="Código postal" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="tipoVivienda" label="Tipo de vivienda" />
    <TextFieldDecored style={{width: '18.3%'}} valuetext="fechaStatus" label="Fecha de verificación" />
  </div>
  </PanelContainer>
</div>

export default MoreInfoPanel_domicilio;
