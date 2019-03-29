// Dependencies
import React from 'react';

// Commons
//import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

//
const MoreInfoPanel_personales = props => <div>
  <PanelContainer heritage={{disabled: false}}>
    <TitlePanelContainerAlt>Datos personales</TitlePanelContainerAlt>
    <div>
      <TextFieldDecored valuetext="nombre" label="Nombre(s)" />
      <TextFieldDecored valuetext="apellidoPaterno" label="Apellido paterno" />
      <TextFieldDecored valuetext="apellidoMaterno" label="Apellido Materno" />
      <TextFieldDecored valuetext="fechaNacimiento" label="Fecha nacimiento" />
    </div>
    <div>
      <TextFieldDecored valuetext="curp" label="CURP" />
      <TextFieldDecored valuetext="rfcCalculado" label="RFC" />
      <TextFieldDecored valuetext="fiel" label="Firma electrónica (FIEL)" />
      <TextFieldDecored valuetext="email" label="Correo electrónico" />
    </div>
    <div>
      <TextFieldDecored valuetext="codigoPaisNacimiento" label="País de nacimiento" />
      <TextFieldDecored valuetext="codigoEstadoNacimiento" label="Entidad federativa nacimiento" />
      <TextFieldDecored valuetext="nacionalidad" label="Nacionalidad" />
      <SelectDecored valuetext="estadoCivil" selectlist="estadoCivilList" keys="codigo descripcion" label="Estado civil" />
    </div>
    <div>
      <TextFieldDecored valuetext="numeroDependientes" label="Dependientes" />
      <TextFieldDecored valuetext="tipoIdentificacion" label="Tipo de identificación" />
      <SelectDecored valuetext="estudios" selectlist="nivelEstudiosList" keys="codigo descripcion" label="Grado de estudios" />
      <RadiobuttonGroup valuetext="sexo" name="sexo" label="Género"
        radioList={[{label:'Masculino', valuetext: 'M'}, {label:'Femenino', valuetext: 'F'}]} />
    </div>
    <hr />
    <TitlePanelContainerAlt>Datos del conyugue del solicitante</TitlePanelContainerAlt>
    <div>
      <TextFieldDecored valuetext="nombreConyuge" label="Nombre(s)" />
      <TextFieldDecored valuetext="apellidoPaternoConyuge" label="Apellido paterno" />
      <TextFieldDecored valuetext="apellidoMaternoConyuge" label="Apellido Materno" />
      <TextFieldDecored valuetext="telefonoCelular" label="Telefono Celular" />
    </div>
   

  </PanelContainer>
</div>

export default MoreInfoPanel_personales;
