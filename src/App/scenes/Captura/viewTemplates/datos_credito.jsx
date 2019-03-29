// Dependencies
import React, { Fragment } from 'react';

// Commons
//import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

const AcordionCredito = props => {
    return(
      <div className="acordion">
         <h4>Producto</h4>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} defaultValue="1" valuetext="micronegocio_value" selectlist="micronegocio" keys="id name" label="Segmento" />
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="tipo_producto_value" renderValue="tipo_producto" keys="id name" label="Tipo de producto"/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="categoria_value" renderValue="categoria" keys="id name" label="Categoria"/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="producto_value" renderValue="producto" keys="id name" label="Producto"/>
         <hr/>
         <h4>Datos de crédito</h4>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Frecuencia de pago" renderValue="Micronegocio" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Plazo" renderValue="Tradicional" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Tasa" renderValue="Categoría" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Monto" renderValue="Producto" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <hr/>
         <h4>Detalle del crédito</h4>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="Destino de crédito" renderValue="Destino de crédito" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="¿Como se enteró de nosotros?" renderValue="¿Como se enteró de nosotros?" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="No. contrato que recomienda" renderValue="No. contrato que recomienda" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="Lugar" renderValue="Lugar" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="Día de pago" renderValue="Día de pago" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="Tipo de disposición" renderValue="Tipo de disposición" itemList={[{key:1,name:'Transferencia'},{key:2,name:'Cheque'}]}/>
        <div>
         <TextFieldDecored  style={{width:'30%', 'marginRight': '3%'}} placeholder="Nro de cuenta" valuetext="nro_cuenta"  label=" " />
         <TextFieldDecored  style={{width:'30%', 'marginRight': '3%'}} placeholder="Clabe interbancaria" value={''}  label={null} />
         <TextFieldDecored  style={{width:'30%', 'marginRight': '3%'}} placeholder="Nro de cuenta" value={''}  label={null} />
         </div>
         <p className="questionp">¿Desempeña o ha desempeñado funciones públicas, partidos políticos?</p>
         <RadiobuttonGroup style={{margin:'0 10px', flexShrink:1, marginRight:0}} valuetext="sexo" name="sexo" label={" "} 
      radioList={[{label:'Sí', valuetext: 'M'}, {label:'No', valuetext: 'F'}]} />
      <p className="questionp">¿Es cónyugue o tiene parentesco de consanguinidad?</p>
         <RadiobuttonGroup style={{margin:'0 10px', flexShrink:1, marginRight:0}} valuetext="sexo" name="sexo" label={" "} 
      radioList={[{label:'Sí', valuetext: 'M'}, {label:'No', valuetext: 'F'}]} />
      </div>
    )
  
  }
export default AcordionCredito;
