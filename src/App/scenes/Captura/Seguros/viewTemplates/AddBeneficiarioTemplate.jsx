import React, {Component} from 'react';
import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';

class AddBeneficiarioTemplate extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <DataCollectionPanel
          typeList={typeList}
          intoPanelContainer={false}>
          <div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <TextFieldDecored style={{margin:'0 10px', flexGrow:1, marginLeft:0}} valuetext="client" label="Cliente"  />
                <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="name" label="Nombre de asegurado"  />
                <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="product" label="Producto"  />             
            </div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <SelectDecored style={{margin:'0 10px', flexGrow:1,width: '25%'}} valuetext="type" label="Tipo de seguro" selectlist="typeList" keys="theKey theName"  /> 
                <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="sum" label="Suma asegurada"  />
                <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="mont" label="Monto" />                
            </div>
          </div>
        </DataCollectionPanel>
        <hr />
      </div>
    );
  }
}

export default AddBeneficiarioTemplate;

export const typeList = [
  {theKey: 'V', theName: 'Vida'},
  {theKey: 'F', theName: 'Funerario'},
  {theKey: 'D', theName: 'Desempleo'},
  {theKey: 'O', theName: 'Otro'},
];