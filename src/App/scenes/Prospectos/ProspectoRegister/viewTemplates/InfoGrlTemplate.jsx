// Dependencies
import React, { Fragment } from 'react';

// Commons
//import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

//
const InfoGrlTemplate = props => <Fragment>
  <div style={{width: '80%', margin: '0 auto'}}>
    <Fragment>
      <TextFieldDecored valuetext="nombre" label="Nombre(s)" />
      <TextFieldDecored valuetext="apellidoPaterno" label="Apellido paterno" />
      <TextFieldDecored valuetext="apellidoMaterno" label="Apellido Materno" />
    </Fragment>
    <Fragment>
      <RadiobuttonGroup valuetext="sexo" name="sexo" label="Género"
        radioList={[{label:'Masculino', valuetext: 'M'}, {label:'Femenino', valuetext: 'F'}]} />
        <TextFieldDecored valuetext="colonia" label="Colonia" />
      <TextFieldDecored valuetext="cp" label="Código postal" />
    </Fragment>
    <Fragment>
      <TextFieldDecored valuetext="alcaldia" label="Alcaldía" />
      <TextFieldDecored valuetext="estado" label="Estado" />
      <SelectDecored valuetext="tipoCto" selectlist="tipoContacto" keys="claveTipoTelefono nombreTipoTelefono" label="Tipo de contacto" />
    </Fragment>
    <Fragment>
      <TextFieldDecored valuetext="telefono" label="Teléfono" />
      <TextFieldDecored valuetext="email" label="Correo electrónico" />
      <TextFieldDecored valuetext="contrato" label="Nvo. Contacto" />
    </Fragment>
    <Fragment>
      <SelectDecored valuetext="medio" selectlist="medioContactoList" keys="codigo descripcion" label="Medio por que se enteró" />
    </Fragment>
  </div>
</Fragment>

export default InfoGrlTemplate;
