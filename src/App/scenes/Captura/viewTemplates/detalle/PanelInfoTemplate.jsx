// Dependencies
import React, { Fragment } from 'react';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';

const PanelInfoTemplate = props => <Fragment><span heritage={{disabled: true}}>
  <TextFieldDecored valuetext="persona" label="Persona" variant="filled" />
  <TextFieldDecored valuetext="nombre apellidoPaterno apellidoMaterno" label="Nombre" variant="filled" />
  <TextFieldDecored valuetext="contratoAnterior.contrato" label="Contrato" variant="filled" />
  <TextFieldDecored valuetext="calificacion" label="Calificación" variant="filled" />
  <TextFieldDecored valuetext="ultimaDisposicion" label="Última disposición" variant="filled" type="date"/>
  <TextFieldDecored valuetext="ultimoMovimiento" label="Último movimiento" variant="filled" type="date"/>
  <TextFieldDecored valuetext="diaPago" label="Día de pago" variant="filled" />
</span></Fragment>

export default PanelInfoTemplate;
