// Dependencies
import React, { Fragment } from 'react';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import DatePickerDecored from 'App/_commons/elements/DatePickerDecored';

const PanelGestionTemplate = props => <Fragment>
  <SelectDecored style={{width: '23.5%'}} valuetext="medio" selectlist="mediosGestion" keys="claveMedioGestion nombreMedioGestion" label="Medio" />
  <SelectDecored style={{width: '23.5%'}} valuetext="respuesta" selectlist="respuestasGestion" keys="claveRespuestaGestion nombreRespuestaGestion" label="Respuesta" />
  <SelectDecored style={{width: '23.5%'}} valuetext="contacto" selectlist="contactoList" keys="consecutivo telefono" label="Contacto" />
  <DatePickerDecored style={{width: '23.5%'}} valuetext="scheduledDate" label="Fecha/Hora Cita" />
  <TextFieldDecored multiline style={{width: '99%'}}
    valuetext="comentario"
    label="Comentario"
    placeholder="Escriba un comentario sobre el cliente" />
</Fragment>

export default PanelGestionTemplate;
