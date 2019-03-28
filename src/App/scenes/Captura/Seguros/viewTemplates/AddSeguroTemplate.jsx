import React, {Component} from 'react';
import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
import { RowBeneficiarioTemplate } from './RowBeneficiariosTemplate';
import { Checkbox, Grid, IconButton, Icon } from '@material-ui/core';

const colums = [{key:1,label:<Checkbox /> },
                {key:2,label:'Nombre'},
                {key:3,label:'Relacion'},
                {key:4,label:'Porcentaje asegurado'},
                {key:5,label:'Editar'}];
const infoDummy = [{'relacion':'Laboral','nombre':'The Boss','porcentaje':30},
{'relacion':'Casa','nombre':'Jefret','porcentaje':50},];
const resultTablePanelSpread = {
    columsData: colums,
    rowData: infoDummy,
    rowTemplate: RowBeneficiarioTemplate,
    emptyRowDataMsg: 'Sin resultados, no existen referencias.',
    rowClickDisabled:true,
    intoPanelContainer: false,
}

class AddSeguroTemplate extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <DataCollectionPanel
          title={"Seguro de vida 1"}
          typeList={typeList}
          intoPanelContainer={false}>
          <div>
            <Grid container justify={'space-around'} direction={'row'}>
              <Grid item xs={10}>
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary"><Icon>edit</Icon></IconButton>
                <IconButton color="primary"><Icon>delete</Icon></IconButton>
              </Grid>
            </Grid>
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
        <DataCollectionPanel intoPanelContainer={false} title={"Beneficiarios"} >          
          <div>
            <Grid container justify={'space-around'} direction={'row'}>
              <Grid item xs={10}>
                <p>Agregue máximo tres beneficiarios</p>
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary"><Icon>add</Icon></IconButton>
                <IconButton color="primary"><Icon>delete</Icon></IconButton>
              </Grid>
            </Grid>
            
            <ResultTablePanel {...resultTablePanelSpread} /> 
          </div>
        </DataCollectionPanel>
      </div>
    );
  }
}

export default AddSeguroTemplate;

export const typeList = [
  {theKey: 'V', theName: 'Vida'},
  {theKey: 'F', theName: 'Funerario'},
  {theKey: 'D', theName: 'Desempleo'},
  {theKey: 'O', theName: 'Otro'},
];