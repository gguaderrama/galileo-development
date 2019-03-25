// Dependencies
import React, { Fragment } from 'react';

// Commons
//import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

//
const DatosCreditoTemplate = props => <Fragment>
  <div style={{width: '80%', margin: '0 auto'}}>
    <Fragment>
      <RadiobuttonGroup valuetext="ocupacion" name="ocupacion" label="¿A qué te dedicas?"
        style={{width: '100%'}}
        justifyContent="space-between"
        radioList={[
          {label:'Soy empleado', valuetext: '1'},
          {label:'Tengo un negocio', valuetext: '2'},
          {label:'Trabajo por mi cuenta', valuetext: '3'},
          {label:'Soy pensionado', valuetext: '4'},
        ]}/>
    </Fragment>
    <Fragment>
      <TextFieldDecored valuetext="necesito" label="¿Cuánto necesitas?" />
      <SelectDecored valuetext="frecuenciaPago" selectlist="frecuenciaPagoList" keys="codigo descripcion" label="¿Cada cuánto podría pagar?" />
    </Fragment>
    <Fragment>
      <SelectDecored valuetext="tiempoPago" selectlist="tiempoPagoList" keys="llave nombre" label="¿En cuánto tiempo lo pagaría?" />
      <TextFieldDecored valuetext="destino" label="Destino del prestamo" />
    </Fragment>
  </div>
</Fragment>

export default DatosCreditoTemplate;
