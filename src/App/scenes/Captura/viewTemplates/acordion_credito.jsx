// Dependencies
import React, { Fragment } from 'react';

// Commons
//import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

class AcordionCredito extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="acordion">
         <h4>Producto</h4>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Segmento" renderValue="Micronegocio" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Tipo de Producto" renderValue="Tradicional" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Categoria" renderValue="Categoría" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
        <SelectDecored style={{width:'22%', 'marginRight': '3%'}} inputLabelTitle="Producto" renderValue="Producto" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
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
        <SelectDecored style={{width:'30%', 'marginRight': '3%'}} inputLabelTitle="Tipo de disposición" renderValue="Tipo de disposición" itemList={[{key:1,name:'one'},{key:2,name:'two'},{key:3,name:'three'}]}/>
      </div>
    )
  }
}
export default AcordionCredito;
